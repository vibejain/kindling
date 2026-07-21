import { randomUUID } from "node:crypto";
import { seedPersonas, personasInUniverse } from "../personas/seed.js";
import {
  CORPUS_TARGETS,
  TOPIC_DOMAINS,
  LONG_ELIGIBLE_TOPICS,
  SHORT_MICRO_ONLY_TOPICS,
  offsetDays,
  type ArcTemplate,
  type EmotionalRegister,
  type EstablishedFact,
  type LengthBand,
  type Persona,
  type PlannedThread,
  type SubstanceLevel,
  type TopicDomain,
} from "../types/index.js";
import { UNIVERSES, getUniverse } from "../universes/catalog.js";
import {
  ValidationError,
  buildEntityUniverseMap,
  validateCorpus,
  validateThread,
} from "../validator/universe.js";

const ARC_ORDER: ArcTemplate[] = [
  "DECAY",
  "ESCALATION",
  "FLAT_CHATTER",
  "BURST",
];

const SUBSTANCE_ORDER: SubstanceLevel[] = ["trivial", "routine", "consequential"];

interface PremiseTemplate {
  universeId: string;
  topicDomain: TopicDomain;
  emotionalRegister: EmotionalRegister;
  /** Preferred substance ceilings this premise can support */
  maxSubstance: SubstanceLevel;
  premise: string;
  facts: Array<{ factKey: string; factValue: string }>;
  openQuestions: string[];
  /** True if apology is material enough for long/anchor */
  materialApology?: boolean;
}

/**
 * Universe-scoped premise bank.
 * Dates are relative offsets (`offset_days:N`) - never absolute calendar strings.
 * Entity names / ID prefixes appear only in their owning universe.
 */
