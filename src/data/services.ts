/* Services — single source of truth for the Design / Build / Run model.
   Used by /services (full page) and the home page (How We Work + What We Do).
   Copy aligned to the Enquo commercial deck + frame: one continuous
   execution lifecycle, fourteen capabilities, five enablers, one accountability. */

export type ServiceCard = {
  title: string;
  outcome: string;
  triggers: string[];
};

/** Optional real media for a stage hero banner. Drop a file in
 *  /public/services (e.g. design.jpg or build.mp4) and point `src` at it
 *  ("services/design.jpg"); leave undefined to use the generated visual. */
export type StageMedia = { type: "image" | "video"; src: string };

export type Stage = {
  num: string;
  tag: "Design" | "Build" | "Run";
  statement: string;
  metric: string;
  /** Swap-in banner media; falls back to generated brand art when absent. */
  media?: StageMedia;
  cards: ServiceCard[];
};

/** Discover — the optional entry phase before the lifecycle (deck p.12).
 *  Not a stage with practices; it produces the case for everything after. */
export const DISCOVER = {
  num: "01",
  tag: "Discover",
  statement:
    "Assess the current state, identify gaps and opportunities, and build the business case.",
  outcome: "A decision-grade roadmap, a 90-day plan, and an investment thesis.",
};

export const STAGES: Stage[] = [
  {
    num: "02",
    tag: "Design",
    statement:
      "Design that survives contact with production. Every architecture decision is made by the people who will operate it. No throwaway slideware.",
    metric: "Average delivery confidence improves 3.4× post-design phase",
    media: { type: "image", src: "img/services/design.webp" },
    cards: [
      {
        title: "Strategic Advisory",
        outcome:
          "A clear, executable direction that aligns leadership and technical teams.",
        triggers: [
          "Leadership disagrees on the roadmap",
          "New tech investment with unclear ROI",
          "Org-wide transformation kickoff",
        ],
      },
      {
        title: "Enterprise Architecture",
        outcome: "A production-ready architecture that reduces rework.",
        triggers: [
          "Past systems had to be rebuilt within 18 months",
          "Multiple vendors propose conflicting approaches",
          "New platform spans more than 3 integrations",
        ],
      },
      {
        title: "Process Intelligence",
        outcome:
          "A factual picture of how work actually flows — and where it breaks.",
        triggers: [
          "Nobody can describe the end-to-end process",
          "Handoffs disappear into inboxes and spreadsheets",
          "Automation candidates are chosen by anecdote",
        ],
      },
      {
        title: "Transformation Strategy",
        outcome:
          "A sequenced roadmap leadership can fund and teams can execute.",
        triggers: [
          "Transformation stalled after the kickoff deck",
          "Competing priorities with no sequencing logic",
          "Investment case can't survive a CFO review",
        ],
      },
    ],
  },
  {
    num: "03",
    tag: "Build",
    statement:
      "Build with operators in the room. Engineers, data scientists, and SREs work together from day one — not in sequence.",
    metric: "Production incidents reduced 62% vs. prior delivery teams",
    media: { type: "image", src: "img/services/build.webp" },
    cards: [
      {
        title: "Data Engineering",
        outcome:
          "A unified, trustworthy data backbone where information flows consistently.",
        triggers: [
          "Reports don't match between systems",
          "Manual exports between systems are a daily ritual",
          "Acquisition or merger requires consolidation",
        ],
      },
      {
        title: "Application Development",
        outcome:
          "Software shipped to production by the team that will operate it.",
        triggers: [
          "Critical workflows still live in spreadsheets",
          "Off-the-shelf tools can't carry the core process",
          "Previous builds arrived without owners",
        ],
      },
      {
        title: "Automation",
        outcome:
          "Faster, more consistent operations with full audit traceability.",
        triggers: [
          "Same workflow executed differently by different people",
          "Audit findings cite manual steps",
          "Volume growth is outpacing headcount",
        ],
      },
      {
        title: "Platform Engineering",
        outcome: "Platforms that remain stable well beyond go-live.",
        triggers: [
          "Last platform required hotfixes in week one",
          "On-call rotation is unsustainable",
          "Scale-up event is on the roadmap",
        ],
      },
      {
        title: "AI Enablement",
        outcome:
          "AI capabilities grounded in your data and governed from day one.",
        triggers: [
          "AI pilots never reach production",
          "Models lack the connected context to be useful",
          "Compliance blocks every AI initiative at review",
        ],
      },
    ],
  },
  {
    num: "04",
    tag: "Run",
    statement:
      "Run with accountability for outcomes. We measure success by what's still working in year three, not what shipped in week eight.",
    metric: "Mean time to recovery cut by 71% under our ownership",
    media: { type: "image", src: "img/services/run.webp" },
    cards: [
      {
        title: "Managed Services",
        outcome:
          "An accountable team that keeps applications, infrastructure and quality healthy day to day (AMS · IMS · QMS).",
        triggers: [
          "Internal team can't sustain after-hours coverage",
          "Vendors point fingers when incidents happen",
          "Cost of downtime exceeds cost of operations",
        ],
      },
      {
        title: "Analytics",
        outcome: "Decision-grade dashboards leadership actually trusts.",
        triggers: [
          "Board reviews are blocked on data reconciliation",
          "Numbers in the deck don't match the system",
          "Each team brings its own version of the truth",
        ],
      },
      {
        title: "Reliability Engineering",
        outcome:
          "Operational resilience engineered in, not patched on after the incident.",
        triggers: [
          "Regression bugs hit production",
          "Recovery depends on the one engineer who remembers",
          "Peak events are scheduled; confidence isn't",
        ],
      },
      {
        title: "AI Operations",
        outcome:
          "Models monitored, governed and improving in production — with humans in the loop.",
        triggers: [
          "Nobody watches the model after launch",
          "Drift erodes accuracy quarter over quarter",
          "Automated decisions lack confidence thresholds",
        ],
      },
      {
        title: "Governance",
        outcome:
          "Definitions, lineage and SLAs everyone agrees on — data everyone trusts.",
        triggers: [
          "Same KPI calculated 3 ways across the company",
          "Audit asks how a metric is derived",
          "Decisions get reversed when the data is questioned",
        ],
      },
    ],
  },
];

