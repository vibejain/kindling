/**
 * Postgres client + persistence for planned threads and established_facts.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import type {
  EstablishedFact,
  LengthBand,
  Persona,
  PlannedThread,
  WritingFingerprint,
} from "../types/index.js";
import type {
  GeneratedMessageRecord,
  MessageMeta,
} from "../generator/types.js";
import { UNIVERSES } from "../universes/catalog.js";

const { Client } = pg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATION_PATH = join(__dirname, "../../migrations/001_init.sql");

export function databaseUrl(): string {
  return (
    process.env.DATABASE_URL ??
    "postgres://content_engine:content_engine@127.0.0.1:5432/content_engine"
  );
}

export async function createClient(url = databaseUrl()): Promise<pg.Client> {
  const client = new Client({ connectionString: url });
  await client.connect();
  return client;
}

export async function applyMigrations(client: pg.Client): Promise<void> {
  const sql = readFileSync(MIGRATION_PATH, "utf8");
  await client.query(sql);
}

export async function upsertUniverses(client: pg.Client): Promise<void> {
  for (const u of UNIVERSES) {
    await client.query(
      `INSERT INTO universes (id, label, locale, timezone, currency, has_gst, entities)
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)
       ON CONFLICT (id) DO UPDATE SET
         label = EXCLUDED.label,
         locale = EXCLUDED.locale,
         timezone = EXCLUDED.timezone,
         currency = EXCLUDED.currency,
         has_gst = EXCLUDED.has_gst,
         entities = EXCLUDED.entities`,
      [
        u.id,
        u.label,
        u.locale,
        u.timezone,
        u.currency,
        u.hasGst,
        JSON.stringify(u.entities),
      ],
    );
  }
}

export async function upsertPersonas(
  client: pg.Client,
  personas: Persona[],
): Promise<Map<string, string>> {
  /** email → uuid */
  const ids = new Map<string, string>();
  for (const p of personas) {
    const res = await client.query<{ id: string }>(
      `INSERT INTO personas (
         id, email, display_name, signature_name, role_title, company, industry,
         universe_id, fingerprint
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb)
       ON CONFLICT (email) DO UPDATE SET
         display_name = EXCLUDED.display_name,
         signature_name = EXCLUDED.signature_name,
         role_title = EXCLUDED.role_title,
         company = EXCLUDED.company,
         industry = EXCLUDED.industry,
         universe_id = EXCLUDED.universe_id,
         fingerprint = EXCLUDED.fingerprint,
         updated_at = now()
       RETURNING id`,
      [
        p.id,
        p.email,
        p.displayName,
        p.signatureName,
        p.roleTitle,
        p.company,
        p.industry,
        p.universeId,
        JSON.stringify(p.fingerprint),
      ],
    );
    ids.set(p.email.toLowerCase(), res.rows[0]!.id);
  }
  return ids;
}