const PREMISE_BANK: PremiseTemplate[] = [
  // ========== meridian_east ==========
  {
    universeId: "meridian_east",
    topicDomain: "invoices",
    emotionalRegister: "neutral_professional",
    maxSubstance: "consequential",
    premise:
      "Invoice INV-ME-0847 for $4,280.00 (Net 30) covering redesign hours on the Northline Clinics portal package is unpaid; AP says remittance was sent offset_days:-10 but it never hit Fryloop's Stripe. Need to reconcile wire ref WR-ME-99102 vs the PDF.",
    facts: [
      { factKey: "invoice_id", factValue: "INV-ME-0847" },
      { factKey: "amount", factValue: "$4,280.00" },
      { factKey: "terms", factValue: "Net 30" },
      { factKey: "client", factValue: "Northline Clinics" },
      { factKey: "wire_ref", factValue: "WR-ME-99102" },
      { factKey: "claimed_remit_offset", factValue: offsetDays(-10) },
    ],
    openQuestions: [
      "Did Northline send ACH or wire, and to which account ending?",
      "Can we re-issue INV-ME-0847 with updated remittance instructions?",
    ],
  },
  {
    universeId: "meridian_east",
    topicDomain: "scope",
    emotionalRegister: "assertive",
    maxSubstance: "consequential",
    premise:
      "Northline Clinics asked for an extra patient-portal SSO flow that wasn't in SOW-ME-441. Original SOW covered email/password + MFA only. Rough change order: 32-40 eng hours ($9,600-$12,000) plus 1 week QA. They want it by offset_days:+17.",
    facts: [
      { factKey: "client", factValue: "Northline Clinics" },
      { factKey: "sow_id", factValue: "SOW-ME-441" },
      { factKey: "change_order_hours", factValue: "32-40 eng hours" },
      { factKey: "change_order_range", factValue: "$9,600-$12,000" },
      { factKey: "requested_release_offset", factValue: offsetDays(17) },
    ],
    openQuestions: [
      "Approve CO before scoping SSO IdP (Okta vs Azure AD)?",
      "Is the release offset a hard clinical go-live or a soft target?",
    ],
  },
  {
    universeId: "meridian_east",
    topicDomain: "legal",
    emotionalRegister: "neutral_professional",
    maxSubstance: "consequential",
    premise:
      "MSA-ME-220 with Brightpath Logistics needs countersignature. They redlined Section 4.2(b) liability cap from 12 months fees to $250k aggregate, and added a 90-day termination-for-convenience. Playbook usually holds 12 months fees; annual spend ~$180k.",
    facts: [
      { factKey: "msa_id", factValue: "MSA-ME-220" },
      { factKey: "counterparty", factValue: "Brightpath Logistics" },
      { factKey: "clause", factValue: "Section 4.2(b)" },
      { factKey: "their_cap", factValue: "$250k aggregate" },
      { factKey: "estimated_annual_spend", factValue: "~$180k" },
    ],
    openQuestions: [
      "Accept $250k cap if they drop 90-day convenience terminate?",
      "Escalate before end of week?",
    ],
  },
  {
    universeId: "meridian_east",
    topicDomain: "client_feedback",
    emotionalRegister: "apologetic",
    maxSubstance: "consequential",
    premise:
      "Northline Clinics CSAT on the training call (offset_days:-11) scored 2/5. Portal demo used sandbox data showing wrong clinic name and MFA steps didn't match PDF guide v1.3. Account owner wants makeup session before staff go-live offset_days:+12.",
    facts: [
      { factKey: "client", factValue: "Northline Clinics" },
      { factKey: "csat_score", factValue: "2/5" },
      { factKey: "training_offset", factValue: offsetDays(-11) },
      { factKey: "guide_version", factValue: "PDF guide v1.3" },
      { factKey: "go_live_offset", factValue: offsetDays(12) },
    ],
    openQuestions: [
      "Schedule makeup training within the next week?",
      "Do we credit one month of onboarding support (~$1,200)?",
    ],
  },
  {
    universeId: "meridian_east",
    topicDomain: "apologies",
    emotionalRegister: "apologetic",
    maxSubstance: "routine",
    materialApology: true,
    premise:
      "Missed the call with Brightpath Logistics AP (offset_days:-8). Calendar invite went to Sophie but not to R. Okonkwo; contact waited 12 minutes on Zoom. Need to apologize and rebook before they escalate unpaid INV-ME-0847.",
    facts: [
      { factKey: "missed_meeting_offset", factValue: offsetDays(-8) },
      { factKey: "contact", factValue: "Brightpath Logistics AP" },
      { factKey: "related_invoice", factValue: "INV-ME-0847" },
    ],
    openQuestions: [
      "Who sends the apology - Sophie or R. Okonkwo?",
      "Offer two slots early next week?",
    ],
  },
  {
    universeId: "meridian_east",
    topicDomain: "scheduling",
    emotionalRegister: "friendly_casual",
    maxSubstance: "routine",
    premise:
      "Need 30 min to walk Cobalt Retail Group through the CRG-DASH activation checklist before their soft launch offset_days:+5. Sophie free Tue afternoon ET; Rachel free Wed morning.",
    facts: [
      { factKey: "meeting_length", factValue: "30 minutes" },
      { factKey: "project", factValue: "CRG-DASH" },
      { factKey: "launch_offset", factValue: offsetDays(5) },
    ],
    openQuestions: ["Tue afternoon or Wed morning ET?", "Zoom or phone?"],
  },
  {
    universeId: "meridian_east",
    topicDomain: "hiring",
    emotionalRegister: "warm_collaborative",
    maxSubstance: "routine",
    premise:
      "Final-round logistics for Senior CS candidate via Hirewire Agency. Panel is Sophie + Rachel. Candidate notice is 4 weeks; target start offset_days:+28. Need two interview slots next week.",
    facts: [
      { factKey: "role", factValue: "Senior CS Manager" },
      { factKey: "agency", factValue: "Hirewire Agency" },
      { factKey: "target_start_offset", factValue: offsetDays(28) },
    ],
    openQuestions: ["Which two ET slots work?", "Who sends the calendar hold?"],
  },
  {
    universeId: "meridian_east",
    topicDomain: "ops",
    emotionalRegister: "terse_busy",
    maxSubstance: "trivial",
    premise: "Kitchen filter swap still queued - can someone confirm the Wed early slot with facilities?",
    facts: [{ factKey: "ask", factValue: "confirm Wed early facilities slot" }],
    openQuestions: ["Who badges the vendor in?"],
  },
  {
    universeId: "meridian_east",
    topicDomain: "scheduling",
    emotionalRegister: "friendly_casual",
    maxSubstance: "trivial",
    premise: "Mind if we slip our 1:1 by 15 minutes? Running over on a call.",
    facts: [{ factKey: "ask", factValue: "slip 1:1 by 15 minutes" }],
    openQuestions: ["Still works?"],
  },
  {
    universeId: "meridian_east",
    topicDomain: "ops",
    emotionalRegister: "friendly_casual",
    maxSubstance: "trivial",
    premise: "Printer on 4 is jammed again - ignoring unless you need something printed today.",
    facts: [],
    openQuestions: ["Need anything printed?"],
  },
  {
    universeId: "meridian_east",
    topicDomain: "it",
    emotionalRegister: "terse_busy",
    maxSubstance: "routine",
    premise:
      "Routine VPN flakiness for two East-coast users after the weekend. No ticket yet - just checking if Rachel saw it too before we open INC-ME-.",
    facts: [
      { factKey: "symptom", factValue: "VPN flaky for 2 East users" },
      { factKey: "severity", factValue: "after weekend" },
    ],
    openQuestions: ["Open a ticket or wait one more day?"],
  },
  {
    universeId: "meridian_east",
    topicDomain: "vendor",
    emotionalRegister: "terse_busy",
    maxSubstance: "routine",
    premise:
      "PrintHaus NYC quoted $1,145 for 500 capability booklets; proof due offset_days:+3. Alternate from a west shop is cheaper but +4 days - need PO-ME-7781 decision tomorrow.",
    facts: [
      { factKey: "vendor", factValue: "PrintHaus NYC" },
      { factKey: "quote", factValue: "$1,145 / 500 copies" },
      { factKey: "proof_offset", factValue: offsetDays(3) },
    ],
    openQuestions: ["Approve and cut PO-ME-7781?"],
  },
  {
    universeId: "meridian_east",
    topicDomain: "meeting_recaps",
    emotionalRegister: "warm_collaborative",
    maxSubstance: "routine",
    premise:
      "Recap from BP-ONBOARD sync (offset_days:-2): (1) Brightpath SSO test users ready, (2) finance to confirm INV-ME-0901 draft, (3) Sophie owns next check-in. Action owners weren't emailed yet.",
    facts: [
      { factKey: "meeting_offset", factValue: offsetDays(-2) },
      { factKey: "project", factValue: "BP-ONBOARD" },
      { factKey: "invoice_draft", factValue: "INV-ME-0901" },
    ],
    openQuestions: ["Who drafts the one-pager?", "Include the SSO blocker?"],
  },
  {
    universeId: "meridian_east",
    topicDomain: "project_status",
    emotionalRegister: "slightly_stressed",
    maxSubstance: "consequential",
    premise:
      "NL-PORTAL activation is at 41% vs 48% target. Onboarding email sequence delayed - template TW-ME-09 still in legal review since offset_days:-18. Product wants to ship without the data-processing paragraph; finance won't.",
    facts: [
      { factKey: "project", factValue: "NL-PORTAL" },
      { factKey: "activation_actual", factValue: "41%" },
      { factKey: "activation_target", factValue: "48%" },
      { factKey: "blocked_template", factValue: "TW-ME-09" },
      { factKey: "legal_since_offset", factValue: offsetDays(-18) },
    ],
    openQuestions: [
      "Can legal clear TW-ME-09 by end of week with DPA paragraph intact?",
      "Document the blocker and accept missing target?",
    ],
  },

  // ========== pinecrest_west ==========
  {
    universeId: "pinecrest_west",
    topicDomain: "project_status",
    emotionalRegister: "slightly_stressed",
    maxSubstance: "consequential",
    premise:
      "HV-FITOUT is slipping: structural markups on S1.12 still outstanding from Apex Structural West as of offset_days:-5. Site wants formwork pour offset_days:+2; if S1.12 isn't stamped, pour moves offset_days:+5 and burns ~$6,200 in crane hold.",
    facts: [
      { factKey: "project", factValue: "HV-FITOUT" },
      { factKey: "drawing", factValue: "S1.12" },
      { factKey: "consultant", factValue: "Apex Structural West" },
      { factKey: "pour_offset", factValue: offsetDays(2) },
      { factKey: "crane_hold_cost", factValue: "~$6,200" },
    ],
    openQuestions: [
      "Has Apex confirmed markups by EOD?",
      "Authorize crane hold or slip the pour?",
    ],
  },
  {
    universeId: "pinecrest_west",
    topicDomain: "scheduling",
    emotionalRegister: "friendly_casual",
    maxSubstance: "routine",
    premise:
      "Need a 45-min design review before Pacific Civic Trust council submission offset_days:+5. Nat free Tue 2-4pm PT; Emily prefers Wed morning. Room conflict Tue afternoon.",
    facts: [
      { factKey: "meeting_length", factValue: "45 minutes" },
      { factKey: "deadline_offset", factValue: offsetDays(5) },
      { factKey: "client", factValue: "Pacific Civic Trust" },
    ],
    openQuestions: ["Move to Wed morning PT on Zoom?", "Who circulates RevC beforehand?"],
  },
  {
    universeId: "pinecrest_west",
    topicDomain: "client_feedback",
    emotionalRegister: "warm_collaborative",
    maxSubstance: "consequential",
    premise:
      "Lumen Grove Retail loved lobby mood boards (MB-PW-04_RevB.pdf) but asked to swap brass fixtures for matte black and cut feature-wall tile (saves ~$11k). Nat thinks black still hits brand; Emily wants one more client review before ordering.",
    facts: [
      { factKey: "file", factValue: "MB-PW-04_RevB.pdf" },
      { factKey: "client", factValue: "Lumen Grove Retail" },
      { factKey: "savings", factValue: "~$11k tile cut" },
      { factKey: "fixture_change", factValue: "brass → matte black" },
    ],
    openQuestions: ["Lock matte black and issue RevC?", "20-min call or email approval?"],
  },
  {
    universeId: "pinecrest_west",
    topicDomain: "vendor",
    emotionalRegister: "terse_busy",
    maxSubstance: "routine",
    premise:
      "RapidPress LA quoted $1,145 for 500 Archikit booklets; proof due offset_days:+3, delivery offset_days:+10. BindCo West is $980 but +4 days. Need PO-PW-12 by tomorrow.",
    facts: [
      { factKey: "vendor_a", factValue: "RapidPress LA" },
      { factKey: "quote_a", factValue: "$1,145 / 500" },
      { factKey: "vendor_b", factValue: "BindCo West" },
      { factKey: "proof_offset", factValue: offsetDays(3) },
    ],
    openQuestions: ["Approve RapidPress LA?", "Who signs digital proof?"],
  },
  {
    universeId: "pinecrest_west",
    topicDomain: "invoices",
    emotionalRegister: "assertive",
    maxSubstance: "consequential",
    premise:
      "Tax invoice INV-PW-5521 for $18,750 on JOB-PW-1184. Client PO was only $15,000 - delta is weekend overtime approved verbally by Nat on offset_days:-42. Need written confirmation for PO amendment.",
    facts: [
      { factKey: "invoice_id", factValue: "INV-PW-5521" },
      { factKey: "amount", factValue: "$18,750" },
      { factKey: "po_amount", factValue: "$15,000" },
      { factKey: "job_code", factValue: "JOB-PW-1184" },
      { factKey: "overtime_verbal_offset", factValue: offsetDays(-42) },
    ],
    openQuestions: [
      "Will Nat email written OT approval retrospectively?",
      "Split invoice: $15k against PO + $3,750 variation?",
    ],
  },
  {
    universeId: "pinecrest_west",
    topicDomain: "legal",
    emotionalRegister: "slightly_stressed",
    maxSubstance: "routine",
    premise:
      "NDA-PW-319 with Apex Structural West expires offset_days:+10. Harborview Residences still needs them through next quarter. Renewal adds 12-month non-solicit Nat may reject.",
    facts: [
      { factKey: "nda_id", factValue: "NDA-PW-319" },
      { factKey: "expires_offset", factValue: offsetDays(10) },
      { factKey: "counterparty", factValue: "Apex Structural West" },
    ],
    openQuestions: ["Accept non-solicit or push mutual 6-month?", "Bridge letter if signature slips?"],
  },
  {
    universeId: "pinecrest_west",
    topicDomain: "meeting_recaps",
    emotionalRegister: "warm_collaborative",
    maxSubstance: "routine",
    premise:
      "Recap from Harborview Residences coordination (offset_days:-5): Apex to issue S1.12 by Wed, Archikit to upload RevC to HV-FITOUT folder, site PM wants one-pager by EOD tomorrow.",
    facts: [
      { factKey: "meeting_offset", factValue: offsetDays(-5) },
      { factKey: "client", factValue: "Harborview Residences" },
      { factKey: "project", factValue: "HV-FITOUT" },
    ],
    openQuestions: ["Who drafts the one-pager - Emily or Nat?", "Include crane contingency?"],
  },
  {
    universeId: "pinecrest_west",
    topicDomain: "ops",
    emotionalRegister: "friendly_casual",
    maxSubstance: "trivial",
    premise: "Can someone grab the sample board from the studio lobby before the client walkthrough?",
    facts: [{ factKey: "ask", factValue: "retrieve sample board from lobby" }],
    openQuestions: ["Leave it at Nat's desk?"],
  },
  {
    universeId: "pinecrest_west",
    topicDomain: "scheduling",
    emotionalRegister: "friendly_casual",
    maxSubstance: "trivial",
    premise: "Quick - can we do stand-up async today? Site visit ran long.",
    facts: [],
    openQuestions: ["Post updates in the channel?"],
  },
  {
    universeId: "pinecrest_west",
    topicDomain: "ops",
    emotionalRegister: "terse_busy",
    maxSubstance: "trivial",
    premise: "Coffee machine descaling light is on. Not urgent - flagging.",
    facts: [{ factKey: "ask", factValue: "coffee machine descaling light" }],
    openQuestions: ["Anyone know the descale packs drawer?"],
  },
  {
    universeId: "pinecrest_west",
    topicDomain: "it",
    emotionalRegister: "terse_busy",
    maxSubstance: "routine",
    premise:
      "Six Archikit MacBooks still missing MDM profile for cyber insurer scan due offset_days:+6. Emily can send serials for remote enroll.",
    facts: [
      { factKey: "device_count", factValue: "6 MacBooks" },
      { factKey: "compliance_offset", factValue: offsetDays(6) },
    ],
    openQuestions: ["Send serial list today?", "Any devices offsite with consultants?"],
  },
  {
    universeId: "pinecrest_west",
    topicDomain: "scope",
    emotionalRegister: "warm_collaborative",
    maxSubstance: "consequential",
    premise:
      "PCT-ANNEX phase 1 covered lobby + wayfinding; Pacific Civic Trust just asked for a careers wall and 8 staff bios. Out of scope in PROP-PW-88 ($14,200). Extra ~16 hours ($2,400) if we reuse the board template.",
    facts: [
      { factKey: "proposal_id", factValue: "PROP-PW-88" },
      { factKey: "phase1_fee", factValue: "$14,200" },
      { factKey: "extra_estimate", factValue: "~16 hours / $2,400" },
      { factKey: "client", factValue: "Pacific Civic Trust" },
      { factKey: "project", factValue: "PCT-ANNEX" },
    ],
    openQuestions: ["Fold into phase 1 via CO or push to phase 2?", "Who provides headshots?"],
  },
  {
    universeId: "pinecrest_west",
    topicDomain: "hiring",
    emotionalRegister: "friendly_casual",
    maxSubstance: "routine",
    premise:
      "Junior designer trial week logistics - need badge + desk for candidate starting offset_days:+3. Emily owns orientation; Nat owns drawing standards walkthrough.",
    facts: [
      { factKey: "role", factValue: "Junior designer trial" },
      { factKey: "start_offset", factValue: offsetDays(3) },
    ],
    openQuestions: ["Badge ready by Monday?", "Which desk?"],
  },
  {
    universeId: "pinecrest_west",
    topicDomain: "apologies",
    emotionalRegister: "apologetic",
    maxSubstance: "routine",
    materialApology: true,
    premise:
      "Sent Lumen Grove Retail the wrong sheet set (internal markups) instead of clean RevB. Caught within the hour - need apology and request they delete the draft.",
    facts: [
      { factKey: "client", factValue: "Lumen Grove Retail" },
      { factKey: "wrong_deliverable", factValue: "internal markups sheet set" },
      { factKey: "correct_deliverable", factValue: "clean RevB" },
    ],
    openQuestions: ["Who calls vs email-only?", "Re-send RevB tonight?"],
  },

  // ========== harbour_sydney ==========
  {
    universeId: "harbour_sydney",
    topicDomain: "project_status",
    emotionalRegister: "slightly_stressed",
    maxSubstance: "consequential",
    premise:
      "JOB-HS-1184 (QF-TOWER fit-out) slipping: S1-12 markups from Apex Engineers AU still outstanding since offset_days:-5. Pour target offset_days:+2; slip burns ~$6,200 AUD + GST in crane hold via CraneHold Pty.",
    facts: [
      { factKey: "job_code", factValue: "JOB-HS-1184" },
      { factKey: "project", factValue: "QF-TOWER" },
      { factKey: "drawing", factValue: "S1-12" },
      { factKey: "consultant", factValue: "Apex Engineers AU" },
      { factKey: "pour_offset", factValue: offsetDays(2) },
      { factKey: "crane_hold_cost", factValue: "~$6,200 AUD + GST" },
    ],
    openQuestions: ["Apex markups by EOD Wed?", "Authorize crane hold or slip pour?"],
  },
  {
    universeId: "harbour_sydney",
    topicDomain: "invoices",
    emotionalRegister: "assertive",
    maxSubstance: "consequential",
    premise:
      "DGC issued TI-HS-5521 for $18,750 + GST for Feb site supervision on JOB-HS-1184 for Quayfront Developments. PO was $15,000 - delta is weekend OT approved verbally offset_days:-42.",
    facts: [
      { factKey: "invoice_id", factValue: "TI-HS-5521" },
      { factKey: "amount", factValue: "$18,750 + GST" },
      { factKey: "po_amount", factValue: "$15,000" },
      { factKey: "job_code", factValue: "JOB-HS-1184" },
      { factKey: "client", factValue: "Quayfront Developments" },
    ],
    openQuestions: ["Written OT approval retrospectively?", "Split invoice vs variation?"],
  },
  {
    universeId: "harbour_sydney",
    topicDomain: "scheduling",
    emotionalRegister: "terse_busy",
    maxSubstance: "routine",
    premise:
      "Need 15-min phone call tomorrow about whether JOB-HS-1184 site can use guest Wi-Fi for tablet drawings. Sajal free 8:30-9:15 or 16:00-16:40 AEST.",
    facts: [
      { factKey: "call_length", factValue: "15 minutes" },
      { factKey: "medium", factValue: "phone (not Zoom)" },
      { factKey: "job_code", factValue: "JOB-HS-1184" },
    ],
    openQuestions: ["Which window?", "Any exception process on other sites?"],
  },
  {
    universeId: "harbour_sydney",
    topicDomain: "it",
    emotionalRegister: "slightly_stressed",
    maxSubstance: "routine",
    premise:
      "Site tablets on QF-TOWER dropping Wi-Fi every ~12 minutes after Friday's AP change. Temporary workaround is guest SSID but IT policy usually blocks it.",
    facts: [
      { factKey: "project", factValue: "QF-TOWER" },
      { factKey: "symptom", factValue: "Wi-Fi drop ~every 12 minutes" },
    ],
    openQuestions: ["Allow guest SSID exception for site?", "Roll back AP change tonight?"],
  },
  {
    universeId: "harbour_sydney",
    topicDomain: "ops",
    emotionalRegister: "terse_busy",
    maxSubstance: "trivial",
    premise: "Crane induction forms still not in the site hut - can someone print two copies before 7am?",
    facts: [{ factKey: "ask", factValue: "print two crane induction forms" }],
    openQuestions: ["Leave on Sajal's desk?"],
  },
  {
    universeId: "harbour_sydney",
    topicDomain: "scheduling",
    emotionalRegister: "friendly_casual",
    maxSubstance: "trivial",
    premise: "Running 10 late to the gate - start without me if needed.",
    facts: [],
    openQuestions: ["All good?"],
  },
  {
    universeId: "harbour_sydney",
    topicDomain: "ops",
    emotionalRegister: "friendly_casual",
    maxSubstance: "trivial",
    premise: "Who has the spare high-vis in the ute? Mine's soaked.",
    facts: [{ factKey: "ask", factValue: "spare high-vis in ute" }],
    openQuestions: ["Passenger seat?"],
  },
  {
    universeId: "harbour_sydney",
    topicDomain: "vendor",
    emotionalRegister: "neutral_professional",
    maxSubstance: "routine",
    premise:
      "TileHouse Sydney quote for IWC-LIBRARY sample pack is $642.80 (receipt RH-HS-88921). Need PO-HS-44 before offset_days:+2 or samples slip a week.",
    facts: [
      { factKey: "vendor", factValue: "TileHouse Sydney" },
      { factKey: "amount", factValue: "$642.80" },
      { factKey: "receipt", factValue: "RH-HS-88921" },
      { factKey: "project", factValue: "IWC-LIBRARY" },
    ],
    openQuestions: ["Cut PO-HS-44 today?", "Who collects samples?"],
  },
  {
    universeId: "harbour_sydney",
    topicDomain: "legal",
    emotionalRegister: "neutral_professional",
    maxSubstance: "routine",
    premise:
      "NDA-HS-319 with Apex Engineers AU expires offset_days:+10. SC-PAVILION still needs them. Renewal adds non-solicit - director may reject.",
    facts: [
      { factKey: "nda_id", factValue: "NDA-HS-319" },
      { factKey: "expires_offset", factValue: offsetDays(10) },
      { factKey: "counterparty", factValue: "Apex Engineers AU" },
      { factKey: "project", factValue: "SC-PAVILION" },
    ],
    openQuestions: ["Accept non-solicit or mutual 6-month?", "Bridge letter if late?"],
  },
  {
    universeId: "harbour_sydney",
    topicDomain: "meeting_recaps",
    emotionalRegister: "warm_collaborative",
    maxSubstance: "routine",
    premise:
      "Recap Inner West Councils coordination (offset_days:-3): Apex markups Wed, DGC confirms crane, upload drawings to IWC-LIBRARY folder. Site PM wants one-pager tomorrow.",
    facts: [
      { factKey: "meeting_offset", factValue: offsetDays(-3) },
      { factKey: "client", factValue: "Inner West Councils" },
      { factKey: "project", factValue: "IWC-LIBRARY" },
    ],
    openQuestions: ["Who drafts one-pager?", "Include crane contingency?"],
  },
  {
    universeId: "harbour_sydney",
    topicDomain: "scope",
    emotionalRegister: "slightly_stressed",
    maxSubstance: "consequential",
    premise:
      "Quayfront Developments asked for a 60s LinkedIn progress reel on QF-TOWER - not in original supervision scope. Shoot on crane day offset_days:+2 for ~$1,800 edit, or their videographer ~$3,200.",
    facts: [
      { factKey: "client", factValue: "Quayfront Developments" },
      { factKey: "project", factValue: "QF-TOWER" },
      { factKey: "deliverable", factValue: "60s LinkedIn progress reel" },
      { factKey: "weedo_alt_cost", factValue: "~$1,800" },
      { factKey: "shoot_offset", factValue: offsetDays(2) },
    ],
    openQuestions: ["Approve $1,800 add-on?", "Who arranges site induction for camera?"],
  },
  {
    universeId: "harbour_sydney",
    topicDomain: "hiring",
    emotionalRegister: "friendly_casual",
    maxSubstance: "routine",
    premise:
      "Site admin contractor start logistics offset_days:+7 - need induction booking and PPE sizes. Sajal owns IT account; Vaibhav owns site intro.",
    facts: [
      { factKey: "role", factValue: "Site admin contractor" },
      { factKey: "start_offset", factValue: offsetDays(7) },
    ],
    openQuestions: ["Induction slot confirmed?", "PPE sizes collected?"],
  },
  {
    universeId: "harbour_sydney",
    topicDomain: "client_feedback",
    emotionalRegister: "apologetic",
    maxSubstance: "routine",
    premise:
      "Sutherland Civic flagged that last week's progress photos for SC-PAVILION showed the wrong elevation. They want corrected set before the council pack offset_days:+4.",
    facts: [
      { factKey: "client", factValue: "Sutherland Civic" },
      { factKey: "project", factValue: "SC-PAVILION" },
      { factKey: "pack_offset", factValue: offsetDays(4) },
    ],
    openQuestions: ["Reshoot or crop existing?", "Who uploads corrected set?"],
  },
  {
    universeId: "harbour_sydney",
    topicDomain: "apologies",
    emotionalRegister: "apologetic",
    maxSubstance: "routine",
    materialApology: true,
    premise:
      "Missed Quayfront Developments site walk (offset_days:-1). Traffic + wrong gate. Need apology and rebook before pour decision.",
    facts: [
      { factKey: "missed_offset", factValue: offsetDays(-1) },
      { factKey: "client", factValue: "Quayfront Developments" },
    ],
    openQuestions: ["Who calls the PM?", "Offer tomorrow 7am?"],
  },

  // ========== weedo_mel ==========
  {
    universeId: "weedo_mel",
    topicDomain: "scope",
    emotionalRegister: "warm_collaborative",
    maxSubstance: "consequential",
    premise:
      "AF-WEB phase 1 (homepage + projects index) in scope; Archiform Studio asked to add careers page + CMS for 8 bios. Explicitly out of PROP-WM-88 ($14,200). Extra ~16 hours ($2,400) if we reuse blog template.",
    facts: [
      { factKey: "proposal_id", factValue: "PROP-WM-88" },
      { factKey: "phase1_fee", factValue: "$14,200" },
      { factKey: "extra_estimate", factValue: "~16 hours / $2,400" },
      { factKey: "client", factValue: "Archiform Studio" },
      { factKey: "project", factValue: "AF-WEB" },
    ],
    openQuestions: ["Change order now or phase 2?", "Who provides headshots?"],
  },
  {
    universeId: "weedo_mel",
    topicDomain: "project_status",
    emotionalRegister: "slightly_stressed",
    maxSubstance: "consequential",
    premise:
      "Blocked on Archiform Studio brand assets: missing logo pack (SVG + favicon). Checklist BRAND-03 open since offset_days:-21. Soft launch was offset_days:-4; now looking at offset_days:+10. Assets with PixelNorth who went quiet.",
    facts: [
      { factKey: "checklist_item", factValue: "BRAND-03" },
      { factKey: "blocked_since_offset", factValue: offsetDays(-21) },
      { factKey: "original_launch_offset", factValue: offsetDays(-4) },
      { factKey: "revised_launch_offset", factValue: offsetDays(10) },
      { factKey: "asset_vendor", factValue: "PixelNorth" },
      { factKey: "client", factValue: "Archiform Studio" },
    ],
    openQuestions: ["Chase PixelNorth today?", "Recreate favicon from PNG if SVG never arrives?"],
  },
  {
    universeId: "weedo_mel",
    topicDomain: "hiring",
    emotionalRegister: "friendly_casual",
    maxSubstance: "routine",
    premise:
      "Contract frontend trial: candidate via Hireloop Mel finished week 2 of 4. Agency rate $95/hr; FTE would be $105k. Go/no-go before week 4 ends offset_days:+14.",
    facts: [
      { factKey: "agency", factValue: "Hireloop Mel" },
      { factKey: "rate", factValue: "$95/hr" },
      { factKey: "fte_comp", factValue: "$105k" },
      { factKey: "trial_end_offset", factValue: offsetDays(14) },
    ],
    openQuestions: ["Extend 4 weeks or convert?", "Who does design-QA coaching?"],
  },
  {
    universeId: "weedo_mel",
    topicDomain: "scheduling",
    emotionalRegister: "friendly_casual",
    maxSubstance: "routine",
    premise:
      "Move Archiform / Weedo kickoff from offset_days:+2 10am to either offset_days:+3 11:30 or offset_days:+5 9:00 - Dev has a conflicting shoot. Agenda PDF already sent.",
    facts: [
      { factKey: "original_offset", factValue: offsetDays(2) },
      { factKey: "option_a_offset", factValue: offsetDays(3) },
      { factKey: "option_b_offset", factValue: offsetDays(5) },
      { factKey: "client", factValue: "Archiform Studio" },
    ],
    openQuestions: ["Which slot?", "Same Zoom or studio?"],
  },
  {
    universeId: "weedo_mel",
    topicDomain: "vendor",
    emotionalRegister: "neutral_professional",
    maxSubstance: "routine",
    premise:
      "CloudNexus AU March invoice $2,931.44 - 18% over forecast from untagged GPU left running since offset_days:-19. Need owner to terminate or tag to HO-BRAND spike.",
    facts: [
      { factKey: "vendor", factValue: "CloudNexus AU" },
      { factKey: "invoice_amount", factValue: "$2,931.44" },
      { factKey: "overage_pct", factValue: "18%" },
      { factKey: "project", factValue: "HO-BRAND" },
    ],
    openQuestions: ["Terminate tonight or keep a week?", "Chargeback to product?"],
  },
  {
    universeId: "weedo_mel",
    topicDomain: "invoices",
    emotionalRegister: "neutral_professional",
    maxSubstance: "routine",
    premise:
      "INV-WM-2204 expense-style pass-through: $642.80 sample materials for Priory Collective. Policy needs pre-approval over $500; Olivia says Dev verbally approved on Slack offset_days:-12.",
    facts: [
      { factKey: "invoice_id", factValue: "INV-WM-2204" },
      { factKey: "amount", factValue: "$642.80" },
      { factKey: "client", factValue: "Priory Collective" },
      { factKey: "approval_offset", factValue: offsetDays(-12) },
    ],
    openQuestions: ["Dev reply-all confirming approval?", "Reimburse now or wait?"],
  },
  {
    universeId: "weedo_mel",
    topicDomain: "ops",
    emotionalRegister: "friendly_casual",
    maxSubstance: "trivial",
    premise: "Can you ping the group chat about lunch orders for Friday's shoot day?",
    facts: [{ factKey: "ask", factValue: "lunch orders for Friday shoot" }],
    openQuestions: ["Cutoff Thursday noon?"],
  },
  {
    universeId: "weedo_mel",
    topicDomain: "scheduling",
    emotionalRegister: "friendly_casual",
    maxSubstance: "trivial",
    premise: "Can we push sync 20 min? Still rendering.",
    facts: [],
    openQuestions: ["Same link?"],
  },
  {
    universeId: "weedo_mel",
    topicDomain: "ops",
    emotionalRegister: "terse_busy",
    maxSubstance: "trivial",
    premise: "Studio lights left on overnight again - just turning them off.",
    facts: [{ factKey: "ask", factValue: "studio lights left on" }],
    openQuestions: ["Who locked up?"],
  },
  {
    universeId: "weedo_mel",
    topicDomain: "it",
    emotionalRegister: "terse_busy",
    maxSubstance: "routine",
    premise:
      "Staging password rotated again - Dev can't get into AF-WEB preview. Olivia has the 1Password share link.",
    facts: [
      { factKey: "project", factValue: "AF-WEB" },
      { factKey: "issue", factValue: "staging password rotated" },
    ],
    openQuestions: ["Reshare 1Password item?", "Reset and text Dev?"],
  },
  {
    universeId: "weedo_mel",
    topicDomain: "meeting_recaps",
    emotionalRegister: "friendly_casual",
    maxSubstance: "routine",
    premise:
      "Quick recap Fri hiring sync: advance HelioOps AU referral candidate to offer draft OFR-WM-12 by Tue; park contractor decision one more week. Referral bonus ($1,500) only if employee referral - this one was InMail.",
    facts: [
      { factKey: "client_ref", factValue: "HelioOps AU" },
      { factKey: "offer_doc", factValue: "OFR-WM-12" },
      { factKey: "referral_bonus", factValue: "$1,500 (employee referral only)" },
    ],
    openQuestions: ["Confirm no referral bonus?", "CC legal on offer?"],
  },
  {
    universeId: "weedo_mel",
    topicDomain: "client_feedback",
    emotionalRegister: "apologetic",
    maxSubstance: "routine",
    premise:
      "Priory Collective CSAT on PC-REEL review call scored low - cut used wrong brand music bed. Makeup review before their board pack offset_days:+6.",
    facts: [
      { factKey: "client", factValue: "Priory Collective" },
      { factKey: "project", factValue: "PC-REEL" },
      { factKey: "board_pack_offset", factValue: offsetDays(6) },
    ],
    openQuestions: ["Reschedule review this week?", "Credit one edit round?"],
  },
  {
    universeId: "weedo_mel",
    topicDomain: "legal",
    emotionalRegister: "neutral_professional",
    maxSubstance: "routine",
    premise:
      "SOW-WM-55 with HelioOps AU needs signature before HO-BRAND kickoff offset_days:+9. Their counsel wants a narrower publicity clause.",
    facts: [
      { factKey: "sow_id", factValue: "SOW-WM-55" },
      { factKey: "client", factValue: "HelioOps AU" },
      { factKey: "project", factValue: "HO-BRAND" },
      { factKey: "kickoff_offset", factValue: offsetDays(9) },
    ],
    openQuestions: ["Accept narrower publicity?", "Escalate to outside counsel?"],
  },
  {
    universeId: "weedo_mel",
    topicDomain: "apologies",
    emotionalRegister: "apologetic",
    maxSubstance: "routine",
    materialApology: true,
    premise:
      "Wrong attachment to Archiform Studio: sent internal estimate sheet instead of clean PROP-WM-88 PDF. Caught 40 minutes later - need apology + delete request.",
    facts: [
      { factKey: "client", factValue: "Archiform Studio" },
      { factKey: "correct_file", factValue: "PROP-WM-88 PDF" },
      { factKey: "wrong_file", factValue: "internal estimate sheet" },
    ],
    openQuestions: ["Who calls vs email?", "Resend clean PDF now?"],
  },

  // ========== ledger_london ==========
  {
    universeId: "ledger_london",
    topicDomain: "legal",
    emotionalRegister: "neutral_professional",
    maxSubstance: "consequential",
    premise:
      "MSA-LL-088 with Thameslink Freight needs countersignature. They redlined Section 4.2(b) liability cap to £250k aggregate and added 90-day convenience terminate. Estimated annual spend ~£180k.",
    facts: [
      { factKey: "msa_id", factValue: "MSA-LL-088" },
      { factKey: "counterparty", factValue: "Thameslink Freight" },
      { factKey: "clause", factValue: "Section 4.2(b)" },
      { factKey: "their_cap", factValue: "£250k aggregate" },
      { factKey: "estimated_annual_spend", factValue: "~£180k" },
    ],
    openQuestions: [
      "Accept £250k if they drop convenience terminate?",
      "Escalate to Kim & Adler LLP before Friday?",
    ],
  },
  {
    universeId: "ledger_london",
    topicDomain: "apologies",
    emotionalRegister: "apologetic",
    maxSubstance: "consequential",
    materialApology: true,
    premise:
      "Wrong attachment to Thameslink Freight: emailed MSA_Thameslink_INTERNAL_redlines.docx (counsel comments) instead of clean MSA-LL-088 PDF. Caught 40 minutes later. Kim & Adler LLP notified.",
    facts: [
      { factKey: "wrong_file", factValue: "MSA_Thameslink_INTERNAL_redlines.docx" },
      { factKey: "correct_file", factValue: "MSA-LL-088 clean PDF" },
      { factKey: "counterparty", factValue: "Thameslink Freight" },
      { factKey: "counsel", factValue: "Kim & Adler LLP" },
    ],
    openQuestions: ["Who calls their GC vs email-only?", "Privilege letter on file?"],
  },
  {
    universeId: "ledger_london",
    topicDomain: "client_feedback",
    emotionalRegister: "assertive",
    maxSubstance: "consequential",
    premise:
      "Thameslink threatened to pause after the MSA mix-up and a separate SSO 500 on /auth/callback (INC-LL-4855, fixed in 1.8.12). Want written RCA by Wed and 15% month-1 credit (~£420).",
    facts: [
      { factKey: "client", factValue: "Thameslink Freight" },
      { factKey: "bug_ticket", factValue: "INC-LL-4855" },
      { factKey: "fix_build", factValue: "1.8.12" },
      { factKey: "credit_ask", factValue: "15% month-1 (~£420)" },
      { factKey: "rca_due", factValue: "Wed" },
    ],
    openQuestions: ["Approve £420 credit?", "Who writes RCA - VJ (tech) or Patricia (CS/legal)?"],
  },
  {
    universeId: "ledger_london",
    topicDomain: "ops",
    emotionalRegister: "friendly_casual",
    maxSubstance: "routine",
    premise:
      "Team offsite offset_days:+20 at The Priory Rooms (deposit £350 paid). Final headcount due offset_days:+7 - currently 11 yes / 2 maybe. Catering CQ-LL-441 is £28/head.",
    facts: [
      { factKey: "event_offset", factValue: offsetDays(20) },
      { factKey: "venue", factValue: "The Priory Rooms" },
      { factKey: "deposit", factValue: "£350" },
      { factKey: "headcount_due_offset", factValue: offsetDays(7) },
      { factKey: "catering_quote", factValue: "CQ-LL-441 @ £28/head" },
    ],
    openQuestions: ["Lock catering for 13?", "Slack poll for dietary needs?"],
  },
  {
    universeId: "ledger_london",
    topicDomain: "it",
    emotionalRegister: "slightly_stressed",
    maxSubstance: "routine",
    premise:
      "Quarterly access review: 14 ex-contractor SSO accounts still active (check offset_days:-11). Two had access to Mayfair Clinics Group read-replica. Policy: disable within 24h of offboarding.",
    facts: [
      { factKey: "stale_accounts", factValue: "14 ex-contractor SSO accounts" },
      { factKey: "client", factValue: "Mayfair Clinics Group" },
      { factKey: "audit_offset", factValue: offsetDays(-11) },
    ],
    openQuestions: ["Disable all 14 tonight?", "Who owned offboarding?"],
  },
  {
    universeId: "ledger_london",
    topicDomain: "scheduling",
    emotionalRegister: "friendly_casual",
    maxSubstance: "trivial",
    premise: "Can we push the Oval Retail Ltd check-in 30 minutes later tomorrow? Calendar clash.",
    facts: [{ factKey: "ask", factValue: "push check-in +30 min tomorrow" }],
    openQuestions: ["Still on Zoom?"],
  },
  {
    universeId: "ledger_london",
    topicDomain: "ops",
    emotionalRegister: "terse_busy",
    maxSubstance: "trivial",
    premise: "Chambers Wi-Fi blipped - back now. Ignore if you didn't notice.",
    facts: [],
    openQuestions: ["Still down for you?"],
  },
  {
    universeId: "ledger_london",
    topicDomain: "scheduling",
    emotionalRegister: "warm_collaborative",
    maxSubstance: "trivial",
    premise: "Coffee before the 11am? I'll be in the lobby.",
    facts: [{ factKey: "ask", factValue: "coffee before 11am in lobby" }],
    openQuestions: ["See you there?"],
  },
  {
    universeId: "ledger_london",
    topicDomain: "invoices",
    emotionalRegister: "neutral_professional",
    maxSubstance: "routine",
    premise:
      "INV-LL-331 for £2,400 counsel hours on TL-MSA. Thameslink AP asked for a breakdown by clause before paying Net 30.",
    facts: [
      { factKey: "invoice_id", factValue: "INV-LL-331" },
      { factKey: "amount", factValue: "£2,400" },
      { factKey: "project", factValue: "TL-MSA" },
      { factKey: "client", factValue: "Thameslink Freight" },
    ],
    openQuestions: ["Send clause breakdown today?", "Split across two invoices?"],
  },
  {
    universeId: "ledger_london",
    topicDomain: "vendor",
    emotionalRegister: "terse_busy",
    maxSubstance: "routine",
    premise:
      "Shield Mutual UK cyber questionnaire due offset_days:+6. Need Patricia sign-off on the access-control answers VJ drafted.",
    facts: [
      { factKey: "vendor", factValue: "Shield Mutual UK" },
      { factKey: "due_offset", factValue: offsetDays(6) },
    ],
    openQuestions: ["Review by Thursday?", "Any redlines on MFA section?"],
  },
  {
    universeId: "ledger_london",
    topicDomain: "hiring",
    emotionalRegister: "warm_collaborative",
    maxSubstance: "routine",
    premise:
      "Paralegal interview logistics for MCG-SSO support - two slots next week. Patricia chairs; VJ handles paperwork OFR-LL-03.",
    facts: [
      { factKey: "role", factValue: "Paralegal" },
      { factKey: "project", factValue: "MCG-SSO" },
      { factKey: "offer_doc", factValue: "OFR-LL-03" },
    ],
    openQuestions: ["Tue or Wed morning UK?", "Remote or chambers?"],
  },
  {
    universeId: "ledger_london",
    topicDomain: "meeting_recaps",
    emotionalRegister: "warm_collaborative",
    maxSubstance: "routine",
    premise:
      "Recap OR-ACCESS review (offset_days:-2): disable stale SSO, Patricia drafts letter to Oval Retail Ltd, VJ opens CHG-LL-19. One-pager due tomorrow.",
    facts: [
      { factKey: "meeting_offset", factValue: offsetDays(-2) },
      { factKey: "project", factValue: "OR-ACCESS" },
      { factKey: "client", factValue: "Oval Retail Ltd" },
      { factKey: "change_id", factValue: "CHG-LL-19" },
    ],
    openQuestions: ["Who owns the one-pager?", "CC Shield Mutual UK?"],
  },
  {
    universeId: "ledger_london",
    topicDomain: "project_status",
    emotionalRegister: "slightly_stressed",
    maxSubstance: "consequential",
    premise:
      "MCG-SSO for Mayfair Clinics Group blocked on IdP metadata exchange. Go-live offset_days:+14 at risk; counsel still reviewing DPA addendum since offset_days:-9.",
    facts: [
      { factKey: "project", factValue: "MCG-SSO" },
      { factKey: "client", factValue: "Mayfair Clinics Group" },
      { factKey: "go_live_offset", factValue: offsetDays(14) },
      { factKey: "dpa_since_offset", factValue: offsetDays(-9) },
      { factKey: "blocker", factValue: "IdP metadata exchange" },
    ],
    openQuestions: ["Chase IdP today?", "Slip go-live a week?"],
  },
  {
    universeId: "ledger_london",
    topicDomain: "scope",
    emotionalRegister: "assertive",
    maxSubstance: "routine",
    premise:
      "Oval Retail Ltd asked for an extra access-review workbook not in OR-ACCESS SOW. Roughly 12 hours (£1,800). Need yes/no before offset_days:+5 audit.",
    facts: [
      { factKey: "client", factValue: "Oval Retail Ltd" },
      { factKey: "project", factValue: "OR-ACCESS" },
      { factKey: "extra_estimate", factValue: "12 hours / £1,800" },
      { factKey: "audit_offset", factValue: offsetDays(5) },
    ],
    openQuestions: ["Approve add-on?", "Push to next quarter?"],
  },
];

