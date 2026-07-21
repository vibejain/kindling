/**
 * Message generator: local composition engine by default.
 * Optional LLM only when CONTENT_ENGINE_USE_LLM=1 and a key is set.
 * Caches by (threadId, sequenceIndex) - never regenerates on retry.
 */
import { randomUUID } from "node:crypto";
import type {
  EstablishedFact,
  LengthBand,
  Persona,
  PlannedThread,
} from "../types/index.js";
import {
  FALLBACK_BANDS,
  MAX_GENERATION_ATTEMPTS,
  QUESTION_ENDING_CAP,
  LINK_RATE,
} from "../rules/constants.js";
import { completeChat, detectLlmProvider } from "../llm/client.js";
import { validateGeneratedMessage } from "../validator/message.js";
import {
  pickFallbackTemplate,
  personalizeFallback,
} from "../fallback/bank.js";
import { composeLocalBody } from "../compose/assemble.js";
import { extractFactsFromMessage } from "./facts.js";
import { buildSystemPrompt, buildUserPrompt } from "./prompt.js";
import { buildSubject } from "./subjects.js";
import { allotNoiseFlags, type NoiseFlag } from "./noise.js";
import type { GeneratedMessageRecord, MessageMeta } from "./types.js";

export interface ThreadGenerationState {
  thread: PlannedThread;
  messages: GeneratedMessageRecord[];
  facts: EstablishedFact[];
  /** Cache key → message */
  slotCache: Map<string, GeneratedMessageRecord>;
  noiseBySlot: NoiseFlag[][];
  linkSlots: Set<number>;
  questionEndingCount: number;
  totalPlannedMessages: number;
  usedFallbackIds: Set<string>;
  /** Diversify: bodies already emitted by each persona email */
  usedBodiesByPersona: Map<string, Set<string>>;
  sendTime: Date;
}

function slotKey(threadId: string, sequenceIndex: number): string {
  return `${threadId}:${sequenceIndex}`;
}

function endsWithQuestion(body: string): boolean {
  const t = body.trim();
  return /\?\s*$/.test(t) || /\?\s*\n+[A-Za-z][^\n]*$/.test(t);
}

function stripFence(text: string): string {
  let t = text.trim();
  if (t.startsWith("```")) {
    t = t.replace(/^```[a-z]*\n?/i, "").replace(/\n?```$/, "").trim();
  }
  t = t.replace(/^Subject:\s*.+\n+/i, "");
  return t.trim();
}

function applyNoiseToFallback(
  body: string,
  flags: NoiseFlag[],
  recipient: Persona,
): string {
  let out = body;
  const first =
    recipient.displayName.split(/\s+/).find((p) => p.length > 2) ??
    recipient.displayName;
  if (flags.includes("phone_style")) {
    out = out.toLowerCase().replace(/^(hi|hey|hello)[^,]*,?\s*/i, "");
  }
  if (flags.includes("self_correction") && !/meant /i.test(out)) {
    out = `${out}${out.endsWith(".") ? "" : "."} sorry meant Wednesday not Friday.`;
  }
  if (flags.includes("fake_attachment") && !/attach/i.test(out)) {
    out = `${out}\n\nattaching the revised sheet.`;
  }
  if (flags.includes("forward_intro") && !/looping in/i.test(out)) {
    out = `looping in ${first} here\n\n${out}`;
  }
  if (flags.includes("wrong_thread")) {
    out = `${out}\n\nignore that, wrong thread.`;
  }
  if (flags.includes("bump")) {
    out = `bumping this - ${out}`;
  }
  return out.trim();
}

export function createThreadGenerationState(
  thread: PlannedThread,
  opts?: {
    existingMessages?: GeneratedMessageRecord[];
    sendTime?: Date;
    rand?: () => number;
    corpusMessageCountHint?: number;
    usedBodiesByPersona?: Map<string, Set<string>>;
  },
): ThreadGenerationState {
  const rand = opts?.rand ?? Math.random;
  const depth = thread.lengthArc.length;
  const hint = opts?.corpusMessageCountHint ?? depth;
  const noiseBySlot = allotNoiseFlags(Math.max(depth, hint), rand).slice(0, depth);

  // Prefer linking medium+ slots so corpus rate is visible in compose output
  const linkSlots = new Set<number>();
  const composeEligible = thread.lengthArc
    .map((b, i) => ({ b, i }))
    .filter((x) => x.b === "medium" || x.b === "long" || x.b === "anchor");
  const shortEligible = thread.lengthArc
    .map((b, i) => ({ b, i }))
    .filter((x) => x.b === "short");
  for (const item of composeEligible) {
    if (rand() < LINK_RATE * 1.8) linkSlots.add(item.i);
  }
  for (const item of shortEligible) {
    if (rand() < LINK_RATE * 0.5) linkSlots.add(item.i);
  }

  const messages = opts?.existingMessages ? [...opts.existingMessages] : [];
  const slotCache = new Map<string, GeneratedMessageRecord>();
  for (const m of messages) {
    slotCache.set(slotKey(thread.id, m.sequenceIndex), m);
  }

  return {
    thread,
    messages,
    facts: [...thread.establishedFacts],
    slotCache,
    noiseBySlot,
    linkSlots,
    questionEndingCount: messages.filter((m) => endsWithQuestion(m.bodyText)).length,
    totalPlannedMessages: depth,
    usedFallbackIds: new Set(),
    usedBodiesByPersona: opts?.usedBodiesByPersona ?? new Map(),
    sendTime: opts?.sendTime ?? new Date(),
  };
}

