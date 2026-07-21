#!/usr/bin/env npx tsx
/** Apply migrations/001_init.sql and seed universes. */
import {
  createClient,
  applyMigrations,
  upsertUniverses,
  databaseUrl,
} from "../src/index.js";

async function main(): Promise<void> {
  const url = databaseUrl();
  console.log(`Connecting to ${url.replace(/:[^:@/]+@/, ":***@")}`);
  const client = await createClient(url);
  try {
    await applyMigrations(client);
    await upsertUniverses(client);
    console.log("Migrations applied; universes upserted.");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
