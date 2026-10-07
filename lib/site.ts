/**
 * One place for the names, links and words the whole site repeats. Pages read
 * from here so a product link or the main call to action changes in one edit.
 */

export const SITE = {
  name: "Arttribute",
  url: (process.env.SITE_URL ?? "https://www.arttribute.io").replace(/\/$/, ""),
  tagline: "AI that keeps you in control",
  description:
    "Arttribute builds technology for private, transparent and responsible AI: local AI with Agent Commons, AI literacy with CommonLab, and provenance with ProvenanceKit.",
  email: "hello@arttribute.io",
};

export const LINKS = {
  download: "https://www.agentcommons.io/download/desktop",
  agentCommons: "https://www.agentcommons.io",
  agentCommonsDocs: "https://docs.agentcommons.io/docs",
  commonLab: "https://commonlab.agentcommons.io",
  commonLabCourses: "https://commonlab.agentcommons.io/courses",
  provenanceKit: "https://www.provenancekit.com",
  provenanceKitDocs: "https://docs.provenancekit.com",
  commonArcade: "https://arcade.agentcommons.io",
  github: "https://github.com/Arttribute",
  linkedin: "https://www.linkedin.com/company/arttribute-labs/",
  x: "https://x.com/arttribute_io",
  workshop: `mailto:${SITE.email}?subject=${encodeURIComponent("AI literacy workshop")}`,
  lan: `mailto:${SITE.email}?subject=${encodeURIComponent("LAN AI for our team")}`,
  contact: `mailto:${SITE.email}`,
};

/** The main call to action across the site. */
export const PRIMARY_CTA = { label: "Get Agent Commons", href: LINKS.download };

export type Product = {
  key: "agent-commons" | "commonlab" | "provenancekit";
  area: string;
  name: string;
  anchor: string;
  title: string;
  summary: string;
  href: string;
  cta: string;
};

export const PRODUCTS: Product[] = [
  {
    key: "agent-commons",
    area: "Private AI",
    name: "Agent Commons",
    anchor: "private-ai",
    title: "Run AI on your own computer.",
    summary:
      "Local models, retrieval over your files and agents that work offline. Continue in the cloud with frontier models when you choose.",
    href: LINKS.agentCommons,
    cta: "Get Agent Commons",
  },
  {
    key: "commonlab",
    area: "AI literacy",
    name: "CommonLab",
    anchor: "ai-literacy",
    title: "Learn to use AI well.",
    summary:
      "Hands-on courses and workshops for leaders, teams, educators and students, with privacy, verification and human oversight built in.",
    href: LINKS.commonLab,
    cta: "Explore CommonLab",
  },
  {
    key: "provenancekit",
    area: "Provenance",
    name: "ProvenanceKit",
    anchor: "provenance",
    title: "Know how work was made.",
    summary:
      "Open-source provenance for human and AI work: who contributed, which tools and models were used, and on what terms.",
    href: LINKS.provenanceKit,
    cta: "Visit ProvenanceKit",
  },
];

export const NAV = [
  { label: "Private AI", href: "/#private-ai" },
  { label: "AI literacy", href: "/#ai-literacy" },
  { label: "Provenance", href: "/#provenance" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const FOOTER_GROUPS: Array<{
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    title: "Products",
    links: [
      { label: "Agent Commons", href: LINKS.agentCommons, external: true },
      { label: "Desktop app", href: LINKS.download, external: true },
      { label: "CommonLab", href: LINKS.commonLab, external: true },
      { label: "ProvenanceKit", href: LINKS.provenanceKit, external: true },
      { label: "Common Arcade", href: LINKS.commonArcade, external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Agent Commons docs", href: LINKS.agentCommonsDocs, external: true },
      { label: "ProvenanceKit docs", href: LINKS.provenanceKitDocs, external: true },
      { label: "GitHub", href: LINKS.github, external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Workshops", href: LINKS.workshop, external: true },
      { label: "Contact", href: LINKS.contact, external: true },
    ],
  },
];

export const TOPICS = [
  { value: "private-ai", label: "Private AI" },
  { value: "ai-literacy", label: "AI literacy" },
  { value: "provenance", label: "Provenance" },
  { value: "company", label: "Company" },
] as const;

export type Topic = (typeof TOPICS)[number]["value"];

export function topicLabel(topic: string | null | undefined) {
  return TOPICS.find((t) => t.value === topic)?.label ?? "Company";
}
