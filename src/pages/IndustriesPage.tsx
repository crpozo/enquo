import { useState } from "react";
import { Link } from "react-router-dom";

import { CASES } from "../data/cases";
import { ENQUO_INDUSTRIES } from "../data/enquo";
import { useReveal } from "../hooks/useReveal";
import { useLang } from "../i18n/lang";
import { PageHeroArt } from "../components/sections/PageHeroArt";

/* ============================================================
   Data — the six verticals, per the 10/09 board: name, one line of
   supporting copy and three "where we can help" areas. No pains.
   ============================================================ */

type Help = { title: string; text: string };
type Industry = { key: string; tag: string; sub: string; help: Help[]; image: string };

const img = (name: string) => ENQUO_INDUSTRIES.find((i) => i.name === name)?.image ?? "";

const INDUSTRIES: Industry[] = [
  {
    key: "healthcare",
    tag: "Healthcare & Pharma",
    sub: "Connect critical healthcare data and turn it into information teams can trust and use.",
    help: [
      { title: "Patient Data Platforms", text: "Bring patient data together across systems." },
      { title: "Real-World Analytics", text: "Turn connected data into useful insights." },
      { title: "Regulatory Reporting", text: "Build trusted reporting around regulatory requirements." },
    ],
    image: img("Healthcare & Pharma"),
  },
  {
    key: "financial-services",
    tag: "Financial Services",
    sub: "Connect data and technology while supporting the controls financial institutions depend on.",
    help: [
      { title: "Data Modernization", text: "Modernize how data moves, connects, and is used across the organization." },
      { title: "Risk & Compliance Platforms", text: "Build trusted systems around risk, compliance, and reporting needs." },
      { title: "Customer 360 Platforms", text: "Connect customer data across systems to create a more complete view." },
    ],
    image: img("Financial Services"),
  },
  {
    key: "sports-media",
    tag: "Sports & Media",
    sub: "Connect the platforms, content, and data behind fan experiences and media operations.",
    help: [
      { title: "Fan Engagement Platforms", text: "Build connected experiences around fans and audiences." },
      { title: "Content & Rights Management", text: "Bring content, rights, and operational information together." },
      { title: "Data & Analytics Solutions", text: "Turn audience and operational data into information teams can use." },
    ],
    image: img("Sports & Media"),
  },
  {
    key: "manufacturing",
    tag: "Manufacturing & Industrial",
    sub: "Bring systems, equipment data, and operational information together to improve how work gets done.",
    help: [
      { title: "Smart Manufacturing", text: "Connect production systems and data across operations." },
      { title: "IoT & Predictive Maintenance", text: "Use connected equipment data to better understand performance and maintenance needs." },
      { title: "Quality & Operations Analytics", text: "Give teams better visibility into quality and operational performance." },
    ],
    image: img("Manufacturing & Industrial"),
  },
  {
    key: "energy",
    tag: "Energy & Oil & Gas",
    sub: "Turn complex operational data into better visibility and decisions. Connect the systems and information behind assets, trading, and sustainability initiatives.",
    help: [
      { title: "Asset Performance", text: "Bring asset and operational data together to improve visibility into performance." },
      { title: "Energy Trading", text: "Connect the data and systems that support trading operations and decisions." },
      { title: "Sustainability & ESG", text: "Organize and connect the information needed for sustainability and ESG reporting." },
    ],
    image: img("Energy, Oil & Gas"),
  },
  {
    key: "retail",
    tag: "Retail & Consumer",
    sub: "Bring customer, channel, and operational data together across the business.",
    help: [
      { title: "Omnichannel Platforms", text: "Connect customer experiences across channels and systems." },
      { title: "Customer Analytics", text: "Turn customer data into information teams can use." },
      { title: "Supply Chain Insights", text: "Bring supply chain data together for better operational visibility." },
    ],
    image: img("Retail & Consumer"),
  },
];

/* ============================================================ */

