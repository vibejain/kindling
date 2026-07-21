/**
 * Shared generator types.
 */
import type { LengthBand, Persona } from "../types/index.js";
import type { NoiseFlag } from "./noise.js";
import type { SubjectStyle } from "../rules/constants.js";

export interface GeneratedMessageRecord {
  id: string;
  threadId: string;
  sequenceIndex: number;
  fromPersonaId: string;
  toPersonaId: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  bodyText: string;
  plannedLength: LengthBand;
  role: "outbound" | "reply";
  meta: MessageMeta;
}

export interface MessageMeta {
  /** compose = local template engine (default); llm only if CONTENT_ENGINE_USE_LLM=1 */
  source: "compose" | "llm" | "fallback" | "stub";
  provider?: "openai" | "anthropic";
  model?: string;
  attempts: number;
  wordCount: number;
  noiseFlags: NoiseFlag[];
  subjectStyle: SubjectStyle;
  validationReasons?: string[];
  cached?: boolean;
  allowLink?: boolean;
  questionEnding?: boolean;
}

export interface GenerateSlotInput {
  threadId: string;
  sequenceIndex: number;
  band: LengthBand;
  sender: Persona;
  recipient: Persona;
  subject: string;
  subjectStyle: SubjectStyle;
  noiseFlags: NoiseFlag[];
  allowLink: boolean;
  preferQuestionEnding: boolean;
}
