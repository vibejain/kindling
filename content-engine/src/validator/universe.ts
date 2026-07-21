/**
 * Hard-fail validators for planned threads.
 * Highest priority: entity names must never appear in more than one universe.
 */

import type { LengthBand, PlannedThread, TopicDomain } from "../types/index.js";
import {
  allowedBandsForTopic,
  LONG_ELIGIBLE_TOPICS,
  SHORT_MICRO_ONLY_TOPICS,
} from "../types/index.js";
import { UNIVERSES, allNamedEntities } from "../universes/catalog.js";

export class ValidationError extends Error {
  constructor(
    message: string,
    readonly code: string,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

const ABSOLUTE_ISO_DATE_RE = /\b20\d{2}-\d{2}-\d{2}\b/;
/** Month-name calendar dates like "26 Mar" / "Mar 26, 2026" - not weekday-only refs. */
const ABSOLUTE_NAMED_DATE_RE =
  /\b(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2}(?:,?\s*20\d{2})?|\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?(?:\s+20\d{2})?)\b/i;

const ID_LIKE_KEYS = /^(invoice|ticket|job|sow|msa|nda|po|exp|chg|fac|prop|ofr|wire|receipt|checklist)/i;
const ID_LIKE_VALUE = /\b(?:INV|TI|INC|CHG|FAC|JOB|SOW|MSA|NDA|PO|EXP|PROP|OFR|TKT|BRAND|TW|CQ|RH|MB)-[A-Z0-9-]+\b/i;
const DOLLAR_RE = /\$[\d,]+(?:\.\d+)?|\b\d+k\b/i;

/** Build entity → universe ownership map; hard-fail if any entity is claimed by 2+ universes. */
export function buildEntityUniverseMap(): Map<string, string> {
  const map = new Map<string, string>();
  const collisions: string[] = [];

  for (const u of UNIVERSES) {
    const names = [
      ...allNamedEntities(u),
      ...u.entities.invoiceSeries,
      ...u.entities.ticketSeries,
      ...u.entities.otherIds,
    ];
    for (const raw of names) {
      const key = normalizeEntity(raw);
      const existing = map.get(key);
      if (existing && existing !== u.id) {
        collisions.push(`"${raw}" in both ${existing} and ${u.id}`);
      } else {
        map.set(key, u.id);
      }
    }
  }

  if (collisions.length) {
    throw new ValidationError(
      `Universe catalog entity collision(s):\n  - ${collisions.join("\n  - ")}`,
      "CATALOG_ENTITY_COLLISION",
    );
  }
  return map;
}

function normalizeEntity(s: string): string {
  return s.trim().toLowerCase().replace(/-$/, "");
}

/** Prefer whole-token matches for multi-word names; avoid tiny substring collisions. */
function includesEntityToken(haystackLower: string, entityLower: string): boolean {
  if (entityLower.includes(" ")) {
    return haystackLower.includes(entityLower);
  }
  // Single-token named entities: require non-alnum boundaries
  const re = new RegExp(
    `(^|[^a-z0-9])${escapeRegExp(entityLower)}([^a-z0-9]|$)`,
    "i",
  );
  return re.test(haystackLower);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Scan thread text for named entities / ID prefixes belonging to other universes.
 * Cross-universe threads must be factless - any entity mention is a leak.
 */
export function validateNoEntityLeak(
  thread: PlannedThread,
  entityMap: Map<string, string> = buildEntityUniverseMap(),
): void {
  const corpus = collectThreadText(thread);
  const lower = corpus.toLowerCase();
  const leaks: string[] = [];

  for (const [entity, ownerUniverse] of entityMap) {
    if (entity.length < 4) continue;
    // Prefix-style IDs (inv-me) match only as "inv-me-" to avoid bare-token false positives
    const looksLikeIdPrefix = /^[a-z]{2,}-[a-z0-9]{1,}$/.test(entity);
    let hit = false;
    if (looksLikeIdPrefix) {
      const prefix = entity.endsWith("-") ? entity : `${entity}-`;
      hit = lower.includes(prefix);
    } else {
      hit = includesEntityToken(lower, entity);
    }
    if (!hit) continue;

    if (thread.crossUniverse) {
      leaks.push(`cross-universe thread mentions "${entity}" (owned by ${ownerUniverse})`);
    } else if (ownerUniverse !== thread.universeId) {
      leaks.push(
        `"${entity}" owned by ${ownerUniverse} appears in thread universe ${thread.universeId}`,
      );
    }
  }

  if (leaks.length) {
    throw new ValidationError(
      `Entity leak in thread ${thread.id}:\n  - ${leaks.join("\n  - ")}`,
      "ENTITY_LEAK",
    );
  }
}

function collectThreadText(thread: PlannedThread): string {
  const parts = [
    thread.premise,
    ...thread.openQuestions,
    ...thread.establishedFacts.map((f) => `${f.factKey} ${f.factValue}`),
  ];
  return parts.join("\n");
}

export function validateBandTopicJoint(thread: PlannedThread): void {
  const allowed = new Set(allowedBandsForTopic(thread.topicDomain));
  for (const band of thread.lengthArc) {
    if (!allowed.has(band)) {
      throw new ValidationError(
        `Band "${band}" not allowed for topic ${thread.topicDomain} ` +
          `(allowed: ${[...allowed].join(", ")}) in thread ${thread.id}`,
        "BAND_TOPIC_MISMATCH",
      );
    }
  }

  // Short/micro-only topics must never emit medium/long/anchor
  if (SHORT_MICRO_ONLY_TOPICS.has(thread.topicDomain)) {
    const bad = thread.lengthArc.filter((b) => b === "medium" || b === "long" || b === "anchor");
    if (bad.length) {
      throw new ValidationError(
        `Topic ${thread.topicDomain} is short/micro only; got ${bad.join(",")} in ${thread.id}`,
        "BAND_TOPIC_MISMATCH",
      );
    }
  }
}

export function validateArcSequence(thread: PlannedThread): void {
  const seq = thread.lengthArc;
  const depth = thread.plannedDepth;

  if (seq.length !== depth) {
    throw new ValidationError(
      `lengthArc length ${seq.length} ≠ plannedDepth ${depth} in ${thread.id}`,
      "ARC_DEPTH_MISMATCH",
    );
  }

  switch (thread.arcTemplate) {
    case "DECAY": {
      if (seq.length < 2) {
        throw new ValidationError(`DECAY needs depth≥2 in ${thread.id}`, "ARC_SHAPE");
      }
      const first = seq[0]!;
      if (first !== "anchor" && first !== "long") {
        throw new ValidationError(
          `DECAY must start with anchor|long, got ${first} in ${thread.id}`,
          "ARC_SHAPE",
        );
      }
      // Non-increasing overall: each step should not jump up by more than one band occasionally  - 
      // hard rule: first is heavy; later messages trend shorter or equal.
      const rank = bandRank;
      for (let i = 1; i < seq.length; i++) {
        if (rank(seq[i]!) > rank(seq[i - 1]!) + 0) {
          // allow equal; forbid increases
          if (rank(seq[i]!) > rank(seq[i - 1]!)) {
            throw new ValidationError(
              `DECAY sequence must not escalate (${seq.join("→")}) in ${thread.id}`,
              "ARC_SHAPE",
            );
          }
        }
      }
      break;
    }
    case "ESCALATION": {
      // micro → micro → short → [long|anchor] → medium → short (break = long|anchor)
      const breakIdx = seq.findIndex((b) => b === "long" || b === "anchor");
      if (breakIdx < 0) {
        throw new ValidationError(
          `ESCALATION must contain a long|anchor break message in ${thread.id}`,
          "ARC_SHAPE",
        );
      }
      if (seq[0] !== "micro") {
        throw new ValidationError(
          `ESCALATION must start with micro in ${thread.id}`,
          "ARC_SHAPE",
        );
      }
      break;
    }
    case "FLAT_CHATTER": {
      if (depth < 2 || depth > 5) {
        throw new ValidationError(
          `FLAT_CHATTER depth must be 2-5, got ${depth} in ${thread.id}`,
          "ARC_SHAPE",
        );
      }
      if (seq.some((b) => b !== "micro" && b !== "short")) {
        throw new ValidationError(
          `FLAT_CHATTER allows micro|short only (${seq.join("→")}) in ${thread.id}`,
          "ARC_SHAPE",
        );
      }
      break;
    }
    case "BURST": {
      if (depth < 2 || depth > 3) {
        throw new ValidationError(
          `BURST depth must be 2-3, got ${depth} in ${thread.id}`,
          "ARC_SHAPE",
        );
      }
      const head = seq.slice(0, 2);
      const ok =
        (head[0] === "anchor" && head[1] === "anchor") ||
        (head[0] === "anchor" && head[1] === "long");
      if (!ok) {
        throw new ValidationError(
          `BURST must be [anchor,anchor] or [anchor,long] then stop; got [${seq.join(",")}] in ${thread.id}`,
          "ARC_SHAPE",
        );
      }
      if (depth === 3 && seq[2] !== "micro" && seq[2] !== "short") {
        // Spec: terminate after 2; if depth 3, third should be a quick close only
        // Strict reading: depth 2-3 with first two being the burst pair - third optional micro
        if (seq[2] === "anchor" || seq[2] === "long" || seq[2] === "medium") {
          throw new ValidationError(
            `BURST third message must be micro|short if present in ${thread.id}`,
            "ARC_SHAPE",
          );
        }
      }
      break;
    }
  }
}

function bandRank(b: LengthBand): number {
  const order: LengthBand[] = ["micro", "short", "medium", "long", "anchor"];
  return order.indexOf(b);
}

export function validateSubstance(thread: PlannedThread): void {
  const facts = thread.establishedFacts;
  const n = facts.length;

  if (n > thread.plannedDepth) {
    throw new ValidationError(
      `facts.length (${n}) > depth (${thread.plannedDepth}) in ${thread.id}`,
      "FACTS_EXCEED_DEPTH",
    );
  }

  const idCount = facts.filter(
    (f) => ID_LIKE_KEYS.test(f.factKey) || ID_LIKE_VALUE.test(f.factValue),
  ).length;
  const hasDollar = facts.some((f) => DOLLAR_RE.test(f.factValue));
  const microOnly = thread.lengthArc.every((b) => b === "micro");

  if (microOnly) {
    const banned = facts.filter(
      (f) =>
        /ticket|invoice/i.test(f.factKey) ||
        /\b(?:INC|INV|TI)-/i.test(f.factValue),
    );
    if (banned.length) {
      throw new ValidationError(
        `Micro-only thread may not carry ticket/invoice IDs in ${thread.id}`,
        "MICRO_ID_BAN",
      );
    }
  }

  switch (thread.substanceLevel) {
    case "trivial": {
      if (thread.arcTemplate !== "FLAT_CHATTER") {
        throw new ValidationError(
          `trivial substance requires FLAT_CHATTER in ${thread.id}`,
          "SUBSTANCE_ARC",
        );
      }
      if (n > 1) {
        throw new ValidationError(
          `trivial allows 0-1 facts, got ${n} in ${thread.id}`,
          "SUBSTANCE_FACTS",
        );
      }
      if (idCount > 0 || hasDollar) {
        throw new ValidationError(
          `trivial forbids IDs and dollar figures in ${thread.id}`,
          "SUBSTANCE_FACTS",
        );
      }
      break;
    }
    case "routine": {
      if (n < 1 || n > 3) {
        throw new ValidationError(
          `routine allows 1-3 facts, got ${n} in ${thread.id}`,
          "SUBSTANCE_FACTS",
        );
      }
      if (idCount > 1) {
        throw new ValidationError(
          `routine allows at most one ID, got ${idCount} in ${thread.id}`,
          "SUBSTANCE_FACTS",
        );
      }
      break;
    }
    case "consequential": {
      if (n < 4 || n > 8) {
        throw new ValidationError(
          `consequential allows 4-8 facts, got ${n} in ${thread.id}`,
          "SUBSTANCE_FACTS",
        );
      }
      break;
    }
  }
}

export function validateDateOffsets(thread: PlannedThread): void {
  const corpus = collectThreadText(thread);
  if (ABSOLUTE_ISO_DATE_RE.test(corpus)) {
    throw new ValidationError(
      `Absolute ISO date found in thread ${thread.id}; use offset_days:N`,
      "ABSOLUTE_DATE",
    );
  }
  if (ABSOLUTE_NAMED_DATE_RE.test(corpus)) {
    throw new ValidationError(
      `Absolute calendar date string found in thread ${thread.id}; store offsets instead`,
      "ABSOLUTE_DATE",
    );
  }

  for (const f of thread.establishedFacts) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(f.factValue)) {
      throw new ValidationError(
        `Fact ${f.factKey} has absolute date ${f.factValue} in ${thread.id}`,
        "ABSOLUTE_DATE",
      );
    }
  }
}

