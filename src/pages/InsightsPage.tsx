import { useState } from "react";

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
    dek: "Why critical systems should never be “delivered” — and what changes when the team that designs them owns the operations.",
  },
  {
    num: "02",
    category: "Field note",
    readTime: "6 min",
    date: "Apr 2026",
    title: "Reconciliation as a leading indicator.",
    dek: "Three signals that your data foundation will fail an audit — and the architecture moves that fix them before the auditor arrives.",
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
    dek: "Why every AI rollout we’ve recovered failed the same way — and the operator-side instrumentation we install on day one.",
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

function InsightRow({
  ins,
  isOpen,
  onToggle,
}: {
  ins: Insight;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <a
      className={"page-insight-row" + (isOpen ? " is-open" : "")}
      onMouseEnter={onToggle}
      onFocus={onToggle}
    >
      <span className="page-insight-row__num">{ins.num}</span>
      <span className="page-insight-row__cat">{ins.category}</span>
      <div className="page-insight-row__main">
        <h3 className="page-insight-row__title">{ins.title}</h3>
        <p className="page-insight-row__dek">{ins.dek}</p>
      </div>
      <span className="page-insight-row__meta">
        {ins.readTime}
        <br />
        {ins.date}
      </span>
      <span className="page-insight-row__arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}

/* ============================================================ */

export function InsightsPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const [hovered, setHovered] = useState<string | null>(null);

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

          <div className="page-insight-list">
            <header className="page-insight-list__head">
              <span>№</span>
              <span>Category</span>
              <span>Title</span>
              <span className="page-insight-list__head-meta">Length · Date</span>
              <span />
            </header>

            {rest.map((ins) => (
              <InsightRow
                key={ins.num}
                ins={ins}
                isOpen={hovered === ins.num}
                onToggle={() => setHovered(ins.num)}
              />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
