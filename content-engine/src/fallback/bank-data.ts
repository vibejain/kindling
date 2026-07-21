/** Auto-built fallback bank. Do not edit by hand - rerun scripts/build-fallback-bank.ts */
export interface FallbackTemplate {
  id: string;
  band: "micro" | "short";
  formality: "casual" | "business_casual" | "formal";
  greeting_style: "hey" | "hi_name" | "hello" | "none" | "good_morning";
  signoff_style: "thanks" | "cheers" | "best" | "talk_soon" | "none" | "regards";
  body: string;
}

export const FALLBACK_TEMPLATES: FallbackTemplate[] = [
  {
    "id": "fb_0001",
    "body": "yep, works for me.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0002",
    "body": "got it, thanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0003",
    "body": "can you resend? didn't come through",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0004",
    "body": "on it now",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0005",
    "body": "running late, 5 min",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0006",
    "body": "sorry, meant Tuesday not Thursday",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0007",
    "body": "looping in Kruti here",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0008",
    "body": "hey, quick one",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0009",
    "body": "Hi Sam, works.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0010",
    "body": "good morning, still good?",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0011",
    "body": "sent. check spam maybe",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0012",
    "body": "same time tomorrow?",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0013",
    "body": "no rush on this",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0014",
    "body": "fyi calendar updated",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0015",
    "body": "ignore that, wrong thread",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0016",
    "body": "bumping this gently",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0017",
    "body": "need 10 more mins",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0018",
    "body": "hey, checking now",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0019",
    "body": "Hi Sam, checking now.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0020",
    "body": "Hi Alex, checking now.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0021",
    "body": "Hi Jordan, checking now.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0022",
    "body": "Hi Priya, checking now.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0023",
    "body": "Hello, checking now.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0024",
    "body": "hey, still waiting",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0025",
    "body": "Hi Sam, still waiting.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0026",
    "body": "Hi Alex, still waiting.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0027",
    "body": "Hi Jordan, still waiting.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0028",
    "body": "Hi Priya, still waiting.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0029",
    "body": "Hello, still waiting.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0030",
    "body": "just sent it",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0031",
    "body": "hey, just sent it",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0032",
    "body": "Hi Sam, just sent it.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0033",
    "body": "Hi Alex, just sent it.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0034",
    "body": "Hi Jordan, just sent it.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0035",
    "body": "Hi Priya, just sent it.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0036",
    "body": "Hello, just sent it.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0037",
    "body": "can do Friday",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0038",
    "body": "hey, can do Friday",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0039",
    "body": "Hi Sam, can do Friday.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0040",
    "body": "Hi Alex, can do Friday.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0041",
    "body": "Hi Jordan, can do Friday.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0042",
    "body": "Hi Priya, can do Friday.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0043",
    "body": "Hello, can do Friday.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0044",
    "body": "moved to 3pm",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0045",
    "body": "hey, moved to 3pm",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0046",
    "body": "Hi Sam, moved to 3pm.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0047",
    "body": "Hi Alex, moved to 3pm.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0048",
    "body": "Hi Jordan, moved to 3pm.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0049",
    "body": "Hi Priya, moved to 3pm.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0050",
    "body": "Hello, moved to 3pm.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0051",
    "body": "left you a note",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0052",
    "body": "hey, left you a note",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0053",
    "body": "Hi Sam, left you a note.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0054",
    "body": "Hi Alex, left you a note.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0055",
    "body": "Hi Jordan, left you a note.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0056",
    "body": "Hi Priya, left you a note.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0057",
    "body": "Hello, left you a note.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0058",
    "body": "ping me later",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0059",
    "body": "hey, ping me later",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0060",
    "body": "Hi Sam, ping me later.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0061",
    "body": "Hi Alex, ping me later.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0062",
    "body": "Hi Jordan, ping me later.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0063",
    "body": "Hi Priya, ping me later.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0064",
    "body": "Hello, ping me later.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0065",
    "body": "all set here",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0066",
    "body": "hey, all set here",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0067",
    "body": "Hi Sam, all set here.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0068",
    "body": "Hi Alex, all set here.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0069",
    "body": "Hi Jordan, all set here.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0070",
    "body": "Hi Priya, all set here.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0071",
    "body": "Hello, all set here.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0072",
    "body": "need that PDF",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0073",
    "body": "hey, need that PDF",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0074",
    "body": "Hi Sam, need that PDF.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0075",
    "body": "Hi Alex, need that PDF.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0076",
    "body": "Hi Jordan, need that PDF.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0077",
    "body": "Hi Priya, need that PDF.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0078",
    "body": "Hello, need that PDF.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0079",
    "body": "call me maybe",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0080",
    "body": "hey, call me maybe",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0081",
    "body": "Hi Sam, call me maybe.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0082",
    "body": "Hi Alex, call me maybe.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0083",
    "body": "Hi Jordan, call me maybe.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0084",
    "body": "Hi Priya, call me maybe.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0085",
    "body": "Hello, call me maybe.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0086",
    "body": "out until 2",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0087",
    "body": "hey, out until 2",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0088",
    "body": "Hi Sam, out until 2.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0089",
    "body": "Hi Alex, out until 2.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0090",
    "body": "Hi Jordan, out until 2.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0091",
    "body": "Hi Priya, out until 2.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0092",
    "body": "Hello, out until 2.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0093",
    "body": "hey, back online",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0094",
    "body": "Hi Sam, back online.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0095",
    "body": "Hi Alex, back online.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0096",
    "body": "Hi Jordan, back online.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0097",
    "body": "Hi Priya, back online.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0098",
    "body": "Hello, back online.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0099",
    "body": "hey, looks good",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0100",
    "body": "Hi Sam, looks good.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0101",
    "body": "Hi Alex, looks good.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0102",
    "body": "Hi Jordan, looks good.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0103",
    "body": "Hi Priya, looks good.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0104",
    "body": "Hello, looks good.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0105",
    "body": "small tweak needed",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0106",
    "body": "hey, small tweak needed",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0107",
    "body": "Hi Sam, small tweak needed.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0108",
    "body": "Hi Alex, small tweak needed.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0109",
    "body": "Hi Jordan, small tweak needed.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0110",
    "body": "Hi Priya, small tweak needed.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0111",
    "body": "Hello, small tweak needed.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0112",
    "body": "hey, shipped already",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0113",
    "body": "Hi Sam, shipped already.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0114",
    "body": "Hi Alex, shipped already.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0115",
    "body": "Hi Jordan, shipped already.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0116",
    "body": "Hi Priya, shipped already.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0117",
    "body": "Hello, shipped already.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0118",
    "body": "invoice is out",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0119",
    "body": "hey, invoice is out",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0120",
    "body": "Hi Sam, invoice is out.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0121",
    "body": "Hi Alex, invoice is out.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0122",
    "body": "Hi Jordan, invoice is out.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0123",
    "body": "Hi Priya, invoice is out.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0124",
    "body": "Hello, invoice is out.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0125",
    "body": "po matches now",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0126",
    "body": "hey, po matches now",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0127",
    "body": "Hi Sam, po matches now.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0128",
    "body": "Hi Alex, po matches now.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0129",
    "body": "Hi Jordan, po matches now.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0130",
    "body": "Hi Priya, po matches now.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0131",
    "body": "Hello, po matches now.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0132",
    "body": "hey, access restored",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0133",
    "body": "Hi Sam, access restored.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0134",
    "body": "Hi Alex, access restored.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0135",
    "body": "Hi Jordan, access restored.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0136",
    "body": "Hi Priya, access restored.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0137",
    "body": "Hello, access restored.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0138",
    "body": "vpn is flaky",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0139",
    "body": "hey, vpn is flaky",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0140",
    "body": "Hi Sam, vpn is flaky.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0141",
    "body": "Hi Alex, vpn is flaky.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0142",
    "body": "Hi Jordan, vpn is flaky.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0143",
    "body": "Hi Priya, vpn is flaky.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0144",
    "body": "Hello, vpn is flaky.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0145",
    "body": "hey, link expired",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0146",
    "body": "Hi Sam, link expired.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0147",
    "body": "Hi Alex, link expired.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0148",
    "body": "Hi Jordan, link expired.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0149",
    "body": "Hi Priya, link expired.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0150",
    "body": "Hello, link expired.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0151",
    "body": "retry in a bit",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0152",
    "body": "hey, retry in a bit",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0153",
    "body": "Hi Sam, retry in a bit.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0154",
    "body": "Hi Alex, retry in a bit.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0155",
    "body": "Hi Jordan, retry in a bit.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0156",
    "body": "Hi Priya, retry in a bit.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0157",
    "body": "Hello, retry in a bit.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0158",
    "body": "hey, standup skipped",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0159",
    "body": "Hi Sam, standup skipped.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0160",
    "body": "Hi Alex, standup skipped.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0161",
    "body": "Hi Jordan, standup skipped.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0162",
    "body": "Hi Priya, standup skipped.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0163",
    "body": "Hello, standup skipped.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0164",
    "body": "hey, room changed",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0165",
    "body": "Hi Sam, room changed.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0166",
    "body": "Hi Alex, room changed.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0167",
    "body": "Hi Jordan, room changed.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0168",
    "body": "Hi Priya, room changed.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0169",
    "body": "Hello, room changed.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0170",
    "body": "hey, bring laptop",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0171",
    "body": "Hi Sam, bring laptop.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0172",
    "body": "Hi Alex, bring laptop.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0173",
    "body": "Hi Jordan, bring laptop.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0174",
    "body": "Hi Priya, bring laptop.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0175",
    "body": "Hello, bring laptop.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0176",
    "body": "parking is full",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0177",
    "body": "hey, parking is full",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0178",
    "body": "Hi Sam, parking is full.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0179",
    "body": "Hi Alex, parking is full.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0180",
    "body": "Hi Jordan, parking is full.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0181",
    "body": "Hi Priya, parking is full.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0182",
    "body": "Hello, parking is full.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0183",
    "body": "badge not working",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0184",
    "body": "hey, badge not working",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0185",
    "body": "Hi Sam, badge not working.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0186",
    "body": "Hi Alex, badge not working.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0187",
    "body": "Hi Jordan, badge not working.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0188",
    "body": "Hi Priya, badge not working.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0189",
    "body": "Hello, badge not working.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0190",
    "body": "printer jammed again",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0191",
    "body": "hey, printer jammed again",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0192",
    "body": "Hi Sam, printer jammed again.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0193",
    "body": "Hi Alex, printer jammed again.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0194",
    "body": "Hi Jordan, printer jammed again.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0195",
    "body": "Hi Priya, printer jammed again.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0196",
    "body": "Hello, printer jammed again.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0197",
    "body": "hey, coffee after?",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0198",
    "body": "Hi Sam, coffee after?.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0199",
    "body": "Hi Alex, coffee after?.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0200",
    "body": "Hi Jordan, coffee after?.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0201",
    "body": "Hi Priya, coffee after?.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0202",
    "body": "Hello, coffee after?.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0203",
    "body": "closing this out",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0204",
    "body": "hey, closing this out",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0205",
    "body": "Hi Sam, closing this out.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0206",
    "body": "Hi Alex, closing this out.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0207",
    "body": "Hi Jordan, closing this out.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0208",
    "body": "Hi Priya, closing this out.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0209",
    "body": "Hello, closing this out.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0210",
    "body": "flagging for tomorrow",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0211",
    "body": "hey, flagging for tomorrow",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0212",
    "body": "Hi Sam, flagging for tomorrow.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0213",
    "body": "Hi Alex, flagging for tomorrow.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0214",
    "body": "Hi Jordan, flagging for tomorrow.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0215",
    "body": "Hi Priya, flagging for tomorrow.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0216",
    "body": "Hello, flagging for tomorrow.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0217",
    "body": "maybe Thursday thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0218",
    "body": "maybe Thursday cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0219",
    "body": "after lunch works",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0220",
    "body": "after lunch works thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0221",
    "body": "after lunch works cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0222",
    "body": "before 11 prefer",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0223",
    "body": "before 11 prefer thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0224",
    "body": "before 11 prefer cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0225",
    "body": "can't today sorry",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0226",
    "body": "can't today sorry thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0227",
    "body": "can't today sorry cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0228",
    "body": "next week better",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0229",
    "body": "next week better thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0230",
    "body": "next week better cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0231",
    "body": "same zoom link",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0232",
    "body": "same zoom link thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0233",
    "body": "same zoom link cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0234",
    "body": "new invite sent",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0235",
    "body": "new invite sent thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0236",
    "body": "new invite sent cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0237",
    "body": "declined by mistake",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0238",
    "body": "declined by mistake thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0239",
    "body": "declined by mistake cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0240",
    "body": "accepted just now",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0241",
    "body": "accepted just now thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0242",
    "body": "accepted just now cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0243",
    "body": "hold for now",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0244",
    "body": "hold for now thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0245",
    "body": "hold for now cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0246",
    "body": "go ahead thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0247",
    "body": "go ahead cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0248",
    "body": "pause that thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0249",
    "body": "pause that cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0250",
    "body": "priority is low",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0251",
    "body": "priority is low thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0252",
    "body": "priority is low cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0253",
    "body": "this is urgent-ish",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0254",
    "body": "this is urgent-ish thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0255",
    "body": "this is urgent-ish cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0256",
    "body": "client asked again",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0257",
    "body": "client asked again thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0258",
    "body": "client asked again cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0259",
    "body": "finance needs it",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0260",
    "body": "finance needs it thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0261",
    "body": "finance needs it cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0262",
    "body": "legal still reviewing",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0263",
    "body": "legal still reviewing thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0264",
    "body": "legal still reviewing cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0265",
    "body": "ops can cover",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0266",
    "body": "ops can cover thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0267",
    "body": "ops can cover cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0268",
    "body": "i'm around thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0269",
    "body": "i'm around cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0270",
    "body": "offline until monday",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0271",
    "body": "offline until monday thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0272",
    "body": "offline until monday cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0273",
    "body": "typing on phone",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0274",
    "body": "typing on phone thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0275",
    "body": "typing on phone cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0276",
    "body": "catch you later",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0277",
    "body": "catch you later thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0278",
    "body": "catch you later cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0279",
    "body": "sounds right thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0280",
    "body": "sounds right cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0281",
    "body": "not sure yet",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0282",
    "body": "not sure yet thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0283",
    "body": "not sure yet cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0284",
    "body": "almost done thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0285",
    "body": "almost done cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0286",
    "body": "missing page 2",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0287",
    "body": "missing page 2 thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0288",
    "body": "missing page 2 cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0289",
    "body": "wrong file sorry",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0290",
    "body": "wrong file sorry thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0291",
    "body": "wrong file sorry cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0292",
    "body": "try again please",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0293",
    "body": "try again please thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0294",
    "body": "try again please cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0295",
    "body": "works on my end",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0296",
    "body": "works on my end thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0297",
    "body": "works on my end cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0298",
    "body": "broken for me",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0299",
    "body": "broken for me thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0300",
    "body": "broken for me cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0301",
    "body": "cache clear helped",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0302",
    "body": "cache clear helped thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0303",
    "body": "cache clear helped cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0304",
    "body": "restart fixed it",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0305",
    "body": "restart fixed it thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0306",
    "body": "restart fixed it cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0307",
    "body": "still broken thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0308",
    "body": "still broken cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0309",
    "body": "escalating now thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0310",
    "body": "escalating now cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0311",
    "body": "no action needed",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0312",
    "body": "no action needed thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0313",
    "body": "no action needed cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0314",
    "body": "action needed today",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0315",
    "body": "action needed today thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0316",
    "body": "action needed today cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0317",
    "body": "waiting on them",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0318",
    "body": "waiting on them thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0319",
    "body": "waiting on them cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0320",
    "body": "they replied thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0321",
    "body": "they replied cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0322",
    "body": "silence so far",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "micro"
  },
  {
    "id": "fb_0323",
    "body": "silence so far thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0324",
    "body": "silence so far cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0325",
    "body": "nudged once thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0326",
    "body": "nudged once cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0327",
    "body": "nudging again thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0328",
    "body": "nudging again cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0329",
    "body": "last nudge thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0330",
    "body": "last nudge cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0331",
    "body": "closing loop thanks",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "micro"
  },
  {
    "id": "fb_0332",
    "body": "closing loop cheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "micro"
  },
  {
    "id": "fb_0333",
    "body": "Hey, can we push the call 30 minutes? Something ran long on my side.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0334",
    "body": "Hi Alex, just confirming we're still on for Thursday at 2. Let me know if anything shifted.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0335",
    "body": "Hello, I reviewed the note you sent and it looks fine to proceed. Please send the revised PDF when ready.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0336",
    "body": "quick one - the invite still shows the old room. can you update and resend?",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0337",
    "body": "Hi Sam, attaching the revised sheet (well, saying I am - will follow up if it doesn't land).\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0338",
    "body": "sorry for the delay on this. got pulled into another thread and lost the morning.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0339",
    "body": "Good morning - checking whether the access request went through overnight. I still can't open the folder.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0340",
    "body": "looping in Priya here since she owns the schedule. Priya, can you confirm the two slots?",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0341",
    "body": "bumping this - we went quiet a few days ago and I need a yes/no before Friday.",
    "formality": "business_casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0342",
    "body": "ignore my last note, wrong thread. this one is the scheduling ping.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0343",
    "body": "Hello Jordan, thanks for the update. I will review today and reply with any edits.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0344",
    "body": "hey - phone reply - running between meetings. thursday still ok on my end",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0345",
    "body": "Hi Maya, sorry meant Tuesday not Thursday for the walkthrough. calendar should show the correction now.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0346",
    "body": "fyi I moved the draft into the shared folder. no need to reply unless something looks off.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0347",
    "body": "Hello, the times you proposed both work. Please send an invite for the earlier slot.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0348",
    "body": "Hey, can we move this to later today?\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0349",
    "body": "Hi Sam, can we move this to later today?\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0350",
    "body": "Hi Alex, can we move this to later today?\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0351",
    "body": "Hi Priya, can we move this to later today?\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0352",
    "body": "Hi Sam, can we move this to later today?\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0353",
    "body": "Hi Alex, can we move this to later today?\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0354",
    "body": "Hi Priya, can we move this to later today?\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0355",
    "body": "Hi Sam, can we move this to later today?\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0356",
    "body": "Hi Alex, can we move this to later today?\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0357",
    "body": "Hi Priya, can we move this to later today?\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0358",
    "body": "Hi Sam, can we move this to later today?\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0359",
    "body": "Hi Alex, can we move this to later today?\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0360",
    "body": "Hi Priya, can we move this to later today?\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0361",
    "body": "Hi Sam, can we move this to later today?\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0362",
    "body": "Hi Alex, can we move this to later today?\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0363",
    "body": "Hi Priya, can we move this to later today?\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0364",
    "body": "Hello, can we move this to later today?\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0365",
    "body": "Good morning, can we move this to later today?\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0366",
    "body": "Good morning, can we move this to later today?\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0367",
    "body": "Good morning, can we move this to later today?\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0368",
    "body": "Good morning, can we move this to later today?\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0369",
    "body": "Good morning, can we move this to later today?\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0370",
    "body": "Hey, just checking you saw the last note.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0371",
    "body": "Hi Sam, just checking you saw the last note.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0372",
    "body": "Hi Alex, just checking you saw the last note.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0373",
    "body": "Hi Priya, just checking you saw the last note.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0374",
    "body": "Hi Sam, just checking you saw the last note.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0375",
    "body": "Hi Alex, just checking you saw the last note.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0376",
    "body": "Hi Priya, just checking you saw the last note.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0377",
    "body": "Hi Sam, just checking you saw the last note.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0378",
    "body": "Hi Alex, just checking you saw the last note.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0379",
    "body": "Hi Priya, just checking you saw the last note.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0380",
    "body": "Hi Sam, just checking you saw the last note.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0381",
    "body": "Hi Alex, just checking you saw the last note.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0382",
    "body": "Hi Priya, just checking you saw the last note.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0383",
    "body": "Hi Sam, just checking you saw the last note.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0384",
    "body": "Hi Alex, just checking you saw the last note.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0385",
    "body": "Hi Priya, just checking you saw the last note.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0386",
    "body": "Hello, just checking you saw the last note.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0387",
    "body": "Good morning, just checking you saw the last note.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0388",
    "body": "Good morning, just checking you saw the last note.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0389",
    "body": "Good morning, just checking you saw the last note.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0390",
    "body": "Good morning, just checking you saw the last note.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0391",
    "body": "Good morning, just checking you saw the last note.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0392",
    "body": "Hey, I sent the file again in case the first one bounced.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0393",
    "body": "Hey, I sent the file again in case the first one bounced.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0394",
    "body": "Hey, I sent the file again in case the first one bounced.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0395",
    "body": "Hey, I sent the file again in case the first one bounced.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0396",
    "body": "Hey, I sent the file again in case the first one bounced.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0397",
    "body": "Hey, I sent the file again in case the first one bounced.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0398",
    "body": "Hi Sam, I sent the file again in case the first one bounced.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0399",
    "body": "Hi Alex, I sent the file again in case the first one bounced.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0400",
    "body": "Hi Priya, I sent the file again in case the first one bounced.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0401",
    "body": "Hi Sam, I sent the file again in case the first one bounced.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0402",
    "body": "Hi Alex, I sent the file again in case the first one bounced.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0403",
    "body": "Hi Priya, I sent the file again in case the first one bounced.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0404",
    "body": "Hi Sam, I sent the file again in case the first one bounced.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0405",
    "body": "Hi Alex, I sent the file again in case the first one bounced.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0406",
    "body": "Hi Priya, I sent the file again in case the first one bounced.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0407",
    "body": "Hi Sam, I sent the file again in case the first one bounced.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0408",
    "body": "Hi Alex, I sent the file again in case the first one bounced.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0409",
    "body": "Hi Priya, I sent the file again in case the first one bounced.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0410",
    "body": "Hi Sam, I sent the file again in case the first one bounced.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0411",
    "body": "Hi Alex, I sent the file again in case the first one bounced.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0412",
    "body": "Hi Priya, I sent the file again in case the first one bounced.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0413",
    "body": "Hi Sam, I sent the file again in case the first one bounced.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0414",
    "body": "Hi Alex, I sent the file again in case the first one bounced.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0415",
    "body": "Hi Priya, I sent the file again in case the first one bounced.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0416",
    "body": "Hello, I sent the file again in case the first one bounced.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0417",
    "body": "Hello, I sent the file again in case the first one bounced.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0418",
    "body": "Hello, I sent the file again in case the first one bounced.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0419",
    "body": "Hello, I sent the file again in case the first one bounced.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0420",
    "body": "Hello, I sent the file again in case the first one bounced.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0421",
    "body": "Hello, I sent the file again in case the first one bounced.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0422",
    "body": "Good morning, I sent the file again in case the first one bounced.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0423",
    "body": "Good morning, I sent the file again in case the first one bounced.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0424",
    "body": "Good morning, I sent the file again in case the first one bounced.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0425",
    "body": "Good morning, I sent the file again in case the first one bounced.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0426",
    "body": "Good morning, I sent the file again in case the first one bounced.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0427",
    "body": "Good morning, I sent the file again in case the first one bounced.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0428",
    "body": "I sent the file again in case the first one bounced.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0429",
    "body": "I sent the file again in case the first one bounced.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0430",
    "body": "I sent the file again in case the first one bounced.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0431",
    "body": "I sent the file again in case the first one bounced.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0432",
    "body": "I sent the file again in case the first one bounced.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0433",
    "body": "I sent the file again in case the first one bounced.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0434",
    "body": "Hey, the meeting invite still has the wrong timezone label.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0435",
    "body": "Hey, the meeting invite still has the wrong timezone label.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0436",
    "body": "Hey, the meeting invite still has the wrong timezone label.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0437",
    "body": "Hey, the meeting invite still has the wrong timezone label.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0438",
    "body": "Hey, the meeting invite still has the wrong timezone label.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0439",
    "body": "Hey, the meeting invite still has the wrong timezone label.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0440",
    "body": "Hi Sam, the meeting invite still has the wrong timezone label.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0441",
    "body": "Hi Alex, the meeting invite still has the wrong timezone label.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0442",
    "body": "Hi Priya, the meeting invite still has the wrong timezone label.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0443",
    "body": "Hi Sam, the meeting invite still has the wrong timezone label.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0444",
    "body": "Hi Alex, the meeting invite still has the wrong timezone label.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0445",
    "body": "Hi Priya, the meeting invite still has the wrong timezone label.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0446",
    "body": "Hi Sam, the meeting invite still has the wrong timezone label.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0447",
    "body": "Hi Alex, the meeting invite still has the wrong timezone label.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0448",
    "body": "Hi Priya, the meeting invite still has the wrong timezone label.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0449",
    "body": "Hi Sam, the meeting invite still has the wrong timezone label.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0450",
    "body": "Hi Alex, the meeting invite still has the wrong timezone label.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0451",
    "body": "Hi Priya, the meeting invite still has the wrong timezone label.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0452",
    "body": "Hi Sam, the meeting invite still has the wrong timezone label.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0453",
    "body": "Hi Alex, the meeting invite still has the wrong timezone label.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0454",
    "body": "Hi Priya, the meeting invite still has the wrong timezone label.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0455",
    "body": "Hi Sam, the meeting invite still has the wrong timezone label.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0456",
    "body": "Hi Alex, the meeting invite still has the wrong timezone label.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0457",
    "body": "Hi Priya, the meeting invite still has the wrong timezone label.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0458",
    "body": "Hello, the meeting invite still has the wrong timezone label.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0459",
    "body": "Hello, the meeting invite still has the wrong timezone label.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0460",
    "body": "Hello, the meeting invite still has the wrong timezone label.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0461",
    "body": "Hello, the meeting invite still has the wrong timezone label.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0462",
    "body": "Hello, the meeting invite still has the wrong timezone label.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0463",
    "body": "Hello, the meeting invite still has the wrong timezone label.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0464",
    "body": "Good morning, the meeting invite still has the wrong timezone label.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0465",
    "body": "Good morning, the meeting invite still has the wrong timezone label.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0466",
    "body": "Good morning, the meeting invite still has the wrong timezone label.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0467",
    "body": "Good morning, the meeting invite still has the wrong timezone label.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0468",
    "body": "Good morning, the meeting invite still has the wrong timezone label.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0469",
    "body": "Good morning, the meeting invite still has the wrong timezone label.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0470",
    "body": "the meeting invite still has the wrong timezone label.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0471",
    "body": "the meeting invite still has the wrong timezone label.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0472",
    "body": "the meeting invite still has the wrong timezone label.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0473",
    "body": "the meeting invite still has the wrong timezone label.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0474",
    "body": "the meeting invite still has the wrong timezone label.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0475",
    "body": "Hey, finance asked for a clearer memo line on the transfer.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0476",
    "body": "Hey, finance asked for a clearer memo line on the transfer.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0477",
    "body": "Hey, finance asked for a clearer memo line on the transfer.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0478",
    "body": "Hey, finance asked for a clearer memo line on the transfer.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0479",
    "body": "Hey, finance asked for a clearer memo line on the transfer.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0480",
    "body": "Hey, finance asked for a clearer memo line on the transfer.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0481",
    "body": "Hi Sam, finance asked for a clearer memo line on the transfer.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0482",
    "body": "Hi Alex, finance asked for a clearer memo line on the transfer.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0483",
    "body": "Hi Priya, finance asked for a clearer memo line on the transfer.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0484",
    "body": "Hi Sam, finance asked for a clearer memo line on the transfer.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0485",
    "body": "Hi Alex, finance asked for a clearer memo line on the transfer.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0486",
    "body": "Hi Priya, finance asked for a clearer memo line on the transfer.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0487",
    "body": "Hi Sam, finance asked for a clearer memo line on the transfer.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0488",
    "body": "Hi Alex, finance asked for a clearer memo line on the transfer.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0489",
    "body": "Hi Priya, finance asked for a clearer memo line on the transfer.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0490",
    "body": "Hi Sam, finance asked for a clearer memo line on the transfer.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0491",
    "body": "Hi Alex, finance asked for a clearer memo line on the transfer.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0492",
    "body": "Hi Priya, finance asked for a clearer memo line on the transfer.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0493",
    "body": "Hi Sam, finance asked for a clearer memo line on the transfer.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0494",
    "body": "Hi Alex, finance asked for a clearer memo line on the transfer.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0495",
    "body": "Hi Priya, finance asked for a clearer memo line on the transfer.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0496",
    "body": "Hi Sam, finance asked for a clearer memo line on the transfer.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0497",
    "body": "Hi Alex, finance asked for a clearer memo line on the transfer.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0498",
    "body": "Hi Priya, finance asked for a clearer memo line on the transfer.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0499",
    "body": "Hello, finance asked for a clearer memo line on the transfer.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0500",
    "body": "Hello, finance asked for a clearer memo line on the transfer.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0501",
    "body": "Hello, finance asked for a clearer memo line on the transfer.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0502",
    "body": "Hello, finance asked for a clearer memo line on the transfer.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0503",
    "body": "Hello, finance asked for a clearer memo line on the transfer.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0504",
    "body": "Hello, finance asked for a clearer memo line on the transfer.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0505",
    "body": "Good morning, finance asked for a clearer memo line on the transfer.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0506",
    "body": "Good morning, finance asked for a clearer memo line on the transfer.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0507",
    "body": "Good morning, finance asked for a clearer memo line on the transfer.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0508",
    "body": "Good morning, finance asked for a clearer memo line on the transfer.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0509",
    "body": "Good morning, finance asked for a clearer memo line on the transfer.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0510",
    "body": "Good morning, finance asked for a clearer memo line on the transfer.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0511",
    "body": "finance asked for a clearer memo line on the transfer.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0512",
    "body": "finance asked for a clearer memo line on the transfer.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0513",
    "body": "finance asked for a clearer memo line on the transfer.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0514",
    "body": "finance asked for a clearer memo line on the transfer.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0515",
    "body": "finance asked for a clearer memo line on the transfer.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0516",
    "body": "finance asked for a clearer memo line on the transfer.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0517",
    "body": "Hey, I am free after 3 if that still works.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0518",
    "body": "Hey, I am free after 3 if that still works.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0519",
    "body": "Hey, I am free after 3 if that still works.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0520",
    "body": "Hey, I am free after 3 if that still works.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0521",
    "body": "Hey, I am free after 3 if that still works.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0522",
    "body": "Hey, I am free after 3 if that still works.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0523",
    "body": "Hi Sam, I am free after 3 if that still works.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0524",
    "body": "Hi Alex, I am free after 3 if that still works.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0525",
    "body": "Hi Priya, I am free after 3 if that still works.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0526",
    "body": "Hi Sam, I am free after 3 if that still works.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0527",
    "body": "Hi Alex, I am free after 3 if that still works.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0528",
    "body": "Hi Priya, I am free after 3 if that still works.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0529",
    "body": "Hi Sam, I am free after 3 if that still works.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0530",
    "body": "Hi Alex, I am free after 3 if that still works.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0531",
    "body": "Hi Priya, I am free after 3 if that still works.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0532",
    "body": "Hi Sam, I am free after 3 if that still works.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0533",
    "body": "Hi Alex, I am free after 3 if that still works.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0534",
    "body": "Hi Priya, I am free after 3 if that still works.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0535",
    "body": "Hi Sam, I am free after 3 if that still works.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0536",
    "body": "Hi Alex, I am free after 3 if that still works.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0537",
    "body": "Hi Priya, I am free after 3 if that still works.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0538",
    "body": "Hi Sam, I am free after 3 if that still works.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0539",
    "body": "Hi Alex, I am free after 3 if that still works.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0540",
    "body": "Hi Priya, I am free after 3 if that still works.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0541",
    "body": "Hello, I am free after 3 if that still works.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0542",
    "body": "Hello, I am free after 3 if that still works.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0543",
    "body": "Hello, I am free after 3 if that still works.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0544",
    "body": "Hello, I am free after 3 if that still works.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0545",
    "body": "Hello, I am free after 3 if that still works.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0546",
    "body": "Hello, I am free after 3 if that still works.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0547",
    "body": "Good morning, I am free after 3 if that still works.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0548",
    "body": "Good morning, I am free after 3 if that still works.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0549",
    "body": "Good morning, I am free after 3 if that still works.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0550",
    "body": "Good morning, I am free after 3 if that still works.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0551",
    "body": "Good morning, I am free after 3 if that still works.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0552",
    "body": "Good morning, I am free after 3 if that still works.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0553",
    "body": "I am free after 3 if that still works.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0554",
    "body": "I am free after 3 if that still works.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0555",
    "body": "I am free after 3 if that still works.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0556",
    "body": "I am free after 3 if that still works.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0557",
    "body": "I am free after 3 if that still works.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0558",
    "body": "Hey, please confirm the room number before I head over.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0559",
    "body": "Hey, please confirm the room number before I head over.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0560",
    "body": "Hey, please confirm the room number before I head over.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0561",
    "body": "Hey, please confirm the room number before I head over.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0562",
    "body": "Hey, please confirm the room number before I head over.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0563",
    "body": "Hey, please confirm the room number before I head over.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0564",
    "body": "Hi Sam, please confirm the room number before I head over.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0565",
    "body": "Hi Alex, please confirm the room number before I head over.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0566",
    "body": "Hi Priya, please confirm the room number before I head over.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0567",
    "body": "Hi Sam, please confirm the room number before I head over.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0568",
    "body": "Hi Alex, please confirm the room number before I head over.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0569",
    "body": "Hi Priya, please confirm the room number before I head over.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0570",
    "body": "Hi Sam, please confirm the room number before I head over.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0571",
    "body": "Hi Alex, please confirm the room number before I head over.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0572",
    "body": "Hi Priya, please confirm the room number before I head over.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0573",
    "body": "Hi Sam, please confirm the room number before I head over.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0574",
    "body": "Hi Alex, please confirm the room number before I head over.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0575",
    "body": "Hi Priya, please confirm the room number before I head over.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0576",
    "body": "Hi Sam, please confirm the room number before I head over.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0577",
    "body": "Hi Alex, please confirm the room number before I head over.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0578",
    "body": "Hi Priya, please confirm the room number before I head over.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0579",
    "body": "Hi Sam, please confirm the room number before I head over.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0580",
    "body": "Hi Alex, please confirm the room number before I head over.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0581",
    "body": "Hi Priya, please confirm the room number before I head over.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0582",
    "body": "Hello, please confirm the room number before I head over.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0583",
    "body": "Hello, please confirm the room number before I head over.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0584",
    "body": "Hello, please confirm the room number before I head over.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0585",
    "body": "Hello, please confirm the room number before I head over.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0586",
    "body": "Hello, please confirm the room number before I head over.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0587",
    "body": "Hello, please confirm the room number before I head over.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0588",
    "body": "Good morning, please confirm the room number before I head over.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0589",
    "body": "Good morning, please confirm the room number before I head over.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0590",
    "body": "Good morning, please confirm the room number before I head over.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0591",
    "body": "Good morning, please confirm the room number before I head over.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0592",
    "body": "Good morning, please confirm the room number before I head over.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0593",
    "body": "Good morning, please confirm the room number before I head over.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0594",
    "body": "please confirm the room number before I head over.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0595",
    "body": "please confirm the room number before I head over.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0596",
    "body": "please confirm the room number before I head over.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0597",
    "body": "please confirm the room number before I head over.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0598",
    "body": "please confirm the room number before I head over.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0599",
    "body": "Hey, the draft is ready for a quick pass when you have a minute.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0600",
    "body": "Hey, the draft is ready for a quick pass when you have a minute.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0601",
    "body": "Hey, the draft is ready for a quick pass when you have a minute.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0602",
    "body": "Hey, the draft is ready for a quick pass when you have a minute.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0603",
    "body": "Hey, the draft is ready for a quick pass when you have a minute.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0604",
    "body": "Hey, the draft is ready for a quick pass when you have a minute.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0605",
    "body": "Hi Sam, the draft is ready for a quick pass when you have a minute.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0606",
    "body": "Hi Alex, the draft is ready for a quick pass when you have a minute.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0607",
    "body": "Hi Priya, the draft is ready for a quick pass when you have a minute.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0608",
    "body": "Hi Sam, the draft is ready for a quick pass when you have a minute.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0609",
    "body": "Hi Alex, the draft is ready for a quick pass when you have a minute.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0610",
    "body": "Hi Priya, the draft is ready for a quick pass when you have a minute.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0611",
    "body": "Hi Sam, the draft is ready for a quick pass when you have a minute.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0612",
    "body": "Hi Alex, the draft is ready for a quick pass when you have a minute.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0613",
    "body": "Hi Priya, the draft is ready for a quick pass when you have a minute.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0614",
    "body": "Hi Sam, the draft is ready for a quick pass when you have a minute.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0615",
    "body": "Hi Alex, the draft is ready for a quick pass when you have a minute.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0616",
    "body": "Hi Priya, the draft is ready for a quick pass when you have a minute.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0617",
    "body": "Hi Sam, the draft is ready for a quick pass when you have a minute.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0618",
    "body": "Hi Alex, the draft is ready for a quick pass when you have a minute.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0619",
    "body": "Hi Priya, the draft is ready for a quick pass when you have a minute.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0620",
    "body": "Hi Sam, the draft is ready for a quick pass when you have a minute.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0621",
    "body": "Hi Alex, the draft is ready for a quick pass when you have a minute.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0622",
    "body": "Hi Priya, the draft is ready for a quick pass when you have a minute.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0623",
    "body": "Hello, the draft is ready for a quick pass when you have a minute.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0624",
    "body": "Hello, the draft is ready for a quick pass when you have a minute.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0625",
    "body": "Hello, the draft is ready for a quick pass when you have a minute.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0626",
    "body": "Hello, the draft is ready for a quick pass when you have a minute.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0627",
    "body": "Hello, the draft is ready for a quick pass when you have a minute.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0628",
    "body": "Hello, the draft is ready for a quick pass when you have a minute.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0629",
    "body": "Good morning, the draft is ready for a quick pass when you have a minute.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0630",
    "body": "Good morning, the draft is ready for a quick pass when you have a minute.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0631",
    "body": "Good morning, the draft is ready for a quick pass when you have a minute.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0632",
    "body": "Good morning, the draft is ready for a quick pass when you have a minute.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0633",
    "body": "Good morning, the draft is ready for a quick pass when you have a minute.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0634",
    "body": "Good morning, the draft is ready for a quick pass when you have a minute.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0635",
    "body": "the draft is ready for a quick pass when you have a minute.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0636",
    "body": "the draft is ready for a quick pass when you have a minute.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0637",
    "body": "the draft is ready for a quick pass when you have a minute.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0638",
    "body": "the draft is ready for a quick pass when you have a minute.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0639",
    "body": "the draft is ready for a quick pass when you have a minute.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0640",
    "body": "the draft is ready for a quick pass when you have a minute.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0641",
    "body": "Hey, client pinged again so I want to close this today if possible.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0642",
    "body": "Hey, client pinged again so I want to close this today if possible.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0643",
    "body": "Hey, client pinged again so I want to close this today if possible.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0644",
    "body": "Hey, client pinged again so I want to close this today if possible.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0645",
    "body": "Hey, client pinged again so I want to close this today if possible.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0646",
    "body": "Hey, client pinged again so I want to close this today if possible.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0647",
    "body": "Hi Sam, client pinged again so I want to close this today if possible.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0648",
    "body": "Hi Alex, client pinged again so I want to close this today if possible.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0649",
    "body": "Hi Priya, client pinged again so I want to close this today if possible.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0650",
    "body": "Hi Sam, client pinged again so I want to close this today if possible.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0651",
    "body": "Hi Alex, client pinged again so I want to close this today if possible.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0652",
    "body": "Hi Priya, client pinged again so I want to close this today if possible.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0653",
    "body": "Hi Sam, client pinged again so I want to close this today if possible.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0654",
    "body": "Hi Alex, client pinged again so I want to close this today if possible.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0655",
    "body": "Hi Priya, client pinged again so I want to close this today if possible.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0656",
    "body": "Hi Sam, client pinged again so I want to close this today if possible.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0657",
    "body": "Hi Alex, client pinged again so I want to close this today if possible.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0658",
    "body": "Hi Priya, client pinged again so I want to close this today if possible.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0659",
    "body": "Hi Sam, client pinged again so I want to close this today if possible.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0660",
    "body": "Hi Alex, client pinged again so I want to close this today if possible.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0661",
    "body": "Hi Priya, client pinged again so I want to close this today if possible.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0662",
    "body": "Hi Sam, client pinged again so I want to close this today if possible.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0663",
    "body": "Hi Alex, client pinged again so I want to close this today if possible.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0664",
    "body": "Hi Priya, client pinged again so I want to close this today if possible.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0665",
    "body": "Hello, client pinged again so I want to close this today if possible.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0666",
    "body": "Hello, client pinged again so I want to close this today if possible.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0667",
    "body": "Hello, client pinged again so I want to close this today if possible.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0668",
    "body": "Hello, client pinged again so I want to close this today if possible.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0669",
    "body": "Hello, client pinged again so I want to close this today if possible.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0670",
    "body": "Hello, client pinged again so I want to close this today if possible.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0671",
    "body": "Good morning, client pinged again so I want to close this today if possible.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0672",
    "body": "Good morning, client pinged again so I want to close this today if possible.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0673",
    "body": "Good morning, client pinged again so I want to close this today if possible.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0674",
    "body": "Good morning, client pinged again so I want to close this today if possible.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0675",
    "body": "Good morning, client pinged again so I want to close this today if possible.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0676",
    "body": "Good morning, client pinged again so I want to close this today if possible.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0677",
    "body": "client pinged again so I want to close this today if possible.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0678",
    "body": "client pinged again so I want to close this today if possible.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0679",
    "body": "client pinged again so I want to close this today if possible.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0680",
    "body": "client pinged again so I want to close this today if possible.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0681",
    "body": "client pinged again so I want to close this today if possible.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0682",
    "body": "client pinged again so I want to close this today if possible.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0683",
    "body": "Hey, no rush but I need a thumbs-up before I book travel.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0684",
    "body": "Hey, no rush but I need a thumbs-up before I book travel.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0685",
    "body": "Hey, no rush but I need a thumbs-up before I book travel.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0686",
    "body": "Hey, no rush but I need a thumbs-up before I book travel.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0687",
    "body": "Hey, no rush but I need a thumbs-up before I book travel.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0688",
    "body": "Hey, no rush but I need a thumbs-up before I book travel.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0689",
    "body": "Hi Sam, no rush but I need a thumbs-up before I book travel.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0690",
    "body": "Hi Alex, no rush but I need a thumbs-up before I book travel.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0691",
    "body": "Hi Priya, no rush but I need a thumbs-up before I book travel.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0692",
    "body": "Hi Sam, no rush but I need a thumbs-up before I book travel.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0693",
    "body": "Hi Alex, no rush but I need a thumbs-up before I book travel.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0694",
    "body": "Hi Priya, no rush but I need a thumbs-up before I book travel.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0695",
    "body": "Hi Sam, no rush but I need a thumbs-up before I book travel.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0696",
    "body": "Hi Alex, no rush but I need a thumbs-up before I book travel.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0697",
    "body": "Hi Priya, no rush but I need a thumbs-up before I book travel.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0698",
    "body": "Hi Sam, no rush but I need a thumbs-up before I book travel.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0699",
    "body": "Hi Alex, no rush but I need a thumbs-up before I book travel.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0700",
    "body": "Hi Priya, no rush but I need a thumbs-up before I book travel.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0701",
    "body": "Hi Sam, no rush but I need a thumbs-up before I book travel.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0702",
    "body": "Hi Alex, no rush but I need a thumbs-up before I book travel.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0703",
    "body": "Hi Priya, no rush but I need a thumbs-up before I book travel.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0704",
    "body": "Hi Sam, no rush but I need a thumbs-up before I book travel.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0705",
    "body": "Hi Alex, no rush but I need a thumbs-up before I book travel.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0706",
    "body": "Hi Priya, no rush but I need a thumbs-up before I book travel.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0707",
    "body": "Hello, no rush but I need a thumbs-up before I book travel.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0708",
    "body": "Hello, no rush but I need a thumbs-up before I book travel.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0709",
    "body": "Hello, no rush but I need a thumbs-up before I book travel.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0710",
    "body": "Hello, no rush but I need a thumbs-up before I book travel.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0711",
    "body": "Hello, no rush but I need a thumbs-up before I book travel.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0712",
    "body": "Hello, no rush but I need a thumbs-up before I book travel.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0713",
    "body": "Good morning, no rush but I need a thumbs-up before I book travel.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0714",
    "body": "Good morning, no rush but I need a thumbs-up before I book travel.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0715",
    "body": "Good morning, no rush but I need a thumbs-up before I book travel.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0716",
    "body": "Good morning, no rush but I need a thumbs-up before I book travel.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0717",
    "body": "Good morning, no rush but I need a thumbs-up before I book travel.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0718",
    "body": "Good morning, no rush but I need a thumbs-up before I book travel.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0719",
    "body": "no rush but I need a thumbs-up before I book travel.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0720",
    "body": "no rush but I need a thumbs-up before I book travel.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0721",
    "body": "no rush but I need a thumbs-up before I book travel.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0722",
    "body": "no rush but I need a thumbs-up before I book travel.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0723",
    "body": "no rush but I need a thumbs-up before I book travel.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0724",
    "body": "no rush but I need a thumbs-up before I book travel.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0725",
    "body": "Hey, I fixed the typo in the subject and resent.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0726",
    "body": "Hey, I fixed the typo in the subject and resent.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0727",
    "body": "Hey, I fixed the typo in the subject and resent.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0728",
    "body": "Hey, I fixed the typo in the subject and resent.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0729",
    "body": "Hey, I fixed the typo in the subject and resent.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0730",
    "body": "Hey, I fixed the typo in the subject and resent.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0731",
    "body": "Hi Sam, I fixed the typo in the subject and resent.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0732",
    "body": "Hi Alex, I fixed the typo in the subject and resent.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0733",
    "body": "Hi Priya, I fixed the typo in the subject and resent.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0734",
    "body": "Hi Sam, I fixed the typo in the subject and resent.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0735",
    "body": "Hi Alex, I fixed the typo in the subject and resent.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0736",
    "body": "Hi Priya, I fixed the typo in the subject and resent.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0737",
    "body": "Hi Sam, I fixed the typo in the subject and resent.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0738",
    "body": "Hi Alex, I fixed the typo in the subject and resent.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0739",
    "body": "Hi Priya, I fixed the typo in the subject and resent.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0740",
    "body": "Hi Sam, I fixed the typo in the subject and resent.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0741",
    "body": "Hi Alex, I fixed the typo in the subject and resent.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0742",
    "body": "Hi Priya, I fixed the typo in the subject and resent.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0743",
    "body": "Hi Sam, I fixed the typo in the subject and resent.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0744",
    "body": "Hi Alex, I fixed the typo in the subject and resent.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0745",
    "body": "Hi Priya, I fixed the typo in the subject and resent.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0746",
    "body": "Hi Sam, I fixed the typo in the subject and resent.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0747",
    "body": "Hi Alex, I fixed the typo in the subject and resent.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0748",
    "body": "Hi Priya, I fixed the typo in the subject and resent.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0749",
    "body": "Hello, I fixed the typo in the subject and resent.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0750",
    "body": "Hello, I fixed the typo in the subject and resent.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0751",
    "body": "Hello, I fixed the typo in the subject and resent.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0752",
    "body": "Hello, I fixed the typo in the subject and resent.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0753",
    "body": "Hello, I fixed the typo in the subject and resent.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0754",
    "body": "Hello, I fixed the typo in the subject and resent.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0755",
    "body": "Good morning, I fixed the typo in the subject and resent.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0756",
    "body": "Good morning, I fixed the typo in the subject and resent.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0757",
    "body": "Good morning, I fixed the typo in the subject and resent.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0758",
    "body": "Good morning, I fixed the typo in the subject and resent.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0759",
    "body": "Good morning, I fixed the typo in the subject and resent.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0760",
    "body": "Good morning, I fixed the typo in the subject and resent.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0761",
    "body": "I fixed the typo in the subject and resent.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0762",
    "body": "I fixed the typo in the subject and resent.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0763",
    "body": "I fixed the typo in the subject and resent.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0764",
    "body": "I fixed the typo in the subject and resent.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0765",
    "body": "I fixed the typo in the subject and resent.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0766",
    "body": "Hey, still blocked on access so I cannot finish the review.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0767",
    "body": "Hey, still blocked on access so I cannot finish the review.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0768",
    "body": "Hey, still blocked on access so I cannot finish the review.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0769",
    "body": "Hey, still blocked on access so I cannot finish the review.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0770",
    "body": "Hey, still blocked on access so I cannot finish the review.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0771",
    "body": "Hey, still blocked on access so I cannot finish the review.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0772",
    "body": "Hi Sam, still blocked on access so I cannot finish the review.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0773",
    "body": "Hi Alex, still blocked on access so I cannot finish the review.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0774",
    "body": "Hi Priya, still blocked on access so I cannot finish the review.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0775",
    "body": "Hi Sam, still blocked on access so I cannot finish the review.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0776",
    "body": "Hi Alex, still blocked on access so I cannot finish the review.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0777",
    "body": "Hi Priya, still blocked on access so I cannot finish the review.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0778",
    "body": "Hi Sam, still blocked on access so I cannot finish the review.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0779",
    "body": "Hi Alex, still blocked on access so I cannot finish the review.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0780",
    "body": "Hi Priya, still blocked on access so I cannot finish the review.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0781",
    "body": "Hi Sam, still blocked on access so I cannot finish the review.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0782",
    "body": "Hi Alex, still blocked on access so I cannot finish the review.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0783",
    "body": "Hi Priya, still blocked on access so I cannot finish the review.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0784",
    "body": "Hi Sam, still blocked on access so I cannot finish the review.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0785",
    "body": "Hi Alex, still blocked on access so I cannot finish the review.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0786",
    "body": "Hi Priya, still blocked on access so I cannot finish the review.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0787",
    "body": "Hi Sam, still blocked on access so I cannot finish the review.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0788",
    "body": "Hi Alex, still blocked on access so I cannot finish the review.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0789",
    "body": "Hi Priya, still blocked on access so I cannot finish the review.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0790",
    "body": "Hello, still blocked on access so I cannot finish the review.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0791",
    "body": "Hello, still blocked on access so I cannot finish the review.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0792",
    "body": "Hello, still blocked on access so I cannot finish the review.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0793",
    "body": "Hello, still blocked on access so I cannot finish the review.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0794",
    "body": "Hello, still blocked on access so I cannot finish the review.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0795",
    "body": "Hello, still blocked on access so I cannot finish the review.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0796",
    "body": "Good morning, still blocked on access so I cannot finish the review.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0797",
    "body": "Good morning, still blocked on access so I cannot finish the review.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0798",
    "body": "Good morning, still blocked on access so I cannot finish the review.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0799",
    "body": "Good morning, still blocked on access so I cannot finish the review.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0800",
    "body": "Good morning, still blocked on access so I cannot finish the review.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0801",
    "body": "Good morning, still blocked on access so I cannot finish the review.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0802",
    "body": "still blocked on access so I cannot finish the review.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0803",
    "body": "still blocked on access so I cannot finish the review.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0804",
    "body": "still blocked on access so I cannot finish the review.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0805",
    "body": "still blocked on access so I cannot finish the review.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0806",
    "body": "still blocked on access so I cannot finish the review.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0807",
    "body": "still blocked on access so I cannot finish the review.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0808",
    "body": "Hey, happy to jump on a 10 minute call if easier.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0809",
    "body": "Hey, happy to jump on a 10 minute call if easier.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0810",
    "body": "Hey, happy to jump on a 10 minute call if easier.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0811",
    "body": "Hey, happy to jump on a 10 minute call if easier.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0812",
    "body": "Hey, happy to jump on a 10 minute call if easier.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0813",
    "body": "Hey, happy to jump on a 10 minute call if easier.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0814",
    "body": "Hi Sam, happy to jump on a 10 minute call if easier.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0815",
    "body": "Hi Alex, happy to jump on a 10 minute call if easier.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0816",
    "body": "Hi Priya, happy to jump on a 10 minute call if easier.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0817",
    "body": "Hi Sam, happy to jump on a 10 minute call if easier.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0818",
    "body": "Hi Alex, happy to jump on a 10 minute call if easier.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0819",
    "body": "Hi Priya, happy to jump on a 10 minute call if easier.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0820",
    "body": "Hi Sam, happy to jump on a 10 minute call if easier.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0821",
    "body": "Hi Alex, happy to jump on a 10 minute call if easier.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0822",
    "body": "Hi Priya, happy to jump on a 10 minute call if easier.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0823",
    "body": "Hi Sam, happy to jump on a 10 minute call if easier.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0824",
    "body": "Hi Alex, happy to jump on a 10 minute call if easier.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0825",
    "body": "Hi Priya, happy to jump on a 10 minute call if easier.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0826",
    "body": "Hi Sam, happy to jump on a 10 minute call if easier.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0827",
    "body": "Hi Alex, happy to jump on a 10 minute call if easier.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0828",
    "body": "Hi Priya, happy to jump on a 10 minute call if easier.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0829",
    "body": "Hi Sam, happy to jump on a 10 minute call if easier.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0830",
    "body": "Hi Alex, happy to jump on a 10 minute call if easier.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0831",
    "body": "Hi Priya, happy to jump on a 10 minute call if easier.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0832",
    "body": "Hello, happy to jump on a 10 minute call if easier.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0833",
    "body": "Hello, happy to jump on a 10 minute call if easier.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0834",
    "body": "Hello, happy to jump on a 10 minute call if easier.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0835",
    "body": "Hello, happy to jump on a 10 minute call if easier.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0836",
    "body": "Hello, happy to jump on a 10 minute call if easier.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0837",
    "body": "Hello, happy to jump on a 10 minute call if easier.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0838",
    "body": "Good morning, happy to jump on a 10 minute call if easier.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0839",
    "body": "Good morning, happy to jump on a 10 minute call if easier.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0840",
    "body": "Good morning, happy to jump on a 10 minute call if easier.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0841",
    "body": "Good morning, happy to jump on a 10 minute call if easier.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0842",
    "body": "Good morning, happy to jump on a 10 minute call if easier.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0843",
    "body": "Good morning, happy to jump on a 10 minute call if easier.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0844",
    "body": "happy to jump on a 10 minute call if easier.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0845",
    "body": "happy to jump on a 10 minute call if easier.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0846",
    "body": "happy to jump on a 10 minute call if easier.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0847",
    "body": "happy to jump on a 10 minute call if easier.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0848",
    "body": "happy to jump on a 10 minute call if easier.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0849",
    "body": "happy to jump on a 10 minute call if easier.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0850",
    "body": "Hey, I will take the earlier slot unless I hear otherwise.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0851",
    "body": "Hey, I will take the earlier slot unless I hear otherwise.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0852",
    "body": "Hey, I will take the earlier slot unless I hear otherwise.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0853",
    "body": "Hey, I will take the earlier slot unless I hear otherwise.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0854",
    "body": "Hey, I will take the earlier slot unless I hear otherwise.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0855",
    "body": "Hey, I will take the earlier slot unless I hear otherwise.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0856",
    "body": "Hi Sam, I will take the earlier slot unless I hear otherwise.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0857",
    "body": "Hi Alex, I will take the earlier slot unless I hear otherwise.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0858",
    "body": "Hi Priya, I will take the earlier slot unless I hear otherwise.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0859",
    "body": "Hi Sam, I will take the earlier slot unless I hear otherwise.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0860",
    "body": "Hi Alex, I will take the earlier slot unless I hear otherwise.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0861",
    "body": "Hi Priya, I will take the earlier slot unless I hear otherwise.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0862",
    "body": "Hi Sam, I will take the earlier slot unless I hear otherwise.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0863",
    "body": "Hi Alex, I will take the earlier slot unless I hear otherwise.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0864",
    "body": "Hi Priya, I will take the earlier slot unless I hear otherwise.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0865",
    "body": "Hi Sam, I will take the earlier slot unless I hear otherwise.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0866",
    "body": "Hi Alex, I will take the earlier slot unless I hear otherwise.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0867",
    "body": "Hi Priya, I will take the earlier slot unless I hear otherwise.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0868",
    "body": "Hi Sam, I will take the earlier slot unless I hear otherwise.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0869",
    "body": "Hi Alex, I will take the earlier slot unless I hear otherwise.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0870",
    "body": "Hi Priya, I will take the earlier slot unless I hear otherwise.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0871",
    "body": "Hi Sam, I will take the earlier slot unless I hear otherwise.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0872",
    "body": "Hi Alex, I will take the earlier slot unless I hear otherwise.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0873",
    "body": "Hi Priya, I will take the earlier slot unless I hear otherwise.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0874",
    "body": "Hello, I will take the earlier slot unless I hear otherwise.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0875",
    "body": "Hello, I will take the earlier slot unless I hear otherwise.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0876",
    "body": "Hello, I will take the earlier slot unless I hear otherwise.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0877",
    "body": "Hello, I will take the earlier slot unless I hear otherwise.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0878",
    "body": "Hello, I will take the earlier slot unless I hear otherwise.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0879",
    "body": "Hello, I will take the earlier slot unless I hear otherwise.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0880",
    "body": "Good morning, I will take the earlier slot unless I hear otherwise.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0881",
    "body": "Good morning, I will take the earlier slot unless I hear otherwise.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0882",
    "body": "Good morning, I will take the earlier slot unless I hear otherwise.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0883",
    "body": "Good morning, I will take the earlier slot unless I hear otherwise.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0884",
    "body": "Good morning, I will take the earlier slot unless I hear otherwise.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0885",
    "body": "Good morning, I will take the earlier slot unless I hear otherwise.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0886",
    "body": "I will take the earlier slot unless I hear otherwise.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0887",
    "body": "I will take the earlier slot unless I hear otherwise.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0888",
    "body": "I will take the earlier slot unless I hear otherwise.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0889",
    "body": "I will take the earlier slot unless I hear otherwise.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0890",
    "body": "I will take the earlier slot unless I hear otherwise.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0891",
    "body": "I will take the earlier slot unless I hear otherwise.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0892",
    "body": "Hey, left a comment in the doc near section 2.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0893",
    "body": "Hey, left a comment in the doc near section 2.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0894",
    "body": "Hey, left a comment in the doc near section 2.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0895",
    "body": "Hey, left a comment in the doc near section 2.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0896",
    "body": "Hey, left a comment in the doc near section 2.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0897",
    "body": "Hey, left a comment in the doc near section 2.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0898",
    "body": "Hi Sam, left a comment in the doc near section 2.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0899",
    "body": "Hi Alex, left a comment in the doc near section 2.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0900",
    "body": "Hi Priya, left a comment in the doc near section 2.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0901",
    "body": "Hi Sam, left a comment in the doc near section 2.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0902",
    "body": "Hi Alex, left a comment in the doc near section 2.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0903",
    "body": "Hi Priya, left a comment in the doc near section 2.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0904",
    "body": "Hi Sam, left a comment in the doc near section 2.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0905",
    "body": "Hi Alex, left a comment in the doc near section 2.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0906",
    "body": "Hi Priya, left a comment in the doc near section 2.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0907",
    "body": "Hi Sam, left a comment in the doc near section 2.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0908",
    "body": "Hi Alex, left a comment in the doc near section 2.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0909",
    "body": "Hi Priya, left a comment in the doc near section 2.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0910",
    "body": "Hi Sam, left a comment in the doc near section 2.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0911",
    "body": "Hi Alex, left a comment in the doc near section 2.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0912",
    "body": "Hi Priya, left a comment in the doc near section 2.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0913",
    "body": "Hi Sam, left a comment in the doc near section 2.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0914",
    "body": "Hi Alex, left a comment in the doc near section 2.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0915",
    "body": "Hi Priya, left a comment in the doc near section 2.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0916",
    "body": "Hello, left a comment in the doc near section 2.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0917",
    "body": "Hello, left a comment in the doc near section 2.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0918",
    "body": "Hello, left a comment in the doc near section 2.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0919",
    "body": "Hello, left a comment in the doc near section 2.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0920",
    "body": "Hello, left a comment in the doc near section 2.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0921",
    "body": "Hello, left a comment in the doc near section 2.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0922",
    "body": "Good morning, left a comment in the doc near section 2.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0923",
    "body": "Good morning, left a comment in the doc near section 2.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0924",
    "body": "Good morning, left a comment in the doc near section 2.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0925",
    "body": "Good morning, left a comment in the doc near section 2.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0926",
    "body": "Good morning, left a comment in the doc near section 2.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0927",
    "body": "Good morning, left a comment in the doc near section 2.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0928",
    "body": "left a comment in the doc near section 2.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0929",
    "body": "left a comment in the doc near section 2.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0930",
    "body": "left a comment in the doc near section 2.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0931",
    "body": "left a comment in the doc near section 2.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0932",
    "body": "left a comment in the doc near section 2.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0933",
    "body": "Hey, parking is messy today so I might be 5 late.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0934",
    "body": "Hey, parking is messy today so I might be 5 late.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0935",
    "body": "Hey, parking is messy today so I might be 5 late.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0936",
    "body": "Hey, parking is messy today so I might be 5 late.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0937",
    "body": "Hey, parking is messy today so I might be 5 late.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0938",
    "body": "Hey, parking is messy today so I might be 5 late.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0939",
    "body": "Hi Sam, parking is messy today so I might be 5 late.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0940",
    "body": "Hi Alex, parking is messy today so I might be 5 late.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0941",
    "body": "Hi Priya, parking is messy today so I might be 5 late.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0942",
    "body": "Hi Sam, parking is messy today so I might be 5 late.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0943",
    "body": "Hi Alex, parking is messy today so I might be 5 late.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0944",
    "body": "Hi Priya, parking is messy today so I might be 5 late.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0945",
    "body": "Hi Sam, parking is messy today so I might be 5 late.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0946",
    "body": "Hi Alex, parking is messy today so I might be 5 late.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0947",
    "body": "Hi Priya, parking is messy today so I might be 5 late.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0948",
    "body": "Hi Sam, parking is messy today so I might be 5 late.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0949",
    "body": "Hi Alex, parking is messy today so I might be 5 late.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0950",
    "body": "Hi Priya, parking is messy today so I might be 5 late.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0951",
    "body": "Hi Sam, parking is messy today so I might be 5 late.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0952",
    "body": "Hi Alex, parking is messy today so I might be 5 late.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0953",
    "body": "Hi Priya, parking is messy today so I might be 5 late.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0954",
    "body": "Hi Sam, parking is messy today so I might be 5 late.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0955",
    "body": "Hi Alex, parking is messy today so I might be 5 late.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0956",
    "body": "Hi Priya, parking is messy today so I might be 5 late.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0957",
    "body": "Hello, parking is messy today so I might be 5 late.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0958",
    "body": "Hello, parking is messy today so I might be 5 late.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0959",
    "body": "Hello, parking is messy today so I might be 5 late.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0960",
    "body": "Hello, parking is messy today so I might be 5 late.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0961",
    "body": "Hello, parking is messy today so I might be 5 late.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0962",
    "body": "Hello, parking is messy today so I might be 5 late.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0963",
    "body": "Good morning, parking is messy today so I might be 5 late.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0964",
    "body": "Good morning, parking is messy today so I might be 5 late.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0965",
    "body": "Good morning, parking is messy today so I might be 5 late.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0966",
    "body": "Good morning, parking is messy today so I might be 5 late.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0967",
    "body": "Good morning, parking is messy today so I might be 5 late.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0968",
    "body": "Good morning, parking is messy today so I might be 5 late.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0969",
    "body": "parking is messy today so I might be 5 late.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0970",
    "body": "parking is messy today so I might be 5 late.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0971",
    "body": "parking is messy today so I might be 5 late.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0972",
    "body": "parking is messy today so I might be 5 late.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0973",
    "body": "parking is messy today so I might be 5 late.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0974",
    "body": "parking is messy today so I might be 5 late.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0975",
    "body": "Hey, can you share the tracking number when you have it?",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0976",
    "body": "Hey, can you share the tracking number when you have it?\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0977",
    "body": "Hey, can you share the tracking number when you have it?\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0978",
    "body": "Hey, can you share the tracking number when you have it?\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0979",
    "body": "Hey, can you share the tracking number when you have it?\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0980",
    "body": "Hey, can you share the tracking number when you have it?\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0981",
    "body": "Hi Sam, can you share the tracking number when you have it?",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0982",
    "body": "Hi Alex, can you share the tracking number when you have it?",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0983",
    "body": "Hi Priya, can you share the tracking number when you have it?",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_0984",
    "body": "Hi Sam, can you share the tracking number when you have it?\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0985",
    "body": "Hi Alex, can you share the tracking number when you have it?\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0986",
    "body": "Hi Priya, can you share the tracking number when you have it?\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_0987",
    "body": "Hi Sam, can you share the tracking number when you have it?\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0988",
    "body": "Hi Alex, can you share the tracking number when you have it?\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0989",
    "body": "Hi Priya, can you share the tracking number when you have it?\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_0990",
    "body": "Hi Sam, can you share the tracking number when you have it?\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0991",
    "body": "Hi Alex, can you share the tracking number when you have it?\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0992",
    "body": "Hi Priya, can you share the tracking number when you have it?\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_0993",
    "body": "Hi Sam, can you share the tracking number when you have it?\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0994",
    "body": "Hi Alex, can you share the tracking number when you have it?\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0995",
    "body": "Hi Priya, can you share the tracking number when you have it?\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_0996",
    "body": "Hi Sam, can you share the tracking number when you have it?\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0997",
    "body": "Hi Alex, can you share the tracking number when you have it?\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0998",
    "body": "Hi Priya, can you share the tracking number when you have it?\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_0999",
    "body": "Hello, can you share the tracking number when you have it?",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1000",
    "body": "Hello, can you share the tracking number when you have it?\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1001",
    "body": "Hello, can you share the tracking number when you have it?\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1002",
    "body": "Hello, can you share the tracking number when you have it?\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1003",
    "body": "Hello, can you share the tracking number when you have it?\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1004",
    "body": "Hello, can you share the tracking number when you have it?\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1005",
    "body": "Good morning, can you share the tracking number when you have it?",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1006",
    "body": "Good morning, can you share the tracking number when you have it?\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1007",
    "body": "Good morning, can you share the tracking number when you have it?\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1008",
    "body": "Good morning, can you share the tracking number when you have it?\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1009",
    "body": "Good morning, can you share the tracking number when you have it?\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1010",
    "body": "Good morning, can you share the tracking number when you have it?\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1011",
    "body": "can you share the tracking number when you have it?",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1012",
    "body": "can you share the tracking number when you have it?\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1013",
    "body": "can you share the tracking number when you have it?\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1014",
    "body": "can you share the tracking number when you have it?\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1015",
    "body": "can you share the tracking number when you have it?\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1016",
    "body": "can you share the tracking number when you have it?\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1017",
    "body": "Hey, I think we are aligned - just need the final PDF.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1018",
    "body": "Hey, I think we are aligned - just need the final PDF.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1019",
    "body": "Hey, I think we are aligned - just need the final PDF.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1020",
    "body": "Hey, I think we are aligned - just need the final PDF.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1021",
    "body": "Hey, I think we are aligned - just need the final PDF.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1022",
    "body": "Hey, I think we are aligned - just need the final PDF.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1023",
    "body": "Hi Sam, I think we are aligned - just need the final PDF.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1024",
    "body": "Hi Alex, I think we are aligned - just need the final PDF.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1025",
    "body": "Hi Priya, I think we are aligned - just need the final PDF.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1026",
    "body": "Hi Sam, I think we are aligned - just need the final PDF.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1027",
    "body": "Hi Alex, I think we are aligned - just need the final PDF.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1028",
    "body": "Hi Priya, I think we are aligned - just need the final PDF.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1029",
    "body": "Hi Sam, I think we are aligned - just need the final PDF.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1030",
    "body": "Hi Alex, I think we are aligned - just need the final PDF.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1031",
    "body": "Hi Priya, I think we are aligned - just need the final PDF.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1032",
    "body": "Hi Sam, I think we are aligned - just need the final PDF.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1033",
    "body": "Hi Alex, I think we are aligned - just need the final PDF.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1034",
    "body": "Hi Priya, I think we are aligned - just need the final PDF.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1035",
    "body": "Hi Sam, I think we are aligned - just need the final PDF.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1036",
    "body": "Hi Alex, I think we are aligned - just need the final PDF.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1037",
    "body": "Hi Priya, I think we are aligned - just need the final PDF.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1038",
    "body": "Hi Sam, I think we are aligned - just need the final PDF.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1039",
    "body": "Hi Alex, I think we are aligned - just need the final PDF.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1040",
    "body": "Hi Priya, I think we are aligned - just need the final PDF.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1041",
    "body": "Hello, I think we are aligned - just need the final PDF.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1042",
    "body": "Hello, I think we are aligned - just need the final PDF.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1043",
    "body": "Hello, I think we are aligned - just need the final PDF.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1044",
    "body": "Hello, I think we are aligned - just need the final PDF.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1045",
    "body": "Hello, I think we are aligned - just need the final PDF.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1046",
    "body": "Hello, I think we are aligned - just need the final PDF.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1047",
    "body": "Good morning, I think we are aligned - just need the final PDF.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1048",
    "body": "Good morning, I think we are aligned - just need the final PDF.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1049",
    "body": "Good morning, I think we are aligned - just need the final PDF.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1050",
    "body": "Good morning, I think we are aligned - just need the final PDF.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1051",
    "body": "Good morning, I think we are aligned - just need the final PDF.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1052",
    "body": "Good morning, I think we are aligned - just need the final PDF.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1053",
    "body": "I think we are aligned - just need the final PDF.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1054",
    "body": "I think we are aligned - just need the final PDF.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1055",
    "body": "I think we are aligned - just need the final PDF.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1056",
    "body": "I think we are aligned - just need the final PDF.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1057",
    "body": "I think we are aligned - just need the final PDF.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1058",
    "body": "I think we are aligned - just need the final PDF.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1059",
    "body": "Hey, please disregard the blank email I just sent.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1060",
    "body": "Hey, please disregard the blank email I just sent.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1061",
    "body": "Hey, please disregard the blank email I just sent.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1062",
    "body": "Hey, please disregard the blank email I just sent.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1063",
    "body": "Hey, please disregard the blank email I just sent.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1064",
    "body": "Hi Sam, please disregard the blank email I just sent.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1065",
    "body": "Hi Alex, please disregard the blank email I just sent.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1066",
    "body": "Hi Priya, please disregard the blank email I just sent.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1067",
    "body": "Hi Sam, please disregard the blank email I just sent.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1068",
    "body": "Hi Alex, please disregard the blank email I just sent.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1069",
    "body": "Hi Priya, please disregard the blank email I just sent.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1070",
    "body": "Hi Sam, please disregard the blank email I just sent.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1071",
    "body": "Hi Alex, please disregard the blank email I just sent.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1072",
    "body": "Hi Priya, please disregard the blank email I just sent.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1073",
    "body": "Hi Sam, please disregard the blank email I just sent.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1074",
    "body": "Hi Alex, please disregard the blank email I just sent.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1075",
    "body": "Hi Priya, please disregard the blank email I just sent.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1076",
    "body": "Hi Sam, please disregard the blank email I just sent.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1077",
    "body": "Hi Alex, please disregard the blank email I just sent.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1078",
    "body": "Hi Priya, please disregard the blank email I just sent.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1079",
    "body": "Hi Sam, please disregard the blank email I just sent.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1080",
    "body": "Hi Alex, please disregard the blank email I just sent.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1081",
    "body": "Hi Priya, please disregard the blank email I just sent.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1082",
    "body": "Hello, please disregard the blank email I just sent.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1083",
    "body": "Hello, please disregard the blank email I just sent.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1084",
    "body": "Hello, please disregard the blank email I just sent.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1085",
    "body": "Hello, please disregard the blank email I just sent.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1086",
    "body": "Hello, please disregard the blank email I just sent.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1087",
    "body": "Good morning, please disregard the blank email I just sent.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1088",
    "body": "Good morning, please disregard the blank email I just sent.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1089",
    "body": "Good morning, please disregard the blank email I just sent.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1090",
    "body": "Good morning, please disregard the blank email I just sent.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1091",
    "body": "Good morning, please disregard the blank email I just sent.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1092",
    "body": "Good morning, please disregard the blank email I just sent.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1093",
    "body": "please disregard the blank email I just sent.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1094",
    "body": "Hey, calendar holds look fine on my side for next week.",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1095",
    "body": "Hey, calendar holds look fine on my side for next week.\n\nThanks",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1096",
    "body": "Hey, calendar holds look fine on my side for next week.\n\nCheers",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1097",
    "body": "Hey, calendar holds look fine on my side for next week.\n\nBest,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1098",
    "body": "Hey, calendar holds look fine on my side for next week.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1099",
    "body": "Hey, calendar holds look fine on my side for next week.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "hey",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1100",
    "body": "Hi Sam, calendar holds look fine on my side for next week.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1101",
    "body": "Hi Alex, calendar holds look fine on my side for next week.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1102",
    "body": "Hi Priya, calendar holds look fine on my side for next week.",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1103",
    "body": "Hi Sam, calendar holds look fine on my side for next week.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1104",
    "body": "Hi Alex, calendar holds look fine on my side for next week.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1105",
    "body": "Hi Priya, calendar holds look fine on my side for next week.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1106",
    "body": "Hi Sam, calendar holds look fine on my side for next week.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1107",
    "body": "Hi Alex, calendar holds look fine on my side for next week.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1108",
    "body": "Hi Priya, calendar holds look fine on my side for next week.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1109",
    "body": "Hi Sam, calendar holds look fine on my side for next week.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1110",
    "body": "Hi Alex, calendar holds look fine on my side for next week.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1111",
    "body": "Hi Priya, calendar holds look fine on my side for next week.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1112",
    "body": "Hi Sam, calendar holds look fine on my side for next week.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1113",
    "body": "Hi Alex, calendar holds look fine on my side for next week.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1114",
    "body": "Hi Priya, calendar holds look fine on my side for next week.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1115",
    "body": "Hi Sam, calendar holds look fine on my side for next week.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1116",
    "body": "Hi Alex, calendar holds look fine on my side for next week.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1117",
    "body": "Hi Priya, calendar holds look fine on my side for next week.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "hi_name",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1118",
    "body": "Hello, calendar holds look fine on my side for next week.",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1119",
    "body": "Hello, calendar holds look fine on my side for next week.\n\nThanks",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1120",
    "body": "Hello, calendar holds look fine on my side for next week.\n\nCheers",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1121",
    "body": "Hello, calendar holds look fine on my side for next week.\n\nBest,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1122",
    "body": "Hello, calendar holds look fine on my side for next week.\n\nTalk soon",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1123",
    "body": "Hello, calendar holds look fine on my side for next week.\n\nRegards,",
    "formality": "formal",
    "greeting_style": "hello",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1124",
    "body": "Good morning, calendar holds look fine on my side for next week.",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1125",
    "body": "Good morning, calendar holds look fine on my side for next week.\n\nThanks",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1126",
    "body": "Good morning, calendar holds look fine on my side for next week.\n\nCheers",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1127",
    "body": "Good morning, calendar holds look fine on my side for next week.\n\nBest,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1128",
    "body": "Good morning, calendar holds look fine on my side for next week.\n\nTalk soon",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1129",
    "body": "Good morning, calendar holds look fine on my side for next week.\n\nRegards,",
    "formality": "business_casual",
    "greeting_style": "good_morning",
    "signoff_style": "regards",
    "band": "short"
  },
  {
    "id": "fb_1130",
    "body": "calendar holds look fine on my side for next week.",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "none",
    "band": "short"
  },
  {
    "id": "fb_1131",
    "body": "calendar holds look fine on my side for next week.\n\nThanks",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "thanks",
    "band": "short"
  },
  {
    "id": "fb_1132",
    "body": "calendar holds look fine on my side for next week.\n\nCheers",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "cheers",
    "band": "short"
  },
  {
    "id": "fb_1133",
    "body": "calendar holds look fine on my side for next week.\n\nBest,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "best",
    "band": "short"
  },
  {
    "id": "fb_1134",
    "body": "calendar holds look fine on my side for next week.\n\nTalk soon",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "talk_soon",
    "band": "short"
  },
  {
    "id": "fb_1135",
    "body": "calendar holds look fine on my side for next week.\n\nRegards,",
    "formality": "casual",
    "greeting_style": "none",
    "signoff_style": "regards",
    "band": "short"
  }
];

export const FALLBACK_BANK_COUNT = FALLBACK_TEMPLATES.length;
