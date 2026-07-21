#!/usr/bin/env npx tsx
/**
 * Plan 40 sample threads, validate universe partitions, persist to Postgres.
 */
import {
  planThreads,
  seedPersonas,
  findTooSimilarPairs,
  summarizeCorpus,
  CORPUS_TARGETS,
  MIN_FINGERPRINT_DISTANCE,
  UNIVERSES,
  buildEntityUniverseMap,
  entityUniverseAppearanceMap,
  validateCorpus,
  createClient,
  applyMigrations,
  upsertUniverses,
  upsertPersonas,
  persistThreads,
  countEstablishedFacts,
  databaseUrl,
} from "../src/index.js";

function pct(n: number, total: number): string {
  if (total === 0) return "0%";
  return `${((n / total) * 100).toFixed(0)}%`;
}

function printHist(title: string, hist: Record<string, number>, total?: number): void {
  console.log(title);
  const entries = Object.entries(hist).sort(([a], [b]) => a.localeCompare(b));
  const sum = total ?? entries.reduce((s, [, v]) => s + v, 0);
  for (const [k, v] of entries) {
    console.log(`  ${k.padEnd(16)} ${String(v).padStart(3)}  (${pct(v, sum)})`);
  }
}

async function main(): Promise<void> {
  const personas = seedPersonas();
  const collisions = findTooSimilarPairs(personas);
  if (collisions.length) {
    console.error("FATAL: persona fingerprint collisions", collisions);
    process.exit(1);
  }

  // Catalog entity exclusivity
  try {
    buildEntityUniverseMap();
  } catch (err) {
    console.error("FATAL: universe catalog collision", err);
    process.exit(1);
  }

  console.log("=".repeat(72));
  console.log("CONTENT ENGINE - PHASE 1 SAMPLE: 40 PLANNED THREADS");
  console.log("=".repeat(72));

  console.log("\n## Universes\n");
  for (const u of UNIVERSES) {
    const members = personas.filter((p) => p.universeId === u.id);
    console.log(
      `- ${u.id} - ${u.label} | ${u.timezone} | ${u.currency}` +
        `${u.hasGst ? " +GST" : " (no GST)"}`,
    );
    for (const p of members) {
      const sig =
        p.displayName !== p.signatureName
          ? ` [From: ${p.displayName} / sig: ${p.signatureName}]`
          : "";
      console.log(
        `    • ${p.displayName} <${p.email}> - ${p.roleTitle} @ ${p.company}${sig}`,
      );
    }
  }
  console.log(
    `\nMin pairwise fingerprint distance required: ${MIN_FINGERPRINT_DISTANCE}`,
  );

  let validatorFailures: string[] = [];
  let threads;
  try {
    threads = planThreads({ count: 40, seed: 20260721, personas });
  } catch (err) {
    console.error("FATAL during planning:", err);
    process.exit(1);
  }

  try {
    validateCorpus(threads);
  } catch (err) {
    validatorFailures.push(String(err));
    console.error("Validator failures after plan:", err);
    process.exit(1);
  }

  const summary = summarizeCorpus(threads);

  console.log("\n## Global corpus mix\n");
  printHist("Arcs:", summary.arcs, threads.length);
  console.log(
    `(targets: DECAY ~${CORPUS_TARGETS.arcs.DECAY * 100}%, ESCALATION ~${CORPUS_TARGETS.arcs.ESCALATION * 100}%, FLAT_CHATTER ~${CORPUS_TARGETS.arcs.FLAT_CHATTER * 100}%, BURST ~${CORPUS_TARGETS.arcs.BURST * 100}%)`,
  );
  printHist("Substance:", summary.substance, threads.length);
  console.log(
    `(targets: trivial ~${CORPUS_TARGETS.substance.trivial * 100}%, routine ~${CORPUS_TARGETS.substance.routine * 100}%, consequential ~${CORPUS_TARGETS.substance.consequential * 100}%)`,
  );
  printHist("Bands (derived from length_arc message slots):", summary.bands);
  console.log(`Cross-universe threads: ${summary.crossUniverse} / ${threads.length} (max ~${CORPUS_TARGETS.crossUniverseMax * 100}%)`);

  console.log("\n" + "=".repeat(72));
  console.log("## Per-universe histograms");
  console.log("=".repeat(72));

  for (const u of UNIVERSES) {
    const bucket = summary.byUniverse[u.id]!;
    console.log(`\n### ${u.id} (${u.label}) - ${bucket.count} threads`);
    printHist("  band histogram (derived):", bucket.bands);
    printHist("  arc histogram:", bucket.arcs, bucket.count || 1);
    printHist("  substance_level:", bucket.substance, bucket.count || 1);
  }

  const cross = summary.byUniverse["__cross_universe__"]!;
  console.log(`\n### __cross_universe__ - ${cross.count} threads (generic / factless)`);
  printHist("  band histogram (derived):", cross.bands);
  printHist("  arc histogram:", cross.arcs, cross.count || 1);
  printHist("  substance_level:", cross.substance, cross.count || 1);

  // Entity → universe map
  console.log("\n" + "=".repeat(72));
  console.log("## Entity → universe map (catalog + corpus appearances)");
  console.log("=".repeat(72));
  const appearance = entityUniverseAppearanceMap(threads);
  let leakCount = 0;
  const rows: Array<{ entity: string; universes: string[] }> = [];
  for (const [entity, set] of appearance) {
    const univs = [...set].sort();
    rows.push({ entity, universes: univs });
    if (univs.length > 1) leakCount += 1;
  }
  rows.sort((a, b) => a.entity.localeCompare(b.entity));
  for (const r of rows) {
    const flag = r.universes.length > 1 ? " ** LEAK **" : "";
    console.log(`  ${r.entity.padEnd(28)} → ${r.universes.join(", ")}${flag}`);
  }
  console.log(
    `\nCross-universe entity leaks: ${leakCount} (validator requires 0)`,
  );

  // Persist to Postgres
  console.log("\n" + "=".repeat(72));
  console.log("## Postgres persistence");
  console.log("=".repeat(72));
  const url = databaseUrl();
  console.log(`DATABASE_URL=${url.replace(/:[^:@/]+@/, ":***@")}`);

  const client = await createClient(url);
  try {
    await applyMigrations(client);
    console.log("Migrations applied (001_init.sql).");
    await upsertUniverses(client);
    const personaIds = await upsertPersonas(client, personas);
    // Clear prior sample threads for idempotent re-runs
    await client.query("DELETE FROM threads");
    await persistThreads(client, threads, personaIds);
    const factCount = await countEstablishedFacts(client);
    const threadCount = await client.query<{ n: string }>(
      "SELECT COUNT(*)::text AS n FROM threads",
    );
    console.log(
      `Persisted ${threadCount.rows[0]!.n} threads and ${factCount} established_facts rows.`,
    );
  } finally {
    await client.end();
  }

  console.log("\n" + "=".repeat(72));
  console.log("## Planned threads (summary lines)");
  console.log("=".repeat(72));
  threads.forEach((t, i) => {
    const cross = t.crossUniverse ? " CROSS" : "";
    console.log(
      `\n${String(i + 1).padStart(2, "0")}. [${t.universeId}${cross}] ${t.topicDomain} ` +
        `arc=${t.arcTemplate} substance=${t.substanceLevel} depth=${t.plannedDepth}`,
    );
    console.log(
      `    ${t.personaA.displayName} ↔ ${t.personaB.displayName}`,
    );
    console.log(`    length_arc: [${t.lengthArc.join(" → ")}]`);
    console.log(`    premise: ${t.premise.slice(0, 140)}${t.premise.length > 140 ? "…" : ""}`);
    console.log(
      `    facts(${t.establishedFacts.length}): ${t.establishedFacts.map((f) => f.factKey).join(", ") || "(none)"}`,
    );
  });

  console.log(`\n${"=".repeat(72)}`);
  console.log(`Done. ${threads.length} threads planned + persisted. STOP - no message generation.`);
  if (validatorFailures.length) {
    console.log("Validator failures during development:", validatorFailures);
  } else {
    console.log("Validator: no entity leaks; corpus passed hard checks.");
  }
  console.log("=".repeat(72));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
