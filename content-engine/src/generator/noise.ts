/**
 * Human-noise allotment across a generation corpus (configured rates, not iid).
 */
import { HUMAN_NOISE_RATES } from "../rules/constants.js";

export type NoiseFlag =
  | "self_correction"
  | "fake_attachment"
  | "forward_intro"
  | "phone_style"
  | "bump"
  | "wrong_thread";

export interface NoisePlan {
  flags: NoiseFlag[];
}

/** Assign noise flags to N message slots to approximate target rates. */
export function allotNoiseFlags(
  totalMessages: number,
  rand: () => number = Math.random,
): NoiseFlag[][] {
  const slots: NoiseFlag[][] = Array.from({ length: totalMessages }, () => []);
  const plan: Array<{ flag: NoiseFlag; rate: number }> = [
    { flag: "self_correction", rate: HUMAN_NOISE_RATES.selfCorrection },
    { flag: "fake_attachment", rate: HUMAN_NOISE_RATES.fakeAttachment },
    { flag: "forward_intro", rate: HUMAN_NOISE_RATES.forwardIntro },
    { flag: "phone_style", rate: HUMAN_NOISE_RATES.phoneStyle },
    { flag: "bump", rate: HUMAN_NOISE_RATES.bump },
    { flag: "wrong_thread", rate: HUMAN_NOISE_RATES.wrongThread },
  ];

  for (const { flag, rate } of plan) {
    const n = Math.max(0, Math.round(totalMessages * rate));
    const idxs = shuffledIndices(totalMessages, rand).slice(0, n);
    for (const i of idxs) {
      if (!slots[i]!.includes(flag)) slots[i]!.push(flag);
    }
  }
  return slots;
}

function shuffledIndices(n: number, rand: () => number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function noiseInstructions(flags: NoiseFlag[]): string {
  if (!flags.length) return "No special human-noise injection for this message.";
  const lines: string[] = ["Inject these human-noise behaviors:"];
  for (const f of flags) {
    switch (f) {
      case "self_correction":
        lines.push("- Include a brief self-correction (e.g. sorry, meant Tuesday not Thursday).");
        break;
      case "fake_attachment":
        lines.push(
          '- Reference an attachment that is described but not actually attached ("attaching the revised sheet").',
        );
        break;
      case "forward_intro":
        lines.push('- Bare forward-style intro ("looping in X here").');
        break;
      case "phone_style":
        lines.push("- Sent-from-phone style: no greeting, no signoff, lowercase, one fragment.");
        break;
      case "bump":
        lines.push("- This is a bump on a thread that went quiet; keep it short and lightly impatient.");
        break;
      case "wrong_thread":
        lines.push('- Wrong-thread energy, or follow with "ignore that, wrong thread" vibe.');
        break;
    }
  }
  return lines.join("\n");
}
