/**
 * Persona fingerprint rendering: greetings, signoffs, typos, fillers.
 */
import type { Persona, WritingFingerprint } from "../types/index.js";

function pick<T>(arr: readonly T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]!;
}

export function recipientFirstName(recipient: Persona): string {
  const fromSig = recipient.signatureName.split(/\s+/)[0];
  if (fromSig && fromSig.length > 1 && !/^[A-Z]\.?$/.test(fromSig)) {
    return fromSig;
  }
  const fromDisplay = recipient.displayName.split(/\s+/).find((p) => p.length > 2);
  return fromDisplay ?? recipient.displayName;
}

export function buildGreeting(
  fp: WritingFingerprint,
  recipient: Persona,
  rand: () => number,
): string {
  const name = recipientFirstName(recipient);
  switch (fp.greeting_style) {
    case "none":
      return "";
    case "hey":
      return pick([`hey ${name.toLowerCase()},`, `hey,`, `hey ${name},`], rand);
    case "hi_name":
      return pick([`Hi ${name},`, `Hi ${name} -`, `Hi ${name}.`], rand);
    case "hello":
      return pick([`Hello ${name},`, `Hello,`], rand);
    case "good_morning":
      return pick(
        [`Good morning ${name},`, `Good morning,`, `Morning ${name},`],
        rand,
      );
    default:
      return `Hi ${name},`;
  }
}

export function buildSignoff(
  fp: WritingFingerprint,
  sender: Persona,
  rand: () => number,
): string {
  if (fp.signoff_style === "none") return "";

  const signName =
    rand() < 0.65
      ? sender.signatureName
      : sender.displayName.split(/\s+/)[0] ?? sender.signatureName;

  const word = ((): string => {
    switch (fp.signoff_style) {
      case "thanks":
        return pick(["Thanks", "Thanks,", "Thank you"], rand);
      case "cheers":
        return pick(["Cheers", "Cheers,"], rand);
      case "best":
        return pick(["Best", "Best,"], rand);
      case "talk_soon":
        return pick(["Talk soon", "Talk soon,"], rand);
      case "regards":
        return pick(["Regards", "Best regards", "Kind regards"], rand);
      default:
        return "Thanks";
    }
  })();

  if (fp.formality === "formal" || fp.signoff_style === "regards") {
    return `${word}\n${signName}`;
  }
  if (rand() < 0.35) return word;
  return `${word}\n${signName.split(/\s+/)[0]}`;
}

const HEDGES_LIGHT = [
  "I think",
  "pretty sure",
  "from what I can tell",
  "if I'm reading this right",
];
const HEDGES_FREQ = [
  "I think",
  "maybe",
  "possibly",
  "if that still works",
  "assuming nothing moved",
  "unless I'm missing something",
];

export function hedgePrefix(fp: WritingFingerprint, rand: () => number): string {
  if (fp.hedges === "none") return "";
  if (fp.hedges === "light") {
    return rand() < 0.35 ? `${pick(HEDGES_LIGHT, rand)}, ` : "";
  }
  return rand() < 0.55 ? `${pick(HEDGES_FREQ, rand)}, ` : "";
}

/** Join hedge + sentence so we never get "I think Wanted". */
export function withHedge(
  hedge: string,
  sentence: string,
): string {
  if (!hedge.trim()) return sentence;
  const s = sentence.trim();
  if (!s) return hedge.trim();
  return `${hedge.trim()} ${s.charAt(0).toLowerCase()}${s.slice(1)}`;
}

const FILLERS = [
  "anyway",
  "quick note",
  "circling back",
  "on my end",
  "for context",
  "one more thing",
  "separately",
  "side note",
];

export function fillerPhrase(rand: () => number): string {
  return pick(FILLERS, rand);
}

/** Light typo injection based on fingerprint typo_rate. */
export function maybeInjectTypos(
  text: string,
  fp: WritingFingerprint,
  rand: () => number,
): string {
  const rate =
    fp.typo_rate === "none" ? 0 : fp.typo_rate === "rare" ? 0.08 : 0.18;
  if (rand() > rate) return text;

  const swaps: Array<[RegExp, string]> = [
    [/\bthe\b/, "teh"],
    [/\bfrom\b/, "form"],
    [/\bwith\b/, "wiht"],
    [/\babout\b/, "abuot"],
    [/\breceive\b/i, "recieve"],
    [/\bschedule\b/i, "scheudle"],
    [/\bavailable\b/i, "availble"],
  ];
  const candidates = swaps.filter(([re]) => re.test(text));
  if (!candidates.length) return text;
  const [re, repl] = pick(candidates, rand);
  return text.replace(re, repl);
}

/** Phone-style: lowercase, drop greeting/signoff framing later. */
export function applyPhoneStyle(text: string): string {
  let t = text.trim();
  t = t.replace(/^(hi|hey|hello|good\s+(morning|afternoon))[^,\n]*,?\s*/i, "");
  // Drop trailing signoff block
  t = t.replace(
    /\n+(thanks|thank you|cheers|best|talk soon|regards|best regards|kind regards)[^\n]*(\n+[A-Z][^\n]*)?\s*$/i,
    "",
  );
  return t.toLowerCase().replace(/\n{3,}/g, "\n\n").trim();
}

export function applyCapitalization(
  text: string,
  fp: WritingFingerprint,
  rand: () => number,
): string {
  if (fp.formality === "casual" && rand() < 0.12) {
    // occasional leading lowercase (already-started vibe)
    return text.replace(/^([A-Z])/, (c) => c.toLowerCase());
  }
  return text;
}

export function punctuationTouch(
  text: string,
  fp: WritingFingerprint,
  rand: () => number,
): string {
  if (fp.punctuation === "heavy_ellipses" && rand() < 0.4) {
    return text.replace(/\.\s/g, (m) => (rand() < 0.25 ? "... " : m));
  }
  if (fp.punctuation === "exclaim_ok" && rand() < 0.2) {
    return text.replace(/\.$/, "!");
  }
  if (fp.punctuation === "light") {
    return text.replace(/!+/g, ".");
  }
  return text;
}
