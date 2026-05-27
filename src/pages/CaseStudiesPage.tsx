import { FinalCTA } from "../components/sections/FinalCTA";
import { useReveal } from "../hooks/useReveal";

type Study = {
  num: string;
  industry: string;
  client: string;
  headline: string;
  result: string;
  duration: string;
  tags: string[];
};

const STUDIES: Study[] = [
  {
    num: "01",
    industry: "Sports & Media",
    client: "Live broadcasting platform",
    headline:
      "Replatformed live operations ahead of a 50M-viewer playoff window.",
    result: "Zero downtime · Mean time to recovery cut 71% · Cost per stream −34%",
    duration: "11 months · Build + Run",
    tags: ["Platform Engineering", "Managed Operations", "Data Trust"],
  },
  {
    num: "02",
    industry: "Financial Services",
    client: "Regional retail bank",
    headline:
      "Audit-ready reconciliation, line by line, across 14 legacy systems.",
    result: "Audit findings −86% · Reconciliation cycle 7d → 4h",
    duration: "9 months · Design + Build",
    tags: ["Systems Integration", "KPI Governance", "Compliance"],
  },
  {
    num: "03",
    industry: "Healthcare",
    client: "Hospital network",
    headline:
      "Clinical-grade KPI governance across three acquired institutions.",
    result: "Single source of truth for 412 KPIs · Board reports in hours, not weeks",
    duration: "13 months · Design + Build + Run",
    tags: ["Data Foundation", "KPI Governance", "Analytics"],
  },
  {
    num: "04",
    industry: "Non-Profits",
    client: "Continental advocacy NGO",
    headline:
      "Automated funder reporting so field teams could return to the field.",
    result: "Manual reporting hours −78% · Funder satisfaction +41%",
    duration: "6 months · Process Automation",
    tags: ["Process Automation", "Reporting", "Run"],
  },
  {
    num: "05",
    industry: "Tech, Telecom & Media",
    client: "National telecom",
    headline:
      "Migrated 3.2 PB of subscriber data without a single customer-facing incident.",
    result: "Migration window −58% · Customer-impacting incidents: 0",
    duration: "14 months · Build + Run",
    tags: ["Migration", "Data Ops", "Quality Engineering"],
  },
  {
    num: "06",
    industry: "Government & Public Sector",
    client: "Federal-level agency",
    headline:
      "Service desk and case management consolidated under one accountable team.",
    result: "Citizen-facing SLA met 99.4% over 18 months",
    duration: "Ongoing · Run",
    tags: ["Managed Operations", "Process Automation"],
  },
];

function StudyCard({ s }: { s: Study }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <a className="page-case reveal" ref={ref}>
      <header className="page-case__head">
        <span className="page-case__num">Case · {s.num}</span>
        <span className="page-case__industry">{s.industry}</span>
      </header>
      <h3 className="page-case__headline">{s.headline}</h3>
      <p className="page-case__client">{s.client}</p>
      <div className="page-case__result">
        <span className="page-case__result-label">Result</span>
        <p className="page-case__result-text">{s.result}</p>
      </div>
      <footer className="page-case__foot">
        <span className="page-case__duration">{s.duration}</span>
        <div className="page-case__tags">
          {s.tags.map((t) => (
            <span key={t} className="page-case__tag">
              {t}
            </span>
          ))}
        </div>
      </footer>
    </a>
  );
}

export function CaseStudiesPage() {
  const heroRef = useReveal<HTMLDivElement>();
  return (
    <>
      <section className="page-hero section" id="top">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§01 · Case Studies</span>
            <span>Real systems. Real numbers.</span>
            <span className="dash" />
          </div>

          <div className="page-hero__inner reveal" ref={heroRef}>
            <h1 className="page-hero__title">
              The systems we ran are <em>still running</em>.
            </h1>
            <p className="page-hero__lead">
              Each case below names the industry, the outcome, the duration we
              owned the work, and the practices involved. We&rsquo;d rather
              publish numbers than testimonials.
            </p>
            <p className="page-hero__statement">
              <span className="page-hero__statement-mark" /> Every metric on
              this page came out of production, not a deck.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="cases">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§02 · Selected work</span>
            <span>{STUDIES.length} cases</span>
            <span className="dash" />
          </div>

          <div className="page-case-grid">
            {STUDIES.map((s) => (
              <StudyCard key={s.num} s={s} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
