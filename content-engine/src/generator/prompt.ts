/**
 * Prompt assembly for one message generation call.
 */
import type {
  EstablishedFact,
  LengthBand,
  Persona,
  PlannedThread,
} from "../types/index.js";
import { LENGTH_BAND_WORDS } from "../rules/constants.js";
import { resolveFactValue } from "../validator/message.js";
import type { NoiseFlag } from "./noise.js";
import { noiseInstructions } from "./noise.js";
import type { GeneratedMessageRecord } from "./types.js";

export function buildSystemPrompt(): string {
  return `You write plain-text business emails for a warmup mesh. Output ONLY the email body text. No subject line. No HTML. No markdown fences.

Hard rules:
- No em dashes or en dashes. Use commas or hyphens.
- Prefer no Oxford commas.
- Never open with "I hope this email finds you well" or variants.
- Never use: delve, leverage, robust, seamless, streamline, elevate, moreover, furthermore, "in today's landscape", "it's worth noting", "that said".
- Never use promo words: free, offer, deal, limited, exclusive, save, discount, guaranteed, act now, click, unlock, boost.
- Do not write exactly three balanced paragraphs.
- Do not end with a tidy summarizing sentence.
- No bullets in micro or short messages.
- Stay consistent with established_facts. Never contradict amounts, IDs, names, or dates.
- Match the sender persona fingerprint tightly.
- Plain text only. At most one link, and only if instructed; links only to neutral domains (docs.google.com, drive.google.com, calendar.google.com, github.com, major shippers).`;
}

export function buildUserPrompt(args: {
  thread: PlannedThread;
  history: GeneratedMessageRecord[];
  sequenceIndex: number;
  band: LengthBand;
  sender: Persona;
  recipient: Persona;
  facts: EstablishedFact[];
  noiseFlags: NoiseFlag[];
  allowLink: boolean;
  preferQuestionEnding: boolean;
  sendTime: Date;
}): string {
  const { min, max } = LENGTH_BAND_WORDS[args.band];
  const factsBlock = args.facts.length
    ? args.facts
        .map(
          (f) =>
            `- ${f.factKey}: ${resolveFactValue(f.factValue, args.sendTime)} (raw=${f.factValue})`,
        )
        .join("\n")
    : "(none yet)";

  const historyBlock = args.history.length
    ? args.history
        .map(
          (m) =>
            `--- message ${m.sequenceIndex} from ${m.fromEmail} ---\nSubject: ${m.subject}\n${m.bodyText}`,
        )
        .join("\n\n")
    : "(no prior messages)";

  const fp = args.sender.fingerprint;

  return `Thread premise:
${args.thread.premise}

Topic: ${args.thread.topicDomain}
Arc: ${args.thread.arcTemplate}
Substance: ${args.thread.substanceLevel}
Emotional register: ${args.thread.emotionalRegister}
Cross-universe: ${args.thread.crossUniverse}

Sender (write as this person):
- email: ${args.sender.email}
- display/From: ${args.sender.displayName}
- signature name: ${args.sender.signatureName}
- role: ${args.sender.roleTitle} @ ${args.sender.company}
- fingerprint: ${JSON.stringify(fp)}

Recipient:
- ${args.recipient.displayName} <${args.recipient.email}> (${args.recipient.roleTitle})

Established facts (MUST stay consistent):
${factsBlock}

Open questions:
${args.thread.openQuestions.map((q) => `- ${q}`).join("\n") || "(none)"}

Thread history:
${historyBlock}

Target for THIS message:
- sequence_index: ${args.sequenceIndex}
- length band: ${args.band} (about ${min}-${max} words; stay inside that band)
- allow_link: ${args.allowLink}
- prefer_question_ending: ${args.preferQuestionEnding}
- ${noiseInstructions(args.noiseFlags)}

Write the next message body now.`;
}
