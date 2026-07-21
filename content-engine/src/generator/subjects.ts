/**
 * Subject line generation with corpus distribution rules.
 */
import type { SubjectStyle } from "../rules/constants.js";
import { PROMO_WORDS, SUBJECT_STYLE_RATES } from "../rules/constants.js";

const TERSE = [
  "quick sync",
  "timing check",
  "follow up",
  "next steps",
  "room change",
  "access issue",
  "invoice q",
  "draft review",
  "calendar hold",
  "need confirm",
];

const TITLE = [
  "Project Timeline Update",
  "Meeting Reschedule Request",
  "Document Review Notes",
  "Access Permission Follow-Up",
  "Payment Reconciliation Item",
  "Scope Clarification",
  "Candidate Scheduling",
  "Vendor Lead Time",
];

function hasPromo(s: string): boolean {
  const lower = s.toLowerCase();
  return PROMO_WORDS.some((w) => {
    if (w.includes(" ")) return lower.includes(w);
    return new RegExp(`\\b${w}\\b`, "i").test(s);
  });
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]!;
}

export function sampleSubjectStyle(rand: () => number): SubjectStyle {
  const r = rand();
  let acc = 0;
  for (const [k, v] of Object.entries(SUBJECT_STYLE_RATES) as Array<
    [SubjectStyle, number]
  >) {
    acc += v;
    if (r <= acc) return k;
  }
  return "re_clean";
}

export function buildSubject(args: {
  sequenceIndex: number;
  priorSubject: string | null;
  premiseHint: string;
  style?: SubjectStyle;
  rand?: () => number;
}): { subject: string; style: SubjectStyle } {
  const rand = args.rand ?? Math.random;
  const style =
    args.style ??
    (args.sequenceIndex === 0
      ? sampleSubjectStyle(rand)
      : rand() < 0.7
        ? "re_clean"
        : sampleSubjectStyle(rand));

  const baseFromPremise = args.premiseHint
    .split(/[.;]/)[0]!
    .trim()
    .slice(0, 48)
    .replace(/\s+/g, " ")
    .replace(/[\u2013\u2014]/g, "-");

  let subject = "";

  switch (style) {
    case "empty":
      subject = "";
      break;
    case "lowercase_terse":
      subject = pick(TERSE, rand);
      break;
    case "title_case":
      subject = pick(TITLE, rand);
      break;
    case "typo_or_trailing_space":
      subject = rand() < 0.5 ? `${baseFromPremise || "quick update"} ` : `udpate ${baseFromPremise || "notes"}`;
      break;
    case "re_renamed":
      if (args.priorSubject) {
        const renamed = pick(TERSE, rand);
        subject = `Re: ${renamed}`;
      } else {
        subject = pick(TERSE, rand);
      }
      break;
    case "re_clean":
    default:
      if (args.sequenceIndex === 0) {
        subject = baseFromPremise || pick(TITLE, rand);
      } else if (args.priorSubject) {
        const core = args.priorSubject.replace(/^re:\s*/i, "").trim();
        subject = core ? `Re: ${core}` : "Re:";
      } else {
        subject = `Re: ${baseFromPremise || "thread"}`;
      }
      break;
  }

  if (subject && hasPromo(subject)) {
    subject = pick(TERSE, rand);
  }

  // Hard rule: never emit em/en dashes in subjects
  subject = subject.replace(/[\u2013\u2014]/g, "-");

  return { subject, style };
}
