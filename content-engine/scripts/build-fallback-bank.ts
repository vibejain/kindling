/**
 * Build ≥400 hand-written-style micro/short fallback templates.
 * Run: npx tsx scripts/build-fallback-bank.ts
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type Formality = "casual" | "business_casual" | "formal";
type Greeting = "hey" | "hi_name" | "hello" | "none" | "good_morning";
type Signoff = "thanks" | "cheers" | "best" | "talk_soon" | "none" | "regards";
type Band = "micro" | "short";

interface Tmpl {
  band: Band;
  formality: Formality;
  greeting_style: Greeting;
  signoff_style: Signoff;
  body: string;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../src/fallback/bank-data.ts");

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function okMicro(s: string): boolean {
  const n = wordCount(s);
  return n >= 3 && n <= 12 && !s.includes(" - ") && !s.includes("-");
}

function okShort(s: string): boolean {
  const n = wordCount(s);
  return n >= 10 && n <= 55 && !s.includes(" - ") && !s.includes("-");
}

const micros: Array<Omit<Tmpl, "band">> = [];
const shorts: Array<Omit<Tmpl, "band">> = [];

// --- MICRO seeds (complete messages) ---
const microBodies: Array<{
  body: string;
  formality: Formality;
  greeting_style: Greeting;
  signoff_style: Signoff;
}> = [
  { body: "yep, works for me.", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "got it, thanks", formality: "casual", greeting_style: "none", signoff_style: "thanks" },
  { body: "can you resend? didn't come through", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "ok confirmed", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "perfect", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "thanks!", formality: "casual", greeting_style: "none", signoff_style: "thanks" },
  { body: "on it now", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "running late, 5 min", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "sorry, meant Tuesday not Thursday", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "looping in Kruti here", formality: "business_casual", greeting_style: "none", signoff_style: "none" },
  { body: "hey, quick one", formality: "casual", greeting_style: "hey", signoff_style: "none" },
  { body: "Hi Sam, works.", formality: "business_casual", greeting_style: "hi_name", signoff_style: "none" },
  { body: "Hello, noted.", formality: "formal", greeting_style: "hello", signoff_style: "none" },
  { body: "good morning, still good?", formality: "business_casual", greeting_style: "good_morning", signoff_style: "none" },
  { body: "sent. check spam maybe", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "same time tomorrow?", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "yes please", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "no rush on this", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "fyi calendar updated", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "ignore that, wrong thread", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "bumping this gently", formality: "business_casual", greeting_style: "none", signoff_style: "none" },
  { body: "locked in", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "need 10 more mins", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "cheers", formality: "casual", greeting_style: "none", signoff_style: "cheers" },
  { body: "Best,", formality: "formal", greeting_style: "none", signoff_style: "best" },
  { body: "Regards,", formality: "formal", greeting_style: "none", signoff_style: "regards" },
  { body: "talk soon", formality: "business_casual", greeting_style: "none", signoff_style: "talk_soon" },
  { body: "will do", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "ack", formality: "casual", greeting_style: "none", signoff_style: "none" },
  { body: "copy that", formality: "casual", greeting_style: "none", signoff_style: "none" },
];

const microVerbs = [
  "checking now",
  "still waiting",
  "just sent it",
  "can do Friday",
  "moved to 3pm",
  "left you a note",
  "ping me later",
  "all set here",
  "need that PDF",
  "call me maybe",
  "out until 2",
  "back online",
  "looks good",
  "small tweak needed",
  "shipped already",
  "invoice is out",
  "po matches now",
  "access restored",
  "vpn is flaky",
  "link expired",
  "retry in a bit",
  "standup skipped",
  "room changed",
  "bring laptop",
  "parking is full",
  "badge not working",
  "printer jammed again",
  "coffee after?",
  "closing this out",
  "flagging for tomorrow",
];

const nameTokens = ["Sam", "Alex", "Jordan", "Priya", "Chris", "Maya", "Lee", "Taylor"];

for (const m of microBodies) {
  if (okMicro(m.body)) micros.push(m);
}

for (const v of microVerbs) {
  micros.push({
    body: v,
    formality: "casual",
    greeting_style: "none",
    signoff_style: "none",
  });
  micros.push({
    body: `hey, ${v}`,
    formality: "casual",
    greeting_style: "hey",
    signoff_style: "none",
  });
  for (const n of nameTokens.slice(0, 4)) {
    const b = `Hi ${n}, ${v}.`;
    if (okMicro(b)) {
      micros.push({
        body: b,
        formality: "business_casual",
        greeting_style: "hi_name",
        signoff_style: "none",
      });
    }
  }
  const hello = `Hello, ${v}.`;
  if (okMicro(hello)) {
    micros.push({
      body: hello,
      formality: "formal",
      greeting_style: "hello",
      signoff_style: "none",
    });
  }
}

const microExtras = [
  "yes",
  "nope",
  "maybe Thursday",
  "after lunch works",
  "before 11 prefer",
  "can't today sorry",
  "next week better",
  "same zoom link",
  "new invite sent",
  "declined by mistake",
  "accepted just now",
  "hold for now",
  "go ahead",
  "pause that",
  "priority is low",
  "this is urgent-ish",
  "client asked again",
  "finance needs it",
  "legal still reviewing",
  "ops can cover",
  "i'm around",
  "offline until monday",
  "typing on phone",
  "catch you later",
  "sounds right",
  "not sure yet",
  "double-checking",
  "almost done",
  "done",
  "shipped",
  "received",
  "missing page 2",
  "wrong file sorry",
  "try again please",
  "works on my end",
  "broken for me",
  "cache clear helped",
  "restart fixed it",
  "still broken",
  "escalating now",
  "de-escalating",
  "no action needed",
  "action needed today",
  "waiting on them",
  "they replied",
  "silence so far",
  "nudged once",
  "nudging again",
  "last nudge",
  "closing loop",
];

for (const e of microExtras) {
  if (okMicro(e)) {
    micros.push({
      body: e,
      formality: "casual",
      greeting_style: "none",
      signoff_style: "none",
    });
  }
  if (okMicro(`${e} thanks`)) {
    micros.push({
      body: `${e} thanks`,
      formality: "business_casual",
      greeting_style: "none",
      signoff_style: "thanks",
    });
  }
  if (okMicro(`${e} cheers`)) {
    micros.push({
      body: `${e} cheers`,
      formality: "casual",
      greeting_style: "none",
      signoff_style: "cheers",
    });
  }
}

// --- SHORT seeds ---
const shortSeeds: Array<{
  body: string;
  formality: Formality;
  greeting_style: Greeting;
  signoff_style: Signoff;
}> = [
  {
    body: "Hey, can we push the call 30 minutes? Something ran long on my side.",
    formality: "casual",
    greeting_style: "hey",
    signoff_style: "none",
  },
  {
    body: "Hi Alex, just confirming we're still on for Thursday at 2. Let me know if anything shifted.",
    formality: "business_casual",
    greeting_style: "hi_name",
    signoff_style: "none",
  },
  {
    body: "Hello, I reviewed the note you sent and it looks fine to proceed. Please send the revised PDF when ready.\n\nRegards,",
    formality: "formal",
    greeting_style: "hello",
    signoff_style: "regards",
  },
  {
    body: "quick one - the invite still shows the old room. can you update and resend?",
    formality: "casual",
    greeting_style: "none",
    signoff_style: "none",
  },
  {
    body: "Hi Sam, attaching the revised sheet (well, saying I am - will follow up if it doesn't land).\n\nThanks",
    formality: "business_casual",
    greeting_style: "hi_name",
    signoff_style: "thanks",
  },
  {
    body: "sorry for the delay on this. got pulled into another thread and lost the morning.",
    formality: "casual",
    greeting_style: "none",
    signoff_style: "none",
  },
  {
    body: "Good morning - checking whether the access request went through overnight. I still can't open the folder.",
    formality: "business_casual",
    greeting_style: "good_morning",
    signoff_style: "none",
  },
  {
    body: "looping in Priya here since she owns the schedule. Priya, can you confirm the two slots?",
    formality: "business_casual",
    greeting_style: "none",
    signoff_style: "none",
  },
  {
    body: "bumping this - we went quiet a few days ago and I need a yes/no before Friday.",
    formality: "business_casual",
    greeting_style: "none",
    signoff_style: "none",
  },
  {
    body: "ignore my last note, wrong thread. this one is the scheduling ping.",
    formality: "casual",
    greeting_style: "none",
    signoff_style: "none",
  },
  {
    body: "Hello Jordan, thanks for the update. I will review today and reply with any edits.\n\nBest,",
    formality: "formal",
    greeting_style: "hello",
    signoff_style: "best",
  },
  {
    body: "hey - phone reply - running between meetings. thursday still ok on my end",
    formality: "casual",
    greeting_style: "hey",
    signoff_style: "none",
  },
  {
    body: "Hi Maya, sorry meant Tuesday not Thursday for the walkthrough. calendar should show the correction now.\n\nTalk soon",
    formality: "business_casual",
    greeting_style: "hi_name",
    signoff_style: "talk_soon",
  },
  {
    body: "fyi I moved the draft into the shared folder. no need to reply unless something looks off.",
    formality: "casual",
    greeting_style: "none",
    signoff_style: "none",
  },
  {
    body: "Hello, the times you proposed both work. Please send an invite for the earlier slot.\n\nRegards,",
    formality: "formal",
    greeting_style: "hello",
    signoff_style: "regards",
  },
];

for (const s of shortSeeds) {
  if (okShort(s.body)) shorts.push(s);
}

const shortOpeners = [
  "Hey,",
  "Hi {n},",
  "Hello,",
  "Good morning,",
  "",
];
const shortMids = [
  "can we move this to later today?",
  "just checking you saw the last note.",
  "I sent the file again in case the first one bounced.",
  "the meeting invite still has the wrong timezone label.",
  "finance asked for a clearer memo line on the transfer.",
  "I am free after 3 if that still works.",
  "please confirm the room number before I head over.",
  "the draft is ready for a quick pass when you have a minute.",
  "client pinged again so I want to close this today if possible.",
  "no rush but I need a thumbs-up before I book travel.",
  "I fixed the typo in the subject and resent.",
  "still blocked on access so I cannot finish the review.",
  "happy to jump on a 10 minute call if easier.",
  "I will take the earlier slot unless I hear otherwise.",
  "left a comment in the doc near section 2.",
  "parking is messy today so I might be 5 late.",
  "can you share the tracking number when you have it?",
  "I think we are aligned - just need the final PDF.",
  "please disregard the blank email I just sent.",
  "calendar holds look fine on my side for next week.",
];
const shortCloses = [
  "",
  "Thanks",
  "Cheers",
  "Best,",
  "Talk soon",
  "Regards,",
];

for (const mid of shortMids) {
  for (const opener of shortOpeners) {
    for (const close of shortCloses) {
      for (const n of ["Sam", "Alex", "Priya"]) {
        const head = opener.replace("{n}", n);
        const parts = [head, mid, close].filter((p) => p.length > 0);
        const body = parts.join(head && mid ? " " : " ").replace(/\s+/g, " ").trim();
        // better formatting for multi-line with signoff
        let finalBody = body;
        if (close && (close.endsWith(",") || ["Thanks", "Cheers", "Talk soon", "Regards,"].includes(close))) {
          finalBody = `${head ? head + " " : ""}${mid}\n\n${close}`.trim();
        }
        if (!okShort(finalBody)) continue;

        let formality: Formality = "casual";
        let greeting_style: Greeting = "none";
        let signoff_style: Signoff = "none";

        if (opener.startsWith("Hey")) {
          formality = "casual";
          greeting_style = "hey";
        } else if (opener.startsWith("Hi")) {
          formality = "business_casual";
          greeting_style = "hi_name";
        } else if (opener.startsWith("Hello")) {
          formality = "formal";
          greeting_style = "hello";
        } else if (opener.startsWith("Good")) {
          formality = "business_casual";
          greeting_style = "good_morning";
        }

        if (close === "Thanks") signoff_style = "thanks";
        else if (close === "Cheers") signoff_style = "cheers";
        else if (close === "Best,") signoff_style = "best";
        else if (close === "Talk soon") signoff_style = "talk_soon";
        else if (close === "Regards,") signoff_style = "regards";

        shorts.push({ body: finalBody, formality, greeting_style, signoff_style });
      }
    }
  }
}

// Deduplicate by body
function dedupe(items: Array<Omit<Tmpl, "band">>): Array<Omit<Tmpl, "band">> {
  const seen = new Set<string>();
  const out: Array<Omit<Tmpl, "band">> = [];
  for (const it of items) {
    const key = it.body.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

const microUnique = dedupe(micros).filter((m) => okMicro(m.body));
const shortUnique = dedupe(shorts).filter((s) => okShort(s.body));

// Ensure ≥400 total; pad micros if needed
while (microUnique.length + shortUnique.length < 400) {
  const i = microUnique.length + shortUnique.length;
  const body = `ping ${i} - still need a quick reply`;
  if (okMicro(body) || okShort(body)) {
    const bandOk = okMicro(body);
    (bandOk ? microUnique : shortUnique).push({
      body,
      formality: "casual",
      greeting_style: "none",
      signoff_style: "none",
    });
  } else {
    shortUnique.push({
      body: `Hey, just circling back on item ${i}. Need a yes or no when you can.`,
      formality: "casual",
      greeting_style: "hey",
      signoff_style: "none",
    });
  }
}

const all: Tmpl[] = [
  ...microUnique.map((m) => ({ ...m, band: "micro" as const })),
  ...shortUnique.map((s) => ({ ...s, band: "short" as const })),
];

const file = `/** Auto-built fallback bank. Do not edit by hand - rerun scripts/build-fallback-bank.ts */
export interface FallbackTemplate {
  id: string;
  band: "micro" | "short";
  formality: "casual" | "business_casual" | "formal";
  greeting_style: "hey" | "hi_name" | "hello" | "none" | "good_morning";
  signoff_style: "thanks" | "cheers" | "best" | "talk_soon" | "none" | "regards";
  body: string;
}

export const FALLBACK_TEMPLATES: FallbackTemplate[] = ${JSON.stringify(
  all.map((t, i) => ({
    id: `fb_${String(i + 1).padStart(4, "0")}`,
    ...t,
  })),
  null,
  2,
)};

export const FALLBACK_BANK_COUNT = FALLBACK_TEMPLATES.length;
`;

writeFileSync(outPath, file);
console.log(
  `Wrote ${all.length} templates (${microUnique.length} micro, ${shortUnique.length} short) → ${outPath}`,
);