export function validateUniverseParticipants(thread: PlannedThread): void {
  const a = thread.personaA.universeId;
  const b = thread.personaB.universeId;
  if (thread.crossUniverse) {
    if (a === b) {
      throw new ValidationError(
        `crossUniverse=true but both personas in ${a} (${thread.id})`,
        "CROSS_UNIVERSE_FLAG",
      );
    }
  } else if (a !== b) {
    throw new ValidationError(
      `Intra-universe thread has personas from ${a} and ${b} (${thread.id})`,
      "UNIVERSE_MISMATCH",
    );
  } else if (thread.universeId !== a) {
    throw new ValidationError(
      `thread.universeId ${thread.universeId} ≠ persona universe ${a} (${thread.id})`,
      "UNIVERSE_MISMATCH",
    );
  }
}

export function validateTopicLongEligibility(topic: TopicDomain, bands: LengthBand[]): void {
  const needsLong = bands.some((b) => b === "long" || b === "anchor" || b === "medium");
  if (needsLong && !LONG_ELIGIBLE_TOPICS.has(topic) && SHORT_MICRO_ONLY_TOPICS.has(topic)) {
    throw new ValidationError(
      `Topic ${topic} cannot use bands ${bands.join(",")}`,
      "BAND_TOPIC_MISMATCH",
    );
  }
}

