import { Link } from "react-router-dom";

import { STAGES, SERVICE_COUNT } from "../../data/services";
import { useReveal } from "../../hooks/useReveal";

/** Column-top art per stage, color-matched to the stage accents. */
const STAGE_MEDIA: Record<string, string> = {
  Design: "img/how/design.webp",
  Build: "img/how/build.webp",
  Run: "img/how/run.webp",
};

/**
 * Services Preview — the lifecycle, made visible: three stage columns
 * (Design → Build → Run) with their capabilities listed inside each,
 * connected by flow arrows. Open layout, no boxed cards.
 */
export function WhatWeDo() {
  const headRef = useReveal<HTMLDivElement>();
  const flowRef = useReveal<HTMLDivElement>();

  return (
    <section className="do section" id="services">
      <div className="px-glow px-glow--do" data-parallax="0.07" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">03 / Services</span>
          <span>{SERVICE_COUNT} capabilities · one lifecycle</span>
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

        <div className="do-flow reveal" ref={flowRef}>
          {STAGES.map((s, i) => (
            <div className="do-stage" data-stage={s.tag} key={s.tag}>
              <figure className="do-stage__media" aria-hidden="true">
                <img
                  src={import.meta.env.BASE_URL + STAGE_MEDIA[s.tag]}
                  alt=""
                  loading="lazy"
                />
              </figure>

              <header className="do-stage__head">
                <span className="do-stage__num">0{i + 1}</span>
                <h3 className="do-stage__name">{s.tag}</h3>
                <p className="do-stage__statement">{s.statement}</p>
              </header>

              <ul className="do-stage__list">
                {s.cards.map((c, j) => (
                  <li key={c.title}>
                    <Link to="/services" className="do-stage__item">
                      <span className="do-stage__item-num">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span className="do-stage__item-body">
                        <span className="do-stage__item-title">{c.title}</span>
                        <span className="do-stage__item-outcome">{c.outcome}</span>
                      </span>
                      <span className="do-stage__item-arrow" aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
