/* Services — single source of truth for the Design / Build / Run model.
   Used by /services (full page) and the home page (How We Work + What We Do).
   Three stages, eleven practices, one accountability. */

export type ServiceCard = {
  title: string;
  outcome: string;
  triggers: string[];
};

export type Stage = {
  num: string;
  tag: "Design" | "Build" | "Run";
  statement: string;
  metric: string;
  cards: ServiceCard[];
};

export const STAGES: Stage[] = [
  {
    num: "02",
    tag: "Design",
    statement:
      "We design systems built to run in production, not just in presentations.",
    metric: "Average delivery confidence improves 3.4× post-design phase",
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
        title: "Business Analysis",
        outcome: "Clear, validated requirements that reduce execution risk.",
        triggers: [
          "Scope keeps shifting mid-build",
          "Stakeholders aren't aligned on what success looks like",
          "Past project failed on requirements, not engineering",
        ],
      },
      {
        title: "Solution Design",
        outcome: "A production-ready architecture that reduces rework.",
        triggers: [
          "Past systems had to be rebuilt within 18 months",
          "Multiple vendors propose conflicting approaches",
          "New platform spans more than 3 integrations",
        ],
      },
    ],
  },
  {
    num: "03",
    tag: "Build",
    statement:
      "We build systems that perform under real conditions, not just pass initial testing.",
    metric: "Production incidents reduced 62% vs. prior delivery teams",
    cards: [
      {
        title: "Data Foundation & Architecture",
        outcome: "A data foundation leadership can rely on.",
        triggers: [
          "Reports don't match between systems",
          "BI tools query directly from production DBs",
          "Data lineage is institutional knowledge",
        ],
      },
      {
        title: "Systems Integration",
        outcome: "A unified ecosystem where data flows consistently.",
        triggers: [
          "Multiple tools, no single source of truth",
          "Manual exports between systems are a daily ritual",
          "Acquisition or merger requires consolidation",
        ],
      },
      {
        title: "Process Automation",
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
    ],
  },
  {
    num: "04",
    tag: "Run",
    statement: "If we build it, we run it. If it breaks, we own the fix.",
    metric: "Mean time to recovery cut by 71% under our ownership",
    cards: [
      {
        title: "Managed Operations",
        outcome:
          "An accountable team that keeps the system healthy day to day.",
        triggers: [
          "Internal team can't sustain after-hours coverage",
          "Vendors point fingers when incidents happen",
          "Cost of downtime exceeds cost of operations",
        ],
      },
      {
        title: "Analytics & Executive Intelligence",
        outcome: "Decision-grade dashboards leadership actually trusts.",
        triggers: [
          "Board reviews are blocked on data reconciliation",
          "Numbers in the deck don't match the system",
          "Each team brings its own version of the truth",
        ],
      },
      {
        title: "KPI Governance & Data Trust",
        outcome: "Definitions, lineage and SLAs everyone agrees on.",
        triggers: [
          "Same KPI calculated 3 ways across the company",
          "Audit asks how a metric is derived",
          "Decisions get reversed when the data is questioned",
        ],
      },
      {
        title: "Quality Engineering",
        outcome:
          "Confidence that every release behaves like the last good one.",
        triggers: [
          "Regression bugs hit production",
          "Releases take a week of manual QA",
          "Test suite is older than the system under test",
        ],
      },
    ],
  },
];

/** Total practices across all stages (Design 3 + Build 4 + Run 4 = 11). */
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
    combo: "Data Foundation + KPI Governance + Analytics",
  },
  {
    problem: "A system we launched 6 months ago is already failing.",
    combo: "Managed Operations + Quality Engineering",
  },
  {
    problem: "We're about to run a major integration. We can't afford failure.",
    combo: "Solution Design + Systems Integration + Managed Operations",
  },
];
