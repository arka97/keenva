export const company = {
  legal: "Keenvaa Biolabs Inc",
  short: "Keenvaa",
  tagline: "For Better Tomorrow",
  corp: "Pennsylvania domestic business corporation · #0014969168 · filed 3 Nov 2025",
  shipStreet: "3580 Progress Drive, Unit B/2",
  shipCity: "Bensalem, PA 19020",
  registeredStreet: "3455 Street Rd # H-6",
  registeredCity: "Bensalem, PA 19020-1542",
  country: "USA",
  email: "info@keenvaabiolabs.com",
  phone: "+1 215 817 4153",
  phoneHref: "tel:+12158174153",
  hours: "Mon–Fri · 9:00–17:00 ET",
  ruo: "For research use only. Not for use in diagnostic procedures.",
  linkedin: "https://www.linkedin.com/company/keenvaa-biolabs",
} as const;

export const founder = {
  name: "Dr. Darshan Patel, Ph.D.",
  role: "President & Founder",
  orcid: "https://orcid.org/0000-0003-1370-2864",
  scopus: "https://www.scopus.com/authid/detail.uri?authorId=55217327700",
  scholar: "https://scholar.google.com/citations?user=GsaEaqcAAAAJ&hl=en",
  blurb:
    "Protein engineer with 25+ years in molecular biology, protein research, and product development. Ph.D. in Biotechnology, Sardar Patel University; postdoctoral work at Chonnam National University. Industry QC of monoclonal antibodies at Kashiv Biosciences. 40+ publications and patents.",
};

export const directors = [
  {
    initials: "RP",
    name: "Dr. Rikin V. Patel",
    role: "Director — USA distribution",
    blurb:
      "Incorporator of Keenvaa Biolabs Inc. Builds marketing and distribution networks for university and biotech accounts in the United States.",
  },
  {
    initials: "HP",
    name: "Mr. Harshil",
    role: "Director — Canada & partner channels",
    blurb:
      "Sales channels and partner relationships in North America. Last name to be confirmed on the leadership page.",
  },
];

export const vendors = [
  {
    id: "core-east",
    name: "East Coast Core Supply",
    region: "Mid-Atlantic, USA",
    type: "Stocking distributor",
    status: "Accepting RFQs",
    notes: "University and biotech accounts. Cold-chain capable.",
  },
  {
    id: "great-lakes",
    name: "Great Lakes Lab Partners",
    region: "Midwest, USA",
    type: "Authorized reseller",
    status: "Accepting RFQs",
    notes: "Core facilities and teaching labs.",
  },
  {
    id: "pacific-oem",
    name: "Pacific OEM Channel",
    region: "West Coast, USA",
    type: "OEM / private label",
    status: "By appointment",
    notes: "Kit manufacturers and private-label enzyme supply.",
  },
];

export const sdsIndex = [
  { sku: "KNV-1001", name: "KNV DNA Express", file: "SDS-KNV-1001.pdf", rev: "2026-06" },
  { sku: "KNV-1003", name: "KNV Mastermix 2X", file: "SDS-KNV-1003.pdf", rev: "2026-06" },
  { sku: "KNV-1004", name: "qPCR Mastermix SYBR + ROX", file: "SDS-KNV-1004.pdf", rev: "2026-04" },
  { sku: "KNV-1002", name: "Taq DNA Polymerase", file: "SDS-KNV-1002.pdf", rev: "2026-04" },
  { sku: "KNV-1005", name: "Pfu DNA Polymerase", file: "SDS-KNV-1005.pdf", rev: "2026-04" },
  { sku: "KNV-1006", name: "T4 DNA Ligase HC", file: "SDS-KNV-1006.pdf", rev: "2026-04" },
  { sku: "KNV-1009", name: "1st Strand cDNA Kit", file: "SDS-KNV-1009.pdf", rev: "2026-04" },
];