function speakerForIndex(
  thread: PlannedThread,
  sequenceIndex: number,
): { sender: Persona; recipient: Persona } {
  const aFirst = true;
  const senderIsA = sequenceIndex % 2 === (aFirst ? 0 : 1);
  return senderIsA
    ? { sender: thread.personaA, recipient: thread.personaB }
    : { sender: thread.personaB, recipient: thread.personaA };
}

async function draftBody(args: {
  state: ThreadGenerationState;
  sequenceIndex: number;
  band: LengthBand;
  sender: Persona;
  recipient: Persona;
  noiseFlags: NoiseFlag[];
  allowLink: boolean;
  preferQuestionEnding: boolean;
  rand: () => number;
}): Promise<{
  body: string;
  partialMeta: Pick<MessageMeta, "source" | "provider" | "model">;
}> {
  const { state, band } = args;
  const llm = detectLlmProvider();

  // Optional dead-code LLM path (opt-in only)
  if (llm.usable) {
    const system = buildSystemPrompt();
    const user = buildUserPrompt({
      thread: state.thread,
      history: state.messages,
      sequenceIndex: args.sequenceIndex,
      band,
      sender: args.sender,
      recipient: args.recipient,
      facts: state.facts,
      noiseFlags: args.noiseFlags,
      allowLink: args.allowLink,
      preferQuestionEnding: args.preferQuestionEnding,
      sendTime: state.sendTime,
    });
    const result = await completeChat({ system, user });
    return {
      body: stripFence(result.text),
      partialMeta: {
        source: "llm",
        provider: result.provider,
        model: result.model,
      },
    };
  }

  // Default: local paths - micro/short from bank, medium+ from composer
  if (FALLBACK_BANDS.has(band)) {
    const tmpl = pickFallbackTemplate({
      persona: args.sender,
      band,
      usedIds: state.usedFallbackIds,
      rand: args.rand,
    });
    if (tmpl) {
      state.usedFallbackIds.add(tmpl.id);
      let body = personalizeFallback(tmpl.body, args.sender, args.recipient, {
        allowLink: args.allowLink && band === "short",
        rand: args.rand,
      });
      body = applyNoiseToFallback(body, args.noiseFlags, args.recipient);
      return { body: body.trim(), partialMeta: { source: "fallback" } };
    }
  }

  const recent =
    state.usedBodiesByPersona.get(args.sender.email.toLowerCase()) ??
    new Set<string>();

  const composed = composeLocalBody({
    thread: state.thread,
    band,
    sender: args.sender,
    recipient: args.recipient,
    facts: state.facts,
    history: state.messages,
    sequenceIndex: args.sequenceIndex,
    noiseFlags: args.noiseFlags,
    allowLink: args.allowLink,
    preferQuestionEnding: args.preferQuestionEnding,
    sendTime: state.sendTime,
    rand: args.rand,
    recentBodies: recent,
  });

  if (composed) {
    return { body: composed, partialMeta: { source: "compose" } };
  }

  // Should not happen for medium+; last-resort safe short from bank
  const safe = pickFallbackTemplate({
    persona: args.sender,
    band: "short",
    usedIds: state.usedFallbackIds,
    rand: args.rand,
  });
  if (safe) {
    state.usedFallbackIds.add(safe.id);
    return {
      body: personalizeFallback(safe.body, args.sender, args.recipient),
      partialMeta: { source: "fallback" },
    };
  }

  return {
    body: "circling back on this - can you confirm when you have a sec?",
    partialMeta: { source: "compose" },
  };
}

/**
 * Generate (or return cached) message for the next empty slot on a thread state.
 */
