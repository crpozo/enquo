import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { DISCOVER, STAGES } from "../../data/services";
import { useReveal } from "../../hooks/useReveal";
import { useLang } from "../../i18n/lang";

/** Per-stage brand art from the deck. */
const STAGE_ART: Record<string, string> = {
  Discover: "img/how/discover.webp",
  Design: "img/how/design.webp",
  Build: "img/how/build.webp",
  Run: "img/how/run.webp",
};

const AUTO_MS = 2400;

/* Journey glyphs — scattered → ordered → assembled → flowing.
   Pure SVG, tinted by the tab's current colour. */
function Glyph({ tag }: { tag: string }) {
  if (tag === "Discover") {
    const cells = [
      [4, 6, 7, 5], [16, 2, 6, 6], [26, 9, 5, 5], [10, 16, 9, 7], [24, 18, 6, 4], [33, 15, 4, 8], [6, 27, 6, 5], [18, 26, 8, 6], [30, 28, 5, 5],
    ];
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        {cells.map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="0.8" className={`g g-${i % 3}`} />
        ))}
      </svg>
    );
  }
  if (tag === "Design") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <rect x="3" y="3" width="34" height="34" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="6" y="6" width="13" height="13" className="g g-0" />
        <rect x="21" y="6" width="13" height="13" className="g g-1" />
        <rect x="6" y="21" width="13" height="13" className="g g-2" />
        <rect x="21" y="21" width="13" height="13" className="g g-0" />
      </svg>
    );
  }
  if (tag === "Build") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <rect x="4" y="26" width="32" height="10" className="g g-0" />
        <rect x="8" y="15" width="24" height="10" className="g g-1" />
        <rect x="13" y="4" width="14" height="10" className="g g-2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      {[4, 10, 16, 22, 28, 34].map((x, i) => (
        <rect key={x} x={x} y={20 - [6, 12, 9, 16, 11, 14][i] / 2} width="4" height={[6, 12, 9, 16, 11, 14][i]} rx="0.8" className={`g g-${i % 3}`} />
      ))}
      <path d="M2 20 H38" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
    </svg>
  );
}

/**
 * Our Services — one continuous journey: Discover → Design → Build → Run.
 * The stages sit on a single line that fills as the journey advances (it
 * auto-plays until the visitor picks a stage); each stage reveals its
 * headline, its art and what we bring to the work.
 */
export function HowWeWork() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  /** Stages revealed so far: -1 = sequence not started, 3 = all shown. */
  const [revealed, setRevealed] = useState(-1);
  const sectionRef = useRef<HTMLElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const headRef = useReveal<HTMLDivElement>();
  const closeRef = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const discover = tr(DISCOVER);
  const stages = tr(STAGES);
  const journey = [
    { tag: discover.tag, statement: discover.statement, description: discover.description, cards: [] as typeof stages[number]["cards"], metric: "" },
    ...stages.map((s) => ({ tag: s.tag, statement: s.statement, description: "", cards: s.cards, metric: s.metric })),
  ];
  const stage = journey[active];

  // Reveal sequence (Hakkōda-style): the first time the stepper scrolls
  // into view only Discover is shown; the line travels to the next node and
  // that stage appears, and so on until Run. Picking a stage reveals all
  // and hands control to the visitor.
  const last = journey.length - 1;
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(last); setAuto(false); return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRevealed((r) => (r < 0 ? 0 : r)); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [last]);
  useEffect(() => {
    if (!auto || revealed < 0) return;
    if (revealed >= last) { setAuto(false); return; }
    const id = window.setTimeout(() => {
      setRevealed((r) => Math.min(r + 1, last));
      setActive((a) => Math.min(a + 1, last));
    }, AUTO_MS);
    return () => window.clearTimeout(id);
  }, [auto, revealed, last]);

  const pick = (i: number) => { setAuto(false); setRevealed(last); setActive(i); };

  return (
    <section className="how section" id="services" ref={sectionRef}>
      <div className="px-glow px-glow--how" data-parallax="0.1" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">{t("03 / Our services")}</span>
          <span>{t("Discover")} · {t("Design")} · {t("Build")} · {t("Run")}</span>
          <span className="dash" />
        </div>

        <div className="how__head reveal" ref={headRef}>
          <h2 className="how__title">
            {t("Built around")} <em>{t("what your business needs.")}</em>
          </h2>
          <p className="how__sub">
            {t("Start where you need us. We bring the right capabilities and stay accountable as the work evolves.")}
          </p>
        </div>

        <div className="how__tabs how__tabs--journey" role="tablist" aria-label={t("Delivery stages")} data-auto={auto} data-started={revealed >= 0} ref={tabsRef}>
          {journey.map((s, i) => (
            <button
              key={s.tag}
              role="tab"
              type="button"
              aria-selected={active === i}
              className={"how__tab" + (active === i ? " active" : "") + (i < active ? " is-done" : "") + (i === last ? " is-last" : "") + (auto && i > revealed ? " is-hidden" : "")}
              onClick={() => pick(i)}
              style={{ "--auto-ms": `${AUTO_MS}ms` } as React.CSSProperties}
            >
              <span className="how__tab-glyph"><Glyph tag={s.tag} /></span>
              <span className="how__tab-num">0{i + 1}</span>
              <span className="how__tab-label">{t(s.tag)}</span>
              <span className="how__tab-count">
                {s.cards.length ? `${String(s.cards.length).padStart(2, "0")} ${t("capabilities")}` : t("Entry point")}
              </span>
            </button>
          ))}
        </div>

        {/* keyed on tag → remounts so the entrance animation re-fires per switch */}
        <div className="how__panel" key={stage.tag}>
          <div className="how__panel-main">
            <figure className="how__panel-art" aria-hidden="true">
              <img src={import.meta.env.BASE_URL + STAGE_ART[stage.tag]} alt="" loading="lazy" />
            </figure>
            <span className="how__panel-tag">{t(stage.tag)}</span>
            <p className="how__statement">{stage.statement}</p>
            {stage.metric && (
              <span className="how__metric">
                {t("Result from our work,")} <em>{stage.metric}</em>
              </span>
            )}
          </div>

          {stage.cards.length ? (
            <div>
              <span className="how__list-label">{t("What we bring to the work:")}</span>
              <ul className="how__list">
                {stage.cards.map((c, i) => (
                  <li className="how__list-item" key={c.title} style={{ animationDelay: `${i * 70}ms` }}>
                    <span className="how__list-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="how__list-title">{c.title}</span>
                    <span className="how__list-outcome">{c.outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="how__discover-copy">
              <p className="how__discover-text">{stage.description}</p>
              <p className="how__discover-outcome">
                <em>{t("Phase outcome")}</em> · {discover.outcome}
              </p>
            </div>
          )}
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
