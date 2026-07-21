/**
 * Public API: generateNextMessage(threadId) for warmer integration later.
 */
import type pg from "pg";
import {
  loadThreadBundle,
  persistGeneratedMessage,
  appendEstablishedFacts,
  updateThreadProgress,
} from "../db/persist.js";
import {
  createThreadGenerationState,
  generateMessageForSlot,
} from "./generate.js";
import type { GeneratedMessageRecord } from "./types.js";

/**
 * Generate the next message for a persisted thread.
 * Returns the cached row if (thread_id, sequence_index) already exists.
 *
 * Warmer integration sketch:
 *   const msg = await generateNextMessage(client, threadId);
 *   // send msg.bodyText via existing SMTP adapter; do not regenerate on retry
 */
export async function generateNextMessage(
  client: pg.Client,
  threadId: string,
  opts?: { rand?: () => number },
): Promise<GeneratedMessageRecord> {
  const bundle = await loadThreadBundle(client, threadId);
  if (!bundle) {
    throw new Error(`Thread not found: ${threadId}`);
  }

  const nextIndex = bundle.messages.length;
  if (nextIndex >= bundle.thread.plannedDepth) {
    // Already complete - return last cached message
    const last = bundle.messages[bundle.messages.length - 1];
    if (!last) throw new Error(`Thread ${threadId} has no messages and depth=0`);
    return { ...last, meta: { ...last.meta, cached: true } };
  }

  // Cache hit for exact next slot
  const existing = bundle.messages.find((m) => m.sequenceIndex === nextIndex);
  if (existing) {
    return { ...existing, meta: { ...existing.meta, cached: true } };
  }

  const state = createThreadGenerationState(bundle.thread, {
    existingMessages: bundle.messages,
    rand: opts?.rand,
  });
  // Prefer DB facts over planner copy
  state.facts = [...bundle.facts];

  const beforeFactKeys = new Set(state.facts.map((f) => f.factKey));
  const msg = await generateMessageForSlot(state, nextIndex, { rand: opts?.rand });

  // If generateMessageForSlot returned a cache from in-memory that was already in DB
  if (msg.meta.cached && bundle.messages.some((m) => m.sequenceIndex === nextIndex)) {
    return msg;
  }

  await persistGeneratedMessage(client, msg);
  const newFacts = state.facts.filter((f) => !beforeFactKeys.has(f.factKey));
  if (newFacts.length) {
    await appendEstablishedFacts(client, threadId, newFacts);
  }
  await updateThreadProgress(client, threadId, {
    messageCount: nextIndex + 1,
    status:
      nextIndex + 1 >= bundle.thread.plannedDepth ? "completed" : "in_progress",
  });

  return msg;
}