export async function generateMessageForSlot(
  state: ThreadGenerationState,
  sequenceIndex: number,
  opts?: { rand?: () => number },
): Promise<GeneratedMessageRecord> {
  const rand = opts?.rand ?? Math.random;
  const cacheKey = slotKey(state.thread.id, sequenceIndex);
  const cached = state.slotCache.get(cacheKey);
  if (cached) {
    return { ...cached, meta: { ...cached.meta, cached: true } };
  }

  const band = state.thread.lengthArc[sequenceIndex];
  if (!band) {
    throw new Error(`No length band for sequence ${sequenceIndex}`);
  }

  const { sender, recipient } = speakerForIndex(state.thread, sequenceIndex);
  const prior = state.messages[state.messages.length - 1] ?? null;
  const { subject, style } = buildSubject({
    sequenceIndex,
    priorSubject: prior?.subject ?? null,
    premiseHint: state.thread.premise,
    rand,
  });

  const noiseFlags = state.noiseBySlot[sequenceIndex] ?? [];
  const allowLink = state.linkSlots.has(sequenceIndex);
  const questionSoFar =
    state.messages.length === 0
      ? 0
      : state.questionEndingCount / state.messages.length;
  const preferQuestionEnding = questionSoFar < QUESTION_ENDING_CAP * 0.9;

  let body = "";
  let attempts = 0;
  let lastReasons: string[] = [];
  let sourceMeta: Pick<MessageMeta, "source" | "provider" | "model"> = {
    source: "compose",
  };

  for (let attempt = 1; attempt <= MAX_GENERATION_ATTEMPTS; attempt++) {
    attempts = attempt;
    const draft = await draftBody({
      state,
      sequenceIndex,
      band,
      sender,
      recipient,
      noiseFlags,
      allowLink,
      preferQuestionEnding,
      rand,
    });
    body = draft.body;
    sourceMeta = draft.partialMeta;

    const result = validateGeneratedMessage({
      body,
      subject,
      band,
      persona: sender,
      facts: state.facts,
      sendTime: state.sendTime,
      allowLink,
    });

    lastReasons = result.reasons;
    if (result.ok) break;

    // Retry compose / fallback on validation failure
    if (attempt < MAX_GENERATION_ATTEMPTS) continue;
  }

  // Last resort: if still invalid and micro/short, force a safe micro from bank
  const finalCheck = validateGeneratedMessage({
    body,
    subject,
    band,
    persona: sender,
    facts: state.facts,
    sendTime: state.sendTime,
    allowLink,
  });
  if (!finalCheck.ok && FALLBACK_BANDS.has(band)) {
    const safe = pickFallbackTemplate({
      persona: sender,
      band: "micro",
      usedIds: state.usedFallbackIds,
      rand,
    });
    if (safe) {
      body = personalizeFallback(safe.body, sender, recipient);
      sourceMeta = { source: "fallback" };
      state.usedFallbackIds.add(safe.id);
      lastReasons = validateGeneratedMessage({
        body,
        subject,
        band: "micro",
        persona: sender,
        facts: state.facts,
        sendTime: state.sendTime,
        allowLink: false,
      }).reasons;
    }
  } else if (!finalCheck.ok && (band === "medium" || band === "long" || band === "anchor")) {
    // One more compose attempt with relaxed noise / no link
    const retry = composeLocalBody({
      thread: state.thread,
      band,
      sender,
      recipient,
      facts: state.facts,
      history: state.messages,
      sequenceIndex,
      noiseFlags: [],
      allowLink: false,
      preferQuestionEnding: false,
      sendTime: state.sendTime,
      rand,
      recentBodies: state.usedBodiesByPersona.get(sender.email.toLowerCase()),
    });
    if (retry) {
      const recheck = validateGeneratedMessage({
        body: retry,
        subject,
        band,
        persona: sender,
        facts: state.facts,
        sendTime: state.sendTime,
        allowLink: false,
      });
      if (recheck.ok || recheck.reasons.every((r) => r.startsWith("fingerprint:"))) {
        body = retry;
        sourceMeta = { source: "compose" };
        lastReasons = recheck.reasons;
      }
    }
  }

  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  const questionEnding = endsWithQuestion(body);
  if (questionEnding) state.questionEndingCount += 1;

  const newFacts = extractFactsFromMessage(body, state.facts, sequenceIndex);
  if (newFacts.length) {
    state.facts.push(...newFacts);
  }

  const personaKey = sender.email.toLowerCase();
  let personaBodies = state.usedBodiesByPersona.get(personaKey);
  if (!personaBodies) {
    personaBodies = new Set();
    state.usedBodiesByPersona.set(personaKey, personaBodies);
  }
  personaBodies.add(body);

  const record: GeneratedMessageRecord = {
    id: randomUUID(),
    threadId: state.thread.id,
    sequenceIndex,
    fromPersonaId: sender.id,
    toPersonaId: recipient.id,
    fromEmail: sender.email,
    toEmail: recipient.email,
    subject,
    bodyText: body,
    plannedLength: band,
    role: sequenceIndex === 0 ? "outbound" : "reply",
    meta: {
      ...sourceMeta,
      attempts,
      wordCount,
      noiseFlags,
      subjectStyle: style,
      validationReasons: lastReasons,
      allowLink,
      questionEnding,
      cached: false,
    },
  };

  state.slotCache.set(cacheKey, record);
  state.messages.push(record);
  state.thread.messageCount = state.messages.length;
  if (state.messages.length >= state.thread.plannedDepth) {
    state.thread.status = "completed";
  } else {
    state.thread.status = "in_progress";
  }

  return record;
}

/** Generate all messages for a planned thread (uses cache per slot). */
export async function generateThreadMessages(
  thread: PlannedThread,
  opts?: {
    rand?: () => number;
    sendTime?: Date;
    usedBodiesByPersona?: Map<string, Set<string>>;
  },
): Promise<ThreadGenerationState> {
  const state = createThreadGenerationState(thread, opts);
  for (let i = 0; i < thread.lengthArc.length; i++) {
    await generateMessageForSlot(state, i, { rand: opts?.rand });
  }
  return state;
}

export { detectLlmProvider };
