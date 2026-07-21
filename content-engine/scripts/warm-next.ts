#!/usr/bin/env npx tsx
/**
 * Warmer CLI: next subject+body for a from→to pair.
 * Prints one JSON object to stdout (errors → stderr + exit 1).
 *
 * Usage:
 *   npx tsx scripts/warm-next.ts --from a@x.com --to b@y.com
 *   npx tsx scripts/warm-next.ts --seed-personas
 */
import {
  seedPersonas,
  getPersonaByEmail,
  createClient,
  applyMigrations,
  upsertUniverses,
  upsertPersonas,
  persistThreads,
  findOpenThreadForPair,
  loadPersonaByEmail,
  generateNextMessage,
  planThreadForPair,
  databaseUrl,
} from "../src/index.js";

function argValue(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  if (i < 0) return undefined;
  return process.argv[i + 1];
}

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}

async function seedAll(client: Awaited<ReturnType<typeof createClient>>) {
  await applyMigrations(client);
  await upsertUniverses(client);
  const personas = seedPersonas();
  const ids = await upsertPersonas(client, personas);
  return { personas, ids };
}

async function main(): Promise<void> {
  if (hasFlag("--seed-personas")) {
    const client = await createClient();
    try {
      const { personas } = await seedAll(client);
      console.log(
        JSON.stringify({
          ok: true,
          seeded: personas.length,
          database: databaseUrl().replace(/:[^:@/]+@/, ":***@"),
          emails: personas.map((p) => p.email),
        }),
      );
    } finally {
      await client.end();
    }
    return;
  }

  const fromEmail = argValue("--from");
  const toEmail = argValue("--to");
  if (!fromEmail || !toEmail) {
    console.error("Usage: warm-next.ts --from <email> --to <email>");
    process.exit(2);
  }
  if (fromEmail.toLowerCase() === toEmail.toLowerCase()) {
    console.error("from and to must differ");
    process.exit(2);
  }

  const client = await createClient();
  try {
    const { personas, ids } = await seedAll(client);

    let fromPersona = await loadPersonaByEmail(client, fromEmail);
    let toPersona = await loadPersonaByEmail(client, toEmail);
    if (!fromPersona || !toPersona) {
      try {
        fromPersona = fromPersona ?? getPersonaByEmail(personas, fromEmail);
        toPersona = toPersona ?? getPersonaByEmail(personas, toEmail);
      } catch (err) {
        console.error(
          JSON.stringify({
            ok: false,
            error: `Unknown persona email(s): ${fromEmail} / ${toEmail}`,
            detail: String(err),
          }),
        );
        process.exit(1);
      }
      fromPersona = (await loadPersonaByEmail(client, fromEmail))!;
      toPersona = (await loadPersonaByEmail(client, toEmail))!;
    }

    let threadId = await findOpenThreadForPair(client, fromEmail, toEmail);
    if (!threadId) {
      // New thread: from speaks first → personaA = from
      const planned = planThreadForPair(fromPersona, toPersona);
      const withIds = {
        ...planned,
        personaA: fromPersona,
        personaB: toPersona,
        participants: [fromPersona.email, toPersona.email] as [string, string],
      };
      await persistThreads(client, [withIds], ids);
      threadId = withIds.id;
    }

    const msg = await generateNextMessage(client, threadId);
    if (msg.fromEmail.toLowerCase() !== fromEmail.toLowerCase()) {
      console.error(
        JSON.stringify({
          ok: false,
          error: "speaker_mismatch",
          expected_from: fromEmail,
          got_from: msg.fromEmail,
          thread_id: threadId,
        }),
      );
      process.exit(1);
    }

    console.log(
      JSON.stringify({
        ok: true,
        subject: msg.subject,
        body: msg.bodyText,
        thread_id: msg.threadId,
        message_id: msg.id,
        sequence_index: msg.sequenceIndex,
        from_email: msg.fromEmail,
        to_email: msg.toEmail,
        planned_length: msg.plannedLength,
        source: msg.meta.source,
        word_count: msg.meta.wordCount,
        cached: Boolean(msg.meta.cached),
      }),
    );
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(JSON.stringify({ ok: false, error: String(err) }));
  process.exit(1);
});
