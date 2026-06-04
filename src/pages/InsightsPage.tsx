import { FinalCTA } from "../components/sections/FinalCTA";
import { useReveal } from "../hooks/useReveal";

type Insight = {
  num: string;
  category: "Field note" | "Essay" | "Brief";
  readTime: string;
  date: string;
  title: string;
  dek: string;
};

const INSIGHTS: Insight[] = [
  {
    num: "01",
    category: "Essay",
    readTime: "12 min",
    date: "May 2026",
    title: "The handoff is the bug.",
    dek: "Why critical systems should never be “delivered”, and what changes when the team that designs them owns the operations.",
  },
  {
    num: "02",
    category: "Field note",
    readTime: "6 min",
    date: "Apr 2026",
    title: "Reconciliation as a leading indicator.",
    dek: "Three signals that your data foundation will fail an audit, and the architecture moves that fix them before the auditor arrives.",
  },
  {
    num: "03",
    category: "Brief",
    readTime: "3 min",
    date: "Apr 2026",
    title: "What we measure on day 365.",
    dek: "Our KPIs for live engagements one year after go-live: incident rate, MTTR, board-grade reporting, and what we drop from the dashboard.",
  },
  {
    num: "04",
    category: "Essay",
    readTime: "9 min",
    date: "Mar 2026",
    title: "Single source of truth, plural sources of opinion.",
    dek: "KPI governance is a political problem with a technical surface. A working playbook for getting Finance, Ops, and Product to agree on one number.",
  },
  {
    num: "05",
    category: "Field note",
    readTime: "5 min",
    date: "Mar 2026",
    title: "AI adoption stops at the operator.",
    dek: "Why every AI rollout we’ve recovered failed the same way, and the operator-side instrumentation we install on day one.",
  },
  {
    num: "06",
    category: "Brief",
    readTime: "4 min",
    date: "Feb 2026",
    title: "BCI is closer than your roadmap thinks.",
    dek: "Brain-computer interface isn’t a 2030 problem. Here’s the operational stack we’re recommending teams stand up now.",
  },
];

/* ============================================================ */

function FeaturedInsight({ ins }: { ins: Insight }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <a className="page-insight-featured reveal" ref={ref}>
      <div className="page-insight-featured__num">{ins.num}</div>
      <div className="page-insight-featured__body">
        <header className="page-insight-featured__head">
          <span className="page-insight-featured__cat">{ins.category}</span>
          <span className="page-insight-featured__meta">
            {ins.readTime} &middot; {ins.date}
          </span>
        </header>

        <h2 className="page-insight-featured__title">{ins.title}</h2>
        <p className="page-insight-featured__dek">{ins.dek}</p>

        <footer className="page-insight-featured__foot">
          <span className="page-insight-featured__pill">Featured · This week</span>
          <span className="page-insight-featured__cta">
            Read full essay
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </footer>
      </div>
      <div className="page-insight-featured__decor" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </a>
  );
}

/* ============================================================ */

function InsightCard({ ins }: { ins: Insight }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <a className="insight-card reveal" data-cat={ins.category} ref={ref}>
      <div className="insight-card__cover" aria-hidden="true">
        <div className="insight-card__grad" />
        <div className="insight-card__halftone" />
        <svg className="insight-card__motif" viewBox="0 0 160 120" preserveAspectRatio="xMidYMid meet">
          <g fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1">
            <circle cx="80" cy="60" r="22" />
            <circle cx="80" cy="60" r="40" strokeOpacity="0.28" />
            <circle cx="80" cy="22" r="3" fill="#fff" stroke="none" />
            <circle cx="124" cy="76" r="3" fill="#fff" stroke="none" />
            <circle cx="40" cy="84" r="3" fill="#fff" stroke="none" />
            <path d="M80 22 L80 60 L124 76 M80 60 L40 84" strokeOpacity="0.3" />
          </g>
        </svg>
        <span className="insight-card__num">{ins.num}</span>
        <span className="insight-card__badge">{ins.category}</span>
      </div>
      <div className="insight-card__body">
        <div className="insight-card__top">
          <span className="insight-card__date">{ins.date}</span>
          <span className="insight-card__read">{ins.readTime} read</span>
        </div>
        <h3 className="insight-card__title">{ins.title}</h3>
        <p className="insight-card__dek">{ins.dek}</p>
        <span className="insight-card__cta">
          Read
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </a>
  );
}

/* ============================================================ */

export function InsightsPage() {
  const heroRef = useReveal<HTMLDivElement>();

  const [featured, ...rest] = INSIGHTS;

  return (
    <>
      <section className="page-hero section" id="top">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§01 · Insights</span>
            <span>Field notes, essays, briefs</span>
            <span className="dash" />
          </div>

          <div className="page-hero__inner reveal" ref={heroRef}>
            <h1 className="page-hero__title">
              The lessons live <em>in production</em>.
            </h1>
            <p className="page-hero__lead">
              Short essays and field notes from the engagements we run. No
              think-pieces &mdash; only what we learned because something broke
              at 02:00 and we had to fix it.
            </p>
            <p className="page-hero__statement">
              <span className="page-hero__statement-mark" /> If we didn&rsquo;t
              learn it from a production system, we don&rsquo;t publish it.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="featured">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§02 · Featured</span>
            <span>Most recent essay</span>
            <span className="dash" />
          </div>
          <FeaturedInsight ins={featured} />
        </div>
      </section>

      <section className="section" id="archive">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§03 · Archive</span>
            <span>{INSIGHTS.length} entries</span>
            <span className="dash" />
          </div>

          <div className="insight-grid">
            {rest.map((ins) => (
              <InsightCard key={ins.num} ins={ins} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
