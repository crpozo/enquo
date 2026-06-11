import { Link } from "react-router-dom";

import { STAGES, SERVICE_COUNT } from "../../data/services";
import { useReveal } from "../../hooks/useReveal";

/** Column-top art per stage. */
const STAGE_MEDIA: Record<string, string> = {
  Design: "img/how/design.webp",
  Build: "img/how/build.webp",
  Run: "img/how/run.webp",
};

/**
 * Services Preview — the lifecycle per the approved design: centered head,
 * a timeline rail whose nodes drop into three soft stage panels (image
 * header, phase label, stage statement, one-line capabilities with arrows).
 */
export function WhatWeDo() {
  const headRef = useReveal<HTMLDivElement>();
  const flowRef = useReveal<HTMLDivElement>();

  return (
    <section className="do section" id="services">
      <div className="px-glow px-glow--do" data-parallax="0.07" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="do__head reveal" ref={headRef}>
          <span className="do__eyebrow">Services</span>
          <h2 className="do__title">
            Integrated capabilities across the
            <br />
            <em>enterprise lifecycle.</em>
          </h2>
        </div>

        <div className="do-rail" aria-hidden="true">
          <span className="do-rail__node" />
          <span className="do-rail__node" />
          <span className="do-rail__node" />
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
                <span className="do-stage__phase">
                  Phase 0{i + 1} · {s.cards.length} practices
                </span>
              </figure>

              <div className="do-stage__body">
                <h3 className="do-stage__name">{s.tag}</h3>
                <p className="do-stage__statement">{s.statement}</p>

                <ul className="do-stage__list">
                  {s.cards.map((c) => (
                    <li key={c.title}>
                      <Link to="/services" className="do-stage__item" title={c.outcome}>
                        <span className="do-stage__item-title">{c.title}</span>
                        <span className="do-stage__item-arrow" aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="do__cta">
          <Link className="btn" to="/services">
            All {SERVICE_COUNT} capabilities
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