/** Generic factless cross-universe ping templates (≤10% of corpus). */
const CROSS_UNIVERSE_PREMISES: Array<{
  topicDomain: TopicDomain;
  emotionalRegister: EmotionalRegister;
  premise: string;
  openQuestions: string[];
}> = [
  {
    topicDomain: "scheduling",
    emotionalRegister: "friendly_casual",
    premise: "Quick ping - are you free for a 10-min intro call next week? No agenda, just connecting after the conference.",
    openQuestions: ["Tue or Wed better?", "Video or phone?"],
  },
  {
    topicDomain: "ops",
    emotionalRegister: "apologetic",
    premise: "Sorry - think I had the wrong address on that last note. Please ignore if it landed with you by mistake.",
    openQuestions: ["All good to ignore?"],
  },
  {
    topicDomain: "scheduling",
    emotionalRegister: "warm_collaborative",
    premise: "Nice meeting you at the conference hallway chat. Happy to do a brief intro call if useful - totally optional.",
    openQuestions: ["Want an intro, or leave it?"],
  },
  {
    topicDomain: "ops",
    emotionalRegister: "friendly_casual",
    premise: "Wrong-thread oops - meant that last scheduling note for someone else. Apologies for the noise.",
    openQuestions: ["Ignore and delete?"],
  },
];

