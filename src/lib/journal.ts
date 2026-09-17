export type JournalPost = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  kicker: string;
  minutes: number;
  related: string[];
  body: { h?: string; p: string }[];
};

export const posts: JournalPost[] = [
  {
    slug: "lysate-to-pcr",
    title: "Lysate to PCR in ten minutes",
    dek: "How KNV DNA Express is specified as a single-buffer genomic DNA prep — five workflows, no dry ice.",
    date: "12 Jun 2026",
    kicker: "Protocol",
    minutes: 6,
    related: ["knv-dna-express", "knv-mastermix"],
    body: [
      {
        p: "Most benches do not need a new extraction philosophy. They need one bottle that covers the sample in front of them. KNV DNA Express is a single-buffer genomic DNA prep specified for plants, animals, and microbes. The flyer describes five paths through the same reagent: heat lysis, mechanical lysis, phenol-chloroform, spin column, and magnetic beads.",
      },
      {
        h: "Direct PCR from crude lysate",
        p: "Protocols A and B are intended for direct PCR. After lysis, dilute the lysate 1:60 in PCR-grade water before adding it to KNV Mastermix 2X or a Taq reaction. That dilution is the difference between a clean band and inhibition — not a marketing multiplier.",
      },
      {
        h: "When you actually need clean gDNA",
        p: "Protocols C–E (organic, spin, beads) and a PEG-formate precipitation path are for cloning-grade or sequencing-grade DNA. Storage is room temperature for a few weeks, 4 °C beyond a month. The reagent is not shipped on dry ice.",
      },
      {
        h: "What we will not claim",
        p: "We do not print yield-versus-competitor tables until those numbers are initialed by Keenvaa. For research use only. Not for use in diagnostic procedures.",
      },
    ],
  },
  {
    slug: "colony-pcr-mastermix",
    title: "Colony PCR without a second dye tube",
    dek: "KNV Mastermix 2X is a Taq premix with dNTPs, Mg²⁺, and a split tracking dye — specified for routine and colony PCR.",
    date: "28 Jun 2026",
    kicker: "Protocol",
    minutes: 5,
    related: ["knv-mastermix", "taq-pol"],
    body: [
      {
        p: "A 50 µL reaction is half mix, half everything else: 25 µL of 2X Mastermix, primers, template, water to volume. The mix is pre-loaded with a green tracking dye that splits on agarose — blue around 3–5 kb, yellow around 25 bp — so the tube loads directly. No extra loading dye.",
      },
      {
        h: "Cycling, as printed",
        p: "Initial denaturation 95 °C / 2 min. Then 25–35 cycles of 95 °C / 15 s, anneal 50–68 °C / 15 s, extend 72 °C / 1 min per kb. Final extension 72 °C / 5 min. For colony PCR: touch the colony, denature 95 °C / 2 min, then cycle as above. Formulated for GC-rich templates. We do not claim a 5× yield versus “standard Taq.”",
      },
      {
        h: "Storage and ship",
        p: "Store at −20 °C. Ships on cold pack. Room-temperature ship windows are not advertised until Keenvaa validates them in writing.",
      },
    ],
  },
  {
    slug: "cloning-gene-to-expression",
    title: "Gene to expression, as one poster",
    dek: "Seventeen steps from a gene of interest to a purified protein — with KNV enzymes at amplification, ligation, and colony screens.",
    date: "4 Aug 2026",
    kicker: "Workflow",
    minutes: 8,
    related: ["pfu-pol", "t4-ligase-hc", "knv-mastermix"],
    body: [
      {
        p: "The cloning poster on this site is the v1 content layer — not a blog CMS, not a LinkedIn widget. It is a 17-step map: amplify the insert, prepare the vector, ligate, transform, screen colonies, confirm, then move the gene into an expression context.",
      },
      {
        h: "Where KNV sits",
        p: "Pfu or Taq for the insert. T4 DNA Ligase (standard or high-concentration) for the join. KNV Mastermix 2X for colony PCR. The 100 bp ladder for the gel. DNA Express if the starting material is a tissue rather than a plasmid. Each step on the workflow page links the SKU that belongs there.",
      },
      {
        h: "What this is not",
        p: "It is not a cloning service, a custom-gene house, or a diagnostic kit. It is a reagent map for a bench that already knows the experiment.",
      },
    ],
  },
  {
    slug: "how-we-qc-a-taq-lot",
    title: "How a Taq lot leaves Bensalem",
    dek: "Activity assay, purity check, CoA on request. No purity-percentage banners until the method is on /quality.",
    date: "22 Aug 2026",
    kicker: "Quality",
    minutes: 4,
    related: ["taq-pol", "qpcr-mmx"],
    body: [
      {
        p: "Keenvaa Biolabs Inc manufactures and QC-tests at 3580 Progress Drive, Unit B/2, Bensalem, PA. The registered office is 3455 Street Rd # H-6. Parcels leave the Progress Drive bench.",
      },
      {
        h: "What “lot QC” means here",
        p: "Each enzyme lot is activity-assayed and purity-checked before release. A certificate of analysis is issued per lot on request — email info@keenvaabiolabs.com with the catalog number and lot. We do not print “≥99% pure” or “nuclease-free” as a homepage banner without the method next to it.",
      },
      {
        h: "Hours, not 24/7",
        p: "Scientific and commercial email is answered Monday–Friday, 9:00–17:00 ET. Same-week ship cutoffs are family-specific (ambient DNA Express vs cold-pack enzymes). For research use only.",
      },
    ],
  },
];

export function postBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
