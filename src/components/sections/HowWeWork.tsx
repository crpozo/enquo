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

/* Journey glyphs — Hakkōda-style pixel motifs in the Enquo palette:
   scattered (Discover) → ordered (Design) → assembled & scanned (Build)
   → flowing inside the loop (Run). Pure SVG; the pieces animate in when
   their stage is revealed and keep a slow idle motion afterwards. */
const CHAOS: Array<[number, number, number, number, string]> = [
  [6, 18, 16, 14, "l"], [30, 6, 12, 12, "p"], [50, 12, 18, 16, "k"], [74, 20, 10, 10, "t"],
  [14, 40, 26, 24, "w"], [46, 36, 12, 8, "l"], [62, 32, 20, 20, "p"], [86, 42, 6, 6, "k"],
  [8, 70, 10, 10, "t"], [28, 68, 16, 20, "k"], [52, 62, 14, 14, "l"], [72, 66, 18, 12, "w"],
  [40, 86, 8, 6, "p"], [66, 84, 10, 8, "t"],
];
const SPARKS: Array<[number, number, number, number]> = [
  [2, 30, 14, 1], [84, 10, 10, 1], [46, 2, 1, 12], [90, 60, 1, 14], [20, 92, 12, 1], [60, 50, 1, 8],
];
const GRID: string[] = [
  "l", "p", "k", "t", "p", "w", "l", "p", "t", "l", "p", "k", "p", "k", "w", "l",
];

function Glyph({ tag }: { tag: string }) {
  if (tag === "Discover") {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true" className="gl gl--chaos">
        {CHAOS.map(([x, y, w, h, c], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} className={`px px-${c}`} style={{ "--i": i } as React.CSSProperties} />
        ))}
        {SPARKS.map(([x, y, w, h], i) => (
          <rect key={`s${i}`} x={x} y={y} width={w} height={h} className="spark" style={{ "--i": i } as React.CSSProperties} />
        ))}
      </svg>
    );
  }
  if (tag === "Design") {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true" className="gl gl--order">
        <rect x="3" y="3" width="90" height="90" className="frame" />
        <path d="M11 11h34v22h-8v16h-26z" className="px px-w piece" style={{ "--dx": "-30px", "--dy": "-30px" } as React.CSSProperties} />
        <path d="M45 11h40v30h-16v12h-24v-4h8v-16h-8z" className="px px-p piece" style={{ "--dx": "30px", "--dy": "-30px" } as React.CSSProperties} />
        <path d="M11 49h26v8h8v12h-8v16h-26z" className="px px-t piece" style={{ "--dx": "-30px", "--dy": "30px" } as React.CSSProperties} />
        <path d="M45 61h8v-8h16v-12h16v44h-40z" className="px px-l piece" style={{ "--dx": "30px", "--dy": "30px" } as React.CSSProperties} />
      </svg>
    );
  }
  if (tag === "Build") {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true" className="gl gl--insight">
        {GRID.map((c, i) => (
          <rect key={i} x={6 + (i % 4) * 22} y={6 + Math.floor(i / 4) * 22} width="20" height="20" className={`px px-${c}`} style={{ "--i": i } as React.CSSProperties} />
        ))}
        <rect x="4" y="4" width="46" height="46" className="scan scan--a" />
        <rect x="46" y="46" width="46" height="46" className="scan scan--b" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className="gl gl--flow">
      <circle cx="48" cy="48" r="43" className="loop" />
      {[[16, 30, "t"], [26, 48, "l"], [36, 64, "p"], [46, 40, "w"], [56, 70, "k"], [66, 52, "l"], [76, 34, "p"]].map(([x, h, c], i) => (
        <rect key={i} x={x as number} y={48 - (h as number) / 2} width="6" height={h as number} className={`px px-${c} bar`} style={{ "--i": i } as React.CSSProperties} />
      ))}
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
    if (revealed >= last) {
      const done = window.setTimeout(() => setAuto(false), 1200);
      return () => window.clearTimeout(done);
    }
    const id = window.setTimeout(() => setRevealed((r) => Math.min(r + 1, last)), AUTO_MS);
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
              className={
                "how__tab"
                + (active === i ? " active" : "")
                + (i <= revealed ? " is-reached" : "")
                + (i < revealed ? " is-done" : "")
                + (auto && i === revealed ? " is-head" : "")
                + (i === last ? " is-last" : "")
                + (auto && i > revealed ? " is-hidden" : "")
              }
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