export async function persistThreads(
  client: pg.Client,
  threads: PlannedThread[],
  personaIds: Map<string, string>,
): Promise<void> {
  await client.query("BEGIN");
  try {
    for (const t of threads) {
      const aId = personaIds.get(t.personaA.email.toLowerCase());
      const bId = personaIds.get(t.personaB.email.toLowerCase());
      if (!aId || !bId) {
        throw new Error(`Missing persona id for thread ${t.id}`);
      }

      await client.query(
        `INSERT INTO threads (
           id, premise, topic_domain, arc_template, length_arc, planned_depth,
           message_count, substance_level, universe_id, cross_universe,
           persona_a_id, persona_b_id, participants, emotional_register,
           open_questions, status
         ) VALUES (
           $1,$2,$3::topic_domain,$4::arc_template,$5,$6,$7,
           $8::substance_level,$9,$10,$11,$12,$13,$14::emotional_register,
           $15::jsonb,$16::thread_status
         )
         ON CONFLICT (id) DO NOTHING`,
        [
          t.id,
          t.premise,
          t.topicDomain,
          t.arcTemplate,
          t.lengthArc,
          t.plannedDepth,
          t.messageCount,
          t.substanceLevel,
          t.universeId,
          t.crossUniverse,
          aId,
          bId,
          t.participants,
          t.emotionalRegister,
          JSON.stringify(t.openQuestions),
          t.status,
        ],
      );

      for (const f of t.establishedFacts) {
        await client.query(
          `INSERT INTO established_facts (
             thread_id, fact_key, fact_value, source, introduced_at_depth
           ) VALUES ($1,$2,$3,$4,$5)
           ON CONFLICT (thread_id, fact_key) DO UPDATE SET
             fact_value = EXCLUDED.fact_value,
             source = EXCLUDED.source,
             introduced_at_depth = EXCLUDED.introduced_at_depth`,
          [
            t.id,
            f.factKey,
            f.factValue,
            f.source,
            f.introducedAtDepth,
          ],
        );
      }
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  }
}

export async function countEstablishedFacts(client: pg.Client): Promise<number> {
  const res = await client.query<{ n: string }>(
    "SELECT COUNT(*)::text AS n FROM established_facts",
  );
  return Number(res.rows[0]!.n);
}

export async function persistGeneratedMessage(
  client: pg.Client,
  msg: GeneratedMessageRecord,
): Promise<void> {
  await client.query(
    `INSERT INTO messages (
       id, thread_id, sequence_index, from_persona_id, to_persona_id,
       from_email, to_email, subject, body_text, planned_length, role, meta
     ) VALUES (
       $1,$2,$3,$4,$5,$6,$7,$8,$9,$10::length_band,$11::message_role,$12::jsonb
     )
     ON CONFLICT (thread_id, sequence_index) DO NOTHING`,
    [
      msg.id,
      msg.threadId,
      msg.sequenceIndex,
      msg.fromPersonaId,
      msg.toPersonaId,
      msg.fromEmail,
      msg.toEmail,
      msg.subject,
      msg.bodyText,
      msg.plannedLength,
      msg.role,
      JSON.stringify(msg.meta),
    ],
  );
}

export async function appendEstablishedFacts(
  client: pg.Client,
  threadId: string,
  facts: EstablishedFact[],
): Promise<void> {
  for (const f of facts) {
    await client.query(
      `INSERT INTO established_facts (
         thread_id, fact_key, fact_value, source, introduced_at_depth
       ) VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (thread_id, fact_key) DO UPDATE SET
         fact_value = EXCLUDED.fact_value,
         source = EXCLUDED.source,
         introduced_at_depth = EXCLUDED.introduced_at_depth`,
      [threadId, f.factKey, f.factValue, f.source, f.introducedAtDepth],
    );
  }
}

export async function updateThreadProgress(
  client: pg.Client,
  threadId: string,
  args: { messageCount: number; status: PlannedThread["status"] },
): Promise<void> {
  await client.query(
    `UPDATE threads
     SET message_count = $2,
         status = $3::thread_status,
         started_at = COALESCE(started_at, now()),
         completed_at = CASE WHEN $3 = 'completed' THEN now() ELSE completed_at END,
         updated_at = now()
     WHERE id = $1`,
    [threadId, args.messageCount, args.status],
  );
}

function personaFromRow(row: {
  id: string;
  email: string;
  display_name: string;
  signature_name: string;
  role_title: string;
  company: string;
  industry: string;
  universe_id: string;
  fingerprint: WritingFingerprint | string;
}): Persona {
  const fp =
    typeof row.fingerprint === "string"
      ? (JSON.parse(row.fingerprint) as WritingFingerprint)
      : row.fingerprint;
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    signatureName: row.signature_name,
    roleTitle: row.role_title,
    company: row.company,
    industry: row.industry,
    universeId: row.universe_id,
    fingerprint: fp,
  };
}

export interface ThreadBundle {
  thread: PlannedThread;
  facts: EstablishedFact[];
  messages: GeneratedMessageRecord[];
}

