/**
 * Compositional template engine for medium / long / anchor bodies.
 * Micro/short stay on the fallback bank; this path is 100% local.
 */
import type {
  EstablishedFact,
  LengthBand,
  Persona,
  PlannedThread,
  SubstanceLevel,
} from "../types/index.js";
import {
  LENGTH_BAND_WORDS,
  countWords,
  acceptableWordRange,
} from "../rules/constants.js";
import { getUniverse } from "../universes/catalog.js";
import type { NoiseFlag } from "../generator/noise.js";
import type { GeneratedMessageRecord } from "../generator/types.js";
import {
  describeFactValue,
  resolveOffsetsInText,
  type TimeRefMode,
} from "./dates.js";
import {
  applyCapitalization,
  applyPhoneStyle,
  buildGreeting,
  buildSignoff,
  fillerPhrase,
  hedgePrefix,
  withHedge,
  maybeInjectTypos,
  punctuationTouch,
  recipientFirstName,
} from "./fingerprint.js";
import {
  pickCorrection,
  pickFillerPara,
  pickHistoryCallback,
  pickLinkLine,
  pickNextStep,
  pickOpener,
  pickPadSentence,
  pickTopicBridge,
  pickTradeoff,
} from "./snippets.js";
import { normalizeParagraphs, sanitizeProse } from "./sanitize.js";

function pick<T>(arr: readonly T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]!;
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function timeMode(persona: Persona): TimeRefMode {
  return persona.fingerprint.time_refs;
}

function factPhrase(key: string, value: string): string {
  const k = key.toLowerCase();
  if (k.includes("amount") || k.includes("cap") || k.includes("spend") || k.includes("range")) {
    return value;
  }
  if (k.startsWith("file_") || k === "file") return value;
  if (k.includes("invoice") || k.includes("sow") || k.includes("msa") || k.includes("po")) {
    return value;
  }
  const label = key.replace(/_/g, " ").replace(/\s+\d+$/, "");
  return `${label} ${value}`;
}

interface ConcreteBundle {
  dollars: string[];
  ids: string[];
  files: string[];
  dates: string[];
  parties: string[];
  openItems: string[];
  tradeoffs: string[];
  corrections: string[];
}

/** Capture $4,280.00 / $250k / ~$180k without truncating the k/m suffix. */
const MONEY_RE =
  /~?\$\s?\d[\d,]*(?:\.\d{2})?\s?(?:k|m|K|M)?(?:\s*(?:aggregate|USD|AUD|GBP|SGD))?/g;
const ID_RE =
  /\b(?:INV|PO|SOW|MSA|WR|TKT|JOB|CO|RFQ|PR|INC|CHG|FAC|TI|NDA|OFR|EXP|PROP|CQ|MB|RH)[-A-Z]{0,4}-?\d{2,6}\b/gi;
const FILE_RE = /\b[\w.-]+\.(?:pdf|xlsx?|docx?|csv)\b/gi;

