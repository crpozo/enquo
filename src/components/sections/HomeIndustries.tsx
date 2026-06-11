import { Link } from "react-router-dom";

import { ENQUO_INDUSTRIES } from "../../data/enquo";
import { useReveal } from "../../hooks/useReveal";
import { IndustryArt } from "./IndustryArt";

/**
 * Industries (home) — each square is a sector. The label sits quiet by
 * default; on hover the tile lifts, the viz brightens and a short reveal
 * panel rises with the description and a link into the Industries page.
 */
export function HomeIndustries() {
  const headRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section className="inds section" id="industries">
      <div className="px-glow px-glow--inds" data-parallax="0.06" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">05 / Industries</span>
          <span>Where we operate</span>
          <span className="dash" />
        </div>

        <div className="inds__head reveal" ref={headRef}>
          <h2 className="inds__title">
            Execution across <em>complex industries.</em>
          </h2>
          <p className="inds__sub">
            Six verticals, one playbook. Hover a tile to explore, open the
            full map for how we enter each.
          </p>
        </div>

        <div className="inds-grid" ref={gridRef}>
          {ENQUO_INDUSTRIES.map((ind) => (
            <Link to="/industries" className="ind-sq" data-theme={ind.viz} key={ind.num}>
              <div className="ind-sq__art" aria-hidden="true">
                <IndustryArt ind={ind} />
              </div>
              <div className="ind-sq__overlay" aria-hidden="true" />
              <span className="ind-sq__label">{ind.name}</span>
              <div className="ind-sq__reveal">
                <h3 className="ind-sq__name">{ind.name}</h3>
                <p className="ind-sq__desc">{ind.desc}</p>
                <span className="ind-sq__cta">
                  Explore
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}

          <Link to="/industries" className="ind-sq ind-sq--cta">
            <div className="ind-sq__overlay" aria-hidden="true" />
            <span className="ind-sq__label">All industries</span>
            <div className="ind-sq__reveal ind-sq__reveal--cta">
              <h3 className="ind-sq__name">Your sector?</h3>
              <p className="ind-sq__desc">
                We bridge any business need, no matter how big or small.
              </p>
              <span className="ind-sq__cta">
                See all industries
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
