import { randomUUID } from "node:crypto";
import type { Persona, WritingFingerprint } from "../types/index.js";
import { UNIVERSES } from "../universes/catalog.js";

/**
 * Example mesh mailboxes → 5 universes (≥2 each). Replace emails with yours before seeding.
 * Names intentionally messy: mixed origins, initials, hyphenated, nickname≠signature.
 * No more than 4 share a name register (Western full / East Asian / South Asian / initials / hyphenated).
 */
const MAILBOX_SEEDS: Array<{
  email: string;
  displayName: string;
  signatureName: string;
  roleTitle: string;
  company: string;
  industry: string;
  universeId: string;
  /** Name-register bucket for diversity check */
  nameRegister: "western_full" | "east_asian" | "south_asian" | "initials" | "hyphenated";
  fingerprint: WritingFingerprint;
}> = [
  // --- meridian_east (US Eastern, USD) ---
  {
    email: "sophia@meridian.example",
    displayName: "Sophie",
    signatureName: "Sophia Kimura",
    roleTitle: "Client Success Lead",
    company: "Meridian Ops",
    industry: "saas_ops",
    universeId: "meridian_east",
    nameRegister: "east_asian",
    fingerprint: {
      avg_sentence_len: "medium",
      formality: "business_casual",
      greeting_style: "hi_name",
      signoff_style: "talk_soon",
      punctuation: "normal",
      typo_rate: "none",
      emoji_use: "light",
      structure: "short_paragraphs",
      hedges: "light",
      directness: "soft",
      time_refs: "mixed",
      attachment_mentions: "normal",
      quirks: [
        "From shows Sophie; signs as Sophia Kimura",
        "mirrors client's urgency without escalating tone",
        "lists next steps in prose, not bullets",
      ],
    },
  },
  {
    email: "rachel@meridian.example",
    displayName: "R. Okonkwo",
    signatureName: "Rachel Okonkwo",
    roleTitle: "Finance / Billing",
    company: "Meridian Ops",
    industry: "saas_finance",
    universeId: "meridian_east",
    nameRegister: "initials",
    fingerprint: {
      avg_sentence_len: "short",
      formality: "formal",
      greeting_style: "hello",
      signoff_style: "regards",
      punctuation: "normal",
      typo_rate: "none",
      emoji_use: "never",
      structure: "bullets_ok",
      hedges: "none",
      directness: "blunt",
      time_refs: "absolute",
      attachment_mentions: "frequent",
      quirks: [
        "From line is initials-only (R. Okonkwo)",
        "leads with invoice/PO numbers",
        "states amounts with USD and due offsets",
      ],
    },
  },
  {
    email: "mia@meridian.example",
    displayName: "Mia Chen",
    signatureName: "Mia Chen",
    roleTitle: "Support / Onboarding",
    company: "Meridian Ops",
    industry: "saas_support",
    universeId: "meridian_east",
    nameRegister: "east_asian",
    fingerprint: {
      avg_sentence_len: "medium",
      formality: "business_casual",
      greeting_style: "hi_name",
      signoff_style: "thanks",
      punctuation: "normal",
      typo_rate: "rare",
      emoji_use: "light",
      structure: "numbered_ok",
      hedges: "light",
      directness: "soft",
      time_refs: "relative",
      attachment_mentions: "normal",
      quirks: [
        "numbers onboarding steps 1) 2) 3)",
        "asks one clarifying question before closing",
        "mentions timezone when proposing times",
      ],
    },
  },

  // --- pinecrest_west (US Pacific, USD) ---
  {
    email: "emily@pinecrest.example",
    displayName: "Emily Brooks",
    signatureName: "Emily Brooks",
    roleTitle: "Studio Producer",
    company: "Pinecrest Studio",
    industry: "architecture_design",
    universeId: "pinecrest_west",
    nameRegister: "western_full",
    fingerprint: {
      avg_sentence_len: "long",
      formality: "formal",
      greeting_style: "hello",
      signoff_style: "best",
      punctuation: "normal",
      typo_rate: "none",
      emoji_use: "never",
      structure: "short_paragraphs",
      hedges: "frequent",
      directness: "soft",
      time_refs: "absolute",
      attachment_mentions: "frequent",
      quirks: [
        "names file versions precisely",
        "references consultants by firm name",
        "prefers calendar offsets over vague 'next week'",
      ],
    },
  },
  {
    email: "natalie@pinecrest.example",
    displayName: "Nat Ruiz",
    signatureName: "Natalie Ruiz",
    roleTitle: "Project Architect",
    company: "Pinecrest Studio",
    industry: "architecture_design",
    universeId: "pinecrest_west",
    nameRegister: "western_full",
    fingerprint: {
      avg_sentence_len: "medium",
      formality: "business_casual",
      greeting_style: "hi_name",
      signoff_style: "thanks",
      punctuation: "exclaim_ok",
      typo_rate: "rare",
      emoji_use: "rare",
      structure: "numbered_ok",
      hedges: "light",
      directness: "balanced",
      time_refs: "mixed",
      attachment_mentions: "normal",
      quirks: [
        "numbers open issues 1) 2) 3)",
        "occasional light exclamation on good news",
        "references drawing sheets casually",
      ],
    },
  },
  {
    email: "harper@pinecrest.example",
    displayName: "Harper Wells",
    signatureName: "Harper Wells",
    roleTitle: "Design Coordinator",
    company: "Pinecrest Studio",
    industry: "architecture_ops",
    universeId: "pinecrest_west",
    nameRegister: "western_full",
    fingerprint: {
      avg_sentence_len: "short",
      formality: "casual",
      greeting_style: "hey",
      signoff_style: "talk_soon",
      punctuation: "light",
      typo_rate: "rare",
      emoji_use: "rare",
      structure: "one_block",
      hedges: "none",
      directness: "blunt",
      time_refs: "relative",
      attachment_mentions: "normal",
      quirks: [
        "leads with deliverable name then status",
        "uses relative days (Fri / next Tue)",
        "skips greetings when thread is hot",
      ],
    },
  },
  {
    email: "avery@pinecrest.example",
    displayName: "A. Singh",
    signatureName: "Avery Singh",
    roleTitle: "Spec Writer",
    company: "Pinecrest Studio",
    industry: "architecture_docs",
    universeId: "pinecrest_west",
    nameRegister: "initials",
    fingerprint: {
      avg_sentence_len: "telegraphic",
      formality: "casual",
      greeting_style: "none",
      signoff_style: "thanks",
      punctuation: "light",
      typo_rate: "occasional",
      emoji_use: "never",
      structure: "bullets_ok",
      hedges: "none",
      directness: "blunt",
      time_refs: "relative",
      attachment_mentions: "rare",
      quirks: [
        "From shows A. Singh; signs Avery Singh",
        "drops articles; leads with sheet/section IDs",
        "bullet lists for open spec items",
      ],
    },
  },

  // --- harbour_sydney (AU Sydney, AUD+GST) ---
  {
    email: "vaibhav@harbour.example",
    displayName: "Vaibhav Jain",
    signatureName: "Vaibhav Jain",
    roleTitle: "Director",
    company: "DGC Australia",
    industry: "construction_consulting",
    universeId: "harbour_sydney",
    nameRegister: "south_asian",
    fingerprint: {
      avg_sentence_len: "medium",
      formality: "business_casual",
      greeting_style: "hi_name",
      signoff_style: "thanks",
      punctuation: "normal",
      typo_rate: "rare",
      emoji_use: "never",
      structure: "short_paragraphs",
      hedges: "light",
      directness: "balanced",
      time_refs: "absolute",
      attachment_mentions: "normal",
      quirks: [
        "references site/job codes casually",
        "asks one concrete clarifying question per reply",
        "mentions AEST when scheduling",
      ],
    },
  },
  {
    email: "sajal@harbour.example",
    displayName: "Sajal M.",
    signatureName: "Sajal Mehta",
    roleTitle: "Site IT / Comms",
    company: "DGC Australia",
    industry: "construction_it",
    universeId: "harbour_sydney",
    nameRegister: "south_asian",
    fingerprint: {
      avg_sentence_len: "short",
      formality: "casual",
      greeting_style: "hey",
      signoff_style: "thanks",
      punctuation: "light",
      typo_rate: "rare",
      emoji_use: "never",
      structure: "bullets_ok",
      hedges: "none",
      directness: "blunt",
      time_refs: "relative",
      attachment_mentions: "rare",
      quirks: [
        "leads with ticket IDs",
        "pastes short repro steps",
        "asks for OS/device only when needed",
      ],
    },
  },

  // --- weedo_mel (AU Melbourne, AUD+GST) ---
  {
    email: "dev@weedo.example",
    displayName: "Dev",
    signatureName: "Dev Patel",
    roleTitle: "Founder / Product",
    company: "Weedo Digital",
    industry: "digital_agency",
    universeId: "weedo_mel",
    nameRegister: "south_asian",
    fingerprint: {
      avg_sentence_len: "short",
      formality: "casual",
      greeting_style: "hey",
      signoff_style: "cheers",
      punctuation: "light",
      typo_rate: "occasional",
      emoji_use: "rare",
      structure: "one_block",
      hedges: "none",
      directness: "blunt",
      time_refs: "relative",
      attachment_mentions: "rare",
      quirks: [
        "From shows Dev; signs Dev Patel",
        "starts mid-thought without restating context",
        "drops articles ('need that PDF by Fri')",
      ],
    },
  },
  {
    email: "olivia@weedo.example",
    displayName: "Olivia Hart-Nguyen",
    signatureName: "Olivia Hart-Nguyen",
    roleTitle: "People / Recruiting",
    company: "Weedo Digital",
    industry: "agency_hr",
    universeId: "weedo_mel",
    nameRegister: "hyphenated",
    fingerprint: {
      avg_sentence_len: "medium",
      formality: "business_casual",
      greeting_style: "hi_name",
      signoff_style: "best",
      punctuation: "normal",
      typo_rate: "none",
      emoji_use: "light",
      structure: "short_paragraphs",
      hedges: "light",
      directness: "soft",
      time_refs: "absolute",
      attachment_mentions: "normal",
      quirks: [
        "hyphenated surname always written out",
        "names candidates by first name + role only",
        "offers two time slots instead of open-ended",
      ],
    },
  },
  {
    email: "chloe@weedo.example",
    displayName: "Chloe Park-Lee",
    signatureName: "Chloe Park-Lee",
    roleTitle: "Account Manager",
    company: "Weedo Digital",
    industry: "agency_account",
    universeId: "weedo_mel",
    nameRegister: "hyphenated",
    fingerprint: {
      avg_sentence_len: "medium",
      formality: "business_casual",
      greeting_style: "hi_name",
      signoff_style: "cheers",
      punctuation: "exclaim_ok",
      typo_rate: "none",
      emoji_use: "light",
      structure: "short_paragraphs",
      hedges: "light",
      directness: "balanced",
      time_refs: "mixed",
      attachment_mentions: "rare",
      quirks: [
        "hyphenated surname always written out",
        "mirrors client energy; light exclamation ok",
        "closes with a concrete next action",
      ],
    },
  },

  // --- ledger_london (UK, GBP) ---
  {
    email: "patricia@ledger.example",
    displayName: "Patricia Nguyen",
    signatureName: "Patricia Nguyen",
    roleTitle: "Legal / Contracts",
    company: "Ledger Counsel Partners",
    industry: "legal_services",
    universeId: "ledger_london",
    nameRegister: "east_asian",
    fingerprint: {
      avg_sentence_len: "long",
      formality: "formal",
      greeting_style: "hello",
      signoff_style: "regards",
      punctuation: "normal",
      typo_rate: "none",
      emoji_use: "never",
      structure: "numbered_ok",
      hedges: "frequent",
      directness: "balanced",
      time_refs: "absolute",
      attachment_mentions: "frequent",
      quirks: [
        "cites clause numbers",
        "flags 'subject to counsel review'",
        "avoids slang; precise verbs (execute, countersign)",
      ],
    },
  },
  {
    email: "vj@ledger.example",
    displayName: "VJ",
    signatureName: "V. Jain",
    roleTitle: "Ops Coordinator",
    company: "Ledger Counsel Partners",
    industry: "ops_freelance",
    universeId: "ledger_london",
    nameRegister: "initials",
    fingerprint: {
      avg_sentence_len: "telegraphic",
      formality: "casual",
      greeting_style: "none",
      signoff_style: "none",
      punctuation: "heavy_ellipses",
      typo_rate: "occasional",
      emoji_use: "never",
      structure: "one_block",
      hedges: "none",
      directness: "blunt",
      time_refs: "relative",
      attachment_mentions: "rare",
      quirks: [
        "ultra-short replies (1-2 lines)",
        "ellipses mid-sentence when thinking",
        "rarely greets; jumps to answer",
      ],
    },
  },
  {
    email: "grace@ledger.example",
    displayName: "Grace O-Neil",
    signatureName: "Grace O-Neil",
    roleTitle: "Paralegal / Intake",
    company: "Ledger Counsel Partners",
    industry: "legal_ops",
    universeId: "ledger_london",
    nameRegister: "hyphenated",
    fingerprint: {
      avg_sentence_len: "medium",
      formality: "formal",
      greeting_style: "hello",
      signoff_style: "regards",
      punctuation: "normal",
      typo_rate: "none",
      emoji_use: "never",
      structure: "bullets_ok",
      hedges: "light",
      directness: "balanced",
      time_refs: "absolute",
      attachment_mentions: "frequent",
      quirks: [
        "hyphenated surname always written out",
        "lists outstanding docs as short bullets",
        "flags deadlines with absolute dates",
      ],
    },
  },

  // --- additional live Gmail mailboxes (mapped into existing universes) ---
  {
    email: "agency@meridian.example",
    displayName: "FL Ops",
    signatureName: "Fryloop Ops",
    roleTitle: "Agency Desk",
    company: "Meridian Ops",
    industry: "saas_ops",
    universeId: "meridian_east",
    nameRegister: "initials",
    fingerprint: {
      avg_sentence_len: "telegraphic",
      formality: "formal",
      greeting_style: "hello",
      signoff_style: "thanks",
      punctuation: "normal",
      typo_rate: "none",
      emoji_use: "never",
      structure: "bullets_ok",
      hedges: "none",
      directness: "blunt",
      time_refs: "relative",
      attachment_mentions: "frequent",
      quirks: [
        "From shows FL Ops; signs Fryloop Ops",
        "offers two windows when scheduling",
        "keeps agency asks concrete",
      ],
    },
  },
  {
    email: "dev@harbour.example",
    displayName: "V. Soni",
    signatureName: "Vaibhav Soni",
    roleTitle: "Contractor / Comms",
    company: "DGC Australia",
    industry: "construction_comms",
    universeId: "harbour_sydney",
    nameRegister: "south_asian",
    fingerprint: {
      avg_sentence_len: "long",
      formality: "formal",
      greeting_style: "hi_name",
      signoff_style: "none",
      punctuation: "heavy_ellipses",
      typo_rate: "rare",
      emoji_use: "rare",
      structure: "bullets_ok",
      hedges: "frequent",
      directness: "balanced",
      time_refs: "absolute",
      attachment_mentions: "normal",
      quirks: [
        "From shows V. Soni; signs Vaibhav Soni",
        "site-short updates",
        "AEST callouts",
      ],
    },
  },
  {
    email: "ops@weedo.example",
    displayName: "Upcare-Life Desk",
    signatureName: "Upcare Team",
    roleTitle: "Product Ops",
    company: "Upcare",
    industry: "health_ops",
    universeId: "weedo_mel",
    nameRegister: "hyphenated",
    fingerprint: {
      avg_sentence_len: "telegraphic",
      formality: "business_casual",
      greeting_style: "none",
      signoff_style: "talk_soon",
      punctuation: "light",
      typo_rate: "none",
      emoji_use: "light",
      structure: "one_block",
      hedges: "none",
      directness: "blunt",
      time_refs: "relative",
      attachment_mentions: "rare",
      quirks: [
        "brand From-line; signs Upcare Team",
        "compliance-ish soft asks",
        "talk_soon on ops notes",
      ],
    },
  },
];

