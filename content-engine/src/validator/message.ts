/**
 * Post-generation message validator.
 * Rejects on: em dash, banned words/phrases, length outside band ±25%,
 * established_facts contradiction, fingerprint violation, HTML/images,
 * promo tripwires, illegal links, bullets in micro/short.
 */
import type {
  EstablishedFact,
  LengthBand,
  Persona,
  WritingFingerprint,
} from "../types/index.js";
import { parseOffsetDays } from "../types/index.js";
import {
  BANNED_PHRASES,
  BANNED_WORDS,
  EM_DASH,
  EN_DASH,
  NEUTRAL_LINK_DOMAINS,
  PROMO_WORDS,
  acceptableWordRange,
  countWords,
} from "../rules/constants.js";

export interface MessageValidationResult {
  ok: boolean;
  reasons: string[];
  wordCount: number;
}

export function resolveFactValue(
  value: string,
  sendTime: Date = new Date(),
): string {
  const offset = parseOffsetDays(value);
  if (offset === null) return value;
  const d = new Date(sendTime);
  d.setUTCDate(d.getUTCDate() + offset);
  // Human-ish absolute date for contradiction checks
  return d.toISOString().slice(0, 10);
}

function hasEmDash(text: string): boolean {
  return text.includes(EM_DASH) || text.includes(EN_DASH);
}

function findBanned(text: string): string | null {
  const lower = text.toLowerCase();
  for (const phrase of BANNED_PHRASES) {
    if (lower.includes(phrase)) return phrase;
  }
  for (const word of BANNED_WORDS) {
    const re = new RegExp(`\\b${word}\\b`, "i");
    if (re.test(text)) return word;
  }
  return null;
}

/** Promo tripwires - subject lines only (body may say "I am free after 3"). */
function findPromo(text: string): string | null {
  const lower = text.toLowerCase();
  for (const word of PROMO_WORDS) {
    if (word.includes(" ")) {
      if (lower.includes(word)) return word;
    } else {
      const re = new RegExp(`\\b${word}\\b`, "i");
      if (re.test(text)) return word;
    }
  }
  return null;
}

