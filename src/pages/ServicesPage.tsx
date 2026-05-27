import { useReveal } from "../hooks/useReveal";
import { FinalCTA } from "../components/sections/FinalCTA";

/* ============================================================
   Data — copied from the Services wireframe
   §02 DESIGN · §03 BUILD · §04 RUN · each with cards
   ============================================================ */

type ServiceCard = {
  title: string;
  outcome: string;
  triggers: string[];
};

type Stage = {
  num: string;
  tag: "Design" | "Build" | "Run";
  statement: string;
  metric: string;
  cards: ServiceCard[];
};

const STAGES: Stage[] = [
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
        outcome:
          "Clear, validated requirements that reduce execution risk.",
        triggers: [
          "Scope keeps shifting mid-build",
          "Stakeholders aren't aligned on what success looks like",
          "Past project failed on requirements, not engineering",
        ],
      },
      {
        title: "Solution Design",
        outcome:
          "A production-ready architecture that reduces rework.",
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
        outcome:
          "Decision-grade dashboards leadership actually trusts.",
        triggers: [
          "Board reviews are blocked on data reconciliation",
          "Numbers in the deck don't match the system",
          "Each team brings its own version of the truth",
        ],
      },
      {
        title: "KPI Governance & Data Trust",
        outcome:
          "Definitions, lineage and SLAs everyone agrees on.",
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

/* ============================================================
   Reusable card
   ============================================================ */
function SvcCard({ card, stage, i }: { card: ServiceCard; stage: Stage; i: number }) {
  return (
    <article className="page-svc">
      <header className="page-svc__head">
        <span className="page-svc__num">
          {stage.num}/{String(i + 1).padStart(2, "0")}
        </span>
        <h3 className="page-svc__title">{card.title}</h3>
      </header>
      <div className="page-svc__block">
        <span className="page-svc__label">Outcome</span>
        <p className="page-svc__outcome">{card.outcome}</p>
      </div>
      <div className="page-svc__block">
        <span className="page-svc__label">When to buy</span>
        <ul className="page-svc__triggers">
          {card.triggers.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function StageBlock({ stage }: { stage: Stage }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="page-stage section" id={stage.tag.toLowerCase()}>
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">§{stage.num} · Stage</span>
          <span>{stage.tag}</span>
          <span className="dash" />
        </div>

        <div className="page-stage__banner reveal" ref={ref}>
          <span className="page-stage__tag">{stage.tag}</span>
          <p className="page-stage__statement">{stage.statement}</p>
          <span className="page-stage__metric">
            Result from our work — <em>{stage.metric}</em>
          </span>
        </div>

        <div
          className="page-stage__grid"
          data-cols={stage.cards.length === 3 ? "3" : "4"}
        >
          {stage.cards.map((card, i) => (
            <SvcCard key={card.title} card={card} stage={stage} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Page
   ============================================================ */
export function ServicesPage() {
  const heroRef = useReveal<HTMLDivElement>();
  return (
    <>
      <section className="page-hero section" id="top">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§01 · Services</span>
            <span>Operator statement</span>
            <span className="dash" />
          </div>
          <div className="page-hero__inner reveal" ref={heroRef}>
            <h1 className="page-hero__title">
              We design, build, and <em>run</em> the systems we ship.
            </h1>
            <p className="page-hero__lead">
              Three stages, eleven practices, one accountability: from first
              architecture to ongoing operations, the team that designs the
              system is the team that owns it in production.
            </p>
            <p className="page-hero__statement">
              <span className="page-hero__statement-mark" /> If we build it, we
              run it. If it breaks, we own it.
            </p>
          </div>
        </div>
      </section>

      {STAGES.map((stage) => (
        <StageBlock key={stage.tag} stage={stage} />
      ))}

      <FinalCTA />
    </>
  );
}
