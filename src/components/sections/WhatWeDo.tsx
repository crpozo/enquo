import { Link } from "react-router-dom";

import { STAGES, SERVICE_COUNT } from "../../data/services";
import { useReveal } from "../../hooks/useReveal";

/** The fourteen capabilities, flattened from the three stages, in a compact grid. */
const PRACTICES = STAGES.flatMap((s) =>
  s.cards.map((c) => ({ title: c.title, outcome: c.outcome, stage: s.tag })),
);

export function WhatWeDo() {
  const headRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section className="do section" id="services">
      <div className="px-glow px-glow--do" data-parallax="0.07" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">03 / Services</span>
          <span>{SERVICE_COUNT} capabilities</span>
          <span className="dash" />
        </div>

        <div className="do__head reveal" ref={headRef}>
          <h2 className="do__title">
            Integrated capabilities across the <em>enterprise lifecycle.</em>
          </h2>
          <Link className="btn" to="/services">
            All services
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="do-grid" ref={gridRef}>
          {PRACTICES.map((p, i) => (
            <Link to="/services" className="do-card" key={p.title}>
              <div className="do-card__top">
                <span className="do-card__stage" data-stage={p.stage}>
                  {p.stage}
                </span>
                <span className="do-card__num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="do-card__title">{p.title}</h3>
              <p className="do-card__outcome">{p.outcome}</p>
              <span className="do-card__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}

          {/* 15th cell, completes the 5×3 grid left by 14 capability cards
              and doubles as the conversion path to the full services page. */}
          <Link to="/services" className="do-card do-card--cta">
            <div className="do-card__top">
              <span className="do-card__stage" data-stage="Run">Design · Build · Run</span>
              <span className="do-card__num">{SERVICE_COUNT}</span>
            </div>
            <h3 className="do-card__title">Explore all practices</h3>
            <p className="do-card__outcome">
              One accountable team across every stage. See how the eleven fit together.
            </p>
            <span className="do-card__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
