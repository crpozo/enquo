import { Link } from "react-router-dom";

import { useReveal } from "../hooks/useReveal";
import { useLang } from "../i18n/lang";
import { PageHeroArt } from "../components/sections/PageHeroArt";

/* ============================================================
   Copy — 10/09 board, Who We Are rewrite
   ============================================================ */
const BELIEFS = [
  { num: "01", title: "Stay close to the problem.", text: "The people making technical decisions understand the business context behind them." },
  { num: "02", title: "Build around outcomes.", text: "Success is measured by what the work improves for the business, not simply by what gets delivered." },
  { num: "03", title: "Think beyond go-live.", text: "Reliability and operation are considered from the beginning because production is where the work has to prove itself." },
];

/* Discover = cyan → Design = blue → Build = magenta → Run = orange */
const STAGES = [
  { tag: "Discover", text: "Understand the opportunity.", tone: "cyan" },
  { tag: "Design", text: "Define the direction.", tone: "blue" },
  { tag: "Build", text: "Turn it into working systems.", tone: "magenta" },
  { tag: "Run", text: "Keep it reliable and improving.", tone: "orange" },
];

const PROOF = [
  { value: "30+", label: "Enterprise clients across 6 industries" },
  { value: "98%", label: "Client retention through multi-year programs" },
  { value: "$3B+", label: "Value delivered across engagements" },
];

const TRUST = [
  { tag: "Security", title: "Your data stays under your control.", text: "We work within client environments using the access, logging, and security controls required for the engagement." },
  { tag: "Reliability", title: "Production is part of the design.", text: "Monitoring, rollback paths, and acceptance criteria are established before go-live so systems are built to operate reliably." },
  { tag: "Governance & Compliance", title: "Controls are considered from the start.", text: "Applicable regulatory and audit requirements are incorporated into the work early and kept traceable through delivery." },
  { tag: "Responsible AI", title: "AI needs operational guardrails.", text: "When AI is in scope, explainability, monitoring, confidence thresholds, and human oversight are considered as part of the system." },
];

const PLACES = [
  { city: "New York", country: "United States", lines: ["1270 Ave of the Americas", "New York, NY 10020"] },
  { city: "Ridgefield Park", country: "United States", lines: ["100 Challenger Road, Suite 101", "Ridgefield Park, NJ 07660"] },
  { city: "Ecuador Hub", country: "Ecuador", lines: ["Engineering and delivery hub", "Serving clients across the Americas"] },
];

/* Real Enquo photos go here — collage grid, swap the sources when they land. */
const COLLAGE = ["img/who/team.webp", "img/heroes/careers.webp", "img/who/founding.webp", "img/heroes/who.webp", "img/how/discover.webp"];

/* ============================================================ */