/** Foundational enablers (deck p.7) — present across every stage. */
export type Enabler = { title: string; desc: string };

export const ENABLERS: Enabler[] = [
  { title: "Security & Compliance", desc: "Controls designed in from week one, audit-ready by default." },
  { title: "Cloud", desc: "Cloud agnostic — your cloud, your VPC, your IAM. We operate inside it." },
  { title: "Change Management", desc: "Systems people actually use, measured by adoption." },
  { title: "FinOps", desc: "Cost and value tracked with the same rigor as uptime." },
  { title: "AI & Data Excellence", desc: "Standards that keep data and models trustworthy at scale." },
];

/** Total practices across all stages (Design 4 + Build 5 + Run 5 = 14). */
export const SERVICE_COUNT = STAGES.reduce((n, s) => n + s.cards.length, 0);

/** Cumulative card index where each stage begins — lets the page tint cards
 *  (orange · rosado · turquesa) on a single running sequence across stages. */
export const STAGE_OFFSETS: number[] = STAGES.reduce<number[]>((acc, _s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + STAGES[i - 1].cards.length);
  return acc;
}, []);

/** Real problems rarely map to one practice — these show common combinations. */
export type ServiceCombo = { problem: string; combo: string };

export const SERVICE_COMBOS: ServiceCombo[] = [
  {
    problem: "Our reports never match across teams.",
    combo: "Data Engineering + Governance + Analytics",
  },
  {
    problem: "A system we launched 6 months ago is already failing.",
    combo: "Managed Services + Reliability Engineering",
  },
  {
    problem: "We're about to run a major integration. We can't afford failure.",
    combo: "Enterprise Architecture + Data Engineering + Managed Services",
  },
];