function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeighted<T extends string>(
  weights: Record<T, number>,
  order: T[],
  rand: () => number,
  usedCounts: Record<T, number>,
  totalPlanned: number,
): T {
  const scored = order.map((key) => {
    const target = weights[key] * totalPlanned;
    const used = usedCounts[key] ?? 0;
    const deficit = target - used;
    return { key, deficit };
  });
  scored.sort((a, b) => b.deficit - a.deficit);
  const top = scored.filter((s) => s.deficit >= scored[0]!.deficit - 0.75);
  const idx = Math.floor(rand() * top.length);
  return top[idx]!.key;
}

/**
 * Arc emits the band sequence. No standalone thread.band.
 * DECAY: [anchor|long] → medium → short → micro...
 * ESCALATION: micro → micro → short → [long|anchor] → medium → short
 * FLAT_CHATTER: micro|short only, depth 2-5
 * BURST: [anchor,anchor] or [anchor,long], depth 2-3
 */
function buildArcSequence(
  arc: ArcTemplate,
  topic: TopicDomain,
  rand: () => number,
): LengthBand[] {
  const longOk = LONG_ELIGIBLE_TOPICS.has(topic);

  switch (arc) {
    case "DECAY": {
      if (!longOk) {
        // DECAY needs long|anchor start - incompatible with short/micro-only topics
        throw new ValidationError(
          `DECAY incompatible with short/micro-only topic ${topic}`,
          "ARC_TOPIC",
        );
      }
      const start: LengthBand = rand() < 0.55 ? "long" : "anchor";
      // Typical decay length 4-7
      const depth = 4 + Math.floor(rand() * 4);
      const seq: LengthBand[] = [start];
      const tail: LengthBand[] = ["medium", "short", "micro", "micro", "micro", "micro"];
      for (let i = 0; i < depth - 1; i++) {
        seq.push(tail[Math.min(i, tail.length - 1)]!);
      }
      return seq;
    }
    case "ESCALATION": {
      if (!longOk) {
        throw new ValidationError(
          `ESCALATION incompatible with short/micro-only topic ${topic}`,
          "ARC_TOPIC",
        );
      }
      const brk: LengthBand = rand() < 0.5 ? "long" : "anchor";
      // Spec shape; may truncate/pad slightly for depth variety 5-6
      const base: LengthBand[] = ["micro", "micro", "short", brk, "medium", "short"];
      if (rand() < 0.35) return base.slice(0, 5);
      return base;
    }
    case "FLAT_CHATTER": {
      const depth = 2 + Math.floor(rand() * 4); // 2-5
      const seq: LengthBand[] = [];
      for (let i = 0; i < depth; i++) {
        seq.push(rand() < 0.55 ? "micro" : "short");
      }
      return seq;
    }
    case "BURST": {
      if (!longOk) {
        throw new ValidationError(
          `BURST incompatible with short/micro-only topic ${topic}`,
          "ARC_TOPIC",
        );
      }
      const pair: LengthBand[] =
        rand() < 0.5 ? ["anchor", "anchor"] : ["anchor", "long"];
      if (rand() < 0.4) {
        return [...pair, rand() < 0.5 ? "micro" : "short"];
      }
      return pair;
    }
  }
}