function collectConcrete(args: {
  thread: PlannedThread;
  facts: EstablishedFact[];
  sendTime: Date;
  mode: TimeRefMode;
  rand: () => number;
}): ConcreteBundle {
  const dollars: string[] = [];
  const ids: string[] = [];
  const files: string[] = [];
  const dates: string[] = [];
  const parties: string[] = [];
  const openItems: string[] = [];

  const scan = (text: string) => {
    for (const m of text.match(MONEY_RE) ?? []) dollars.push(m.trim());
    for (const m of text.match(ID_RE) ?? []) ids.push(m);
    for (const m of text.match(FILE_RE) ?? []) files.push(m);
  };

  scan(args.thread.premise);
  // Drop premise-only amounts that substance-trim removed from facts
  const allowedAmt = amountsInFacts(args.facts);
  if (allowedAmt.size) {
    for (let i = dollars.length - 1; i >= 0; i--) {
      if (!allowedAmt.has(normalizeAmountKey(dollars[i]!))) {
        dollars.splice(i, 1);
      }
    }
  }
  for (const f of args.facts) {
    const rendered = describeFactValue(
      f.factValue,
      args.sendTime,
      args.mode,
      args.rand,
    );
    if (/^offset_days:/i.test(f.factValue)) {
      dates.push(rendered);
    } else {
      // Prefer full fact values for money/ids so we never emit $250 from $250k
      const k = f.factKey.toLowerCase();
      if (
        k.includes("amount") ||
        k.includes("spend") ||
        k.includes("range") ||
        k.includes("cap") ||
        k.includes("credit")
      ) {
        dollars.push(f.factValue.trim());
      } else {
        scan(f.factValue);
      }
      if (
        k.includes("client") ||
        k.includes("vendor") ||
        k.includes("counterparty") ||
        k.includes("agency") ||
        k.includes("contact")
      ) {
        parties.push(f.factValue);
      }
      if (
        k.includes("invoice") ||
        k.includes("sow") ||
        k.includes("msa") ||
        k.includes("ticket") ||
        k.includes("wire") ||
        k.includes("po") ||
        k.includes("job") ||
        k.endsWith("_id")
      ) {
        ids.push(f.factValue);
      }
      if (
        (k.includes("guide") || k.includes("file") || k.includes("pdf") || k.includes("sheet")) &&
        !/^file_\d+$/i.test(f.factKey)
      ) {
        files.push(f.factValue);
      }
    }
  }

  // Invent a file mention from universe series when none present (consequential/routine)
  if (
    !args.thread.crossUniverse &&
    files.length === 0 &&
    args.thread.substanceLevel !== "trivial"
  ) {
    try {
      const u = getUniverse(args.thread.universeId);
      const prefix = u.entities.otherIds[0] ?? "DOC-";
      const proj = u.entities.projects[0] ?? "NOTES";
      files.push(`${proj.toLowerCase()}-markup.pdf`);
      void prefix;
    } catch {
      files.push("revised-notes.pdf");
    }
  }

  args.thread.openQuestions.forEach((q, i) => {
    openItems.push(
      `${i + 1}) ${premiseAlignedToFacts(q, args.facts, args.sendTime, args.mode, args.rand)}`,
    );
  });

  const uniq = (xs: string[]) => [
    ...new Set(xs.map((x) => x.trim()).filter(Boolean)),
  ];

  return {
    dollars: uniq(dollars),
    ids: uniq(ids),
    files: uniq(files),
    dates: uniq(dates),
    parties: uniq(parties),
    openItems: uniq(openItems),
    tradeoffs: [pickTradeoff(args.rand)],
    corrections: [pickCorrection(args.rand)],
  };
}

function countConcreteKinds(c: ConcreteBundle): number {
  let n = 0;
  if (c.dollars.length) n += 1;
  if (c.files.length) n += 1;
  if (c.dates.length) n += 1;
  if (c.parties.length) n += 1;
  if (c.ids.length) n += 1;
  if (c.openItems.length) n += 1;
  if (c.tradeoffs.length) n += 1;
  if (c.corrections.length) n += 1;
  return n;
}

function amountsInFacts(facts: EstablishedFact[]): Set<string> {
  const out = new Set<string>();
  for (const f of facts) {
    for (const m of f.factValue.match(MONEY_RE) ?? []) {
      out.add(normalizeAmountKey(m));
    }
  }
  return out;
}

function normalizeAmountKey(raw: string): string {
  const t = raw.replace(/[^\d.kKmM]/g, "").toLowerCase();
  const m = /^([\d.]+)([km])?$/.exec(t);
  if (!m) return t;
  let n = Number(m[1]);
  if (!Number.isFinite(n)) return t;
  if (m[2] === "k") n *= 1000;
  if (m[2] === "m") n *= 1_000_000;
  return String(n);
}

/**
 * Rewrite premise so amounts not present in established_facts become vague
 * (avoids validator contradictions when substance trim dropped some facts).
 */
function premiseAlignedToFacts(
  premise: string,
  facts: EstablishedFact[],
  sendTime: Date,
  mode: TimeRefMode,
  rand: () => number,
): string {
  const allowed = amountsInFacts(facts);
  let text = resolveOffsetsInText(premise, sendTime, mode, rand);
  text = text.replace(MONEY_RE, (m) => {
    const key = normalizeAmountKey(m);
    if (allowed.has(key) || allowed.size === 0) return m;
    return pick(
      ["the quoted figure", "the other quote", "that number", "the alternate price"],
      rand,
    );
  });
  return sanitizeProse(text);
}

function premiseDigest(
  premise: string,
  facts: EstablishedFact[],
  sendTime: Date,
  mode: TimeRefMode,
  rand: () => number,
): string {
  const resolved = premiseAlignedToFacts(premise, facts, sendTime, mode, rand);
  const chunk = resolved.split(/[.;]/)[0]!.trim();
  if (chunk.length < 40) return resolved.slice(0, 220);
  return chunk.slice(0, 180);
}

