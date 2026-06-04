import { useReveal } from "../../hooks/useReveal";

/**
 * What We Fix — the problem, stated plainly. Direct, no hedging: the three
 * failure modes Enquo exists to close, drawn from the patterns behind the
 * case studies and industry pains.
 */
const PROBLEMS = [
  {
    k: "01",
    t: "Systems fail at peak",
    d: "The platform buckles during the live event, the launch, the quarter-close, the exact moment that matters most.",
  },
  {
    k: "02",
    t: "No one is accountable",
    d: "Too many vendors own overlapping slices. Nobody can answer a single end-to-end question without a meeting.",
  },
  {
    k: "03",
    t: "Nobody trusts the numbers",
    d: "The same KPI is calculated three ways. Board reviews stall on reconciliation instead of decisions.",
  },
];

export function WhatWeFix() {
  const ledeRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section className="fix section" id="fix">
      <div className="px-glow px-glow--fix" data-parallax="0.08" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">01 / What we fix</span>
          <span>The problem, stated plainly</span>
          <span className="dash" />
        </div>

        <div className="fix__lede reveal" ref={ledeRef}>
          <h2 className="fix__title">
            Data systems break <em>where it matters most.</em>
          </h2>
          <p className="fix__sub">
            Not in the demo, in production, under real load, real audits, real
            deadlines. That gap is the whole job.
          </p>
        </div>

        <div className="fix-grid" ref={gridRef}>
          {PROBLEMS.map((p) => (
            <article className="fix-item" key={p.k}>
              <span className="fix-item__num">{p.k}</span>
              <h3 className="fix-item__name">{p.t}</h3>
              <p className="fix-item__desc">{p.d}</p>
            </article>
          ))}
        </div>

        <p className="fix__close">
          We take ownership of the operational backbone, and we stay
          accountable for it.{" "}
          <a className="fix__link" href="#how">
            See how we work
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </p>
      </div>
    </section>
  );
}
