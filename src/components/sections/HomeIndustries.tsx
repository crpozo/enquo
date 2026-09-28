import { Link } from "react-router-dom";

import { ENQUO_INDUSTRIES } from "../../data/enquo";
import { useReveal } from "../../hooks/useReveal";
import { useLang } from "../../i18n/lang";

/**
 * Industries (home) — deliberately compact: context, not the focus. Six
 * rows with a small image, the sector name and an arrow, then one CTA
 * into the full industries page.
 */
export function HomeIndustries() {
  const headRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const industries = tr(ENQUO_INDUSTRIES);

  return (
    <section className="inds inds--compact section" id="industries">
      <div className="px-glow px-glow--inds" data-parallax="0.06" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="inds-compact">
          <div className="inds-compact__head reveal" ref={headRef}>
            <span className="inds__eyebrow">{t("Industries")}</span>
            <h2 className="inds__title">
              {t("Industry context")}
              <br />
              <em>{t("changes the work.")}</em>
            </h2>
            <p className="inds-compact__sub">
              {t("The systems, constraints, and priorities are different in every industry. Our experience helps us understand that context before the work begins.")}
            </p>
            <Link className="btn" to="/industries">
              {t("Explore our industries")}
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="inds-compact__list reveal" ref={listRef}>
            {industries.map((ind, i) => (
              <Link to="/industries" className="inds-compact__row" key={ind.num}>
                <span className="inds-compact__thumb" aria-hidden="true">
                  {ind.image && <img src={import.meta.env.BASE_URL + ind.image} alt="" loading="lazy" />}
                </span>
                <span className="inds-compact__num">0{i + 1}</span>
                <span className="inds-compact__name">{ind.name}</span>
                <span className="inds-compact__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