function factProse(
  facts: EstablishedFact[],
  sendTime: Date,
  mode: TimeRefMode,
  rand: () => number,
  limit: number,
): string {
  if (!facts.length) return "";
  // Skip auto-extracted file_N noise from prior messages when presenting "working facts"
  const usable = facts.filter((f) => !/^file_\d+$/i.test(f.factKey));
  const pool = usable.length ? usable : facts;
  const chosen = shuffle(pool, rand).slice(0, limit);
  const bits = chosen.map((f) => {
    const v = describeFactValue(f.factValue, sendTime, mode, rand);
    return factPhrase(f.factKey, sanitizeProse(v));
  });
  if (bits.length === 1) return `Holding ${bits[0]} as the working detail.`;
  if (bits.length === 2) {
    return `Working facts on my side: ${bits[0]}, plus ${bits[1]}.`;
  }
  const last = bits[bits.length - 1]!;
  const head = bits.slice(0, -1).join("; ");
  return `Working facts on my side: ${head} and ${last}.`;
}

function openQuestionsPara(
  questions: string[],
  facts: EstablishedFact[],
  sendTime: Date,
  mode: TimeRefMode,
  rand: () => number,
  numbered: boolean,
): string {
  if (!questions.length) return "";
  const qs = questions
    .slice(0, numbered ? 5 : 2)
    .map((q) =>
      premiseAlignedToFacts(q, facts, sendTime, mode, rand),
    );
  if (!numbered) {
    return `Open question I still need answered: ${qs[0]}${qs[0]!.endsWith("?") ? "" : "?"}`;
  }
  const lines = qs.map((q, i) => `${i + 1}. ${q}${q.endsWith("?") ? "" : "?"}`);
  return `Open items I want closed:\n${lines.join("\n")}`;
}

function concreteDumpPara(c: ConcreteBundle, rand: () => number): string {
  const parts: string[] = [];
  if (c.ids[0]) parts.push(`ref ${c.ids[0]}`);
  if (c.dollars[0]) parts.push(`amount ${c.dollars[0]}`);
  if (c.parties[0]) parts.push(`counterparty ${c.parties[0]}`);
  if (c.dates[0]) parts.push(`timing ${c.dates[0]}`);
  if (c.files[0]) parts.push(`file ${c.files[0]}`);
  if (!parts.length) return pickFillerPara(rand);
  if (parts.length === 1) return `Concrete piece to keep straight: ${parts[0]}.`;
  if (parts.length === 2) return `Concrete pieces: ${parts[0]} and ${parts[1]}.`;
  const last = parts[parts.length - 1]!;
  return `Concrete pieces to keep straight: ${parts.slice(0, -1).join("; ")} and ${last}.`;
}

function targetWords(band: LengthBand): { lo: number; hi: number; aim: number } {
  const { min, max } = LENGTH_BAND_WORDS[band];
  const range = acceptableWordRange(band);
  return {
    lo: range.min,
    hi: range.max,
    aim: Math.round((min + max) / 2),
  };
}

function joinParas(paras: string[]): string {
  return normalizeParagraphs(
    paras
      .map((p) => p.trim())
      .filter(Boolean)
      .join("\n\n"),
  );
}

function ensureUnevenParagraphs(paras: string[], rand: () => number): string[] {
  // Avoid exactly 3 balanced paragraphs
  if (paras.length !== 3) return paras;
  if (rand() < 0.5) {
    // merge last two
    const merged = `${paras[1]} ${paras[2]}`;
    return [paras[0]!, merged];
  }
  // split one
  const mid = paras[1]!;
  const words = mid.split(/\s+/);
  if (words.length > 16) {
    const cut = Math.floor(words.length / 2) + Math.floor(rand() * 4) - 2;
    return [
      paras[0]!,
      words.slice(0, cut).join(" "),
      words.slice(cut).join(" "),
      paras[2]!,
    ];
  }
  return [...paras, pickFillerPara(rand)];
}

