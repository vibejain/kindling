/** Disjoint business universes - entity catalogs must never overlap. */

import type { Universe } from "../types/index.js";

/** Five universes for the live mailbox fleet (≥2 personas each). */
export const UNIVERSES: Universe[] = [
  {
    id: "meridian_east",
    label: "Meridian East (SaaS / CS)",
    locale: "en-US",
    timezone: "America/New_York",
    currency: "USD",
    hasGst: false,
    entities: {
      clients: ["Northline Clinics", "Brightpath Logistics", "Cobalt Retail Group"],
      projects: ["NL-PORTAL", "BP-ONBOARD", "CRG-DASH"],
      vendors: ["CloudNexus East", "PrintHaus NYC", "Hirewire Agency"],
      invoiceSeries: ["INV-ME-"],
      ticketSeries: ["INC-ME-", "CHG-ME-", "FAC-ME-"],
      otherIds: ["SOW-ME-", "MSA-ME-", "OFR-ME-", "PO-ME-", "EXP-ME-", "TW-ME-"],
    },
  },
  {
    id: "pinecrest_west",
    label: "Pinecrest West (Architecture)",
    locale: "en-US",
    timezone: "America/Los_Angeles",
    currency: "USD",
    hasGst: false,
    entities: {
      clients: ["Harborview Residences", "Lumen Grove Retail", "Pacific Civic Trust"],
      projects: ["HV-FITOUT", "LG-LOBBY", "PCT-ANNEX"],
      vendors: ["RapidPress LA", "BindCo West", "Apex Structural West"],
      invoiceSeries: ["INV-PW-"],
      ticketSeries: ["TKT-PW-", "CHG-PW-"],
      otherIds: ["JOB-PW-", "PROP-PW-", "NDA-PW-", "PO-PW-", "MB-PW-", "CQ-PW-"],
    },
  },
  {
    id: "harbour_sydney",
    label: "Harbour Sydney (Construction)",
    locale: "en-AU",
    timezone: "Australia/Sydney",
    currency: "AUD",
    hasGst: true,
    entities: {
      clients: ["Quayfront Developments", "Inner West Councils", "Sutherland Civic"],
      projects: ["QF-TOWER", "IWC-LIBRARY", "SC-PAVILION"],
      vendors: ["Apex Engineers AU", "TileHouse Sydney", "CraneHold Pty"],
      invoiceSeries: ["TI-HS-"],
      ticketSeries: ["INC-HS-", "FAC-HS-"],
      otherIds: ["JOB-HS-", "NDA-HS-", "PO-HS-", "RH-HS-"],
    },
  },
  {
    id: "weedo_mel",
    label: "Weedo Melbourne (Digital)",
    locale: "en-AU",
    timezone: "Australia/Melbourne",
    currency: "AUD",
    hasGst: true,
    entities: {
      clients: ["Archiform Studio", "HelioOps AU", "Priory Collective"],
      projects: ["AF-WEB", "HO-BRAND", "PC-REEL"],
      vendors: ["PixelNorth", "CloudNexus AU", "Hireloop Mel"],
      invoiceSeries: ["INV-WM-"],
      ticketSeries: ["INC-WM-", "BRAND-"],
      otherIds: ["PROP-WM-", "SOW-WM-", "OFR-WM-", "PO-WM-", "CQ-WM-"],
    },
  },
  {
    id: "ledger_london",
    label: "Ledger London (Legal / Ops)",
    locale: "en-GB",
    timezone: "Europe/London",
    currency: "GBP",
    hasGst: true,
    entities: {
      clients: ["Thameslink Freight", "Mayfair Clinics Group", "Oval Retail Ltd"],
      projects: ["TL-MSA", "MCG-SSO", "OR-ACCESS"],
      vendors: ["Kim & Adler LLP", "Shield Mutual UK", "The Priory Rooms"],
      invoiceSeries: ["INV-LL-"],
      ticketSeries: ["INC-LL-", "CHG-LL-", "FAC-LL-"],
      otherIds: ["MSA-LL-", "NDA-LL-", "OFR-LL-", "EXP-LL-", "CQ-LL-"],
    },
  },
];

export function getUniverse(id: string): Universe {
  const u = UNIVERSES.find((x) => x.id === id);
  if (!u) throw new Error(`Unknown universe: ${id}`);
  return u;
}

/** Flatten all entity tokens for a universe (for leak detection). */
export function universeEntityTokens(universe: Universe): string[] {
  const e = universe.entities;
  return [
    ...e.clients,
    ...e.projects,
    ...e.vendors,
    ...e.invoiceSeries.map((p) => p.replace(/-$/, "")),
    ...e.ticketSeries.map((p) => p.replace(/-$/, "")),
    ...e.otherIds.map((p) => p.replace(/-$/, "")),
  ];
}

/** All concrete entity strings that must be universe-exclusive. */
export function allNamedEntities(universe: Universe): string[] {
  return [
    ...universe.entities.clients,
    ...universe.entities.projects,
    ...universe.entities.vendors,
  ];
}
