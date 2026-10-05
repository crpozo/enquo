/* Alliances — each partner gets a slot on /partnerships and its own
   alliance page at /partnerships/:slug. */

export type Partner = {
  slug: string;
  name: string;
  status: "partner" | "in-progress";
  /** One line on the partnerships page. */
  tagline: string;
  /** Alliance page copy. */
  intro: string;
  brings: Array<{ title: string; text: string }>;
  capabilities: string[];
  /** Case study slugs that used this platform. */
  cases: string[];
  logo?: string;
  site: string;
};

export const PARTNERS: Partner[] = [
  {
    slug: "pega",
    name: "Pega",
    status: "partner",
    tagline: "Workflow automation and case management for processes that have to be governed end to end.",
    intro:
      "Enquo designs, builds and runs Pega solutions for enterprise processes that cross systems, teams and approvals: the kind of work where a spreadsheet and an email chain have quietly become the system of record.",
    brings: [
      { title: "Process-first design", text: "We map the real process before the platform, so the Pega implementation follows the business and not the reverse." },
      { title: "Integration that holds", text: "Data and APIs connected to the systems the process actually depends on, with reporting and analytics built on top." },
      { title: "Accountability after go-live", text: "The same team that builds the workflow operates it: monitoring, improvements and support in production." },
    ],
    capabilities: ["BPM Platform Implementation", "Process Automation", "Enterprise Integration & API Development", "Data Integration", "Managed Services"],
    cases: ["ncaa-host-bidding"],
    logo: "pega",
    site: "https://www.pega.com",
  },
  {
    slug: "snowflake",
    name: "Snowflake",
    status: "in-progress",
    tagline: "The data cloud behind trusted reporting, analytics and AI at enterprise scale.",
    intro:
      "Enquo builds data foundations on Snowflake for executive reporting, KPI governance and analytics, bringing fragmented sources together into one trusted platform that leadership can decide on.",
    brings: [
      { title: "A single source of truth", text: "Unified data models and governed KPIs, so every report is built on the same definitions." },
      { title: "Engineering for scale", text: "Pipelines, data quality and cost discipline designed in from the first environment." },
      { title: "Analytics that leadership uses", text: "Executive reporting and real-time visibility on top of the foundation, owned through operation." },
    ],
    capabilities: ["Data & Integration Engineering", "Data Trust & KPI Governance", "Analytics & Executive Intelligence", "AI Enablement"],
    cases: ["ncaa-executive-intelligence", "ncaa-executive-reporting"],
    logo: "snowflake",
    site: "https://www.snowflake.com",
  },
];

export const getPartner = (slug: string) => PARTNERS.find((p) => p.slug === slug);
