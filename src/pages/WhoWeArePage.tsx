import { FinalCTA } from "../components/sections/FinalCTA";
import { useReveal } from "../hooks/useReveal";
import { PageHeroArt } from "../components/sections/PageHeroArt";
import { useLang } from "../i18n/lang";

/* ============================================================
   Data — copy aligned to the commercial deck (pp. 4, 5, 13, 17)
   ============================================================ */

/** How we think — Ownership · Outcomes · Reliability · Continuity (deck p.17). */
const TRUTHS = [
  {
    num: "01",
    title: "Ownership matters more than handoffs.",
    text: "Critical systems fail when accountability is fragmented.",
  },
  {
    num: "02",
    title: "Outcomes matter more than deliverables.",
    text: "Execution should create measurable business clarity.",
  },
  {
    num: "03",
    title: "Reliability must be engineered from day one.",
    text: "Operational resilience cannot be retrofitted later.",
  },
];

/** Four things we refuse to do (deck p.5). */
const REFUSALS = [
  {
    label: "Endless pilots",
    text: "Pilots designed to live forever in proof-of-concept. If it can't ship, we say so.",
  },
  {
    label: "Vendor handoffs",
    text: "Strategy handed to a different vendor to build, the build to a third to run. Unless you ask.",
  },
  {
    label: "Junior-heavy delivery",
    text: "Armies of juniors billed against a senior pitch deck.",
  },
  {
    label: "Client lock-in",
    text: "Platforms or staffing you can't unwind. You keep the code, the data, and the capability.",
  },
];

/** Our approach — one continuous lifecycle, one accountable partner (deck p.17). */
const APPROACH = [
  { tag: "Design", items: "Strategy · Architecture · Roadmap" },
  { tag: "Build", items: "Engineering · Integration · Automation" },
  { tag: "Run", items: "Operations · Performance · Reliability" },
];

/** Trust — Security · Governance · Compliance · AI Risk (deck p.13). */
const HARD_QUESTIONS = [
  {
    num: "01",
    tag: "Security",
    q: "Where does our data live?",
    a: "Your data stays in your cloud. We build in your VPC, against your IAM, with logging your security team controls. SOC 2 Type II controls applied to every engagement.",
  },
  {
    num: "02",
    tag: "Governance",
    q: "What if it doesn't work in production?",
    a: "Every system ships with monitoring, rollback paths, and acceptance criteria signed off before go-live. No “it worked in dev” handoffs — we stay until it's stable in production.",
  },
  {
    num: "03",
    tag: "Compliance",
    q: "Will this pass audit?",
    a: "GDPR, SOC 2, and sector-specific compliance (HIPAA, PCI, EU AI Act when applicable) designed in from week one. Every decision logged, traceable, and ready for auditors.",
  },
  {
    num: "04",
    tag: "AI Risk",
    q: "What if the model is wrong?",
    a: "Every AI system ships with explainability, drift monitoring, and human-in-the-loop fallback. Confidence thresholds gate every automated decision. EU AI Act controls baked in.",
  },
];

/* ============================================================
   Page
   ============================================================ */

