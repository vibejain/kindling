#!/usr/bin/env npx tsx
/**
 * Sample generation: ~200 LLM-free messages across the mesh, persist, print samples.
 *
 * Usage:
 *   npm run generate:sample
 *
 * Default path is fully offline (local compose + fallback bank).
 * Optional LLM only if CONTENT_ENGINE_USE_LLM=1 and a key is set.
 */
import {
  planThreads,
  seedPersonas,
  findTooSimilarPairs,
  validateCorpus,
  createClient,
  applyMigrations,
  upsertUniverses,
  upsertPersonas,
  persistThreads,
  persistGeneratedMessage,
  appendEstablishedFacts,
  updateThreadProgress,
  countEstablishedFacts,
  countMessages,
  databaseUrl,
  detectLlmProvider,
  generateThreadMessages,
  FALLBACK_BANK_COUNT,
  QUESTION_ENDING_CAP,
  LINK_RATE,
} from "../src/index.js";
import type { GeneratedMessageRecord, LengthBand } from "../src/index.js";

const TARGET_MESSAGES = 200;
const PLAN_SEED = 20260721;

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pct(n: number, total: number): string {
  if (!total) return "0%";
  return `${((n / total) * 100).toFixed(1)}%`;
}

function printMsg(m: GeneratedMessageRecord, idx: number): void {
  console.log("\n" + "-".repeat(72));
  console.log(
    `#${idx} [${m.plannedLength}] ${m.fromEmail} → ${m.toEmail}  source=${m.meta.source}` +
      (m.meta.provider ? `/${m.meta.provider}` : "") +
      `  words=${m.meta.wordCount}` +
      (m.meta.noiseFlags.length ? `  noise=${m.meta.noiseFlags.join(",")}` : ""),
  );
  console.log(`Subject: ${m.subject === "" ? "(empty)" : m.subject}`);
  console.log(m.bodyText);
  if (m.meta.validationReasons?.length) {
    console.log(`  (validation soft notes: ${m.meta.validationReasons.join("; ")})`);
  }
}

