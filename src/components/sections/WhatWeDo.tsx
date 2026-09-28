import { Link } from "react-router-dom";

import { DISCOVER, STAGES } from "../../data/services";
import { useReveal } from "../../hooks/useReveal";
import { useLang } from "../../i18n/lang";

/** Column-top art per stage. */
const STAGE_MEDIA: Record<string, string> = {
  Design: "img/lifecycle/design.webp",
  Build: "img/lifecycle/build.webp",
  Run: "img/lifecycle/run.webp",
};

/**
 * Our Services — the operating model in four connected panels: Discover
 * (the entry phase) followed by Design / Build / Run, each listing what we
 * bring to the work. Closes on the demo invitation.
 */
export function WhatWeDo() {
  const headRef = useReveal<HTMLDivElement>();
  const flowRef = useReveal<HTMLDivElement>();
  const closeRef = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const stages = tr(STAGES);
  const discover = tr(DISCOVER);

  return (
    <section className="do section" id="services">
      <div className="px-glow px-glow--do" data-parallax="0.07" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="do__head reveal" ref={headRef}>
          <span className="do__eyebrow">{t("Our services")}</span>
          <h2 className="do__title">
            {t("Built around")}
            <br />
            <em>{t("what your business needs.")}</em>
          </h2>
          <p className="do__sub">
            {t("Start where you need us. We bring the right capabilities and stay accountable as the work evolves.")}
          </p>
        </div>

        <div className="do-rail do-rail--4" aria-hidden="true">
          <span className="do-rail__node" />
          <span className="do-rail__node" />
          <span className="do-rail__node" />
          <span className="do-rail__node" />
        </div>

        <div className="do-flow do-flow--4 reveal" ref={flowRef}>
          <div className="do-stage do-stage--discover" data-stage="Discover">
            <figure className="do-stage__media" aria-hidden="true">
              <img src={import.meta.env.BASE_URL + discover.media} alt="" loading="lazy" />
              <span className="do-stage__phase">01 · {t(discover.tag)}</span>
            </figure>
            <div className="do-stage__body">
              <h3 className="do-stage__name">{t(discover.tag)}</h3>
              <p className="do-stage__statement">{discover.statement}</p>
              <p className="do-stage__desc">{discover.description}</p>
            </div>
          </div>

          {stages.map((s, i) => (
            <div className="do-stage" data-stage={s.tag} key={s.tag}>
              <figure className="do-stage__media" aria-hidden="true">
                <img
                  src={import.meta.env.BASE_URL + STAGE_MEDIA[s.tag]}
                  alt=""
                  loading="lazy"
                />
                <span className="do-stage__phase">0{i + 2} · {t(s.tag)}</span>
              </figure>

              <div className="do-stage__body">
                <h3 className="do-stage__name">{t(s.tag)}</h3>
                <p className="do-stage__statement">{s.statement}</p>

                <span className="do-stage__label">{t("What we bring to the work:")}</span>
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

        <div className="do__close reveal" ref={closeRef}>
          <p className="do__closing">
            {t("Different challenges call for different capabilities. We bring the right expertise together based on your business priorities.")}
          </p>
          <div className="do__cta-row">
            <span className="do__cta-q">{t("Want to see what Enquo could do for your business?")}</span>
            <Link className="btn btn--primary" to="/demo">
              {t("Try our demo")}
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
