/**
 * Local composition engine entry.
 */
export { composeLocalBody } from "./assemble.js";
export type { ComposeArgs } from "./assemble.js";
export {
  phraseForOffset,
  resolveOffsetsInText,
  describeFactValue,
} from "./dates.js";
export { sanitizeProse, stripDashes } from "./sanitize.js";
