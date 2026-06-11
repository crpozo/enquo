import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { ENQUO_INDUSTRIES } from "../../data/enquo";
import { useReveal } from "../../hooks/useReveal";

/** "platforms, analytics, reporting." → "platforms · analytics · reporting" */
const dotted = (s: string) => s.replace(/\.$/, "").split(", ").join(" · ");

/**
 * Industries (home) — horizontal scroll carousel per the approved design:
 * tall image cards with a corner number, name + arrow and focus areas below
 * each card, a "Scroll →" hint and a progress track underneath.
 */
export function HomeIndustries() {
  const headRef = useReveal<HTMLDivElement>();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <section className="inds section" id="industries">
      <div className="px-glow px-glow--inds" data-parallax="0.06" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="inds__head reveal" ref={headRef}>
          <div>
            <span className="inds__eyebrow">Industries</span>
            <h2 className="inds__title">
              Execution across
              <br />
              <em>complex sectors.</em>
            </h2>
          </div>
          <span className="inds__hint" aria-hidden="true">
            Scroll <i /> →
          </span>
        </div>
      </div>

      <div className="inds-scroller" ref={scrollerRef} onScroll={onScroll}>
        {ENQUO_INDUSTRIES.map((ind, i) => (
          <Link to="/industries" className="ind-card" key={ind.num}>
            <div className="ind-card__media">
              <span className="ind-card__num">0{i + 1}</span>
              {ind.image && (
                <img
                  src={import.meta.env.BASE_URL + ind.image}
                  alt=""
                  loading="lazy"
                />
              )}
            </div>
            <div className="ind-card__row">
              <h3 className="ind-card__name">{ind.name}</h3>
              <span className="ind-card__arrow" aria-hidden="true">→</span>
            </div>
            <p className="ind-card__desc">{dotted(ind.desc)}</p>
          </Link>
        ))}

        <Link to="/industries" className="ind-card ind-card--cta">
          <div className="ind-card__media ind-card__media--cta">
            <span className="ind-card__cta-big">Your sector?</span>
          </div>
          <div className="ind-card__row">
            <h3 className="ind-card__name">All industries</h3>
            <span className="ind-card__arrow" aria-hidden="true">→</span>
          </div>
          <p className="ind-card__desc">
            We bridge any business need, no matter how big or small
          </p>
        </Link>
      </div>

      <div className="wrap-lg">
        <div className="inds-track" aria-hidden="true">
          <i style={{ width: `${10 + progress * 90}%` }} />
        </div>
      </div>
    </section>
  );
}
