export type LinkedInCard = {
  id: string;
  date: string;
  title: string;
  body: string;
  href: string;
};

/** Static company-update cards. Live LinkedIn widgets are v2; this is the v1 stand-in. */
export const linkedInCards: LinkedInCard[] = [
  {
    id: "dna-express",
    date: "2 Sep 2026",
    title: "KNV DNA Express is on the catalog",
    body: "One buffer, five workflows — heat lysis through magnetic beads. Specified for plants, animals, and microbes. Ambient ship. Research use only.",
    href: "/products/knv-dna-express",
  },
  {
    id: "mastermix",
    date: "18 Aug 2026",
    title: "Mastermix 2X — colony PCR without a second dye",
    body: "Taq premix with dNTPs, Mg²⁺, and a split tracking dye. Formulated for GC-rich templates. Store −20 °C. No 5× yield claim.",
    href: "/products/knv-mastermix",
  },
  {
    id: "bensalem",
    date: "3 Nov 2025",
    title: "Keenvaa Biolabs Inc, Pennsylvania",
    body: "Domestic corporation #0014969168. Founder-led by Dr. Darshan Patel. Reagents specified for real benches, shipped from Bensalem.",
    href: "/about",
  },
];
