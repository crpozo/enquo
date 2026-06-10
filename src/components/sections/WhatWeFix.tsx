import { useReveal } from "../../hooks/useReveal";

/**
 * The Problem — deck p.4: enterprise execution breaks in three critical
 * places, and the cost compounds the longer fragmentation persists.
 */
const PROBLEMS = [
  {
    k: "01",
    t: "System fragmentation",
    d: "Systems operate in silos with no connected backbone. Data never reaches decisions, and there is no shared source of truth.",
  },
  {
    k: "02",
    t: "Context breakdown",
    d: "Data, workflows and context don't travel together. Workflows get stitched by hand, and AI lacks the connected context to help.",
  },
  {
    k: "03",
    t: "Operational drift",
    d: "Fragmentation compounds over time. Delays stack up, accountability disappears, and the whole enterprise slows down.",
  },
];

/** The compound cost of disconnected execution (deck p.4). */
const COSTS = [
  { stat: "47%", d: "of analytics initiatives stall in integration" },
  { stat: "3.5×", d: "longer to act when context is lost" },
  { stat: "62%", d: "of platforms decay within 18 months" },
];

export function WhatWeFix() {
  const ledeRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section className="fix section" id="fix">
      <div className="px-glow px-glow--fix" data-parallax="0.08" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">01 / The problem</span>
          <span>Stated plainly</span>
          <span className="dash" />
        </div>

        <div className="fix__lede fix__lede--media reveal" ref={ledeRef}>
          <div>
            <h2 className="fix__title">
              Enterprise transformation breaks <em>between teams.</em>
            </h2>
            <p className="fix__sub">
              Disconnected systems break execution, slow decisions, and increase
              operational risk — in three critical places.
            </p>
          </div>
          <figure className="fix__media" aria-hidden="true">
            <img
              src={import.meta.env.BASE_URL + "img/fix-switch.webp"}
              alt=""
              loading="lazy"
            />
          </figure>
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

        <dl className="fix__costs" aria-label="The compound cost of disconnected execution">
          {COSTS.map((c) => (
            <div key={c.stat}>
              <dt>{c.stat}</dt>
              <dd>{c.d}</dd>
            </div>
          ))}
        </dl>

        <p className="fix__close">
          Execution depends on connection. Enquo connects strategy to execution
          — end to end.{" "}
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