function substanceRank(s: SubstanceLevel): number {
  return SUBSTANCE_ORDER.indexOf(s);
}

function trimFactsToSubstance(
  facts: Array<{ factKey: string; factValue: string }>,
  substance: SubstanceLevel,
  depth: number,
  lengthArc: LengthBand[],
  rand: () => number,
): Array<{ factKey: string; factValue: string }> {
  let pool = [...facts];
  const microOnly = lengthArc.every((b) => b === "micro");

  if (microOnly) {
    pool = pool.filter(
      (f) =>
        !/ticket|invoice/i.test(f.factKey) &&
        !/\b(?:INC|INV|TI)-/i.test(f.factValue),
    );
  }

  const idFacts = pool.filter(
    (f) =>
      /invoice|ticket|job|sow|msa|nda|po|exp|chg|fac|prop|ofr/i.test(f.factKey) ||
      /\b(?:INV|TI|INC|CHG|FAC|JOB|SOW|MSA|NDA|PO|EXP|PROP|OFR|TKT|BRAND|TW|CQ|RH|MB)-/i.test(
        f.factValue,
      ),
  );
  const dollarFacts = pool.filter((f) => /\$|£|\d+k\b/i.test(f.factValue));
  const other = pool.filter((f) => !idFacts.includes(f) && !dollarFacts.includes(f));

  let targetMin = 0;
  let targetMax = 1;
  let maxIds = 0;
  let allowDollar = false;

  switch (substance) {
    case "trivial":
      targetMin = 0;
      targetMax = 1;
      maxIds = 0;
      allowDollar = false;
      break;
    case "routine":
      targetMin = 1;
      targetMax = 3;
      maxIds = 1;
      allowDollar = true;
      break;
    case "consequential":
      targetMin = 4;
      targetMax = 8;
      maxIds = 99;
      allowDollar = true;
      break;
  }

  targetMax = Math.min(targetMax, depth);
  targetMin = Math.min(targetMin, targetMax);

  const picked: Array<{ factKey: string; factValue: string }> = [];
  const take = (arr: typeof pool, n: number) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }
    for (const f of shuffled) {
      if (picked.length >= n) break;
      if (picked.includes(f)) continue;
      picked.push(f);
    }
  };

  if (substance === "trivial") {
    const safe = other.filter((f) => !/\$|£/.test(f.factValue));
    if (rand() < 0.6 && safe.length) take(safe, 1);
    return picked.slice(0, targetMax);
  }

  if (maxIds > 0 && idFacts.length) take(idFacts, maxIds);
  if (allowDollar) take(dollarFacts, targetMax - picked.length);
  take(other, targetMax - picked.length);

  // Pad consequential if short
  let guard = 0;
  while (picked.length < targetMin && pool.length > picked.length && guard++ < 20) {
    const rem = pool.filter((f) => !picked.includes(f));
    if (!rem.length) break;
    if (substance === "routine" && maxIds <= 1) {
      const nonId = rem.filter((f) => !idFacts.includes(f));
      if (nonId.length) take(nonId, picked.length + 1);
      else break;
    } else {
      take(rem, picked.length + 1);
    }
    // If take couldn't grow, stop
    if (guard > 0 && picked.length === 0) break;
  }

  return picked.slice(0, Math.min(targetMax, depth));
}