function applyNoiseToParas(
  paras: string[],
  flags: NoiseFlag[],
  recipient: Persona,
  rand: () => number,
): string[] {
  let out = [...paras];
  const name = recipientFirstName(recipient);

  if (flags.includes("forward_intro")) {
    out = [`looping in ${name} here`, ...out];
  }
  if (flags.includes("bump")) {
    out[0] = `bumping this - ${out[0]}`;
  }
  if (flags.includes("self_correction")) {
    const fix = pick(
      [
        "sorry meant Wednesday not Friday.",
        "correction: that was Thursday not Tuesday.",
        "wait, ignore the earlier day. I meant next week.",
      ],
      rand,
    );
    out.push(fix);
  }
  if (flags.includes("fake_attachment")) {
    out.push(
      pick(
        [
          "attaching the revised sheet.",
          "attaching a quick PDF with the numbers.",
          "putting the markup in an attachment.",
        ],
        rand,
      ),
    );
  }
  if (flags.includes("wrong_thread")) {
    out.push("ignore that, wrong thread.");
  }
  return out;
}

function trimOrPadParas(
  paras: string[],
  band: LengthBand,
  rand: () => number,
): string[] {
  const { lo, hi, aim } = targetWords(band);
  let out = [...paras];
  const usedPads = new Set<string>();
  const nextPad = (): string => {
    for (let i = 0; i < 12; i++) {
      const p = rand() < 0.45 ? pickPadSentence(rand) : pickFillerPara(rand);
      if (!usedPads.has(p) && !out.includes(p)) {
        usedPads.add(p);
        return p;
      }
    }
    return pickPadSentence(rand);
  };

  let words = countWords(out.join(" "));
  let guard = 0;
  while (words < Math.max(lo, Math.floor(aim * 0.85)) && guard < 35) {
    guard += 1;
    // Prefer expanding an existing short para for medium; new paras for long/anchor
    const pad = nextPad();
    if (band === "medium" && out.length >= 2 && rand() < 0.55) {
      const idx = Math.floor(rand() * out.length);
      out[idx] = `${out[idx]} ${pad}`;
    } else {
      out.push(pad);
    }
    words = countWords(out.join(" "));
  }

  guard = 0;
  while (words > hi && out.length > 2 && guard < 40) {
    guard += 1;
    // Drop from the middle (keep opener + closer)
    const idx = Math.min(out.length - 2, Math.max(1, Math.floor(out.length / 2)));
    out.splice(idx, 1);
    words = countWords(out.join(" "));
  }

  return out;
}

export interface ComposeArgs {
  thread: PlannedThread;
  band: LengthBand;
  sender: Persona;
  recipient: Persona;
  facts: EstablishedFact[];
  history: GeneratedMessageRecord[];
  sequenceIndex: number;
  noiseFlags: NoiseFlag[];
  allowLink: boolean;
  preferQuestionEnding: boolean;
  sendTime: Date;
  rand: () => number;
  /** Prior bodies from this persona in the run - avoid identical emits */
  recentBodies?: Set<string>;
}

function wrapWithVoice(
  coreParas: string[],
  args: ComposeArgs,
): string {
  const fp = args.sender.fingerprint;
  const phone = args.noiseFlags.includes("phone_style");
  let paras = [...coreParas];

  if (!phone) {
    const greet = buildGreeting(fp, args.recipient, args.rand);
    if (greet) {
      if (args.band === "medium" && paras[0]) {
        paras[0] = `${greet} ${paras[0]}`;
      } else {
        paras = [greet, ...paras];
      }
    }
  }

  paras = applyNoiseToParas(paras, args.noiseFlags, args.recipient, args.rand);
  paras = ensureUnevenParagraphs(paras, args.rand);
  paras = trimOrPadParas(paras, args.band, args.rand);

  let body = joinParas(paras);

  if (!phone) {
    const sign = buildSignoff(fp, args.sender, args.rand);
    if (sign) body = `${body}\n\n${sign}`;
  } else {
    body = applyPhoneStyle(body);
  }

  body = sanitizeProse(body);
  body = maybeInjectTypos(body, fp, args.rand);
  body = applyCapitalization(body, fp, args.rand);
  body = punctuationTouch(body, fp, args.rand);
  body = normalizeParagraphs(body);

  if (args.recentBodies?.has(body)) {
    body = normalizeParagraphs(
      `${body}\n\n${fillerPhrase(args.rand)} - ${pickNextStep(args.rand)}`,
    );
  }

  return body.trim();
}

