/**
 * Strip / rewrite characters and tokens that fail the validator.
 */
import { EM_DASH, EN_DASH } from "../rules/constants.js";

/** Replace em/en dashes with ASCII-safe punctuation. */
export function stripDashes(text: string): string {
  return text
    .replaceAll(EM_DASH, " - ")
    .replaceAll(EN_DASH, "-")
    .replace(/\s+-\s+/g, " - ")
    .replace(/ {2,}/g, " ");
}

/** Soften Oxford-comma patterns the validator rejects. */
export function deOxford(text: string): string {
  return text.replace(
    /\b([\w'/-]+),\s+([\w'/-]+),\s+(and|or)\s+([\w'/-]+)/gi,
    "$1, $2 $3 $4",
  );
}

export function sanitizeProse(text: string): string {
  return deOxford(stripDashes(text)).trim();
}

/** Normalize whitespace while keeping paragraph breaks. */
export function normalizeParagraphs(text: string): string {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/[ \t]+/g, " ").replace(/\n+/g, " ").trim())
    .filter(Boolean)
    .join("\n\n");
}
