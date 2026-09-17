export type FamilyId =
  | "extraction"
  | "pcr"
  | "qpcr"
  | "rt"
  | "cloning"
  | "ladders";

export type AppId = "cloning" | "expression" | "genotyping" | "genomics" | "sample-prep";

export type Pack = { label: string; price: number };

export type Product = {
  id: string;
  sku: string;
  name: string;
  sub: string;
  family: FamilyId;
  apps: AppId[];
  badge?: string;
  packs: Pack[];
  storage: string;
  ship: "ambient" | "cold" | "dry-ice";
  shipNote: string;
  tags: string[];
  featured?: boolean;
  assay?: Array<"sample-prep" | "endpoint" | "colony" | "qpcr" | "rt" | "cloning">;
  instruments?: Array<"high-rox" | "low-rox" | "no-rox">;
  details: string[];
  protocol?: { title: string; steps: string[] }[];
};

export const families: { id: FamilyId; name: string; blurb: string }[] = [
  { id: "extraction", name: "Sample prep", blurb: "KNV DNA Express — lysate to PCR in 10 minutes" },
  { id: "pcr", name: "PCR enzymes", blurb: "Taq, Pfu, glycerol-free and Mg-free variants" },
  { id: "qpcr", name: "Master mixes", blurb: "Endpoint dye mix and SYBR / ROX qPCR" },
  { id: "rt", name: "cDNA / RNA", blurb: "First-strand kits, cDNA mix, RNase inhibitor" },
  { id: "cloning", name: "Cloning", blurb: "T4 ligase at working and high concentration" },
  { id: "ladders", name: "Analysis", blurb: "Ready-to-load DNA ladders" },
];

export const applications: { id: AppId; name: string }[] = [
  { id: "sample-prep", name: "Sample prep" },
  { id: "genotyping", name: "Routine PCR" },
  { id: "cloning", name: "Molecular cloning" },
  { id: "expression", name: "Gene expression" },
  { id: "genomics", name: "Genomics" },
];