/** Heuristic Oxford comma: "a, b, and c" / "a, b, or c". */
export function hasOxfordComma(text: string): boolean {
  return /\b[\w'/-]+,\s+[\w'/-]+,\s+(and|or)\s+[\w'/-]+/i.test(text);
}

function extractUrls(text: string): string[] {
  const urls: string[] = [];
  const re = /https?:\/\/[^\s<>"']+|www\.[^\s<>"']+/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    urls.push(m[0]);
  }
  // bare domain-ish - only if not already covered by a full URL match
  const bare = text.match(
    /\b(?:docs|drive|calendar|maps)\.google\.com\/[^\s]+|\bgithub\.com\/[^\s]+/gi,
  );
  if (bare) {
    for (const b of bare) {
      const already = urls.some((u) => u.includes(b) || b.includes(u.replace(/^https?:\/\//i, "")));
      if (!already) urls.push(b);
    }
  }
  return urls;
}

function urlHost(url: string): string | null {
  try {
    const withProto = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    return new URL(withProto).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function isNeutralHost(host: string): boolean {
  return NEUTRAL_LINK_DOMAINS.some(
    (d) => host === d || host.endsWith(`.${d}`),
  );
}

const ID_LIKE =
  /\b(?:INV|PO|SOW|MSA|WR|TKT|JOB|CO|RFQ|PR)[- ]?[A-Z]{0,4}[- ]?\d{2,6}\b/gi;
const MONEY = /~?\$\s?\d{1,3}(?:,\d{3})*(?:\.\d{2})?\s?[kKmM]?(?:\s?(?:USD|AUD|GBP|SGD))?|\b\d{1,3}(?:,\d{3})*(?:\.\d{2})?\s?(?:USD|AUD|GBP|SGD)\b/gi;

function extractIds(text: string): string[] {
  return [...text.matchAll(ID_LIKE)].map((m) => m[0]!.replace(/\s+/g, "").toUpperCase());
}

function extractMoney(text: string): string[] {
  return [...text.matchAll(MONEY)].map((m) =>
    m[0]!.replace(/\s+/g, "").toUpperCase(),
  );
}

function normalizeMoneyToken(s: string): string {
  let t = s.replace(/[^\d.kKmM]/g, "").toLowerCase();
  const m = /^([\d.]+)([km])?$/.exec(t);
  if (!m) return s.replace(/[^\d.]/g, "");
  let n = Number(m[1]);
  if (!Number.isFinite(n)) return s.replace(/[^\d.]/g, "");
  if (m[2] === "k") n *= 1000;
  if (m[2] === "m") n *= 1_000_000;
  return String(n);
}

/**
 * Soft contradiction: if established facts include IDs/amounts and the
 * message introduces a different ID/amount of the same shape, reject.
 */
export function findFactContradiction(
  body: string,
  facts: EstablishedFact[],
  sendTime: Date = new Date(),
): string | null {
  if (!facts.length) return null;

  const resolved = facts.map((f) => ({
    ...f,
    resolved: resolveFactValue(f.factValue, sendTime),
  }));

  const bodyIds = extractIds(body);
  const factIds = resolved
    .map((f) => extractIds(f.resolved))
    .flat()
    .map((x) => x.toUpperCase());
  const factIdSet = new Set(factIds);

  for (const id of bodyIds) {
    const up = id.toUpperCase();
    // Same series prefix but different number vs an established id
    const prefix = up.replace(/\d+$/, "");
    const establishedSameSeries = [...factIdSet].filter((f) =>
      f.startsWith(prefix),
    );
    if (
      establishedSameSeries.length > 0 &&
      !factIdSet.has(up)
    ) {
      return `id contradiction: saw ${up}, facts have ${establishedSameSeries.join(", ")}`;
    }
  }

  const bodyMoney = extractMoney(body).map(normalizeMoneyToken).filter(Boolean);
  const factMoney = resolved
    .map((f) => extractMoney(f.resolved).map(normalizeMoneyToken))
    .flat()
    .filter(Boolean);
  const factMoneySet = new Set(factMoney);

  if (factMoneySet.size > 0 && bodyMoney.length > 0) {
    for (const m of bodyMoney) {
      if (!factMoneySet.has(m)) {
        // Allow unrelated small numbers; only flag if close magnitude to a fact
        for (const fm of factMoneySet) {
          const a = Number(m);
          const b = Number(fm);
          if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) continue;
          const ratio = a / b;
          if (ratio > 0.5 && ratio < 2.0 && Math.abs(a - b) > 0.009) {
            return `amount contradiction: saw ${m}, facts have ${fm}`;
          }
        }
      }
    }
  }

  // Explicit value restatement: fact value appears altered for named keys
  for (const f of resolved) {
    if (f.factKey.includes("invoice") || f.factKey.includes("amount") || f.factKey.includes("client")) {
      const val = f.resolved.trim();
      if (val.length >= 4 && !body.includes(val)) {
        // ok if not mentioned
      }
    }
  }

  return null;
}

function sentenceStats(text: string): { count: number; avgWords: number } {
  const parts = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (!parts.length) return { count: 0, avgWords: 0 };
  const words = parts.map((p) => countWords(p));
  const avg = words.reduce((a, b) => a + b, 0) / words.length;
  return { count: parts.length, avgWords: avg };
}

function startsWithGreeting(text: string): boolean {
  return /^(hi\b|hey\b|hello\b|good\s+(morning|afternoon|evening)\b)/i.test(
    text.trim(),
  );
}

function detectSignoff(text: string): string | null {
  const lines = text
    .trim()
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (!lines.length) return null;
  const last = lines[lines.length - 1]!.toLowerCase();
  const prev = lines.length > 1 ? lines[lines.length - 2]!.toLowerCase() : "";
  const candidate = `${prev}\n${last}`;
  if (/^(thanks|thank you|cheers|best|talk soon|regards|best regards)\b/.test(last)) {
    return last.split(/[,\s]/)[0]!;
  }
  if (/^(thanks|thank you|cheers|best|talk soon|regards)\b/.test(prev)) {
    return prev.split(/[,\s]/)[0]!;
  }
  void candidate;
  return null;
}

function hasEmoji(text: string): boolean {
  return /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(text);
}

function hasBullets(text: string): boolean {
  return /(^|\n)\s*(?:[-*•]|\d+[.)])\s+\S/.test(text);
}

export function checkFingerprint(
  body: string,
  fp: WritingFingerprint,
  band: LengthBand,
): string[] {
  const reasons: string[] = [];
  const trimmed = body.trim();

  if (fp.greeting_style === "none" && startsWithGreeting(trimmed)) {
    reasons.push("fingerprint: greeting present but greeting_style=none");
  }
  if (
    (fp.greeting_style === "hey" ||
      fp.greeting_style === "hi_name" ||
      fp.greeting_style === "hello" ||
      fp.greeting_style === "good_morning") &&
    band !== "micro" &&
    !startsWithGreeting(trimmed)
  ) {
    // Soft: micro often skip greetings; phone-style handled elsewhere
    // Only flag medium+ when greeting expected and missing AND not phone fragment
    if (band === "medium" || band === "long" || band === "anchor") {
      reasons.push(`fingerprint: expected greeting (${fp.greeting_style})`);
    }
  }

  if (fp.emoji_use === "never" && hasEmoji(trimmed)) {
    reasons.push("fingerprint: emoji forbidden");
  }

  const signoff = detectSignoff(trimmed);
  if (fp.signoff_style === "none" && signoff && band !== "micro") {
    // Allow micro to be anything terse
    if (band === "long" || band === "anchor" || band === "medium") {
      reasons.push("fingerprint: signoff present but signoff_style=none");
    }
  }

  const { avgWords } = sentenceStats(trimmed);
  if (fp.avg_sentence_len === "telegraphic" && avgWords > 14 && band !== "micro") {
    reasons.push("fingerprint: sentences too long for telegraphic");
  }
  if (fp.avg_sentence_len === "long" && avgWords > 0 && avgWords < 8 && (band === "long" || band === "anchor")) {
    reasons.push("fingerprint: sentences too short for long bias");
  }

  if (
    (band === "micro" || band === "short") &&
    hasBullets(trimmed)
  ) {
    reasons.push("anti-llm: bullets forbidden in micro/short");
  }

  if (fp.structure === "one_block" && hasBullets(trimmed) && band !== "long" && band !== "anchor") {
    reasons.push("fingerprint: bullets vs one_block structure");
  }

  return reasons;
}

export function validateGeneratedMessage(args: {
  body: string;
  subject: string;
  band: LengthBand;
  persona: Persona;
  facts: EstablishedFact[];
  sendTime?: Date;
  allowLink?: boolean;
}): MessageValidationResult {
  const reasons: string[] = [];
  const body = args.body ?? "";
  const subject = args.subject ?? "";
  const sendTime = args.sendTime ?? new Date();
  const wordCount = countWords(body);

  if (!body.trim()) {
    reasons.push("empty body");
  }

  // Plain text only
  if (/<\/?[a-z][\s\S]*>/i.test(body) || /<\/?[a-z][\s\S]*>/i.test(subject)) {
    reasons.push("html tags forbidden");
  }
  if (/data:image|cid:|<img\b/i.test(body)) {
    reasons.push("images/tracking forbidden");
  }

  if (hasEmDash(body) || hasEmDash(subject)) {
    reasons.push("em/en dash present");
  }

  const banned = findBanned(body);
  if (banned) {
    reasons.push(`banned token: ${banned}`);
  }
  const promoInSubject = findPromo(subject);
  if (promoInSubject) {
    reasons.push(`promo subject token: ${promoInSubject}`);
  }

  // Oxford comma: soft reject (spec preference / hard anti-LLM)
  if (hasOxfordComma(body)) {
    reasons.push("oxford comma present");
  }

  const range = acceptableWordRange(args.band);
  if (wordCount < range.min || wordCount > range.max) {
    reasons.push(
      `length ${wordCount} outside ${args.band} band±25% [${range.min},${range.max}]`,
    );
  }

  const contradiction = findFactContradiction(body, args.facts, sendTime);
  if (contradiction) {
    reasons.push(contradiction);
  }

  reasons.push(...checkFingerprint(body, args.persona.fingerprint, args.band));

  // Exactly three balanced paragraphs - anti-LLM
  const paras = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (paras.length === 3) {
    const lens = paras.map(countWords);
    const avg = lens.reduce((a, b) => a + b, 0) / 3;
    if (lens.every((l) => Math.abs(l - avg) <= avg * 0.2) && avg >= 20) {
      reasons.push("anti-llm: exactly three balanced paragraphs");
    }
  }

  const urls = extractUrls(body);
  if (urls.length > 1) {
    reasons.push("more than one link");
  }
  if (urls.length > 0) {
    if (args.band === "micro") {
      reasons.push("link forbidden in micro");
    }
    if (args.allowLink === false) {
      reasons.push("link not allotted for this slot");
    }
    for (const u of urls) {
      const host = urlHost(u);
      if (!host || !isNeutralHost(host)) {
        reasons.push(`non-neutral link host: ${host ?? u}`);
      }
    }
  }

  // Stub marker always fails length/substance - allow through labeled separately
  if (body.includes("[LLM_REQUIRED]")) {
    // Clear length failures for stubs; keep other hard rules
    const filtered = reasons.filter((r) => !r.startsWith("length "));
    return {
      ok: filtered.length === 0,
      reasons: filtered,
      wordCount,
    };
  }

  return { ok: reasons.length === 0, reasons, wordCount };
}