const FINGERPRINT_KEYS: Array<keyof WritingFingerprint> = [
  "avg_sentence_len",
  "formality",
  "greeting_style",
  "signoff_style",
  "punctuation",
  "typo_rate",
  "emoji_use",
  "structure",
  "hedges",
  "directness",
  "time_refs",
  "attachment_mentions",
];

/** Jaccard-ish overlap on categorical fingerprint fields (0 = identical, 1 = fully different). */
export function fingerprintDistance(a: WritingFingerprint, b: WritingFingerprint): number {
  let mismatches = 0;
  for (const key of FINGERPRINT_KEYS) {
    if (a[key] !== b[key]) mismatches += 1;
  }
  const categorical = mismatches / FINGERPRINT_KEYS.length;

  const quirkA = new Set(a.quirks.map((q) => q.toLowerCase()));
  const quirkB = new Set(b.quirks.map((q) => q.toLowerCase()));
  let overlap = 0;
  for (const q of quirkA) {
    if (quirkB.has(q)) overlap += 1;
  }
  const quirkUnion = new Set([...quirkA, ...quirkB]).size || 1;
  const quirkJaccardDiff = 1 - overlap / quirkUnion;

  return categorical * 0.75 + quirkJaccardDiff * 0.25;
}

export const MIN_FINGERPRINT_DISTANCE = 0.35;