function Hero() {
  const ref = useReveal<HTMLDivElement>();
  const { t } = useLang();
  return (
    <section className="page-hero section who2-hero" id="top">
      <PageHeroArt src="img/who/team.webp" />
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">{t("§01 · Who We Are")}</span>
          <span>{t("Real team, working")}</span>
          <span className="dash" />
        </div>
        <div className="page-hero__inner reveal" ref={ref}>
          <h1 className="page-hero__title">
            {t("One Team. One Partner.")} <em>{t("One Outcome.")}</em>
          </h1>
          <p className="page-hero__lead">
            {t("Enquo brings business and technology teams together to design, build, and run the systems companies depend on.")}
          </p>
          <p className="page-hero__lead who2-hero__lead2">
            {t("Our teams stay involved from the first decisions through production, bringing the context, technical depth, and accountability needed to keep the work moving.")}
          </p>
          <a className="btn" href="#believe">
            {t("Meet Enquo")} <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Believe() {
  const ref = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLOListElement>();
  const { t, tr } = useLang();
  const beliefs = tr(BELIEFS);
  return (
    <section className="section who2-block" id="believe">
      <div className="wrap-lg">
        <div className="who2-grid reveal" ref={ref}>
          <div>
            <span className="who2-label">{t("What we believe")}</span>
            <h2 className="who2-title">{t("Good technology starts with understanding the business behind it.")}</h2>
          </div>
          <p className="who2-prose">
            {t("Before architecture, platforms, or code, we work to understand how the business operates, where technology is getting in the way, and where better systems can create meaningful value. That context stays with the team throughout the work, from the first design decisions to the systems. That shapes how we work:")}
          </p>
        </div>
        <ol className="who2-beliefs reveal" ref={listRef}>
          {beliefs.map((b) => (
            <li key={b.num}>
              <span className="who2-beliefs__num">{b.num}</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Together() {
  const ref = useReveal<HTMLDivElement>();
  const flowRef = useReveal<HTMLOListElement>();
  const { t, tr } = useLang();
  const stages = tr(STAGES);
  return (
    <section className="section who2-block who2-block--shade" id="together">
      <div className="wrap-lg">
        <div className="who2-grid reveal" ref={ref}>
          <div>
            <span className="who2-label">{t("How we work together")}</span>
            <h2 className="who2-title">{t("One team, from first conversation to production.")}</h2>
          </div>
          <p className="who2-prose">
            {t("Enquo brings together strategists, architects, engineers, data scientists, and operators around the same business problem.")}
          </p>
        </div>
        <ol className="who2-flow reveal" ref={flowRef}>
          {stages.map((s, i) => (
            <li key={s.tag} data-tone={s.tone} style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="who2-flow__node" aria-hidden="true" />
              <span className="who2-flow__tag">{t(s.tag)}</span>
              <span className="who2-flow__text">{s.text}</span>
            </li>
          ))}
        </ol>
        <Link className="btn" to="/services">
          {t("Explore our services")}
          <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </section>
  );
}

function People() {
  const ref = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const { t } = useLang();
  return (
    <section className="section who2-block" id="people">
      <div className="wrap-lg">
        <div className="who2-grid reveal" ref={ref}>
          <div>
            <span className="who2-label">{t("The people behind the work")}</span>
            <h2 className="who2-title">{t("Business context, hands-on technical experience.")}</h2>
          </div>
          <p className="who2-prose">
            {t("Our teams combine business context with hands-on technical experience, working closely with client teams to make better decisions, solve complex problems, and build systems that can hold up in the real world.")}
          </p>
        </div>
        <div className="who2-collage reveal" ref={gridRef}>
          {COLLAGE.map((src, i) => (
            <figure key={src} className={`who2-collage__item who2-collage__item--${i + 1}`} aria-hidden="true">
              <img src={import.meta.env.BASE_URL + src} alt="" loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const ref = useReveal<HTMLDListElement>();
  const { t, tr } = useLang();
  const proof = tr(PROOF);
  return (
    <section className="section who2-block who2-block--shade" id="proof">
      <div className="wrap-lg">
        <span className="who2-label">{t("Proof")}</span>
        <h2 className="who2-title">{t("Relationships built through the work.")}</h2>
        <dl className="who2-proof reveal" ref={ref}>
          {proof.map((p, i) => (
            <div key={p.value} style={{ transitionDelay: `${i * 120}ms` }}>
              <dt>{p.value}</dt>
              <dd>{p.label}</dd>
            </div>
          ))}
        </dl>
        <p className="who2-proof__note">{t("Measured across Enquo client engagements from 2020–2025.")}</p>
      </div>
    </section>
  );
}

function Trust() {
  const ref = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const trust = tr(TRUST);
  return (
    <section className="section who2-block" id="trust">
      <div className="wrap-lg">
        <div className="who2-grid reveal" ref={ref}>
          <div>
            <span className="who2-label">{t("Built into the work")}</span>
            <h2 className="who2-title">{t("Trust is designed into the work.")}</h2>
          </div>
          <p className="who2-prose">
            {t("Enterprise systems carry real operational responsibility. Security, governance, compliance, and reliability are considered from the beginning and carried through production.")}
          </p>
        </div>
        <div className="who2-trust reveal" ref={gridRef}>
          {trust.map((x, i) => (
            <article key={x.tag} style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="who2-trust__tag">{x.tag}</span>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Places() {
  const ref = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const places = tr(PLACES);
  return (
    <section className="section who2-block who2-block--shade" id="where">
      <div className="wrap-lg">
        <span className="who2-label">{t("Where we are")}</span>
        <h2 className="who2-title">{t("Global teams, local time.")}</h2>
        <div className="who2-places reveal" ref={ref}>
          {places.map((p, i) => (
            <div className="who2-place" key={p.city} style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="who2-place__num">0{i + 1}</span>
              <h3>{p.city}</h3>
              <span className="who2-place__country">{p.country}</span>
              <p>{p.lines[0]}<br />{p.lines[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  const ref = useReveal<HTMLDivElement>();
  const { t } = useLang();
  return (
    <section className="section who2-close" id="contact">
      <div className="who2-close__art" aria-hidden="true">
        <img src={import.meta.env.BASE_URL + "img/who/founding.webp"} alt="" loading="lazy" />
      </div>
      <div className="wrap-lg">
        <div className="who2-close__inner reveal" ref={ref}>
          <h2 className="who2-close__title">
            {t("The right work starts with")} <em>{t("the right people.")}</em>
          </h2>
          <p className="who2-close__copy">
            {t("Bring us the problem you’re trying to solve. We’ll bring the people who can help move it forward.")}
          </p>
          <a className="btn btn--primary" href="mailto:contact@enquo.com">
            {t("Let’s talk")}
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export function WhoWeArePage() {
  return (
    <>
      <Hero />
      <Believe />
      <Together />
      <People />
      <Proof />
      <Trust />
      <Places />
      <Closing />
    </>
  );
}
