import { Link } from "react-router-dom";

import { ENQUO_INDUSTRIES } from "../../data/enquo";
import { useReveal } from "../../hooks/useReveal";
import { useLang } from "../../i18n/lang";

/** Order from the board; the focus areas come from each industry's desc. */
const ORDER = [
  "Healthcare & Pharma",
  "Financial Services",
  "Sports & Media",
  "Manufacturing & Industrial",
  "Energy, Oil & Gas",
  "Retail & Consumer",
];

/** "platforms, analytics, reporting." → ["platforms", "analytics", "reporting"] */
const areas = (s: string) => s.replace(/\.$/, "").split(", ");

/**
 * Industries (home) — laid out like the services panels (image header,
 * name, short list of focus areas) but smaller and six-up, so the block
 * gives context without becoming the focus of the page.
 */
export function HomeIndustries() {
  const headRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const ordered = ORDER.map((name) => ENQUO_INDUSTRIES.find((i) => i.name === name)!).filter(Boolean);
  const industries = tr(ordered);

  return (
    <section className="inds inds--panels section" id="industries">
      <div className="px-glow px-glow--inds" data-parallax="0.06" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="inds-panels__head reveal" ref={headRef}>
          <div>
            <span className="inds__eyebrow">{t("Industries")}</span>
            <h2 className="inds__title">
              {t("Industry context")} <em>{t("changes the work.")}</em>
            </h2>
          </div>
          <p className="inds-panels__sub">
            {t("The systems, constraints, and priorities are different in every industry. Our experience helps us understand that context before the work begins.")}
          </p>
        </div>

        <div className="inds-panels reveal" ref={gridRef}>
          {industries.map((ind, i) => (
            <Link to="/industries" className="ind-panel" key={ind.num} style={{ transitionDelay: `${i * 60}ms` }}>
              <figure className="ind-panel__media" aria-hidden="true">
                {ind.image && <img src={import.meta.env.BASE_URL + ind.image} alt="" loading="lazy" />}
                <span className="ind-panel__num">0{i + 1}</span>
                <h3 className="ind-panel__name">{ind.name}</h3>
              </figure>
              <div className="ind-panel__body">
                <ul className="ind-panel__list">
                  {areas(ind.desc).map((a) => (
                    <li key={a}>
                      <span>{a}</span>
                      <span className="ind-panel__arrow" aria-hidden="true">→</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>

        <div className="inds-panels__cta">
          <Link className="btn" to="/industries">
            {t("Explore our industries")}
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
