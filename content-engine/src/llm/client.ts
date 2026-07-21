/**
 * Optional LLM client (dead path by default).
 *
 * The content engine runs fully offline via the local composition engine.
 * LLM is only used when BOTH:
 *   - CONTENT_ENGINE_USE_LLM=1 (or "true")
 *   - OPENAI_API_KEY or ANTHROPIC_API_KEY is set
 *
 * Prefer OpenAI when both keys exist. Never invents keys.
 */
import { LLM_TEMPERATURE } from "../rules/constants.js";

export type LlmProvider = "openai" | "anthropic" | "none";

export interface LlmCompletionResult {
  text: string;
  provider: Exclude<LlmProvider, "none">;
  model: string;
}

function envKey(name: string): string | undefined {
  const v = process.env[name];
  if (!v || !v.trim()) return undefined;
  return v.trim();
}

/** Opt-in gate - default is local compose only. */
export function llmOptInEnabled(): boolean {
  const v = envKey("CONTENT_ENGINE_USE_LLM")?.toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

export function detectLlmProvider(): {
  provider: LlmProvider;
  hasKey: boolean;
  /** True only when opt-in gate is on AND a key exists. */
  usable: boolean;
} {
  const openai = Boolean(envKey("OPENAI_API_KEY"));
  const anthropic = Boolean(envKey("ANTHROPIC_API_KEY"));
  const hasKey = openai || anthropic;
  const provider: LlmProvider = openai
    ? "openai"
    : anthropic
      ? "anthropic"
      : "none";
  const usable = llmOptInEnabled() && hasKey && provider !== "none";
  return { provider, hasKey, usable };
}

export async function completeChat(args: {
  system: string;
  user: string;
  temperature?: number;
}): Promise<LlmCompletionResult> {
  const { provider, usable } = detectLlmProvider();
  if (!usable || provider === "none") {
    throw new Error(
      "LLM path disabled. Set CONTENT_ENGINE_USE_LLM=1 and OPENAI_API_KEY or ANTHROPIC_API_KEY to enable.",
    );
  }
  const temperature = args.temperature ?? LLM_TEMPERATURE;

  if (provider === "openai") {
    const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${envKey("OPENAI_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature,
        messages: [
          { role: "system", content: args.system },
          { role: "user", content: args.user },
        ],
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenAI HTTP ${res.status}: ${errText.slice(0, 300)}`);
    }
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) throw new Error("OpenAI returned empty content");
    return { text, provider: "openai", model };
  }

  const model = process.env.ANTHROPIC_MODEL?.trim() || "claude-3-5-haiku-latest";
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": envKey("ANTHROPIC_API_KEY")!,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      temperature,
      system: args.system,
      messages: [{ role: "user", content: args.user }],
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic HTTP ${res.status}: ${errText.slice(0, 300)}`);
  }
  const data = (await res.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const text =
    data.content
      ?.filter((c) => c.type === "text")
      .map((c) => c.text ?? "")
      .join("\n")
      .trim() ?? "";
  if (!text) throw new Error("Anthropic returned empty content");
  return { text, provider: "anthropic", model };
}
