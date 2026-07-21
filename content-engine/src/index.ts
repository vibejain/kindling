export type {
  ArcTemplate,
  LengthBand,
  TopicDomain,
  EmotionalRegister,
  ThreadStatus,
  SubstanceLevel,
  CurrencyCode,
  Universe,
  UniverseEntities,
  WritingFingerprint,
  Persona,
  EstablishedFact,
  PlannedThread,
  PlannerCorpusTargets,
} from "./types/index.js";

export {
  CORPUS_TARGETS,
  TOPIC_DOMAINS,
  LONG_ELIGIBLE_TOPICS,
  SHORT_MICRO_ONLY_TOPICS,
  allowedBandsForTopic,
  offsetDays,
  parseOffsetDays,
} from "./types/index.js";

export {
  seedPersonas,
  findTooSimilarPairs,
  fingerprintDistance,
  MIN_FINGERPRINT_DISTANCE,
  getPersonaByEmail,
  personasInUniverse,
} from "./personas/seed.js";

export {
  UNIVERSES,
  getUniverse,
  universeEntityTokens,
  allNamedEntities,
} from "./universes/catalog.js";

export {
  ValidationError,
  buildEntityUniverseMap,
  validateNoEntityLeak,
  validateThread,
  validateCorpus,
  entityUniverseAppearanceMap,
} from "./validator/universe.js";

export {
  validateGeneratedMessage,
  findFactContradiction,
  hasOxfordComma,
  resolveFactValue,
  checkFingerprint,
} from "./validator/message.js";

export {
  planThreads,
  summarizeCorpus,
  bandHistogramFromArcs,
  getUniverseMeta,
  planThreadForPair,
} from "./planner/thread-planner.js";
export type { PlanThreadsOptions } from "./planner/thread-planner.js";

export {
  databaseUrl,
  createClient,
  applyMigrations,
  upsertUniverses,
  upsertPersonas,
  persistThreads,
  countEstablishedFacts,
  persistGeneratedMessage,
  appendEstablishedFacts,
  updateThreadProgress,
  loadThreadBundle,
  countMessages,
  listThreadIds,
  findOpenThreadForPair,
  loadPersonaByEmail,
} from "./db/persist.js";
export type { ThreadBundle } from "./db/persist.js";

export {
  detectLlmProvider,
  completeChat,
  llmOptInEnabled,
} from "./llm/client.js";

export { composeLocalBody } from "./compose/index.js";

export {
  LENGTH_BAND_WORDS,
  acceptableWordRange,
  countWords,
  BANNED_WORDS,
  BANNED_PHRASES,
  HUMAN_NOISE_RATES,
  QUESTION_ENDING_CAP,
  LINK_RATE,
  FALLBACK_BANDS,
} from "./rules/constants.js";

export {
  FALLBACK_TEMPLATES,
  FALLBACK_BANK_COUNT,
  pickFallbackTemplate,
} from "./fallback/bank.js";

export {
  createThreadGenerationState,
  generateMessageForSlot,
  generateThreadMessages,
} from "./generator/generate.js";
export { generateNextMessage } from "./generator/next.js";
export { extractFactsFromMessage } from "./generator/facts.js";
export type {
  GeneratedMessageRecord,
  MessageMeta,
} from "./generator/types.js";
