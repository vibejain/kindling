/**
 * Topic-scoped paragraph / sentence banks for the composition engine.
 * Snippets are generic (no hard-coded universe entities) so they cannot leak.
 * Concrete entities are injected from thread facts / premise at assemble time.
 */
import type { EmotionalRegister, TopicDomain } from "../types/index.js";

function pick<T>(arr: readonly T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]!;
}

/** Opening frames keyed loosely by register. */
const OPENERS: Record<EmotionalRegister, string[]> = {
  neutral_professional: [
    "Wanted to get this on paper while the details are still fresh.",
    "Flagging this so we are not talking past each other.",
    "Quick status so we can decide what to do next.",
  ],
  friendly_casual: [
    "Quick one from my side.",
    "Catching up on this thread.",
    "Just pinging you on this before it slips.",
  ],
  slightly_stressed: [
    "This is getting tight on timing and I want to surface it now.",
    "I am a bit worried we are drifting on this.",
    "Need to pressure-check this before it becomes a mess.",
  ],
  apologetic: [
    "Sorry this bounced around a bit on my end.",
    "Owning the miss here and trying to clean it up.",
    "Apologies for the churn on this.",
  ],
  assertive: [
    "We need a clear call on this.",
    "I want a decision before we spend more cycles.",
    "Putting a stake in the ground so we can move.",
  ],
  warm_collaborative: [
    "Happy to reshape this with you if the plan needs air.",
    "Figured we could tighten this together.",
    "Wanted to sync so neither of us is guessing.",
  ],
  terse_busy: [
    "Short version:",
    "Need a call either way.",
    "Status:",
  ],
};

const TOPIC_BRIDGES: Record<TopicDomain, string[]> = {
  project_status: [
    "On the project side, the blocker is less about effort and more about who owns the next gate.",
    "Activation metrics are soft against the target, so I do not want us pretending we are on plan.",
    "The workstream is still moving, but the dependency chain is the real risk.",
  ],
  scheduling: [
    "Calendar-wise I can make a couple of windows work if we lock one today.",
    "Happy to move the hold if your morning is more open than mine.",
    "If we cannot find a slot this week, we should just pick the least-bad option and stick to it.",
  ],
  invoices: [
    "Billing side: I do not want this sitting in limbo while both APs swear they already paid.",
    "I re-checked the remittance trail and it still does not match the PDF we have on file.",
    "Until the wire ref clears, I am treating the invoice as outstanding.",
  ],
  scope: [
    "Scope creep is the issue. The ask is real, but it was not in the original package.",
    "If we absorb this without a change order, we eat the hours and set a bad precedent.",
    "I can draft a thin CO outline, but I need a yes/no on whether we even entertain it.",
  ],
  vendor: [
    "Vendor lead time is the swing factor. Cheaper option costs us calendar days.",
    "I would rather pay for the shop that can hit the proof date than chase a late delivery.",
    "Need a PO cut soon or we lose the slot they reserved.",
  ],
  hiring: [
    "Interview logistics are the bottleneck more than the candidate right now.",
    "If we slip the panel slots, their notice period starts pushing the start date out.",
    "I can send holds once we agree on two workable windows.",
  ],
  legal: [
    "The redline is not cosmetic. Cap and terminate-for-convenience change the risk math.",
    "Playbook says hold the line, but I will escalate if you want a commercial exception.",
    "I would rather settle the clause now than re-open it after countersign.",
  ],
  it: [
    "Access is still flaky on my side. I can live with it for a day, not a week.",
    "If SSO keeps bouncing, we should open a ticket instead of bouncing screenshots.",
    "I already tried the usual reset path. Same error.",
  ],
  client_feedback: [
    "Client tone after that session was rough, and I do not want us to shrug it off.",
    "The demo mismatch is fixable, but only if we schedule the makeup while they are still willing.",
    "I would rather over-communicate the recovery plan than hope they cool off.",
  ],
  ops: [
    "Facilities/ops item, not dramatic, but it will keep pinging until someone badges them in.",
    "If nobody owns this, it just sits.",
    "Low urgency unless you need it today.",
  ],
  meeting_recaps: [
    "Recap so action owners are not tribal knowledge.",
    "I do not think we emailed the owners after the sync, which is why this feels fuzzy.",
    "Happy to turn this into a one-pager if that helps more than a long thread.",
  ],
  apologies: [
    "I own the scheduling miss and I am not looking for a soft landing.",
    "They waited, and that is on us.",
    "I want to rebook cleanly rather than stack another half-apology on top.",
  ],
};