export interface SimilarityPair {
  emailA: string;
  emailB: string;
  distance: number;
}

export function findTooSimilarPairs(
  personas: Persona[],
  minDistance = MIN_FINGERPRINT_DISTANCE,
): SimilarityPair[] {
  const bad: SimilarityPair[] = [];
  for (let i = 0; i < personas.length; i++) {
    for (let j = i + 1; j < personas.length; j++) {
      const distance = fingerprintDistance(
        personas[i]!.fingerprint,
        personas[j]!.fingerprint,
      );
      if (distance < minDistance) {
        bad.push({
          emailA: personas[i]!.email,
          emailB: personas[j]!.email,
          distance,
        });
      }
    }
  }
  return bad;
}

function assertNameRegisterDiversity(): void {
  const counts = new Map<string, number>();
  for (const s of MAILBOX_SEEDS) {
    counts.set(s.nameRegister, (counts.get(s.nameRegister) ?? 0) + 1);
  }
  for (const [reg, n] of counts) {
    if (n > 4) {
      throw new Error(
        `Name register "${reg}" has ${n} personas (max 4). Redistribute display names.`,
      );
    }
  }
}

function assertUniverseCoverage(): void {
  const byUniverse = new Map<string, string[]>();
  for (const s of MAILBOX_SEEDS) {
    const list = byUniverse.get(s.universeId) ?? [];
    list.push(s.email);
    byUniverse.set(s.universeId, list);
  }
  for (const u of UNIVERSES) {
    const members = byUniverse.get(u.id) ?? [];
    if (members.length < 2) {
      throw new Error(
        `Universe ${u.id} needs ≥2 personas for intra-universe threads; got ${members.length}`,
      );
    }
  }
  if (MAILBOX_SEEDS.length < 10) {
    throw new Error(`Expected ≥10 mailboxes, got ${MAILBOX_SEEDS.length}`);
  }
  // Exactly one universe per persona already enforced by schema; check no orphan universes assigned
  for (const s of MAILBOX_SEEDS) {
    if (!UNIVERSES.some((u) => u.id === s.universeId)) {
      throw new Error(`Persona ${s.email} references unknown universe ${s.universeId}`);
    }
  }
}

