/**
 * Fallback template bank selection for API outage / no-key dry-runs.
 */
import type { LengthBand, Persona, WritingFingerprint } from "../types/index.js";
import { FALLBACK_TEMPLATES, type FallbackTemplate } from "./bank-data.js";

export { FALLBACK_TEMPLATES, FALLBACK_BANK_COUNT } from "./bank-data.js";
export type { FallbackTemplate } from "./bank-data.js";

function scoreTemplate(t: FallbackTemplate, fp: WritingFingerprint): number {
  let score = 0;
  if (t.formality === fp.formality) score += 3;
  if (t.greeting_style === fp.greeting_style) score += 2;
  if (t.signoff_style === fp.signoff_style) score += 2;
  // Soft mismatches still usable
  if (t.formality !== fp.formality) score -= 1;
  return score;
}

export function pickFallbackTemplate(args: {
  persona: Persona;
  band: LengthBand;
  usedIds?: Set<string>;
  rand?: () => number;
}): FallbackTemplate | null {
  const rand = args.rand ?? Math.random;
  if (args.band !== "micro" && args.band !== "short") return null;

  const candidates = FALLBACK_TEMPLATES.filter(
    (t) =>
      t.band === args.band &&
      !(args.usedIds && args.usedIds.has(t.id)),
  );
  if (!candidates.length) {
    // Relax: allow any unused of either micro/short, prefer requested band via empty
    const any = FALLBACK_TEMPLATES.filter(
      (t) => !(args.usedIds && args.usedIds.has(t.id)),
    );
    if (!any.length) return FALLBACK_TEMPLATES[0] ?? null;
    return any[Math.floor(rand() * any.length)]!;
  }

  const scored = candidates
    .map((t) => ({ t, s: scoreTemplate(t, args.persona.fingerprint) }))
    .sort((a, b) => b.s - a.s);

  const topScore = scored[0]!.s;
  const top = scored.filter((x) => x.s >= topScore - 1);
  return top[Math.floor(rand() * top.length)]!.t;
}

export function personalizeFallback(
  body: string,
  persona: Persona,
  counterpart: Persona,
  opts?: { allowLink?: boolean; rand?: () => number },
): string {
  const first =
    counterpart.signatureName.split(/\s+/)[0] ??
    counterpart.displayName.split(/\s+/).find((p) => p.length > 2) ??
    counterpart.displayName;
  let out = body;
  for (const token of ["Sam", "Alex", "Jordan", "Priya", "Maya", "Chris", "Lee", "Taylor"]) {
    out = out.replace(new RegExp(`\\b${token}\\b`, "g"), first);
  }
  if (opts?.allowLink && !/https?:\/\//i.test(out)) {
    const rand = opts.rand ?? Math.random;
    const links = [
      " https://docs.google.com/document/d/warmup-notes/edit",
      " https://docs.google.com/spreadsheets/d/warmup-tracker/edit",
    ];
    out = `${out.trim()}\n\n${links[Math.floor(rand() * links.length)]!.trim()}`;
  }
  void persona;
  return out;
}