async function main(): Promise<void> {
  const llm = detectLlmProvider();
  const rand = mulberry32(PLAN_SEED + 7);

  console.log("=".repeat(72));
  console.log("CONTENT ENGINE - LLM-FREE SAMPLE GENERATION");
  console.log("=".repeat(72));
  console.log(`Fallback bank size: ${FALLBACK_BANK_COUNT}`);
  console.log(
    `LLM: ${llm.usable ? `opt-in via ${llm.provider}` : "disabled (local compose default)"}` +
      (llm.hasKey && !llm.usable ? " [key present but CONTENT_ENGINE_USE_LLM not set]" : ""),
  );
  console.log(`Target messages: ~${TARGET_MESSAGES}`);

  const personas = seedPersonas();
  const collisions = findTooSimilarPairs(personas);
  if (collisions.length) {
    console.error("FATAL: persona fingerprint collisions", collisions);
    process.exit(1);
  }

  let threads = planThreads({ count: 55, seed: PLAN_SEED, personas });
  validateCorpus(threads);

  let slotTotal = threads.reduce((s, t) => s + t.lengthArc.length, 0);
  while (slotTotal < TARGET_MESSAGES) {
    const extra = planThreads({
      count: 10,
      seed: PLAN_SEED + slotTotal,
      personas,
    });
    threads = threads.concat(extra);
    slotTotal = threads.reduce((s, t) => s + t.lengthArc.length, 0);
  }

  const selected = [];
  let plannedSlots = 0;
  for (const t of threads) {
    if (plannedSlots >= TARGET_MESSAGES) break;
    selected.push(t);
    plannedSlots += t.lengthArc.length;
  }

  console.log(
    `\nPlanned ${selected.length} threads covering ${plannedSlots} message slots.`,
  );

  const url = databaseUrl();
  console.log(`DATABASE_URL=${url.replace(/:[^:@/]+@/, ":***@")}`);

  const client = await createClient(url);
  const allMessages: GeneratedMessageRecord[] = [];
  const usedBodiesByPersona = new Map<string, Set<string>>();

  try {
    await applyMigrations(client);
    await upsertUniverses(client);
    const personaIds = await upsertPersonas(client, personas);

    await client.query("DELETE FROM messages");
    await client.query("DELETE FROM established_facts");
    await client.query("DELETE FROM threads");

    for (const t of selected) {
      const a = personaIds.get(t.personaA.email.toLowerCase());
      const b = personaIds.get(t.personaB.email.toLowerCase());
      if (!a || !b) throw new Error("Missing persona id after upsert");
      t.personaA = { ...t.personaA, id: a };
      t.personaB = { ...t.personaB, id: b };
    }

    await persistThreads(client, selected, personaIds);

    let generated = 0;
    for (const thread of selected) {
      if (generated >= TARGET_MESSAGES) break;
      const state = await generateThreadMessages(thread, {
        rand,
        usedBodiesByPersona,
      });
      const beforeKeys = new Set(
        thread.establishedFacts.map((f) => f.factKey),
      );

      for (const msg of state.messages) {
        if (generated >= TARGET_MESSAGES) break;
        await persistGeneratedMessage(client, msg);
        allMessages.push(msg);
        generated += 1;
      }

      const newFacts = state.facts.filter((f) => !beforeKeys.has(f.factKey));
      if (newFacts.length) {
        await appendEstablishedFacts(client, thread.id, newFacts);
      }
      await updateThreadProgress(client, thread.id, {
        messageCount: Math.min(state.messages.length, thread.plannedDepth),
        status:
          state.messages.length >= thread.plannedDepth
            ? "completed"
            : "in_progress",
      });
    }

    const factCount = await countEstablishedFacts(client);
    const msgCount = await countMessages(client);

    const byBand: Record<string, number> = {};
    const bySource: Record<string, number> = {};
    let questions = 0;
    let links = 0;
    let stubs = 0;
    let failedValidation = 0;
    for (const m of allMessages) {
      byBand[m.plannedLength] = (byBand[m.plannedLength] ?? 0) + 1;
      bySource[m.meta.source] = (bySource[m.meta.source] ?? 0) + 1;
      if (m.meta.questionEnding) questions += 1;
      if (/https?:\/\/|docs\.google\.com|github\.com/i.test(m.bodyText)) {
        links += 1;
      }
      if (m.bodyText.includes("[LLM_REQUIRED]") || m.meta.source === "stub") {
        stubs += 1;
      }
      if (m.meta.validationReasons?.length) failedValidation += 1;
    }

    console.log("\n" + "=".repeat(72));
    console.log("## Corpus stats");
    console.log("=".repeat(72));
    console.log(`Persisted messages: ${msgCount}`);
    console.log(`Established facts:  ${factCount}`);
    console.log("\nBy band:");
    for (const b of ["micro", "short", "medium", "long", "anchor"] as LengthBand[]) {
      console.log(`  ${b.padEnd(8)} ${String(byBand[b] ?? 0).padStart(4)}  (${pct(byBand[b] ?? 0, allMessages.length)})`);
    }
    console.log("\nBy source:");
    for (const [k, v] of Object.entries(bySource).sort()) {
      console.log(`  ${k.padEnd(10)} ${String(v).padStart(4)}  (${pct(v, allMessages.length)})`);
    }
    console.log(
      `\nQuestion-ending: ${questions}/${allMessages.length} (${pct(questions, allMessages.length)}; cap ${QUESTION_ENDING_CAP * 100}%)`,
    );
    console.log(
      `Links present:    ${links}/${allMessages.length} (${pct(links, allMessages.length)}; target ~${LINK_RATE * 100}%)`,
    );
    console.log(`LLM_REQUIRED / stub count: ${stubs} (must be 0)`);
    console.log(`Messages with validation notes: ${failedValidation}`);

    if (selected[0]) {
      const t0 = selected[0];
      const { createThreadGenerationState, generateMessageForSlot } =
        await import("../src/generator/generate.js");
      const st = createThreadGenerationState(t0, {
        existingMessages: allMessages.filter((m) => m.threadId === t0.id),
        rand,
        usedBodiesByPersona,
      });
      const replay = await generateMessageForSlot(st, 0, { rand });
      console.log(
        `\nCache check (slot 0 replay): cached=${replay.meta.cached === true ? "yes" : "no"}`,
      );
    }

    console.log("\n" + "=".repeat(72));
    console.log("## Representative samples (eyeball these)");
    console.log("=".repeat(72));

    const pickBand = (band: LengthBand, n: number) =>
      allMessages.filter((m) => m.plannedLength === band).slice(0, n);

    let i = 1;
    for (const band of ["micro", "short", "medium", "long", "anchor"] as LengthBand[]) {
      const n = band === "micro" || band === "short" ? 3 : band === "medium" ? 3 : 2;
      const samples = pickBand(band, n);
      if (!samples.length) {
        console.log(`\n### ${band.toUpperCase()} (none in corpus)`);
        continue;
      }
      console.log(`\n### ${band.toUpperCase()} (${samples.length} shown)`);
      for (const m of samples) {
        printMsg(m, i++);
      }
    }

    // Extra anchors / longs if available
    const moreAnchors = allMessages
      .filter((m) => m.plannedLength === "anchor")
      .slice(2, 4);
    const moreLongs = allMessages
      .filter((m) => m.plannedLength === "long")
      .slice(2, 4);
    if (moreAnchors.length || moreLongs.length) {
      console.log("\n### EXTRA ANCHOR / LONG");
      for (const m of [...moreLongs, ...moreAnchors]) printMsg(m, i++);
    }

    console.log("\n" + "=".repeat(72));
    console.log("## Cross-universe / noise samples");
    console.log("=".repeat(72));
    const noisy = allMessages.filter((m) => m.meta.noiseFlags.length > 0).slice(0, 5);
    for (const m of noisy) printMsg(m, i++);

    console.log("\n" + "=".repeat(72));
    if (stubs > 0) {
      console.error(`FAIL: ${stubs} stub/LLM_REQUIRED messages - local compose incomplete.`);
      process.exitCode = 1;
    } else {
      console.log("OK: 0 LLM_REQUIRED stubs. All bands produced by local engine.");
    }
    console.log(
      "STOP - please eyeball samples before wiring into live warmer sends.",
    );
    console.log(
      "Warmer hook: generateNextMessage(client, threadId) from @email-warmer/content-engine",
    );
    console.log("=".repeat(72));
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