export function seedPersonas(): Persona[] {
  assertNameRegisterDiversity();
  assertUniverseCoverage();

  const personas: Persona[] = MAILBOX_SEEDS.map((seed) => ({
    id: randomUUID(),
    email: seed.email,
    displayName: seed.displayName,
    signatureName: seed.signatureName,
    roleTitle: seed.roleTitle,
    company: seed.company,
    industry: seed.industry,
    universeId: seed.universeId,
    fingerprint: structuredClone(seed.fingerprint),
  }));

  const collisions = findTooSimilarPairs(personas);
  if (collisions.length > 0) {
    const detail = collisions
      .map((c) => `${c.emailA} ↔ ${c.emailB} (d=${c.distance.toFixed(3)})`)
      .join("; ");
    throw new Error(
      `Persona fingerprint collision at seed (min distance ${MIN_FINGERPRINT_DISTANCE}): ${detail}`,
    );
  }

  return personas;
}

export function getPersonaByEmail(personas: Persona[], email: string): Persona {
  const p = personas.find((x) => x.email.toLowerCase() === email.toLowerCase());
  if (!p) throw new Error(`Unknown persona email: ${email}`);
  return p;
}

export function personasInUniverse(personas: Persona[], universeId: string): Persona[] {
  return personas.filter((p) => p.universeId === universeId);
}
