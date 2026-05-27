import { Link } from "react-router-dom";

import { CASES, type CaseStudy } from "../data/cases";
import { FinalCTA } from "../components/sections/FinalCTA";
import { useReveal } from "../hooks/useReveal";

function StudyCard({ s }: { s: CaseStudy }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <Link to={`/case-studies/${s.slug}`} className="page-case reveal" ref={ref}>
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
    </Link>
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
            <span>{CASES.length} cases</span>
            <span className="dash" />
          </div>

          <div className="page-case-grid">
            {CASES.map((s) => (
              <StudyCard key={s.num} s={s} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