export const products: Product[] = [
  {
    id: "knv-dna-express",
    sku: "KNV-1001",
    name: "KNV DNA Express",
    sub: "Single-buffer genomic DNA prep — five workflows, lysate to PCR in 10 minutes",
    family: "extraction",
    apps: ["sample-prep", "genomics", "genotyping"],
    badge: "Flagship",
    packs: [
      { label: "5 mL", price: 640 },
      { label: "25 mL", price: 2900 },
      { label: "100 mL", price: 10800 },
    ],
    storage: "Room temperature for a few weeks; 4 °C beyond a month",
    ship: "ambient",
    shipNote: "Ambient. Not dry ice.",
    tags: ["single-buffer", "plants", "animals", "microbes", "direct PCR"],
    featured: true,
    assay: ["sample-prep"],
    details: [
      "One buffer, five protocols: heat lysis, mechanical lysis, phenol-chloroform, spin column, magnetic beads.",
      "Direct PCR from crude lysates (protocols A/B) with recommended 1:60 dilution.",
      "Compatible with PEG formate precipitation as a phenol-free high-yield path.",
      "For research use only. Not for use in diagnostic procedures.",
    ],
    protocol: [
      {
        title: "A · Heat lysis (direct PCR)",
        steps: [
          "Resuspend sample in KNV DNA Express buffer.",
          "Heat as specified for tissue type.",
          "Dilute lysate 1:60 in PCR-grade water.",
          "Add to KNV Mastermix 2X or a Taq reaction.",
        ],
      },
      {
        title: "B · Mechanical lysis (direct PCR)",
        steps: [
          "Resuspend in KNV DNA Express buffer.",
          "Bead-beat or homogenize as specified for tissue.",
          "Clarify briefly. Dilute 1:60.",
          "Use as template in endpoint PCR.",
        ],
      },
      {
        title: "C · Phenol-chloroform",
        steps: [
          "Lyse in KNV DNA Express buffer.",
          "Extract with phenol-chloroform per insert.",
          "Precipitate, wash, resuspend.",
          "Quantify. Store gDNA at 4 °C or −20 °C.",
        ],
      },
      {
        title: "D · Spin column",
        steps: [
          "Lyse in KNV DNA Express buffer.",
          "Bind, wash, and elute on a silica spin column.",
          "Quantify eluate.",
          "Use for cloning or PCR.",
        ],
      },
      {
        title: "E · Magnetic beads (high-quality gDNA)",
        steps: [
          "Lyse in KNV DNA Express buffer.",
          "Bind on magnetic beads per insert.",
          "Wash, elute, quantify.",
          "Store gDNA at 4 °C or −20 °C.",
        ],
      },
      {
        title: "PEG-formate (phenol-free high-yield)",
        steps: [
          "Lyse in KNV DNA Express buffer.",
          "Precipitate with PEG formate as specified.",
          "Wash, resuspend, quantify.",
          "Intended as a phenol-free path to higher yield.",
        ],
      },
    ],
  },
  {
    id: "knv-mastermix",
    sku: "KNV-1003",
    name: "KNV Mastermix 2X",
    sub: "Taq premix with dNTPs, Mg²⁺ and pre-loaded green dye — routine and colony PCR",
    family: "pcr",
    apps: ["genotyping", "cloning"],
    badge: "Workhorse",
    packs: [
      { label: "100 rxn", price: 35 },
      { label: "250 rxn", price: 78 },
      { label: "500 rxn", price: 145 },
      { label: "1,000 rxn", price: 270 },
    ],
    storage: "−20 °C",
    ship: "cold",
    shipNote: "Cold pack. Storage −20 °C.",
    tags: ["2X", "dye-load", "colony PCR", "GC-rich"],
    featured: true,
    assay: ["endpoint", "colony"],
    details: [
      "2X concentrated. Add template and primers only.",
      "Pre-loaded green dye loads directly on agarose; dye splits blue (3–5 kb) and yellow (~25 bp).",
      "Formulated for GC-rich templates and colony PCR (touch colony, denature 95 °C / 2 min).",
      "For research use only. Not for use in diagnostic procedures.",
    ],
    protocol: [
      {
        title: "50 µL setup",
        steps: [
          "KNV Mastermix 2X — 25 µL",
          "Forward primer — as specified",
          "Reverse primer — as specified",
          "Template DNA — as specified",
          "PCR-grade water — to 50 µL",
        ],
      },
      {
        title: "Cycling",
        steps: [
          "95 °C / 2 min (initial denaturation; 2 min also for colony PCR)",
          "25–35 cycles: 95 °C / 15 s, anneal 50–68 °C / 15 s, 72 °C / 1 min per kb",
          "72 °C / 5 min final extension",
          "Load directly. No extra dye.",
        ],
      },
    ],
  },
  {
    id: "qpcr-mmx",
    sku: "KNV-1004",
    name: "qPCR Mastermix, SYBR I + ROX",
    sub: "Hot-start 2X mix for real-time PCR — high, low, or no ROX by instrument",
    family: "qpcr",
    apps: ["expression", "genotyping"],
    featured: true,
    packs: [
      { label: "250 rxn", price: 273 },
      { label: "500 rxn", price: 510 },
      { label: "1,000 rxn", price: 950 },
    ],
    storage: "−20 °C",
    ship: "cold",
    shipNote: "Cold pack. Storage −20 °C.",
    tags: ["SYBR", "ROX", "hot-start", "qPCR"],
    assay: ["qpcr"],
    instruments: ["high-rox", "low-rox", "no-rox"],
    details: [
      "2X mix with dNTPs, hot-start Taq, Mg²⁺, SYBR Green I.",
      "High ROX: ABI 7000 / 7300 / 7900 / StepOne family.",
      "Low ROX: ABI 7500, QuantStudio, Stratagene.",
      "No ROX: Bio-Rad CFX, Roche LightCycler, Qiagen Rotor-Gene, Eppendorf.",
      "Expected amplicon length up to 5 kb. For research use only.",
    ],
  },
  {
    id: "taq-pol",
    sku: "KNV-1002",
    name: "Taq DNA Polymerase",
    sub: "5 U/µL with 10× reaction buffer and dNTPs",
    family: "pcr",
    apps: ["genotyping", "cloning"],
    badge: "Best seller",
    featured: false,
    packs: [
      { label: "250 U", price: 136 },
      { label: "500 U", price: 245 },
      { label: "1,000 U", price: 440 },
      { label: "2,000 U", price: 800 },
      { label: "5,000 U", price: 1850 },
    ],
    storage: "−20 °C",
    ship: "cold",
    shipNote: "Cold pack. Storage −20 °C.",
    tags: ["5 U/µL", "dNTPs included"],
    assay: ["endpoint", "cloning"],
    details: [
      "Recombinant Taq at 5 U/µL with 10× buffer and dNTPs.",
      "For research use only. Not for use in diagnostic procedures.",
    ],
  },
  {
    id: "taq-glyfree",
    sku: "KNV-1013",
    name: "Taq DNA Polymerase — glycerol-free",
    sub: "5 U/µL with glycerol-free 10× buffer and dNTPs",
    family: "pcr",
    apps: ["genotyping"],
    packs: [
      { label: "250 U", price: 136 },
      { label: "500 U", price: 245 },
      { label: "1,000 U", price: 440 },
      { label: "2,000 U", price: 800 },
      { label: "5,000 U", price: 1850 },
    ],
    storage: "−20 °C",
    ship: "cold",
    shipNote: "Cold pack. Storage −20 °C.",
    tags: ["glycerol-free", "lyophilize-ready"],
    assay: ["endpoint"],
    details: ["Glycerol-free formulation for lyophilization workflows. Research use only."],
  },
  {
    id: "taq-mgfree",
    sku: "KNV-1012",
    name: "Taq DNA Polymerase — Mg-free",
    sub: "5 U/µL with magnesium-free 10× buffer and dNTPs",
    family: "pcr",
    apps: ["genotyping"],
    packs: [
      { label: "250 U", price: 272 },
      { label: "500 U", price: 500 },
      { label: "1,000 U", price: 940 },
      { label: "2,000 U", price: 1750 },
      { label: "5,000 U", price: 4100 },
    ],
    storage: "−20 °C",
    ship: "cold",
    shipNote: "Cold pack. Storage −20 °C.",
    tags: ["Mg-free"],
    assay: ["endpoint"],
    details: ["Mg-free buffer for titration of magnesium. Research use only."],
  },
  {
    id: "pfu-pol",
    sku: "KNV-1005",
    name: "Pfu DNA Polymerase",
    sub: "2 U/µL proofreading enzyme with 10× buffer",
    family: "pcr",
    apps: ["cloning", "genotyping"],
    packs: [
      { label: "200 U", price: 238 },
      { label: "500 U", price: 560 },
      { label: "1,000 U", price: 1050 },
      { label: "2,000 U", price: 1980 },
    ],
    storage: "−20 °C",
    ship: "cold",
    shipNote: "Cold pack. Storage −20 °C.",
    tags: ["proofreading", "high-fidelity"],
    assay: ["endpoint", "cloning"],
    details: ["Proofreading Pfu for cloning-grade amplicons. Research use only."],
  },
  {
    id: "t4-ligase-hc",
    sku: "KNV-1006",
    name: "T4 DNA Ligase — high concentration",
    sub: "2,000 CEU/µL with 10× buffer and PEG-4000 (50%)",
    family: "cloning",
    apps: ["cloning"],
    packs: [
      { label: "10,000 U", price: 32 },
      { label: "20,000 U", price: 60 },
      { label: "40,000 U", price: 112 },
      { label: "80,000 U", price: 210 },
      { label: "100,000 U", price: 255 },
    ],
    storage: "−20 °C",
    ship: "cold",
    shipNote: "Cold pack. Storage −20 °C.",
    tags: ["high-conc", "PEG"],
    assay: ["cloning"],
    details: ["High-concentration T4 ligase for blunt and sticky ends. Research use only."],
  },
  {
    id: "t4-ligase",
    sku: "KNV-1007",
    name: "T4 DNA Ligase",
    sub: "400 CEU/µL with 10× reaction buffer",
    family: "cloning",
    apps: ["cloning"],
    packs: [
      { label: "10,000 U", price: 32 },
      { label: "20,000 U", price: 60 },
      { label: "40,000 U", price: 112 },
      { label: "80,000 U", price: 210 },
      { label: "100,000 U", price: 255 },
    ],
    storage: "−20 °C",
    ship: "cold",
    shipNote: "Cold pack. Storage −20 °C.",
    tags: ["ligation"],
    assay: ["cloning"],
    details: ["Standard T4 DNA ligase. Research use only."],
  },
  {
    id: "dscript",
    sku: "KNV-1008",
    name: "D-Script cDNA Master Mix 5X",
    sub: "One-step first-strand cDNA synthesis mix",
    family: "rt",
    apps: ["expression"],
    packs: [
      { label: "50 rxn", price: 365 },
      { label: "100 rxn", price: 690 },
      { label: "200 rxn", price: 1300 },
    ],
    storage: "−20 °C",
    ship: "cold",
    shipNote: "Cold pack. Storage −20 °C.",
    tags: ["5X", "RT"],
    assay: ["rt"],
    details: ["5X first-strand mix. Research use only."],
  },
  {
    id: "first-strand",
    sku: "KNV-1009",
    name: "1st Strand cDNA Synthesis Kit",
    sub: "Complete reverse-transcription kit",
    family: "rt",
    apps: ["expression"],
    featured: true,
    packs: [
      { label: "50 rxn", price: 583 },
      { label: "100 rxn", price: 1100 },
      { label: "200 rxn", price: 2080 },
    ],
    storage: "−20 °C",
    ship: "cold",
    shipNote: "Cold pack. Storage −20 °C.",
    tags: ["kit", "RT"],
    assay: ["rt"],
    details: ["Complete first-strand kit. Research use only."],
  },
  {
    id: "rnase-inh",
    sku: "KNV-1010",
    name: "Murine RNase Inhibitor",
    sub: "Recombinant, 40 U/µL",
    family: "rt",
    apps: ["expression"],
    packs: [
      { label: "3,000 U", price: 69 },
      { label: "10,000 U", price: 210 },
      { label: "20,000 U", price: 400 },
    ],
    storage: "−20 °C",
    ship: "cold",
    shipNote: "Cold pack. Storage −20 °C.",
    tags: ["RNase"],
    assay: ["rt"],
    details: ["Murine RNase inhibitor, 40 U/µL. Research use only."],
  },
  {
    id: "ladder-100",
    sku: "KNV-1011",
    name: "KNV 100 bp DNA Ladder",
    sub: "Ready-to-load, 100–1,500 bp",
    family: "ladders",
    apps: ["genotyping"],
    packs: [
      { label: "100 loads", price: 77 },
      { label: "250 loads", price: 175 },
    ],
    storage: "−20 °C",
    ship: "cold",
    shipNote: "Cold pack. Storage −20 °C.",
    tags: ["ladder", "ready-to-load"],
    assay: ["endpoint"],
    details: ["Ready-to-load 100 bp ladder. Research use only."],
  },
];

