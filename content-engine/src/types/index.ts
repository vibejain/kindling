/** Shared types for content-engine phase 1 (schema + planner). */

export type ArcTemplate = "DECAY" | "ESCALATION" | "FLAT_CHATTER" | "BURST";

export type LengthBand = "micro" | "short" | "medium" | "long" | "anchor";

export type TopicDomain =
  | "project_status"
  | "scheduling"
  | "invoices"
  | "scope"
  | "vendor"
  | "hiring"
  | "legal"
  | "it"
  | "client_feedback"
  | "ops"
  | "meeting_recaps"
  | "apologies";

export type EmotionalRegister =
  | "neutral_professional"
  | "friendly_casual"
  | "slightly_stressed"
  | "apologetic"
  | "assertive"
  | "warm_collaborative"
  | "terse_busy";

export type ThreadStatus = "planned" | "in_progress" | "completed" | "abandoned";

export type SubstanceLevel = "trivial" | "routine" | "consequential";

export type CurrencyCode = "USD" | "AUD" | "GBP" | "SGD";

/** Business universe - disjoint entity namespaces. */
export interface Universe {
  id: string;
  label: string;
  locale: string;
  timezone: string;
  currency: CurrencyCode;
  /** False for US universes (no GST). */
  hasGst: boolean;
  /** Entity catalog owned exclusively by this universe. */
  entities: UniverseEntities;
}

export interface UniverseEntities {
  clients: string[];
  projects: string[];
  vendors: string[];
  /** Invoice / ticket / PO series prefixes unique to this universe */
  invoiceSeries: string[];
  ticketSeries: string[];
  otherIds: string[];
}

/** Distinct writing fingerprint - must differ strongly across mailboxes. */
export interface WritingFingerprint {
  avg_sentence_len: "telegraphic" | "short" | "medium" | "long";
  formality: "casual" | "business_casual" | "formal";
  greeting_style: "hey" | "hi_name" | "hello" | "none" | "good_morning";
  signoff_style: "thanks" | "cheers" | "best" | "talk_soon" | "none" | "regards";
  punctuation: "light" | "normal" | "heavy_ellipses" | "exclaim_ok";
  typo_rate: "none" | "rare" | "occasional";
  emoji_use: "never" | "rare" | "light";
  structure: "one_block" | "short_paragraphs" | "bullets_ok" | "numbered_ok";
  hedges: "none" | "light" | "frequent";
  directness: "blunt" | "balanced" | "soft";
  time_refs: "relative" | "absolute" | "mixed";
  attachment_mentions: "rare" | "normal" | "frequent";
  quirks: string[];
}

export interface Persona {
  id: string;
  email: string;
  /** Display / From-header name (may be nickname or initials). */
  displayName: string;
  /** Full legal name used in signature when it differs from displayName. */
  signatureName: string;
  roleTitle: string;
  company: string;
  industry: string;
  universeId: string;
  fingerprint: WritingFingerprint;
}

export interface EstablishedFact {
  factKey: string;
  /**
   * Concrete value, or a relative day offset encoded as `offset_days:N`
   * (resolved to a calendar date later at message generation).
   */
  factValue: string;
  source: "premise" | "message" | "inferred";
  introducedAtDepth: number | null;
}

export interface PlannedThread {
  id: string;
  premise: string;
  topicDomain: TopicDomain;
  arcTemplate: ArcTemplate;
  /** Derived from lengthArc - never sampled independently. */
  lengthArc: LengthBand[];
  plannedDepth: number;
  messageCount: number;
  substanceLevel: SubstanceLevel;
  /** Primary universe; cross-universe threads set crossUniverse=true. */
  universeId: string;
  crossUniverse: boolean;
  personaA: Persona;
  personaB: Persona;
  participants: [string, string];
  emotionalRegister: EmotionalRegister;
  establishedFacts: EstablishedFact[];
  openQuestions: string[];
  status: ThreadStatus;
}

export interface PlannerCorpusTargets {
  arcs: Record<ArcTemplate, number>;
  substance: Record<SubstanceLevel, number>;
  /** Max fraction of threads that may cross universes (generic/factless). */
  crossUniverseMax: number;
}

/** Spec defaults */
export const CORPUS_TARGETS: PlannerCorpusTargets = {
  arcs: {
    DECAY: 0.45,
    ESCALATION: 0.2,
    FLAT_CHATTER: 0.25,
    BURST: 0.1,
  },
  substance: {
    trivial: 0.3,
    routine: 0.45,
    consequential: 0.25,
  },
  crossUniverseMax: 0.1,
};

export const TOPIC_DOMAINS: TopicDomain[] = [
  "project_status",
  "scheduling",
  "invoices",
  "scope",
  "vendor",
  "hiring",
  "legal",
  "it",
  "client_feedback",
  "ops",
  "meeting_recaps",
  "apologies",
];

/**
 * Joint band×topic constraint.
 * Topics not listed under longEligible are short/micro only.
 */
export const LONG_ELIGIBLE_TOPICS: ReadonlySet<TopicDomain> = new Set([
  "scope",
  "legal",
  "project_status",
  "client_feedback",
  "invoices",
  "apologies",
  "meeting_recaps",
]);

export const SHORT_MICRO_ONLY_TOPICS: ReadonlySet<TopicDomain> = new Set([
  "scheduling",
  "ops",
  "it",
  "vendor",
  "hiring",
]);

export function allowedBandsForTopic(topic: TopicDomain): LengthBand[] {
  if (LONG_ELIGIBLE_TOPICS.has(topic)) {
    return ["micro", "short", "medium", "long", "anchor"];
  }
  return ["micro", "short"];
}

/** Encode a relative day offset for later resolution at generation time. */
export function offsetDays(n: number): string {
  return `offset_days:${n}`;
}

export function parseOffsetDays(value: string): number | null {
  const m = /^offset_days:([+-]?\d+)$/.exec(value);
  return m ? Number(m[1]) : null;
}