function Hero() {
  const ref = useReveal<HTMLDivElement>();
  const { t } = useLang();
  return (
    <section className="page-hero section" id="top">
      <PageHeroArt src="img/heroes/industries.webp" />
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">{t("§01 · Industries")}</span>
          <span>{t("Six verticals")}</span>
          <span className="dash" />
        </div>
        <div className="page-hero__inner reveal" ref={ref}>
          <h1 className="page-hero__title">
            {t("Technology shaped around")} <em>{t("your industry.")}</em>
          </h1>
          <p className="page-hero__lead">
            {t("We combine industry knowledge with the technology expertise needed to solve complex business problems.")}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Sports & Media only (for now): use cases + insights linked from the sector. */
function SectorProof() {
  const { t, tr } = useLang();
  const cases = tr(CASES);
  return (
    <div className="ind2__proof">
      <span className="ind2__proof-label">{t("Our Sports & Media use cases and insights")}</span>
      <ul className="ind2__proof-list">
        {cases.map((c) => (
          <li key={c.slug}>
            <Link to={`/case-studies/${c.slug}`} className="ind2__proof-item">
              <span className="ind2__proof-metric">{c.metricShort}</span>
              <span className="ind2__proof-title">{c.cardHeadline}</span>
              <span className="ind2__proof-arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
        <li>
          <Link to="/insights" className="ind2__proof-item ind2__proof-item--more">
            <span className="ind2__proof-title">{t("Read our latest insights")}</span>
            <span className="ind2__proof-arrow" aria-hidden="true">→</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

function IndustryBlock({ ind, index }: { ind: Industry; index: number }) {
  const leftRef = useReveal<HTMLDivElement>();
  const rightRef = useReveal<HTMLDivElement>();
  const { t } = useLang();
  return (
    <article className="ind2" id={"ind-" + ind.key}>
      <div className="ind2__lead reveal" ref={leftRef}>
        <span className="ind2__counter">{String(index + 1).padStart(2, "0")} / {String(INDUSTRIES.length).padStart(2, "0")}</span>
        <h2 className="ind2__name">{ind.tag}</h2>
        <p className="ind2__sub">{ind.sub}</p>
      </div>
      <div className="ind2__body reveal" ref={rightRef}>
        <figure className="ind2__media" aria-hidden="true">
          {ind.image && <img src={import.meta.env.BASE_URL + ind.image} alt="" loading="lazy" />}
        </figure>
        <span className="ind2__help-label">{t("Where we can help")}</span>
        <ul className="ind2__help">
          {ind.help.map((h) => (
            <li key={h.title}>
              <h3>{h.title}</h3>
              <p>{h.text}</p>
            </li>
          ))}
        </ul>
        {ind.key === "sports-media" && <SectorProof />}
      </div>
    </article>
  );
}

function Closing() {
  const ref = useReveal<HTMLDivElement>();
  const { t } = useLang();
  return (
    <section className="section ind2-close" id="your-business">
      <div className="wrap-lg">
        <div className="ind2-close__inner reveal" ref={ref}>
          <span className="ind2-close__eyebrow">{t("Your business")}</span>
          <h2 className="ind2-close__title">
            {t("Your industry gives us context.")}
            <br />
            <em>{t("Your business defines the work.")}</em>
          </h2>
          <p className="ind2-close__copy">
            {t("Every organization has different systems, priorities, and challenges. See how Enquo could approach yours.")}
          </p>
          <div className="ind2-close__actions">
            <Link className="btn btn--primary" to="/demo">
              {t("Try our demo")}
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
            <Link className="btn" to="/services">
              {t("Explore our services")}
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Page
   ============================================================ */
export function IndustriesPage() {
  const [active, setActive] = useState<string>(INDUSTRIES[0].key);
  const { t, tr } = useLang();
  const industries = tr(INDUSTRIES);

  return (
    <>
      <Hero />

      <section className="section" id="industries-list">
        <div className="wrap-lg">
          <div className="page-ind__tabs" role="tablist">
            <span className="page-ind__tabs-label">{t("Jump to,")} </span>
            {industries.map((i) => (
              <button
                key={i.key}
                role="tab"
                aria-selected={active === i.key}
                onClick={() => {
                  setActive(i.key);
                  document.getElementById("ind-" + i.key)?.scrollIntoView({ block: "start" });
                }}
                className={"page-ind__tab" + (active === i.key ? " active" : "")}
              >
                {t(i.tag)}
              </button>
            ))}
          </div>

          <div className="ind2-list">
            {industries.map((ind, idx) => (
              <IndustryBlock key={ind.key} ind={ind} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <Closing />
    </>
  );
}