function buildMediumParas(args: ComposeArgs, concrete: ConcreteBundle): string[] {
  const mode = timeMode(args.sender);
  const paras: string[] = [];
  const hedge = hedgePrefix(args.sender.fingerprint, args.rand);
  const opener = pickOpener(args.thread.emotionalRegister, args.rand);
  const digest = premiseDigest(
    args.thread.premise,
    args.facts,
    args.sendTime,
    mode,
    args.rand,
  );
  paras.push(
    withHedge(hedge, `${opener} ${digest}.`).replace(/\.\.$/, "."),
  );

  const facts = factProse(args.facts, args.sendTime, mode, args.rand, 3);
  if (facts) paras.push(facts);
  else paras.push(pickTopicBridge(args.thread.topicDomain, args.rand));

  if (args.history.length) {
    paras.push(
      `${pickHistoryCallback(args.rand)} ${pickTopicBridge(args.thread.topicDomain, args.rand)}`,
    );
  }

  const ask = openQuestionsPara(
    args.thread.openQuestions,
    args.facts,
    args.sendTime,
    mode,
    args.rand,
    false,
  );
  if (ask) paras.push(ask);
  else paras.push(pickNextStep(args.rand));

  if (args.preferQuestionEnding && args.rand() < 0.5) {
    const last = paras[paras.length - 1]!;
    if (!/\?\s*$/.test(last)) {
      paras[paras.length - 1] = `${last.replace(/\.$/, "")}?`;
    }
  }

  if (args.allowLink) {
    paras.push(pickLinkLine(args.rand));
  }

  if (args.thread.substanceLevel !== "trivial" && args.rand() < 0.4) {
    paras.push(concreteDumpPara(concrete, args.rand));
  }

  return paras;
}

function buildLongParas(args: ComposeArgs, concrete: ConcreteBundle): string[] {
  const mode = timeMode(args.sender);
  const paras: string[] = [];
  const hedge = hedgePrefix(args.sender.fingerprint, args.rand);

  paras.push(
    withHedge(
      hedge,
      `${pickOpener(args.thread.emotionalRegister, args.rand)} ${premiseDigest(args.thread.premise, args.facts, args.sendTime, mode, args.rand)}.`,
    ),
  );
  paras.push(pickTopicBridge(args.thread.topicDomain, args.rand));

  const facts = factProse(args.facts, args.sendTime, mode, args.rand, 5);
  if (facts) paras.push(facts);
  paras.push(concreteDumpPara(concrete, args.rand));

  if (concrete.dates[0]) {
    paras.push(
      `On timing, I am treating ${concrete.dates[0]} as the date that matters unless you tell me otherwise.`,
    );
  }

  if (args.thread.substanceLevel === "consequential") {
    paras.push(concrete.tradeoffs[0]!);
    if (args.rand() < 0.6) paras.push(concrete.corrections[0]!);
  } else if (args.rand() < 0.35) {
    paras.push(pickTradeoff(args.rand));
  }

  if (args.history.length) {
    paras.push(
      `${pickHistoryCallback(args.rand)} I do not want us to re-litigate the whole premise, just close the gap that is still open.`,
    );
  }

  paras.push(pickFillerPara(args.rand));
  paras.push(pickPadSentence(args.rand));

  const numbered = args.sender.fingerprint.structure === "numbered_ok" ||
    args.sender.fingerprint.structure === "bullets_ok";
  const asks = openQuestionsPara(
    args.thread.openQuestions,
    args.facts,
    args.sendTime,
    mode,
    args.rand,
    numbered || args.thread.substanceLevel === "consequential",
  );
  if (asks) paras.push(asks);

  paras.push(pickNextStep(args.rand));

  if (args.allowLink) paras.push(pickLinkLine(args.rand));

  if (args.preferQuestionEnding) {
    const q = args.thread.openQuestions[0];
    if (q) {
      paras.push(premiseAlignedToFacts(q, args.facts, args.sendTime, mode, args.rand));
    }
  }

  return paras;
}