/** Load a thread with personas, facts, and existing messages (cache). */
export async function loadThreadBundle(
  client: pg.Client,
  threadId: string,
): Promise<ThreadBundle | null> {
  const tres = await client.query<{
    id: string;
    premise: string;
    topic_domain: PlannedThread["topicDomain"];
    arc_template: PlannedThread["arcTemplate"];
    length_arc: string[];
    planned_depth: number;
    message_count: number;
    substance_level: PlannedThread["substanceLevel"];
    universe_id: string;
    cross_universe: boolean;
    participants: string[];
    emotional_register: PlannedThread["emotionalRegister"];
    open_questions: unknown;
    status: PlannedThread["status"];
    persona_a_id: string;
    persona_b_id: string;
  }>("SELECT * FROM threads WHERE id = $1", [threadId]);

  if (!tres.rows.length) return null;
  const t = tres.rows[0]!;

  const personas = await client.query<{
    id: string;
    email: string;
    display_name: string;
    signature_name: string;
    role_title: string;
    company: string;
    industry: string;
    universe_id: string;
    fingerprint: WritingFingerprint;
  }>("SELECT * FROM personas WHERE id = ANY($1::uuid[])", [
    [t.persona_a_id, t.persona_b_id],
  ]);
  const byId = new Map(personas.rows.map((p) => [p.id, personaFromRow(p)]));
  const personaA = byId.get(t.persona_a_id);
  const personaB = byId.get(t.persona_b_id);
  if (!personaA || !personaB) {
    throw new Error(`Missing personas for thread ${threadId}`);
  }

  const factsRes = await client.query<{
    fact_key: string;
    fact_value: string;
    source: EstablishedFact["source"];
    introduced_at_depth: number | null;
  }>(
    `SELECT fact_key, fact_value, source, introduced_at_depth
     FROM established_facts WHERE thread_id = $1 ORDER BY created_at`,
    [threadId],
  );

  const msgsRes = await client.query<{
    id: string;
    thread_id: string;
    sequence_index: number;
    from_persona_id: string;
    to_persona_id: string;
    from_email: string;
    to_email: string;
    subject: string;
    body_text: string;
    planned_length: LengthBand;
    role: "outbound" | "reply";
    meta: MessageMeta | string;
  }>(
    `SELECT * FROM messages WHERE thread_id = $1 ORDER BY sequence_index`,
    [threadId],
  );

  const openQuestions = Array.isArray(t.open_questions)
    ? (t.open_questions as string[])
    : typeof t.open_questions === "string"
      ? (JSON.parse(t.open_questions) as string[])
      : [];

  const thread: PlannedThread = {
    id: t.id,
    premise: t.premise,
    topicDomain: t.topic_domain,
    arcTemplate: t.arc_template,
    lengthArc: t.length_arc as LengthBand[],
    plannedDepth: t.planned_depth,
    messageCount: t.message_count,
    substanceLevel: t.substance_level,
    universeId: t.universe_id,
    crossUniverse: t.cross_universe,
    personaA,
    personaB,
    participants: t.participants as [string, string],
    emotionalRegister: t.emotional_register,
    establishedFacts: factsRes.rows.map((f) => ({
      factKey: f.fact_key,
      factValue: f.fact_value,
      source: f.source,
      introducedAtDepth: f.introduced_at_depth,
    })),
    openQuestions,
    status: t.status,
  };

  const messages = msgsRes.rows.map((m) => {
    const meta =
      typeof m.meta === "string"
        ? (JSON.parse(m.meta) as MessageMeta)
        : m.meta;
    return {
      id: m.id,
      threadId: m.thread_id,
      sequenceIndex: m.sequence_index,
      fromPersonaId: m.from_persona_id,
      toPersonaId: m.to_persona_id,
      fromEmail: m.from_email,
      toEmail: m.to_email,
      subject: m.subject,
      bodyText: m.body_text,
      plannedLength: m.planned_length,
      role: m.role,
      meta,
    };
  });

  return {
    thread,
    facts: thread.establishedFacts,
    messages,
  };
}

export async function countMessages(client: pg.Client): Promise<number> {
  const res = await client.query<{ n: string }>(
    "SELECT COUNT(*)::text AS n FROM messages",
  );
  return Number(res.rows[0]!.n);
}

export async function listThreadIds(
  client: pg.Client,
  limit = 100,
): Promise<string[]> {
  const res = await client.query<{ id: string }>(
    `SELECT id FROM threads ORDER BY created_at LIMIT $1`,
    [limit],
  );
  return res.rows.map((r) => r.id);
}

/** Find open threads for an unordered email pair where the next speaker is `fromEmail`. */
export async function findOpenThreadForPair(
  client: pg.Client,
  fromEmail: string,
  toEmail: string,
): Promise<string | null> {
  const from = fromEmail.toLowerCase();
  const to = toEmail.toLowerCase();
  const res = await client.query<{
    id: string;
    message_count: number;
    planned_depth: number;
    persona_a_email: string;
    persona_b_email: string;
  }>(
    `SELECT t.id, t.message_count, t.planned_depth,
            pa.email AS persona_a_email, pb.email AS persona_b_email
     FROM threads t
     JOIN personas pa ON pa.id = t.persona_a_id
     JOIN personas pb ON pb.id = t.persona_b_id
     WHERE t.status IN ('planned', 'in_progress')
       AND t.message_count < t.planned_depth
       AND (
         (lower(pa.email) = $1 AND lower(pb.email) = $2)
         OR (lower(pa.email) = $2 AND lower(pb.email) = $1)
       )
     ORDER BY t.updated_at DESC NULLS LAST, t.created_at DESC`,
    [from, to],
  );

  for (const row of res.rows) {
    const nextIndex = row.message_count;
    const aFirst = true;
    const senderIsA = nextIndex % 2 === (aFirst ? 0 : 1);
    const nextEmail = (
      senderIsA ? row.persona_a_email : row.persona_b_email
    ).toLowerCase();
    if (nextEmail === from) {
      return row.id;
    }
  }
  return null;
}

export async function loadPersonaByEmail(
  client: pg.Client,
  email: string,
): Promise<Persona | null> {
  const res = await client.query<{
    id: string;
    email: string;
    display_name: string;
    signature_name: string;
    role_title: string;
    company: string;
    industry: string;
    universe_id: string;
    fingerprint: WritingFingerprint;
  }>("SELECT * FROM personas WHERE lower(email) = lower($1)", [email]);
  if (!res.rows.length) return null;
  return personaFromRow(res.rows[0]!);
}

