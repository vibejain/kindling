#!/usr/bin/env npx tsx
/** Verify persona seeds pass similarity checks and print distance matrix. */
import {
  seedPersonas,
  fingerprintDistance,
  MIN_FINGERPRINT_DISTANCE,
  findTooSimilarPairs,
  UNIVERSES,
} from "../src/index.js";

const personas = seedPersonas();
const bad = findTooSimilarPairs(personas);

console.log(`Seeded ${personas.length} personas. Min distance=${MIN_FINGERPRINT_DISTANCE}\n`);

for (const u of UNIVERSES) {
  const members = personas.filter((p) => p.universeId === u.id);
  console.log(
    `Universe ${u.id} (${u.timezone}, ${u.currency}${u.hasGst ? "+GST" : ""}):`,
  );
  for (const p of members) {
    console.log(
      `  ${p.displayName.padEnd(20)} <${p.email}> sig=${p.signatureName}`,
    );
  }
  console.log();
}

for (let i = 0; i < personas.length; i++) {
  for (let j = i + 1; j < personas.length; j++) {
    const d = fingerprintDistance(personas[i]!.fingerprint, personas[j]!.fingerprint);
    const flag = d < MIN_FINGERPRINT_DISTANCE ? " FAIL" : "";
    console.log(
      `${personas[i]!.email.padEnd(36)} ↔ ${personas[j]!.email.padEnd(36)} d=${d.toFixed(3)}${flag}`,
    );
  }
}

if (bad.length) {
  console.error("\nCollisions:", bad);
  process.exit(1);
}

console.log("\nAll pairs OK.");