function buildAnchorParas(args: ComposeArgs, concrete: ConcreteBundle): string[] {
  const mode = timeMode(args.sender);
  const paras: string[] = [];
  const substance: SubstanceLevel = args.thread.substanceLevel;

  paras.push(
    withHedge(
      hedgePrefix(args.sender.fingerprint, args.rand),
      `${pickOpener(args.thread.emotionalRegister, args.rand)} I am writing a fuller note so we stop losing pieces across half-replies.`,
    ),
  );

  // Full premise restatement (offsets resolved; amounts aligned to facts)
  const fullPremise = premiseAlignedToFacts(
    args.thread.premise,
    args.facts,
    args.sendTime,
    mode,
    args.rand,
  );
  paras.push(`Premise as I understand it: ${fullPremise}`);

  paras.push(pickTopicBridge(args.thread.topicDomain, args.rand));
  paras.push(pickPadSentence(args.rand));

  // Force ≥4 concrete element kinds for consequential
  const needRich = substance === "consequential";
  paras.push(concreteDumpPara(concrete, args.rand));

  if (concrete.dollars[0]) {
    paras.push(
      `Money trail: I am not moving off ${concrete.dollars[0]}${concrete.ids[0] ? ` against ${concrete.ids[0]}` : ""} unless we have a written correction.`,
    );
  }
  if (concrete.parties[0]) {
    paras.push(
      `Third party in the mix is ${concrete.parties[0]}. I do not want them getting a different story than the one we share internally.`,
    );
  }
  if (concrete.dates.length) {
    paras.push(
      `Dates I am anchoring to: ${concrete.dates.slice(0, 3).join("; ")}. If any of those shift, say so explicitly so I can update the tracker.`,
    );
  }
  if (concrete.files[0]) {
    paras.push(
      `Artifact check: please confirm ${concrete.files[0]} is still the current file. I do not want us debating an old revision.`,
    );
  }
  if (concrete.ids.length > 1) {
    paras.push(
      `IDs in play: ${concrete.ids.slice(0, 4).join(", ").replace(/,([^,]*)$/, " and$1")}.`,
    );
  }

  paras.push(concrete.tradeoffs[0]!);
  paras.push(concrete.corrections[0]!);

  if (needRich && countConcreteKinds(concrete) < 4) {
    // Explicitly enumerate leftover kinds to satisfy the bar
    if (!concrete.dollars.length) {
      paras.push(
        "I do not have a clean dollar figure in the facts yet, which is itself a problem for a consequential thread.",
      );
    }
    if (!concrete.dates.length) {
      paras.push(
        "We also lack a crisp date offset, so I am treating timing as TBD until you pin one.",
      );
    }
  }

  const asks = openQuestionsPara(
    args.thread.openQuestions,
    args.facts,
    args.sendTime,
    mode,
    args.rand,
    true,
  );
  if (asks) paras.push(asks);
  else {
    paras.push(
      "Open items I want closed:\n1. Who owns the next action?\n2. What is the drop-dead date?\n3. What happens if we miss it?",
    );
  }

  paras.push(pickFillerPara(args.rand));
  paras.push(pickPadSentence(args.rand));
  paras.push(pickFillerPara(args.rand));

  if (args.history.length) {
    paras.push(
      `${pickHistoryCallback(args.rand)} your earlier note helped, but it did not close the concrete gaps above.`,
    );
  }

  paras.push(
    `Emotional read on my side is ${args.thread.emotionalRegister.replace(/_/g, " ")}, which is why this note is longer than a ping.`,
  );
  paras.push(pickNextStep(args.rand));

  if (args.allowLink) paras.push(pickLinkLine(args.rand));

  // Unique expansions from remaining facts / open items (not generic pads)
  for (const f of shuffle(args.facts, args.rand).slice(0, 4)) {
    if (/^file_\d+$/i.test(f.factKey)) continue;
    const v = describeFactValue(
      f.factValue,
      args.sendTime,
      mode,
      args.rand,
    );
    paras.push(
      `Also keeping ${factPhrase(f.factKey, sanitizeProse(v))} on the board so it does not get dropped in a short reply.`,
    );
  }

  return paras;
}

/**
 * Compose a plain-text body for medium / long / anchor.
 * Returns null for micro/short (caller should use fallback bank).
 */
export function composeLocalBody(args: ComposeArgs): string | null {
  if (args.band === "micro" || args.band === "short") return null;

  const mode = timeMode(args.sender);
  const concrete = collectConcrete({
    thread: args.thread,
    facts: args.facts,
    sendTime: args.sendTime,
    mode,
    rand: args.rand,
  });

  let paras: string[];
  if (args.band === "medium") paras = buildMediumParas(args, concrete);
  else if (args.band === "long") paras = buildLongParas(args, concrete);
  else paras = buildAnchorParas(args, concrete);

  // Soft directness / blunt trimming
  if (args.sender.fingerprint.directness === "blunt" && paras.length > 3) {
    paras = paras.filter((_, i) => i === 0 || i >= paras.length - 2 || args.rand() < 0.7);
  }

  return wrapWithVoice(paras, args);
}

export { collectConcrete, countConcreteKinds };
