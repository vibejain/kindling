/**
 * Hard generation / validation rules from the content-engine spec.
 */

import type { LengthBand, WritingFingerprint } from "../types/index.js";

/** Word-count targets per length band (spec §2). */
export const LENGTH_BAND_WORDS: Record<
  LengthBand,
  { min: number; max: number }
> = {
  micro: { min: 3, max: 12 },
  short: { min: 10, max: 55 },
  medium: { min: 60, max: 120 },
  long: { min: 250, max: 400 },
  anchor: { min: 500, max: 900 },
};

/** Accept if within ±25% of the band bounds. */
export function acceptableWordRange(band: LengthBand): {
  min: number;
  max: number;
} {
  const { min, max } = LENGTH_BAND_WORDS[band];
  return {
    min: Math.max(1, Math.floor(min * 0.75)),
    max: Math.ceil(max * 1.25),
  };
}

export function countWords(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).filter(Boolean).length;
}

/** Single-token banned words (case-insensitive whole-word). */
export const BANNED_WORDS: readonly string[] = [
  "delve",
  "leverage",
  "robust",
  "seamless",
  "streamline",
  "elevate",
  "moreover",
  "furthermore",
];

/** Multi-word banned phrases (case-insensitive). */
export const BANNED_PHRASES: readonly string[] = [
  "in today's landscape",
  "it's worth noting",
  "its worth noting",
  "that said",
  "i hope this email finds you well",
  "i hope this finds you well",
  "hope this email finds you well",
  "hope this finds you well",
];

/** Subject / promo tripwires - never in subject; also reject in body. */
export const PROMO_WORDS: readonly string[] = [
  "free",
  "offer",
  "deal",
  "limited",
  "exclusive",
  "save",
  "discount",
  "guaranteed",
  "act now",
  "click",
  "unlock",
  "boost",
];

export const EM_DASH = "\u2014";
export const EN_DASH = "\u2013";

/** Neutral domains allowed when a message contains a link (≤12%). */
export const NEUTRAL_LINK_DOMAINS: readonly string[] = [
  "docs.google.com",
  "drive.google.com",
  "calendar.google.com",
  "github.com",
  "www.github.com",
  "maps.google.com",
  "tracking.example.com",
  "www.ups.com",
  "www.fedex.com",
  "www.dhl.com",
  "auspost.com.au",
  "tools.usps.com",
];

/** Corpus-level human-noise rates (spec §7). */
export const HUMAN_NOISE_RATES = {
  selfCorrection: 0.08,
  fakeAttachment: 0.06,
  forwardIntro: 0.05,
  phoneStyle: 0.05,
  bump: 0.04,
  wrongThread: 0.03,
} as const;

/** Max fraction of messages that may end with a question. */
export const QUESTION_ENDING_CAP = 0.4;

/** Max fraction of messages that may contain a link. */
export const LINK_RATE = 0.12;

/** Subject-line style distribution for thread openers (spec §6). */
export const SUBJECT_STYLE_RATES = {
  re_clean: 0.4,
  re_renamed: 0.25,
  lowercase_terse: 0.15,
  title_case: 0.1,
  typo_or_trailing_space: 0.05,
  empty: 0.05,
} as const;

export type SubjectStyle = keyof typeof SUBJECT_STYLE_RATES;

export type PersonaStyleTag = {
  formality: WritingFingerprint["formality"];
  greeting_style: WritingFingerprint["greeting_style"];
  signoff_style: WritingFingerprint["signoff_style"];
};

export const LLM_TEMPERATURE = 0.95;
export const MAX_GENERATION_ATTEMPTS = 4;

export const FALLBACK_BANDS: ReadonlySet<LengthBand> = new Set([
  "micro",
  "short",
]);