export function productById(id: string) {
  return products.find((p) => p.id === id);
}

export function familyById(id: FamilyId) {
  return families.find((f) => f.id === id);
}

export function relatedProducts(id: string) {
  const p = productById(id);
  if (!p) return products.slice(0, 3);
  const same = products.filter((x) => x.id !== id && x.family === p.family);
  if (same.length >= 3) return same.slice(0, 3);
  const rest = products.filter((x) => x.id !== id && x.family !== p.family);
  return [...same, ...rest].slice(0, 3);
}

export function searchProducts(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return products;
  return products.filter((p) =>
    [p.name, p.sub, p.sku, p.family, ...p.tags, ...p.details].join(" ").toLowerCase().includes(s),
  );
}

export function productsInFamily(id: FamilyId) {
  return products.filter((p) => p.family === id);
}

export function productsInApp(id: AppId) {
  return products.filter((p) => p.apps.includes(id));
}

export function featuredProducts() {
  return products.filter((p) => p.featured);
}

export type AssayId = NonNullable<Product["assay"]>[number];

export const assays: { id: AssayId; name: string; hint: string }[] = [
  { id: "sample-prep", name: "Genomic DNA prep", hint: "Lysate to PCR, plants / animals / microbes" },
  { id: "endpoint", name: "Endpoint PCR", hint: "Routine amplification, genotyping" },
  { id: "colony", name: "Colony PCR", hint: "Screening clones from plates" },
  { id: "qpcr", name: "Real-time PCR", hint: "SYBR quantification, gene expression" },
  { id: "rt", name: "cDNA / RNA", hint: "First-strand synthesis" },
  { id: "cloning", name: "Molecular cloning", hint: "Ligation, proofreading PCR" },
];

export function recommend(assay: AssayId, instrument?: "high-rox" | "low-rox" | "no-rox") {
  const hits = products.filter((p) => p.assay?.includes(assay));
  if (assay === "qpcr" && instrument) {
    const matched = hits.filter((p) => p.instruments?.includes(instrument));
    if (matched.length) return matched;
  }
  return hits.length ? hits : featuredProducts();
}