const TRADEOFFS = [
  "Tradeoff is speed versus cost. I am biased toward the option that protects the date.",
  "We can absorb a bit of pain now or pay more later when the dependency slips.",
  "If we wait for perfect info we will miss the window. Imperfect call beats silence.",
  "Either we cut scope or we add budget. Doing neither is how this goes sideways.",
];

const CORRECTIONS = [
  "Correction from earlier: I had the day wrong in my head.",
  "Quick self-edit: ignore my first pass on the date.",
  "Re-reading my note, I understated the hours. Updating that here.",
  "One fix: the version I mentioned was off by a point release.",
];

const NEXT_STEPS = [
  "Can you confirm so I can update the tracker?",
  "Reply with a yes/no and I will take the next action.",
  "If this still looks right on your side, I will push it forward today.",
  "Tell me if you want me to draft the follow-up or if you will.",
  "I can hold until end of day, then I need to escalate.",
];

const HISTORY_CALLBACKS = [
  "Building on your last note,",
  "Following your point from earlier,",
  "Agree with the direction you floated,",
  "Picking up where we left it,",
];

const FILLER_PARAS = [
  "I do not love how many open loops we still have on this, so I am writing it out even if some of it is obvious.",
  "Happy to jump on a short call if email is the wrong medium for the call.",
  "Nothing here is meant to be dramatic. I just want the same facts in both of our heads.",
  "If any of the numbers look off, flag it and I will re-pull the source.",
  "I already pinged the other thread separately so we are not cross-contaminating details.",
  "I kept this plain text on purpose. No deck, no fancy formatting.",
  "On timing, I would rather be early and wrong than late and precise.",
  "If you are slammed, even a one-line reply helps me know whether to wait or move.",
];

const LINK_LINES = [
  "Doc is here if useful: https://docs.google.com/document/d/warmup-notes/edit",
  "Tracker: https://docs.google.com/spreadsheets/d/warmup-tracker/edit",
  "Calendar hold draft: https://calendar.google.com/calendar/u/0/r",
  "Repo note: https://github.com/example/warmup-notes",
];

export function pickOpener(
  register: EmotionalRegister,
  rand: () => number,
): string {
  return pick(OPENERS[register], rand);
}

export function pickTopicBridge(topic: TopicDomain, rand: () => number): string {
  return pick(TOPIC_BRIDGES[topic], rand);
}

export function pickTradeoff(rand: () => number): string {
  return pick(TRADEOFFS, rand);
}

export function pickCorrection(rand: () => number): string {
  return pick(CORRECTIONS, rand);
}

export function pickNextStep(rand: () => number): string {
  return pick(NEXT_STEPS, rand);
}

export function pickHistoryCallback(rand: () => number): string {
  return pick(HISTORY_CALLBACKS, rand);
}

export function pickFillerPara(rand: () => number): string {
  return pick(FILLER_PARAS, rand);
}

export function pickLinkLine(rand: () => number): string {
  return pick(LINK_LINES, rand);
}

/** Extra mid-length sentence stems for padding long/anchor bodies. */
const PAD_SENTENCES = [
  "I double-checked the thread history before writing this so I was not inventing a new version of events.",
  "If the other side pushes back, I would rather we have a written position ready than scramble live.",
  "None of this needs a meeting unless you want one. Email works if we stay concrete.",
  "I will keep the tone calm with the client, but internally I want us aligned on the hard bits.",
  "Please push back if I am overweighting one fact. I would rather correct now.",
  "This is the same story I told in standup, just with the numbers attached.",
  "I am not asking for a novel reply. Confirmation or a correction is enough.",
  "Once we close the open question I can archive the rest of the noise.",
  "I left the fuzzy parts out on purpose so we are not debating ghosts.",
  "If my read of the premise is wrong, say so in one line and I will rewrite.",
  "I can take the next action as soon as the open item is answered.",
  "Still prefer a written trail over a hallway agreement on this one.",
  "I am copying the concrete bits so nobody has to dig through prior replies.",
  "Happy to shorten this later. Right now completeness beats polish.",
  "If calendar is the real blocker, tell me and I will stop chasing content.",
  "I already cross-checked the ID prefixes against our tracker.",
  "Not trying to escalate mood, just trying to stop the details from drifting.",
  "When you reply, even a partial answer helps more than silence.",
];

export function pickPadSentence(rand: () => number): string {
  return pick(PAD_SENTENCES, rand);
}
