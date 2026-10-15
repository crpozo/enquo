import { useEffect, useRef } from "react";
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

/** Cards per row on wide screens; rows stick and stack together. */
const COLS = 2;

/**
 * Depth for the stacked deck: as the next row slides over a card, its
 * `--depth` goes 0 → 1 (CSS scales and dims it). The "next row" is the first
 * later card that sticks lower, so this follows the layout (2-up rows on
 * desktop, single cards on mobile) without knowing the breakpoint.
 */
function useStackDepth(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".ind-panel"));
    let tops: number[] = [];
    let raf = 0;
    const measure = () => { tops = cards.map((c) => parseFloat(getComputedStyle(c).top) || 0); };
    const update = () => {
      raf = 0;
      const rects = cards.map((c) => c.getBoundingClientRect());
      cards.forEach((card, i) => {
        const j = tops.findIndex((t, k) => k > i && t > tops[i]);
        let depth = 0;
        if (j !== -1) {
          const own = rects[i];
          const travel = own.height - (tops[j] - tops[i]);
          depth = Math.min(1, Math.max(0, (own.bottom - rects[j].top) / travel));
        }
        card.style.setProperty("--depth", depth.toFixed(3));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); onScroll(); };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

/**
 * Industries (home) — a two-up deck of stacking cards (image, name, short
 * list of focus areas): each row sticks under the nav and the next row
 * slides up over it, while the covered row scales back and dims.
 */
export function HomeIndustries() {
  const headRef = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const ordered = ORDER.map((name) => ENQUO_INDUSTRIES.find((i) => i.name === name)!).filter(Boolean);
  const industries = tr(ordered);
  const stackRef = useRef<HTMLDivElement | null>(null);
  useStackDepth(stackRef);

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

        {/* Stacking cards by row: both cards of a row share --row, so they
            stick at the same offset and the next row covers them together. */}
        <div className="inds-stack" ref={stackRef}>
          {industries.map((ind, i) => (
            <Link
              to="/industries"
              className="ind-panel ind-panel--stack hover-line"
              key={ind.num}
              style={{ "--i": i, "--row": Math.floor(i / COLS) } as React.CSSProperties}
            >
              <figure className="ind-panel__media">
                {ind.image && (
                  <img src={import.meta.env.BASE_URL + ind.image} alt="" loading="lazy" data-parallax-img />
                )}
              </figure>
              <div className="ind-panel__body">
                <h3 className="ind-panel__name">{ind.name}</h3>
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
      </div>
    </section>
  );
}