function pickPairSameUniverse(
  personas: Persona[],
  universeId: string,
  rand: () => number,
  pairCounts: Map<string, number>,
): [Persona, Persona] {
  const pool = personasInUniverse(personas, universeId);
  if (pool.length < 2) {
    throw new Error(`Universe ${universeId} has fewer than 2 personas`);
  }
  type Cand = { a: Persona; b: Persona; score: number };
  const cands: Cand[] = [];
  for (let i = 0; i < pool.length; i++) {
    for (let j = i + 1; j < pool.length; j++) {
      const a = pool[i]!;
      const b = pool[j]!;
      const key = pairKey(a.email, b.email);
      const used = pairCounts.get(key) ?? 0;
      cands.push({ a, b, score: 3 - used + rand() * 0.3 });
    }
  }
  cands.sort((x, y) => y.score - x.score);
  const top = cands.slice(0, Math.min(3, cands.length));
  const pick = top[Math.floor(rand() * top.length)]!;
  return rand() < 0.5 ? [pick.a, pick.b] : [pick.b, pick.a];
}

function pickCrossUniversePair(
  personas: Persona[],
  rand: () => number,
  pairCounts: Map<string, number>,
): [Persona, Persona] {
  const byU = new Map<string, Persona[]>();
  for (const p of personas) {
    const list = byU.get(p.universeId) ?? [];
    list.push(p);
    byU.set(p.universeId, list);
  }
  const ids = [...byU.keys()];
  let best: [Persona, Persona] | null = null;
  let bestScore = -Infinity;
  for (let t = 0; t < 12; t++) {
    const u1 = ids[Math.floor(rand() * ids.length)]!;
    let u2 = ids[Math.floor(rand() * ids.length)]!;
    if (u1 === u2) continue;
    const a = byU.get(u1)![Math.floor(rand() * byU.get(u1)!.length)]!;
    const b = byU.get(u2)![Math.floor(rand() * byU.get(u2)!.length)]!;
    const used = pairCounts.get(pairKey(a.email, b.email)) ?? 0;
    const score = 2 - used + rand();
    if (score > bestScore) {
      bestScore = score;
      best = [a, b];
    }
  }
  if (!best) {
    // deterministic fallback
    const a = personas[0]!;
    const b = personas.find((p) => p.universeId !== a.universeId)!;
    return [a, b];
  }
  return best;
}

