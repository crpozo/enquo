import { Link } from "react-router-dom";

import { useReveal } from "../hooks/useReveal";
import { useParallax } from "../hooks/useParallax";
import { useLang } from "../i18n/lang";
import { FinalCTA } from "../components/sections/FinalCTA";
import { StageHero } from "../components/sections/StageHero";
import { PlatformsStrip } from "../components/sections/PlatformsStrip";
import { PageHeroArt } from "../components/sections/PageHeroArt";
import { DISCOVER, ENABLERS, STAGES, SERVICE_COMBOS, type Stage } from "../data/services";

/* Discover · lilac — Design · teal — Build · rose — Run · orange */
const TONE: Record<string, string> = { Discover: "lilac", Design: "teal", Build: "rose", Run: "orange" };

/* ============================================================
   Operating model — one connected system, not four cards
   ============================================================ */
function OperatingModel({ stages }: { stages: Stage[] }) {
  const ref = useReveal<HTMLOListElement>();
  const { t, tr } = useLang();
  const discover = tr(DISCOVER);
  const steps = [
    { num: "00", tag: discover.tag, promise: discover.promise, id: "discover" },
    ...stages.map((s, i) => ({ num: `0${i + 1}`, tag: s.tag, promise: s.promise, id: s.tag.toLowerCase() })),
  ];
  return (
    <section className="opmodel section" id="operating-model">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">{t("§02 · Operating model")}</span>
          <span>{t("One connected system")}</span>
          <span className="dash" />
        </div>
        <ol className="opmodel__flow reveal" ref={ref}>
          {steps.map((s, i) => (
            <li className="opmodel__step" data-tone={TONE[s.tag]} key={s.tag} style={{ transitionDelay: `${i * 120}ms` }}>
              <a href={`#${s.id}`} className="opmodel__link">
                <span className="opmodel__node" aria-hidden="true" />
                <span className="opmodel__num">{s.num}</span>
                <span className="opmodel__tag">{t(s.tag)}</span>
                <span className="opmodel__promise">{s.promise}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================================================
   Stage sections — colour-led, capability rows (no boxes)
   ============================================================ */
function CapabilityRows({ stage }: { stage: Stage }) {
  const { t } = useLang();
  return (
    <div className="svc-rows">
      <span className="svc-rows__label">{t("Capabilities")}</span>
      <ol className="svc-rows__list">
        {stage.cards.map((c, i) => (
          <li className="svc-row" key={c.title}>
            <span className="svc-row__num">{String(i + 1).padStart(2, "0")}</span>
            <div className="svc-row__main">
              <h3 className="svc-row__title">{c.title}</h3>
              <p className="svc-row__outcome">{c.outcome}</p>
              <ul className="svc-row__when" aria-label={t("When to buy")}>
                {c.triggers.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StageSection({ stage, index }: { stage: Stage; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  const { t } = useLang();
  return (
    <section className="page-stage svc-stage section" id={stage.tag.toLowerCase()} data-stage={stage.tag} data-tone={TONE[stage.tag]}>
      <div className="px-glow px-glow--stage" data-parallax="0.08" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="svc-stage__head">
          <span className="svc-stage__num">0{index + 1}</span>
          <h2 className="svc-stage__verb">{t(stage.tag)}</h2>
        </div>
        <StageHero stage={stage} />
        <div className="svc-stage__grid reveal" ref={ref}>
          <div className="svc-stage__intro">
            <p className="svc-stage__copy">{stage.copy}</p>
            <div className="svc-stage__outcome">
              <span className="svc-stage__outcome-label">{t("Phase outcome")}</span>
              <p>{stage.phaseOutcome}</p>
            </div>
          </div>
          <CapabilityRows stage={stage} />
        </div>
      </div>
    </section>
  );
}

function DiscoverSection() {
  const ref = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const d = tr(DISCOVER);
  return (
    <section className="page-stage svc-stage svc-stage--discover section" id="discover" data-stage="Discover" data-tone="lilac">
      <div className="wrap-lg">
        <div className="svc-stage__head">
          <span className="svc-stage__num">00</span>
          <h2 className="svc-stage__verb">{t(d.tag)}</h2>
        </div>
        <div className="svc-discover reveal" ref={ref}>
          <figure className="svc-discover__media" aria-hidden="true">
            <img src={import.meta.env.BASE_URL + d.media} alt="" loading="lazy" />
          </figure>
          <div className="svc-discover__body">
            <p className="svc-discover__statement">{d.statement}</p>
            <p className="svc-stage__copy">{d.copy}</p>
            <div className="svc-stage__outcome">
              <span className="svc-stage__outcome-label">{t("Phase outcome")}</span>
              <ul className="svc-discover__outcomes">
                {d.phaseOutcomes.map((o) => <li key={o}>{o}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Different challenges → combinations + demo
   ============================================================ */
function Combine() {
  const introRef = useReveal<HTMLDivElement>();
  const rowsRef = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const combos = tr(SERVICE_COMBOS);
  return (
    <section className="combine section" id="combine">
      <div className="px-glow px-glow--combine" data-parallax="0.07" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">{t("§05 · How services combine")}</span>
          <span>{t("Real problems need multiple services")}</span>
          <span className="dash" />
        </div>

        <div className="combine__grid">
          <div className="combine__intro reveal" ref={introRef}>
            <h2 className="combine__title">
              {t("Different challenges call for")} <em>{t("different capabilities.")}</em>
            </h2>
            <p className="combine__copy">
              {t("Most enterprise problems cross systems, teams, and disciplines. Enquo brings together the capabilities the work requires.")}
            </p>
          </div>

          <div className="combine__rows reveal" ref={rowsRef}>
            {combos.map((c) => (
              <div className="combine__row" key={c.problem}>
                <span className="combine__problem">&ldquo;{c.problem}&rdquo;</span>
                <span className="combine__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="combine__combo">
                  {c.combo.split(" + ").map((part, i) => (
                    <span key={part}>
                      {i > 0 && <i className="combine__plus" aria-hidden="true">+</i>}
                      <span className="combine__chip">{part}</span>
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="combine__demo">
          <div>
            <h3 className="combine__demo-title">{t("Want to see what Enquo could do for your business?")}</h3>
            <p className="combine__demo-copy">{t("Use our demo to explore your needs and see how Enquo could approach them.")}</p>
          </div>
          <Link className="btn btn--primary" to="/demo">
            {t("Try our demo")}
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Foundational enablers — present across every stage
   ============================================================ */
function Enablers() {
  const gridRef = useReveal<HTMLParagraphElement>();
  const { t, tr } = useLang();
  const enablers = tr(ENABLERS);
  return (
    <section className="enablers section" id="enablers">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">{t("§06 · Foundational enablers")}</span>
          <span>{t("Everything required for enterprise execution")}</span>
          <span className="dash" />
        </div>
        <p className="enablers__lede reveal" ref={gridRef}>
          {t("Not add-ons. Security, cost discipline and adoption are")}{" "}
          <em>{t("built into every stage")}</em> {t("of every engagement.")}
        </p>
        <ol className="enablers__list">
          {enablers.map((e, i) => (
            <li className="enablers__item" key={e.title}>
              <span className="enablers__num">0{i + 1}</span>
              <h3 className="enablers__title">{e.title}</h3>
              <p className="enablers__desc">{e.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================================================
   Page
   ============================================================ */
export function ServicesPage() {
  const parallaxRef = useParallax<HTMLDivElement>();
  const heroRef = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const stages = tr(STAGES);

  return (
    <div className="services-page" ref={parallaxRef}>
      <section className="page-hero section" id="top">
        <PageHeroArt src="img/heroes/services.webp" />
        <div className="px-glow px-glow--svc-hero" data-parallax="0.1" aria-hidden="true" />
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§01 · Our services")}</span>
            <span>{t("Discover")} · {t("Design")} · {t("Build")} · {t("Run")}</span>
            <span className="dash" />
          </div>
          <div className="page-hero__inner reveal" ref={heroRef}>
            <h1 className="page-hero__title">
              {t("Let’s build what")} <em>{t("your business needs.")}</em>
            </h1>
            <p className="page-hero__lead">
              {t("From defining the right path to building and running the technology behind it, Enquo works with you from wherever you need us.")}
            </p>
          </div>
        </div>
      </section>

      <OperatingModel stages={stages} />

      <DiscoverSection />
      {stages.map((stage, i) => (
        <StageSection key={stage.tag} stage={stage} index={i} />
      ))}

      <Combine />
      <Enablers />

      <section className="page-tech section" id="technology">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§07 · Technology")}</span>
            <span>{t("Built around your ecosystem")}</span>
            <span className="dash" />
          </div>
        </div>
        <PlatformsStrip to="/partnerships" />
      </section>

      <FinalCTA />
    </div>
  );
}
