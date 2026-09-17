export type CloningStep = {
  n: number;
  title: string;
  body: string;
  productIds: string[];
};

export const cloningSteps: CloningStep[] = [
  {
    n: 1,
    title: "Gene of interest",
    body: "Start from a known sequence, a tissue, or a plasmid. If the template is genomic, prep it first.",
    productIds: ["knv-dna-express"],
  },
  {
    n: 2,
    title: "PCR amplification",
    body: "Amplify the insert. Proofreading Pfu for cloning-grade ends; Taq or Mastermix 2X for routine screens.",
    productIds: ["pfu-pol", "taq-pol", "knv-mastermix"],
  },
  {
    n: 3,
    title: "Restriction digestion (insert)",
    body: "Cut the amplicon to match the vector ends. Confirm on a gel.",
    productIds: ["ladder-100"],
  },
  {
    n: 4,
    title: "DNA purification",
    body: "Clean the digest. Spin, beads, or PEG-formate — DNA Express covers those paths when the starting material is crude.",
    productIds: ["knv-dna-express"],
  },
  {
    n: 5,
    title: "Vector preparation",
    body: "Grow and isolate the backbone. Quantity and supercoiling matter more than a new enzyme here.",
    productIds: [],
  },
  {
    n: 6,
    title: "Restriction digestion (vector)",
    body: "Open the backbone with the same chemistry as the insert.",
    productIds: ["ladder-100"],
  },
  {
    n: 7,
    title: "Vector purification",
    body: "Remove the cut fragment. Phosphatase if recircularization is a problem — not a KNV SKU in v1.",
    productIds: [],
  },
  {
    n: 8,
    title: "Ligation",
    body: "T4 DNA Ligase, standard or high-concentration, with PEG for blunt ends when needed.",
    productIds: ["t4-ligase", "t4-ligase-hc"],
  },
  {
    n: 9,
    title: "Transformation",
    body: "Competent cells, heat shock or electroporation. Not sold here.",
    productIds: [],
  },
  {
    n: 10,
    title: "Plating",
    body: "Selective plates. Overnight.",
    productIds: [],
  },
  {
    n: 11,
    title: "Colony PCR / screening",
    body: "Touch a colony into KNV Mastermix 2X. Denature 95 °C / 2 min, then cycle. Dye-load straight on agarose.",
    productIds: ["knv-mastermix", "ladder-100"],
  },
  {
    n: 12,
    title: "Plasmid isolation",
    body: "Miniprep from a verified colony.",
    productIds: [],
  },
  {
    n: 13,
    title: "Restriction confirmation",
    body: "Diagnostic digest and ladder. Keep the gel if you own it — we will not invent bands.",
    productIds: ["ladder-100"],
  },
  {
    n: 14,
    title: "Sequencing",
    body: "Sanger or NGS of the insert-vector junction. Out of house.",
    productIds: [],
  },
  {
    n: 15,
    title: "Expression vector",
    body: "Subclone into the expression backbone if the cloning vector is not the production plasmid.",
    productIds: ["t4-ligase", "pfu-pol"],
  },
  {
    n: 16,
    title: "Protein expression",
    body: "Induce. This is the founder’s discipline, not a KNV SKU.",
    productIds: [],
  },
  {
    n: 17,
    title: "Purification / downstream",
    body: "Chromatography, QC of the protein, and — if you are Dr. Patel — the same rigor that used to sit on therapeutic mAbs.",
    productIds: [],
  },
];
