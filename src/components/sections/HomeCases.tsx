import { Link } from "react-router-dom";

import { CASES } from "../../data/cases";
import { ENQUO_CLIENTS } from "../../data/enquo";
import { useReveal } from "../../hooks/useReveal";
import { Ticker } from "./Ticker";

/**
 * Case Studies (home) — one featured case shown large, the rest as a compact
 * list below, all linking through to the full pages. Closes with the client
 * logo strip as extra social proof.
 */
export function HomeCases() {
  const [featured, ...rest] = CASES;
  const featRef = useReveal<HTMLAnchorElement>();
  const listRef = useReveal<HTMLDivElement>();

  return (
    <section className="cases section" id="cases">
      <div className="px-glow px-glow--cases" data-parallax="0.09" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">04 / Case studies</span>
          <span>Real systems. Real numbers.</span>
          <span className="dash" />
        </div>

        <Link
          to={`/case-studies/${featured.slug}`}
          className="case-feat reveal"
          ref={featRef}
        >
          <div className="case-feat__media" aria-hidden="true">
            <div className="case-feat__media-bg" />
            <div className="case-feat__media-grid" />
            <span className="case-feat__badge">Featured case · {featured.num}</span>
            <span className="case-feat__sector">{featured.industry}</span>
          </div>

          <div className="case-feat__body">
            <span className="case-feat__eyebrow">{featured.client}</span>
            <h3 className="case-feat__headline">{featured.headline}</h3>
            <div className="case-feat__result">
              <span className="case-feat__result-label">Result</span>
              <p>{featured.result}</p>
            </div>
            <div className="case-feat__foot">
              <span className="case-feat__duration">{featured.duration}</span>
              <span className="case-feat__cta">
                Read the case
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </Link>

        <div className="case-list" ref={listRef}>
          {rest.map((c) => (
            <Link
              to={`/case-studies/${c.slug}`}
              className="case-row"
              key={c.slug}
            >
              <span className="case-row__num">{c.num}</span>
              <span className="case-row__sector">{c.industry}</span>
              <span className="case-row__headline">{c.headline}</span>
              <span className="case-row__result">{c.result}</span>
              <span className="case-row__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="case-all">
          <Link className="btn" to="/case-studies">
            View all {CASES.length} case studies
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="cases__proof">
        <div className="cases__proof-label">
          Trusted by <em>industry leaders</em> across the Americas
        </div>
        <Ticker items={ENQUO_CLIENTS.map((c) => ({ text: c }))} variant="default" />
      </div>
    </section>
  );
}
