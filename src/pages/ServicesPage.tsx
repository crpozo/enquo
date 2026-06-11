import { useReveal } from "../hooks/useReveal";
import { useParallax } from "../hooks/useParallax";
import { FinalCTA } from "../components/sections/FinalCTA";
import { StageHero } from "../components/sections/StageHero";
import { PlatformsStrip } from "../components/sections/PlatformsStrip";
import { PageHeroArt } from "../components/sections/PageHeroArt";
import {
  ENABLERS,
  STAGES,
  STAGE_OFFSETS,
  SERVICE_COMBOS,
  type Stage,
  type ServiceCard,
} from "../data/services";

/* Orange · rosado · turquesa, cycled across the eleven services so each card
   carries one of the brand gradients behind it. */
const TINTS = ["orange", "rose", "teal"] as const;

/* ============================================================
   Reusable card
   ============================================================ */
function SvcCard({
  card,
  stage,
  i,
  globalI,
}: {
  card: ServiceCard;
  stage: Stage;
  i: number;
  globalI: number;
}) {
  return (
    <article className="page-svc" data-tint={TINTS[globalI % TINTS.length]}>
      <header className="page-svc__head">
        <span className="page-svc__num">
          {stage.num}/{String(i + 1).padStart(2, "0")}
        </span>
        <h3 className="page-svc__title">{card.title}</h3>
      </header>
      <div className="page-svc__block">
        <span className="page-svc__label">Outcome</span>
        <p className="page-svc__outcome">{card.outcome}</p>
      </div>
      <div className="page-svc__block">
        <span className="page-svc__label">When to buy</span>
        <ul className="page-svc__triggers">
          {card.triggers.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function StageBlock({ stage, base }: { stage: Stage; base: number }) {
  return (
    <section
      className="page-stage section"
      id={stage.tag.toLowerCase()}
      data-stage={stage.tag}
    >
      <div
        className="px-glow px-glow--stage"
        data-parallax="0.08"
        aria-hidden="true"
      />
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">§{stage.num} · Stage</span>
          <span>{stage.tag}</span>
          <span className="dash" />
        </div>

        <StageHero stage={stage} />

        <div
          className="page-stage__grid"
          data-cols={stage.cards.length === 3 ? "3" : "4"}
        >
          {stage.cards.map((card, i) => (
            <SvcCard
              key={card.title}
              card={card}
              stage={stage}
              i={i}
              globalI={base + i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   How services combine — real problems need multiple services
   ============================================================ */
function Combine() {
  const introRef = useReveal<HTMLDivElement>();
  const rowsRef = useReveal<HTMLDivElement>();
  return (
    <section className="combine section" id="combine">
      <div
        className="px-glow px-glow--combine"
        data-parallax="0.07"
        aria-hidden="true"
      />
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">§05 · How services combine</span>
          <span>Real problems need multiple services</span>
          <span className="dash" />
        </div>

        <div className="combine__grid">
          <div className="combine__intro reveal" ref={introRef}>
            <h2 className="combine__title">
              Most real problems don&rsquo;t live in <em>one service</em>.
            </h2>
            <p className="combine__copy">
              They need a combination. Here&rsquo;s how we approach the ones we
              hear most.
            </p>
          </div>

          <div className="combine__rows reveal" ref={rowsRef}>
            {SERVICE_COMBOS.map((c) => (
              <div className="combine__row" key={c.problem}>
                <span className="combine__problem">&ldquo;{c.problem}&rdquo;</span>
                <span className="combine__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="combine__combo">{c.combo}</span>
              </div>
            ))}
          </div>
        </div>
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

  return (
    <div className="services-page" ref={parallaxRef}>
      <section className="page-hero section" id="top">
        <PageHeroArt src="img/heroes/services.webp" />
        <div className="px-glow px-glow--svc-hero" data-parallax="0.1" aria-hidden="true" />
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§01 · Services</span>
            <span>Operator statement</span>
            <span className="dash" />
          </div>
          <div className="page-hero__inner reveal" ref={heroRef}>
            <h1 className="page-hero__title">
              From strategy <em>to operations.</em>
            </h1>
            <p className="page-hero__lead">
              Integrated capabilities across the enterprise lifecycle. We
              transform, build, and run for impact — from first architecture to
              ongoing operations, the team that designs the system is the team
              that owns it in production.
            </p>
          </div>
        </div>
      </section>

      {STAGES.map((stage, i) => (
        <StageBlock key={stage.tag} stage={stage} base={STAGE_OFFSETS[i]} />
      ))}

      <Enablers />

      <Combine />

      <section className="page-tech section" id="technology">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§07 · Technology</span>
            <span>Built around your ecosystem</span>
            <span className="dash" />
          </div>
        </div>
        <PlatformsStrip />
      </section>

      <FinalCTA />
    </div>
  );
}

/* ============================================================
   Foundational enablers — present across every stage (deck p.7)
   ============================================================ */
function Enablers() {
  const gridRef = useReveal<HTMLDivElement>();
  return (
    <section className="enablers section" id="enablers">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">§06 · Foundational enablers</span>
          <span>Everything required for enterprise execution</span>
          <span className="dash" />
        </div>

        <p className="enablers__lede reveal" ref={gridRef}>
          Not add-ons. Security, cost discipline and adoption are{" "}
          <em>built into every stage</em> of every engagement.
        </p>
        <ol className="enablers__list">
          {ENABLERS.map((e, i) => (
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