function pairKey(a: string, b: string): string {
  return [a, b].sort().join("|");
}

export interface PlanThreadsOptions {
  count?: number;
  seed?: number;
  personas?: Persona[];
  /** If false, skip validateCorpus at end (still validates per-thread during build). */
  validate?: boolean;
}

export function planThreads(options: PlanThreadsOptions = {}): PlannedThread[] {
  const count = options.count ?? 40;
  const rand = mulberry32(options.seed ?? 20260721);
  const personas = options.personas ?? seedPersonas();
  const entityMap = buildEntityUniverseMap();

  const arcCounts = Object.fromEntries(ARC_ORDER.map((k) => [k, 0])) as Record<
    ArcTemplate,
    number
  >;
  const substanceCounts = Object.fromEntries(
    SUBSTANCE_ORDER.map((k) => [k, 0]),
  ) as Record<SubstanceLevel, number>;
  const topicCounts = Object.fromEntries(TOPIC_DOMAINS.map((k) => [k, 0])) as Record<
    TopicDomain,
    number
  >;
  const pairCounts = new Map<string, number>();
  const universeThreadCounts = Object.fromEntries(
    UNIVERSES.map((u) => [u.id, 0]),
  ) as Record<string, number>;

  const maxCross = Math.floor(count * CORPUS_TARGETS.crossUniverseMax);
  let crossUsed = 0;

  // Shuffle premises
  const premiseOrder = [...PREMISE_BANK];
  for (let i = premiseOrder.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [premiseOrder[i], premiseOrder[j]] = [premiseOrder[j]!, premiseOrder[i]!];
  }

  const threads: PlannedThread[] = [];
  let premiseCursor = 0;
  let attempts = 0;
  const maxAttempts = count * 80;

  while (threads.length < count && attempts < maxAttempts) {
    attempts += 1;
    const wantCross = crossUsed < maxCross && rand() < CORPUS_TARGETS.crossUniverseMax * 1.2;

    try {
      if (wantCross) {
        const thread = planCrossUniverseThread({
          personas,
          rand,
          pairCounts,
          arcCounts,
          substanceCounts,
          count,
        });
        validateThread(thread, entityMap);
        crossUsed += 1;
        commitCounts(thread, arcCounts, substanceCounts, topicCounts, pairCounts, universeThreadCounts);
        threads.push(thread);
        continue;
      }

      // Prefer under-filled universes
      const univIds = UNIVERSES.map((u) => u.id);
      univIds.sort(
        (a, b) => (universeThreadCounts[a] ?? 0) - (universeThreadCounts[b] ?? 0),
      );
      const universeId =
        univIds[Math.floor(rand() * Math.min(3, univIds.length))] ?? univIds[0]!;

      let effectiveSubstance = pickWeighted(
        CORPUS_TARGETS.substance,
        SUBSTANCE_ORDER,
        rand,
        substanceCounts,
        count,
      );

      // Pick arc first (substance-aware), then a topic/premise compatible with that arc
      let arc: ArcTemplate;
      if (effectiveSubstance === "trivial") {
        arc = "FLAT_CHATTER";
      } else if (effectiveSubstance === "consequential") {
        // BURST depth 2-3 cannot carry 4-8 facts; FLAT often too short
        const heavyArcs: ArcTemplate[] = ["DECAY", "ESCALATION"];
        const local: Record<ArcTemplate, number> = {
          DECAY: CORPUS_TARGETS.arcs.DECAY,
          ESCALATION: CORPUS_TARGETS.arcs.ESCALATION,
          FLAT_CHATTER: 0,
          BURST: 0,
        };
        arc = pickWeighted(local, heavyArcs, rand, arcCounts, count);
      } else {
        arc = pickWeighted(CORPUS_TARGETS.arcs, ARC_ORDER, rand, arcCounts, count);
      }

      const needsLongTopic =
        arc === "DECAY" || arc === "ESCALATION" || arc === "BURST";

      // Find a premise in this universe that can support substance + arc
      let chosen: PremiseTemplate | null = null;
      for (let k = 0; k < premiseOrder.length; k++) {
        const cand = premiseOrder[(premiseCursor + k) % premiseOrder.length]!;
        if (cand.universeId !== universeId) continue;
        if (substanceRank(cand.maxSubstance) < substanceRank(effectiveSubstance)) continue;
        if (effectiveSubstance === "trivial" && cand.maxSubstance !== "trivial") continue;
        if (needsLongTopic && SHORT_MICRO_ONLY_TOPICS.has(cand.topicDomain)) continue;
        if (!needsLongTopic && effectiveSubstance === "trivial") {
          // ok
        }
        const expected = (threads.length + 1) / TOPIC_DOMAINS.length;
        if ((topicCounts[cand.topicDomain] ?? 0) > expected + 2.5) continue;
        chosen = cand;
        premiseCursor = (premiseCursor + k + 1) % premiseOrder.length;
        break;
      }

      if (!chosen) {
        chosen =
          premiseOrder.find((p) => {
            if (p.universeId !== universeId) return false;
            if (substanceRank(p.maxSubstance) < substanceRank(effectiveSubstance)) return false;
            if (effectiveSubstance === "trivial" && p.maxSubstance !== "trivial") return false;
            if (needsLongTopic && SHORT_MICRO_ONLY_TOPICS.has(p.topicDomain)) return false;
            return true;
          }) ?? null;
      }
      if (!chosen) continue;

      if (effectiveSubstance === "trivial") {
        const trivialPrem =
          premiseOrder.find(
            (p) => p.universeId === universeId && p.maxSubstance === "trivial",
          ) ?? chosen;
        chosen = trivialPrem;
        arc = "FLAT_CHATTER";
      }

      const topic = chosen.topicDomain;
      // Joint band×topic: force FLAT if topic is short/micro-only
      if (SHORT_MICRO_ONLY_TOPICS.has(topic)) {
        arc = "FLAT_CHATTER";
      }

      let finalArcSeq: LengthBand[];
      try {
        finalArcSeq = buildArcSequence(arc, topic, rand);
      } catch {
        continue;
      }

      const allowed = new Set(
        SHORT_MICRO_ONLY_TOPICS.has(topic)
          ? (["micro", "short"] as LengthBand[])
          : (["micro", "short", "medium", "long", "anchor"] as LengthBand[]),
      );
      if (finalArcSeq.some((b) => !allowed.has(b))) continue;

      const finalArc = arc;

      const finalDepth = finalArcSeq.length;
      const facts = trimFactsToSubstance(
        chosen.facts,
        effectiveSubstance,
        finalDepth,
        finalArcSeq,
        rand,
      );

      // Hard rule: facts ≤ depth (already enforced in trim); consequential may fail if premise thin
      if (effectiveSubstance === "consequential" && facts.length < 4) continue;
      if (effectiveSubstance === "routine" && (facts.length < 1 || facts.length > 3)) continue;
      if (effectiveSubstance === "trivial" && facts.length > 1) continue;
      if (facts.length > finalDepth) continue;

      const [personaA, personaB] = pickPairSameUniverse(
        personas,
        universeId,
        rand,
        pairCounts,
      );

      const establishedFacts: EstablishedFact[] = facts.map((f) => ({
        factKey: f.factKey,
        factValue: f.factValue,
        source: "premise" as const,
        introducedAtDepth: null,
      }));

      const thread: PlannedThread = {
        id: randomUUID(),
        premise: rewritePremiseOffsets(chosen.premise),
        topicDomain: topic,
        arcTemplate: finalArc,
        lengthArc: finalArcSeq,
        plannedDepth: finalDepth,
        messageCount: 0,
        substanceLevel: effectiveSubstance,
        universeId,
        crossUniverse: false,
        personaA,
        personaB,
        participants: [personaA.email, personaB.email],
        emotionalRegister: chosen.emotionalRegister,
        establishedFacts,
        openQuestions: [...chosen.openQuestions],
        status: "planned",
      };

      validateThread(thread, entityMap);
      commitCounts(thread, arcCounts, substanceCounts, topicCounts, pairCounts, universeThreadCounts);
      threads.push(thread);
    } catch (err) {
      if (err instanceof ValidationError) {
        // replan
        continue;
      }
      throw err;
    }
  }

  if (threads.length < count) {
    throw new Error(
      `Only planned ${threads.length}/${count} threads after ${attempts} attempts`,
    );
  }

  if (options.validate !== false) {
    validateCorpus(threads);
  }

  return threads;
}

function rewritePremiseOffsets(premise: string): string {
  // Premises already use offset_days:N tokens; strip any accidental absolute ISO if present
  return premise.replace(/\b20\d{2}-\d{2}-\d{2}\b/g, (iso) => {
    // Should not happen - convert to a neutral relative phrase
    void iso;
    return "offset_days:0";
  });
}

