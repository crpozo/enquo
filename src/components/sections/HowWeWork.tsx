import { useState } from "react";

import { STAGES } from "../../data/services";
import { useReveal } from "../../hooks/useReveal";

/**
 * How We Work — Design / Build / Run.
 * The three stages are tabs; selecting one reveals that stage's statement,
 * its proof metric, and the practices inside it, animating in on each switch.
 */
export function HowWeWork() {
  const [active, setActive] = useState(0);
  const headRef = useReveal<HTMLDivElement>();
  const stage = STAGES[active];

  return (
    <section className="how section" id="how">
      <div className="px-glow px-glow--how" data-parallax="0.1" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">02 / How we work</span>
          <span>Design · Build · Run</span>
          <span className="dash" />
        </div>

        <div className="how__head reveal" ref={headRef}>
          <h2 className="how__title">
            One team, <em>three stages</em>, one accountability.
          </h2>
          <p className="how__sub">
            The team that designs the system is the team that builds it — and
            the team that runs it in production. Pick a stage.
          </p>
        </div>

        <div className="how__tabs" role="tablist" aria-label="Delivery stages">
          {STAGES.map((s, i) => (
            <button
              key={s.tag}
              role="tab"
              type="button"
              aria-selected={active === i}
              className={"how__tab" + (active === i ? " active" : "")}
              onClick={() => setActive(i)}
            >
              <span className="how__tab-num">0{i + 1}</span>
              <span className="how__tab-label">{s.tag}</span>
              <span className="how__tab-count">
                {String(s.cards.length).padStart(2, "0")} practices
              </span>
            </button>
          ))}
        </div>

        {/* keyed on tag → remounts so the entrance animation re-fires per switch */}
        <div className="how__panel" key={stage.tag}>
          <div className="how__panel-main">
            <span className="how__panel-tag">{stage.tag}</span>
            <p className="how__statement">{stage.statement}</p>
            <span className="how__metric">
              Result from our work — <em>{stage.metric}</em>
            </span>
          </div>

          <ul className="how__list">
            {stage.cards.map((c, i) => (
              <li
                className="how__list-item"
                key={c.title}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="how__list-num">
                  {stage.num}/{String(i + 1).padStart(2, "0")}
                </span>
                <span className="how__list-title">{c.title}</span>
                <span className="how__list-outcome">{c.outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
