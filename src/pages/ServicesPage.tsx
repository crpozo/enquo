import { useReveal } from "../hooks/useReveal";
import { FinalCTA } from "../components/sections/FinalCTA";
import { STAGES, type Stage, type ServiceCard } from "../data/services";

/* ============================================================
   Reusable card
   ============================================================ */
function SvcCard({ card, stage, i }: { card: ServiceCard; stage: Stage; i: number }) {
  return (
    <article className="page-svc">
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

function StageBlock({ stage }: { stage: Stage }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="page-stage section" id={stage.tag.toLowerCase()}>
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">§{stage.num} · Stage</span>
          <span>{stage.tag}</span>
          <span className="dash" />
        </div>

        <div className="page-stage__banner reveal" ref={ref}>
          <span className="page-stage__tag">{stage.tag}</span>
          <p className="page-stage__statement">{stage.statement}</p>
          <span className="page-stage__metric">
            Result from our work, <em>{stage.metric}</em>
          </span>
        </div>

        <div
          className="page-stage__grid"
          data-cols={stage.cards.length === 3 ? "3" : "4"}
        >
          {stage.cards.map((card, i) => (
            <SvcCard key={card.title} card={card} stage={stage} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Page
   ============================================================ */
export function ServicesPage() {
  const heroRef = useReveal<HTMLDivElement>();
  return (
    <>
      <section className="page-hero section" id="top">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§01 · Services</span>
            <span>Operator statement</span>
            <span className="dash" />
          </div>
          <div className="page-hero__inner reveal" ref={heroRef}>
            <h1 className="page-hero__title">
              We design, build, and <em>run</em> the systems we ship.
            </h1>
            <p className="page-hero__lead">
              Three stages, eleven practices, one accountability: from first
              architecture to ongoing operations, the team that designs the
              system is the team that owns it in production.
            </p>
            <p className="page-hero__statement">
              <span className="page-hero__statement-mark" /> If we build it, we
              run it. If it breaks, we own it.
            </p>
          </div>
        </div>
      </section>

      {STAGES.map((stage) => (
        <StageBlock key={stage.tag} stage={stage} />
      ))}

      <FinalCTA />
    </>
  );
}
