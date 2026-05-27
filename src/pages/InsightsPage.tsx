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
    dek: "Why critical systems should never be \"delivered\" — and what changes when the team that designs them owns the operations.",
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
    dek: "Why every AI rollout we&rsquo;ve recovered failed the same way — and the operator-side instrumentation we install on day one.",
  },
  {
    num: "06",
    category: "Brief",
    readTime: "4 min",
    date: "Feb 2026",
    title: "BCI is closer than your roadmap thinks.",
    dek: "Brain-computer interface isn&rsquo;t a 2030 problem. Here&rsquo;s the operational stack we&rsquo;re recommending teams stand up now.",
  },
];

function InsightCard({ ins }: { ins: Insight }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <a className="page-insight reveal" ref={ref}>
      <header className="page-insight__head">
        <span className="page-insight__cat">{ins.category}</span>
        <span className="page-insight__meta">
          {ins.readTime} · {ins.date}
        </span>
      </header>
      <h3 className="page-insight__title">{ins.title}</h3>
      <p className="page-insight__dek">{ins.dek}</p>
      <footer className="page-insight__foot">
        <span className="page-insight__num">{ins.num}</span>
        <span className="page-insight__more">
          Read
          <svg className="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>
      </footer>
    </a>
  );
}

export function InsightsPage() {
  const heroRef = useReveal<HTMLDivElement>();
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
              think-pieces — only what we learned because something broke at
              02:00 and we had to fix it.
            </p>
            <p className="page-hero__statement">
              <span className="page-hero__statement-mark" /> If we didn&rsquo;t
              learn it from a production system, we don&rsquo;t publish it.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="archive">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§02 · Archive</span>
            <span>{INSIGHTS.length} entries</span>
            <span className="dash" />
          </div>

          <div className="page-insight-grid">
            {INSIGHTS.map((ins) => (
              <InsightCard key={ins.num} ins={ins} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