export function WhoWeArePage() {
  const openingRef = useReveal<HTMLDivElement>();
  const beliefRef = useReveal<HTMLDivElement>();
  const truthsRef = useReveal<HTMLDivElement>();
  const refuseRef = useReveal<HTMLDivElement>();
  const approachRef = useReveal<HTMLDivElement>();
  const trustRef = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const truths = tr(TRUTHS);
  const refusals = tr(REFUSALS);
  const approach = tr(APPROACH);
  const hardQuestions = tr(HARD_QUESTIONS);

  return (
    <>
      <section className="page-hero section" id="top">
        <PageHeroArt src="img/heroes/who.webp" />
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§01 · Who We Are")}</span>
            <span>{t("Philosophy before team")}</span>
            <span className="dash" />
          </div>

          <div className="page-who__opening reveal" ref={openingRef}>
            <div className="page-who__opening-text">
              <h1 className="page-hero__title">
                {t("Human-driven")}
                <br />
                <em>{t("data solutions.")}</em>
              </h1>
              <p className="page-hero__lead">
                {t("Owned end-to-end by the partner who designed them. Enquo exists for the operators who carry the weight when the deck is gone, the slide closes, and production is live.")}
              </p>
              <p className="page-hero__statement">
                <span className="page-hero__statement-mark" /> {t("We don’t deliver systems. We take responsibility for them.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section page-who__founding" id="belief">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§02 · Our belief")}</span>
            <span>{t("Execution depends on connection")}</span>
            <span className="dash" />
          </div>

          <figure className="page-who__founding-media" aria-hidden="true">
            <img
              src={import.meta.env.BASE_URL + "img/who/founding.webp"}
              alt=""
              loading="lazy"
            />
          </figure>

          <div className="page-who__founding-text reveal" ref={beliefRef}>
            <p>
              {t("Enquo started as a refusal to leave at go-live. The same people who design the architecture run the operations. The same people who build the integrations own the incidents. One continuous lifecycle, one accountable partner.")}
            </p>
            <p>
              {t("We remove complexity so you can focus on impact. We measure ourselves on what stays standing six, twelve, twenty-four months after handoff. That’s the only deliverable we believe in.")}
            </p>
          </div>
        </div>
      </section>

      <section className="section page-who__principles" id="how-we-think">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§03 · How we think")}</span>
            <span>{t("What enterprise execution taught us")}</span>
            <span className="dash" />
          </div>

          <div className="page-who__principles-grid" ref={truthsRef}>
            {truths.map((p) => (
              <article key={p.num} className="page-who__principle">
                <span className="page-who__principle-num">{p.num}</span>
                <div>
                  <p className="page-who__principle-text">{p.title}</p>
                  <p className="page-who__principle-sub">{p.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section page-who__refuse" id="refuse">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§04 · What we refuse to do")}</span>
            <span>{t("Four things we don’t do")}</span>
            <span className="dash" />
          </div>

          <h2 className="page-who__refuse-title">
            {t("Four things we")} <em>{t("don’t do.")}</em>
          </h2>

          <div className="page-who__refuse-list reveal" ref={refuseRef}>
            {refusals.map((r, i) => (
              <article className="page-who__refusal" key={r.label}>
                <span className="page-who__refusal-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="page-who__refusal-label">{r.label}</h3>
                <p className="page-who__refusal-text">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section page-who__approach" id="approach">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§05 · Our approach")}</span>
            <span>{t("One accountable partner")}</span>
            <span className="dash" />
          </div>

          <h2 className="page-who__approach-title">
            {t("One continuous lifecycle.")} <em>{t("One accountable partner.")}</em>
          </h2>

          <div className="page-who__approach-flow reveal" ref={approachRef}>
            {approach.map((p, i) => (
              <div className="page-who__approach-phase" key={p.tag}>
                <span className="page-who__approach-num">0{i + 1}</span>
                <h3 className="page-who__approach-tag">{t(p.tag)}</h3>
                <p className="page-who__approach-items">{p.items}</p>
              </div>
            ))}
          </div>

          <p className="page-who__approach-note">
            {t("We remove complexity so you can focus on")} <em>{t("impact.")}</em>
          </p>
        </div>
      </section>

      <section className="section page-who__trust" id="trust">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§06 · Trust")}</span>
            <span>{t("We answer the hard questions before you ask")}</span>
            <span className="dash" />
          </div>

          <h2 className="page-who__trust-title">
            {t("We answer the hard questions —")} <em>{t("before you ask.")}</em>
          </h2>
          <p className="page-who__trust-sub">
            {t("Four risks every CFO and CIO raises. Four answers built into every Enquo engagement — whether you’re hiring us for a dashboard, a data platform, app development, managed services, or production AI.")}
          </p>

          <div className="page-who__trust-grid" ref={trustRef}>
            {hardQuestions.map((h) => (
              <article className="page-who__trust-card" key={h.num}>
                <div className="page-who__trust-head">
                  <span className="page-who__trust-num">{h.num}</span>
                  <span className="page-who__trust-tag">{t(h.tag)}</span>
                </div>
                <h3 className="page-who__trust-q">{h.q}</h3>
                <p className="page-who__trust-a">{h.a}</p>
              </article>
            ))}
          </div>

          <p className="page-who__trust-note">
            {t("Three risks apply to every engagement. The fourth applies when AI is in scope. Either way, the answer is the same:")} <em>{t("built in, not bolted on.")}</em>
          </p>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