function planCrossUniverseThread(args: {
  personas: Persona[];
  rand: () => number;
  pairCounts: Map<string, number>;
  arcCounts: Record<ArcTemplate, number>;
  substanceCounts: Record<SubstanceLevel, number>;
  count: number;
}): PlannedThread {
  const { personas, rand, pairCounts } = args;
  const tmpl =
    CROSS_UNIVERSE_PREMISES[Math.floor(rand() * CROSS_UNIVERSE_PREMISES.length)]!;
  const [personaA, personaB] = pickCrossUniversePair(personas, rand, pairCounts);
  const lengthArc = buildArcSequence("FLAT_CHATTER", tmpl.topicDomain, rand);
  // Cross-universe must be trivial / factless
  return {
    id: randomUUID(),
    premise: tmpl.premise,
    topicDomain: tmpl.topicDomain,
    arcTemplate: "FLAT_CHATTER",
    lengthArc,
    plannedDepth: lengthArc.length,
    messageCount: 0,
    substanceLevel: "trivial",
    universeId: personaA.universeId, // primary = initiator
    crossUniverse: true,
    personaA,
    personaB,
    participants: [personaA.email, personaB.email],
    emotionalRegister: tmpl.emotionalRegister,
    establishedFacts: [],
    openQuestions: [...tmpl.openQuestions],
    status: "planned",
  };
}

function commitCounts(
  thread: PlannedThread,
  arcCounts: Record<ArcTemplate, number>,
  substanceCounts: Record<SubstanceLevel, number>,
  topicCounts: Record<TopicDomain, number>,
  pairCounts: Map<string, number>,
  universeThreadCounts: Record<string, number>,
): void {
  const pk = pairKey(thread.personaA.email, thread.personaB.email);
  pairCounts.set(pk, (pairCounts.get(pk) ?? 0) + 1);
  arcCounts[thread.arcTemplate] += 1;
  substanceCounts[thread.substanceLevel] += 1;
  topicCounts[thread.topicDomain] += 1;
  if (!thread.crossUniverse) {
    universeThreadCounts[thread.universeId] =
      (universeThreadCounts[thread.universeId] ?? 0) + 1;
  }
}

/** Derived band histogram from lengthArc sequences (no standalone band field). */
export function bandHistogramFromArcs(threads: PlannedThread[]): Record<LengthBand, number> {
  const bands: Record<LengthBand, number> = {
    micro: 0,
    short: 0,
    medium: 0,
    long: 0,
    anchor: 0,
  };
  for (const t of threads) {
    for (const b of t.lengthArc) {
      bands[b] += 1;
    }
  }
  return bands;
}

export function summarizeCorpus(threads: PlannedThread[]): {
  arcs: Record<string, number>;
  bands: Record<LengthBand, number>;
  topics: Record<string, number>;
  substance: Record<string, number>;
  crossUniverse: number;
  byUniverse: Record<
    string,
    {
      count: number;
      arcs: Record<string, number>;
      bands: Record<LengthBand, number>;
      substance: Record<string, number>;
    }
  >;
} {
  const arcs: Record<string, number> = {};
  const topics: Record<string, number> = {};
  const substance: Record<string, number> = {};
  let crossUniverse = 0;
  const bands = bandHistogramFromArcs(threads);
  const byUniverse: Record<
    string,
    {
      count: number;
      arcs: Record<string, number>;
      bands: Record<LengthBand, number>;
      substance: Record<string, number>;
    }
  > = {};

  for (const u of UNIVERSES) {
    byUniverse[u.id] = {
      count: 0,
      arcs: {},
      bands: { micro: 0, short: 0, medium: 0, long: 0, anchor: 0 },
      substance: {},
    };
  }

  for (const t of threads) {
    arcs[t.arcTemplate] = (arcs[t.arcTemplate] ?? 0) + 1;
    topics[t.topicDomain] = (topics[t.topicDomain] ?? 0) + 1;
    substance[t.substanceLevel] = (substance[t.substanceLevel] ?? 0) + 1;
    if (t.crossUniverse) crossUniverse += 1;

    const bucketKey = t.crossUniverse ? t.universeId : t.universeId;
    const bucket = byUniverse[bucketKey];
    if (bucket && !t.crossUniverse) {
      bucket.count += 1;
      bucket.arcs[t.arcTemplate] = (bucket.arcs[t.arcTemplate] ?? 0) + 1;
      bucket.substance[t.substanceLevel] =
        (bucket.substance[t.substanceLevel] ?? 0) + 1;
      for (const b of t.lengthArc) {
        bucket.bands[b] += 1;
      }
    }
  }

  // Also attribute cross-universe to a synthetic bucket
  byUniverse["__cross_universe__"] = {
    count: crossUniverse,
    arcs: {},
    bands: { micro: 0, short: 0, medium: 0, long: 0, anchor: 0 },
    substance: {},
  };
  for (const t of threads.filter((x) => x.crossUniverse)) {
    const b = byUniverse["__cross_universe__"]!;
    b.arcs[t.arcTemplate] = (b.arcs[t.arcTemplate] ?? 0) + 1;
    b.substance[t.substanceLevel] = (b.substance[t.substanceLevel] ?? 0) + 1;
    for (const band of t.lengthArc) b.bands[band] += 1;
  }

  return { arcs, bands, topics, substance, crossUniverse, byUniverse };
}

export function getUniverseMeta(id: string) {
  return getUniverse(id);
}

/**
 * Plan a single thread for a warmer pair.
 * personaA speaks first (sequence 0). Cross-universe → factless FLAT_CHATTER only.
 */
export function planThreadForPair(
  personaA: Persona,
  personaB: Persona,
  opts?: { seed?: number; rand?: () => number },
): PlannedThread {
  const rand = opts?.rand ?? mulberry32(opts?.seed ?? Date.now() % 1_000_000);
  const entityMap = buildEntityUniverseMap();

  if (personaA.universeId !== personaB.universeId) {
    const tmpl =
      CROSS_UNIVERSE_PREMISES[Math.floor(rand() * CROSS_UNIVERSE_PREMISES.length)]!;
    const lengthArc = buildArcSequence("FLAT_CHATTER", tmpl.topicDomain, rand);
    const thread: PlannedThread = {
      id: randomUUID(),
      premise: tmpl.premise,
      topicDomain: tmpl.topicDomain,
      arcTemplate: "FLAT_CHATTER",
      lengthArc,
      plannedDepth: lengthArc.length,
      messageCount: 0,
      substanceLevel: "trivial",
      universeId: personaA.universeId,
      crossUniverse: true,
      personaA,
      personaB,
      participants: [personaA.email, personaB.email],
      emotionalRegister: tmpl.emotionalRegister,
      establishedFacts: [],
      openQuestions: [...tmpl.openQuestions],
      status: "planned",
    };
    validateThread(thread, entityMap);
    return thread;
  }

  const universeId = personaA.universeId;
  const premises = PREMISE_BANK.filter((p) => p.universeId === universeId);
  if (!premises.length) {
    throw new Error(`No premises for universe ${universeId}`);
  }

  // Prefer routine/consequential variety; fall back through candidates
  const shuffled = [...premises];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }

  for (const chosen of shuffled) {
    const topic = chosen.topicDomain;
    let arc: ArcTemplate;
    let substance: SubstanceLevel;

    if (SHORT_MICRO_ONLY_TOPICS.has(topic) || chosen.maxSubstance === "trivial") {
      arc = "FLAT_CHATTER";
      substance = "trivial";
    } else if (chosen.maxSubstance === "consequential" && LONG_ELIGIBLE_TOPICS.has(topic)) {
      arc = rand() < 0.55 ? "DECAY" : "ESCALATION";
      substance = "consequential";
    } else {
      arc = rand() < 0.4 ? "FLAT_CHATTER" : "ESCALATION";
      substance = arc === "FLAT_CHATTER" ? "trivial" : "routine";
      if (SHORT_MICRO_ONLY_TOPICS.has(topic)) {
        arc = "FLAT_CHATTER";
        substance = "trivial";
      }
    }

    let lengthArc: LengthBand[];
    try {
      lengthArc = buildArcSequence(arc, topic, rand);
    } catch {
      continue;
    }

    const facts = trimFactsToSubstance(
      chosen.facts,
      substance,
      lengthArc.length,
      lengthArc,
      rand,
    );

    if (substance === "consequential" && facts.length < 4) continue;
    if (substance === "routine" && (facts.length < 1 || facts.length > 3)) continue;
    if (substance === "trivial" && facts.length > 1) continue;
    if (facts.length > lengthArc.length) continue;

    const thread: PlannedThread = {
      id: randomUUID(),
      premise: rewritePremiseOffsets(chosen.premise),
      topicDomain: topic,
      arcTemplate: arc,
      lengthArc,
      plannedDepth: lengthArc.length,
      messageCount: 0,
      substanceLevel: substance,
      universeId,
      crossUniverse: false,
      personaA,
      personaB,
      participants: [personaA.email, personaB.email],
      emotionalRegister: chosen.emotionalRegister,
      establishedFacts: facts.map((f) => ({
        factKey: f.factKey,
        factValue: f.factValue,
        source: "premise" as const,
        introducedAtDepth: null,
      })),
      openQuestions: [...chosen.openQuestions],
      status: "planned",
    };

    try {
      validateThread(thread, entityMap);
      return thread;
    } catch {
      continue;
    }
  }

  // Last-resort factless chatter in-universe
  const lengthArc = buildArcSequence("FLAT_CHATTER", "scheduling", rand);
  const thread: PlannedThread = {
    id: randomUUID(),
    premise: "Quick sync on timing - nothing urgent, just aligning calendars.",
    topicDomain: "scheduling",
    arcTemplate: "FLAT_CHATTER",
    lengthArc,
    plannedDepth: lengthArc.length,
    messageCount: 0,
    substanceLevel: "trivial",
    universeId,
    crossUniverse: false,
    personaA,
    personaB,
    participants: [personaA.email, personaB.email],
    emotionalRegister: "friendly_casual",
    establishedFacts: [],
    openQuestions: ["Tue or Wed better?"],
    status: "planned",
  };
  validateThread(thread, entityMap);
  return thread;
}