/** Run all hard validators; throws ValidationError on first failure. */
export function validateThread(
  thread: PlannedThread,
  entityMap?: Map<string, string>,
): void {
  validateUniverseParticipants(thread);
  validateBandTopicJoint(thread);
  validateArcSequence(thread);
  validateSubstance(thread);
  validateDateOffsets(thread);
  validateNoEntityLeak(thread, entityMap ?? buildEntityUniverseMap());
}

export function validateCorpus(threads: PlannedThread[]): void {
  const entityMap = buildEntityUniverseMap();
  for (const t of threads) {
    validateThread(t, entityMap);
  }
}

/** Entity → list of universes it appears in across a planned corpus (for reporting). */
export function entityUniverseAppearanceMap(
  threads: PlannedThread[],
): Map<string, Set<string>> {
  const entityMap = buildEntityUniverseMap();
  const appearance = new Map<string, Set<string>>();

  // Seed with catalog ownership
  for (const [entity, univ] of entityMap) {
    appearance.set(entity, new Set([univ]));
  }

  for (const t of threads) {
    if (t.crossUniverse) continue; // factless - should not mention entities
    const text = collectThreadText(t).toLowerCase();
    for (const [entity, owner] of entityMap) {
      if (entity.length < 4) continue;
      const looksLikeIdPrefix = /^[a-z]{2,}-[a-z0-9]{1,}$/.test(entity);
      const hit = looksLikeIdPrefix
        ? text.includes(`${entity}-`) || text.includes(`${entity} `)
        : includesEntityToken(text, entity);
      if (!hit) continue;
      const set = appearance.get(entity) ?? new Set([owner]);
      set.add(t.universeId);
      appearance.set(entity, set);
    }
  }

  return appearance;
}
