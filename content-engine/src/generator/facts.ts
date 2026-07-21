/**
 * Extract concrete facts from an accepted message body.
 */
import type { EstablishedFact } from "../types/index.js";

const PATTERNS: Array<{ keyPrefix: string; re: RegExp }> = [
  { keyPrefix: "id", re: /\b(?:INV|PO|SOW|MSA|WR|TKT|JOB|CO|RFQ|PR)[- ]?[A-Z]{0,4}[- ]?\d{2,6}\b/gi },
  { keyPrefix: "amount", re: /~?\$\s?\d{1,3}(?:,\d{3})*(?:\.\d{2})?\s?[kKmM]?/g },
  { keyPrefix: "file", re: /\b[\w.-]+\.(?:pdf|xlsx?|docx?|csv|png|jpg)\b/gi },
  { keyPrefix: "version", re: /\bv(?:ersion\s*)?\d+(?:\.\d+){1,3}\b/gi },
];

export function extractFactsFromMessage(
  body: string,
  existing: EstablishedFact[],
  depth: number,
): EstablishedFact[] {
  const existingKeys = new Set(existing.map((f) => f.factKey));
  const existingVals = new Set(existing.map((f) => f.factValue.toLowerCase()));
  const out: EstablishedFact[] = [];

  for (const { keyPrefix, re } of PATTERNS) {
    const matches = body.match(re) ?? [];
    for (const raw of matches) {
      const val = raw.trim();
      if (existingVals.has(val.toLowerCase())) continue;
      let i = 1;
      let key = `${keyPrefix}_${i}`;
      while (existingKeys.has(key) || out.some((f) => f.factKey === key)) {
        i += 1;
        key = `${keyPrefix}_${i}`;
      }
      out.push({
        factKey: key,
        factValue: val,
        source: "message",
        introducedAtDepth: depth,
      });
      existingVals.add(val.toLowerCase());
    }
  }

  return out;
}
