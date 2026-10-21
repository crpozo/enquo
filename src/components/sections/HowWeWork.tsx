import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { DISCOVER, STAGES } from "../../data/services";
import { useReveal } from "../../hooks/useReveal";
import { useLang } from "../../i18n/lang";

/** Per-stage photography (Build keeps the deck art until its photo lands). */
const STAGE_ART: Record<string, string> = {
  Discover: "img/how/discover.jpg",
  Design: "img/how/design.jpg",
  Build: "img/how/build.webp",
  Run: "img/how/run.jpg",
};

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

const AUTO_MS = 2400;

type JourneyStep = {
  tag: string;
  statement: string;
  promise: string;
  description: string;
  outcome: string;
  metric: string;
  cards: { title: string; outcome: string }[];
};

/**
 * Journey stepper — Discover → Design → Build → Run on one line, left to
 * right. The first time it scrolls into view the line travels from stage to
 * stage, revealing each one; picking a stage reveals all and hands control
 * to the visitor. The highlighted stage follows the scroll-linked blocks
 * below, and picking one scrolls to its block.
 */
function Journey({ steps, active, onPick }: { steps: JourneyStep[]; active: number; onPick: (i: number) => void }) {
  const { t } = useLang();
  const [auto, setAuto] = useState(true);
  /** Stages revealed so far: -1 = sequence not started, last = all shown. */
  const [revealed, setRevealed] = useState(-1);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const last = steps.length - 1;

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

  const pick = (i: number) => { setAuto(false); setRevealed(last); onPick(i); };

  return (
    <div className="how__tabs how__tabs--journey" role="tablist" aria-label={t("Delivery stages")} data-auto={auto} data-started={revealed >= 0} ref={tabsRef}>
      {steps.map((s, i) => (
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
          <span className="how__tab-label">{t(s.tag)}</span>
          <span className="how__tab-count">
            {s.cards.length ? t("Capabilities") : t("Entry point")}
          </span>
        </button>
      ))}
    </div>
  );
}

/**
 * Scroll-linked features — each stage's capabilities scroll by on the left
 * while a sticky, neon-framed visual on the right crossfades to the stage
 * whose block is crossing the middle of the viewport.
 */
function StageFeatures({
  steps,
  active,
  onActive,
  blockRefs,
}: {
  steps: JourneyStep[];
  active: number;
  onActive: (i: number) => void;
  blockRefs: React.MutableRefObject<Array<HTMLElement | null>>;
}) {
  const { t } = useLang();

  useEffect(() => {
    // A thin band across the middle of the viewport: the block inside it is
    // the active one.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) onActive(blockRefs.current.indexOf(e.target as HTMLElement));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    blockRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [steps.length, onActive, blockRefs]);

  return (
    <div className="feat">
      <div className="feat__list">
        {steps.map((s, i) => (
          <section
            key={s.tag}
            ref={(el) => { blockRefs.current[i] = el; }}
            className={"feat__block" + (active === i ? " is-active" : "")}
            aria-label={t(s.tag)}
          >
            {/* inline visual for narrow screens, where the sticky column is hidden */}
            <figure className="feat__inline-art" aria-hidden="true">
              <img src={import.meta.env.BASE_URL + STAGE_ART[s.tag]} alt="" loading="lazy" />
              <figcaption className="feat__caption feat__caption--inline">{t(s.tag)}</figcaption>
            </figure>
            <span className="feat__eyebrow">{t(s.tag)}</span>
            <h3 className="feat__title">{s.promise}</h3>
            {s.cards.length ? (
              <>
                <span className="how__list-label">{t("What we bring to the work:")}</span>
                <ul className="feat__items">
                  {s.cards.map((c) => (
                    <li key={c.title}>
                      <span className="feat__item-title">{c.title}</span>
                      <span className="feat__item-outcome">{c.outcome}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="feat__text">{s.description}</p>
                <p className="how__discover-outcome">
                  <em>{t("Phase outcome")}</em> · {s.outcome}
                </p>
              </>
            )}
          </section>
        ))}
      </div>

      <div className="feat__aside" aria-hidden="true">
        <figure className="feat__visual">
          {steps.map((s, i) => (
            <img
              key={s.tag}
              src={import.meta.env.BASE_URL + STAGE_ART[s.tag]}
              alt=""
              className={active === i ? "is-active" : ""}
            />
          ))}
          <figcaption className="feat__caption">{t(steps[active].tag)}</figcaption>
        </figure>
      </div>
    </div>
  );
}

/**
 * Our Services — Discover → Design → Build → Run: the journey stepper on
 * one line, then what each stage brings beside a sticky visual. Both share
 * the active stage.
 */
export function HowWeWork() {
  const headRef = useReveal<HTMLDivElement>();
  const closeRef = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const blockRefs = useRef<Array<HTMLElement | null>>([]);
  const { t, tr } = useLang();
  const discover = tr(DISCOVER);
  const stages = tr(STAGES);
  const steps: JourneyStep[] = [
    {
      tag: discover.tag, statement: discover.statement, promise: discover.promise,
      description: discover.description, outcome: discover.outcome, metric: "", cards: [],
    },
    ...stages.map((s) => ({
      tag: s.tag, statement: s.statement, promise: s.promise,
      description: "", outcome: s.phaseOutcome, metric: s.metric, cards: s.cards,
    })),
  ];

  const pick = (i: number) => {
    setActive(i);
    blockRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="how section" id="services">
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

        <Journey steps={steps} active={active} onPick={pick} />
        <StageFeatures steps={steps} active={active} onActive={setActive} blockRefs={blockRefs} />

        <div className="do__close cta-card reveal" ref={closeRef}>
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
