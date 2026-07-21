/**
 * Resolve offset_days:N into relative / absolute time phrases at generate time.
 */
import { parseOffsetDays } from "../types/index.js";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function addDays(base: Date, n: number): Date {
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + n);
  return d;
}

function weekdayName(d: Date): string {
  return WEEKDAYS[d.getUTCDay()]!;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export type TimeRefMode = "relative" | "absolute" | "mixed";

/**
 * Human-readable phrase for an offset from sendTime.
 * relative: "next Tuesday", "in 3 days", "yesterday"
 * absolute: "2026-07-24" / "Thu Jul 24"
 * mixed: pick based on rand
 */
export function phraseForOffset(
  offset: number,
  sendTime: Date,
  mode: TimeRefMode,
  rand: () => number = Math.random,
): string {
  const target = addDays(sendTime, offset);
  const absShort = isoDate(target);
  const absFriendly = `${weekdayName(target).slice(0, 3)} ${absShort.slice(5)}`; // Thu 07-24
  const day = weekdayName(target);

  let relative: string;
  if (offset === 0) relative = "today";
  else if (offset === 1) relative = "tomorrow";
  else if (offset === -1) relative = "yesterday";
  else if (offset > 1 && offset <= 6) {
    relative = rand() < 0.55 ? `next ${day}` : `in ${offset} days`;
  } else if (offset < -1 && offset >= -6) {
    relative = rand() < 0.55 ? `last ${day}` : `${Math.abs(offset)} days ago`;
  } else if (offset >= 7 && offset < 14) {
    relative = rand() < 0.5 ? `next week (${day})` : `in about ${offset} days`;
  } else if (offset <= -7 && offset > -14) {
    relative = rand() < 0.5 ? `last week` : `${Math.abs(offset)} days ago`;
  } else if (offset > 0) {
    relative = `in ${offset} days`;
  } else {
    relative = `${Math.abs(offset)} days ago`;
  }

  if (mode === "relative") return relative;
  if (mode === "absolute") return rand() < 0.5 ? absShort : absFriendly;
  // mixed
  return rand() < 0.55 ? relative : absFriendly;
}

/** Replace every offset_days:N token in text with a phrase. */
export function resolveOffsetsInText(
  text: string,
  sendTime: Date,
  mode: TimeRefMode,
  rand: () => number = Math.random,
): string {
  return text.replace(/offset_days:([+-]?\d+)/g, (_m, n: string) =>
    phraseForOffset(Number(n), sendTime, mode, rand),
  );
}

export function describeFactValue(
  value: string,
  sendTime: Date,
  mode: TimeRefMode,
  rand: () => number = Math.random,
): string {
  const offset = parseOffsetDays(value);
  if (offset !== null) return phraseForOffset(offset, sendTime, mode, rand);
  return value;
}
