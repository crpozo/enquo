import { useState } from "react";

import { FinalCTA } from "../components/sections/FinalCTA";
import { useReveal } from "../hooks/useReveal";
import { PageHeroArt } from "../components/sections/PageHeroArt";

/* ============================================================
   Data
   ============================================================ */

type Industry = {
  key: string;
  tag: string;
  headline: string;
  sub: string;
  categories: string[];
  pains: string[];
  enters: string;
};

/* The six verticals from the commercial deck (p.8), in the same order as
   the home tiles. Focus areas per industry come straight from the deck. */
const INDUSTRIES: Industry[] = [
  {
    key: "healthcare",
    tag: "Healthcare & Pharma",
    headline: "Clinical-grade data everyone can agree on.",
    sub: "When the numbers change treatment, they have to be right.",
    categories: ["Patient Data Platforms", "Real-World Analytics", "Regulatory Reporting"],
    pains: [
      "The same KPI carries three definitions across institutions",
      "Board and clinical reporting take weeks to reconcile",
      "Disagreement over data delays decisions that matter",
    ],
    enters:
      "We build the KPI canon and the data foundation beneath it, so one version of truth drives every decision.",
  },
  {
    key: "sports-media",
    tag: "Sports & Media",
    headline: "Operations that hold when 50M people are watching.",
    sub: "Live events don't tolerate retries.",
    categories: ["Fan Engagement Platforms", "Content & Rights Management", "Data & Analytics"],
    pains: [
      "Systems fail during peak events, the moments that matter most",
      "Too many vendors, no one accountable end-to-end",
      "Monetization decisions wait on reconciled numbers",
    ],
    enters:
      "We take ownership of the operational backbone so the platform performs under any condition — every stream, every drop, every spike.",
  },
  {
    key: "financial-services",
    tag: "Financial Services",
    headline: "Decisions auditable line by line, system by system.",
    sub: "Where every action leaves a record, and every record gets read.",
    categories: ["Risk Data Platforms", "Customer 360", "Compliance & Controls"],
    pains: [
      "Audit findings live longer than the systems that caused them",
      "Reconciliation between systems is a quarterly fire drill",
      "Risk teams and engineering speak different languages",
    ],
    enters:
      "We design data foundations and controls so the system is audit-ready by default, not by remediation.",
  },
  {
    key: "manufacturing",
    tag: "Manufacturing & Industrial",
    headline: "The plant floor and the boardroom, one source of truth.",
    sub: "Where downtime is measured in money per minute.",
    categories: ["Smart Manufacturing", "IoT & Predictive Maintenance", "Quality & Operations Analytics"],
    pains: [
      "Operational data is trapped in machines and proprietary systems",
      "Maintenance is reactive because the data arrives too late",
      "Quality issues surface in the field, not on the line",
    ],
    enters:
      "We connect operational and enterprise data into one backbone, so maintenance becomes predictive and quality is caught at the source.",
  },
  {
    key: "retail",
    tag: "Retail & Consumer",
    headline: "Every channel, one customer, numbers that agree.",
    sub: "Where margins are thin and decisions can't wait for reconciliation.",
    categories: ["Omnichannel Platforms", "Customer Analytics", "Supply-Chain Visibility"],
    pains: [
      "Online and in-store data describe two different customers",
      "Stockouts and overstock coexist in the same quarter",
      "Promotions are evaluated on gut feel, not lift",
    ],
    enters:
      "We unify commerce, customer and supply-chain data so every channel runs on the same numbers, in time to act on them.",
  },
  {
    key: "energy",
    tag: "Energy, Oil & Gas",
    headline: "Decisions you can defend, from the field to the board.",
    sub: "Where downtime and compliance both carry a heavy price.",
    categories: ["Asset Performance", "Energy Trading", "Sustainability & ESG"],
    pains: [
      "Operational data is trapped in legacy and proprietary systems",
      "Regulatory reporting is a manual, error-prone cycle",
      "Asset decisions rely on numbers no one fully trusts",
    ],
    enters:
      "We integrate operational and enterprise data into one trustworthy foundation, auditable by default.",
  },
];

/* ============================================================
   Hero — standard page hero with brand backdrop
   ============================================================ */

function ReelHero() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="page-hero section" id="top">
      <PageHeroArt src="img/heroes/industries.webp" />
      <div className="wrap-lg">
        <div className="page-hero__inner reveal" ref={ref}>
          <h1 className="page-hero__title">
            Execution across <em>complex industries.</em>
          </h1>
          <p className="page-hero__lead">
            Six verticals, one playbook. The operational pains differ by sector;
            the discipline that fixes them doesn&rsquo;t.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Industry tabs, sticky-left + content-right
   ============================================================ */

function IndustryDetail({ ind, index, total }: { ind: Industry; index: number; total: number }) {
  const stickyRef = useReveal<HTMLDivElement>();
  const contentRef = useReveal<HTMLDivElement>();
  return (
    <article className="page-ind">
      <div className="page-ind__sticky reveal" ref={stickyRef}>
        <div className="page-ind__counter">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <h2 className="page-ind__headline">{ind.headline}</h2>
        <p className="page-ind__sub">{ind.sub}</p>
        <div className="page-ind__tag-strip">
          <span className="page-ind__tag-main">{ind.tag}</span>
          <div className="page-ind__cats">
            {ind.categories.map((c) => (
              <span key={c} className="page-ind__cat">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="page-ind__content reveal" ref={contentRef}>
        <div className="page-ind__block">
          <span className="page-ind__block-label">What we hear from your team</span>
          <ul className="page-ind__pains">
            {ind.pains.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="page-ind__block">
          <span className="page-ind__block-label">How Enquo enters</span>
          <p className="page-ind__enters">{ind.enters}</p>
          <div className="page-ind__actions">
            <a className="btn" href="/services">
              See related services
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a className="btn btn--primary" href="#contact">
              Talk to us
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   Page
   ============================================================ */
export function IndustriesPage() {
  const [active, setActive] = useState<string>(INDUSTRIES[0].key);

  return (
    <>
      <ReelHero />

      <section className="section" id="industries-list">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§02 · Industries</span>
            <span>Where we operate</span>
            <span className="dash" />
          </div>

          <div className="page-ind__tabs" role="tablist">
            <span className="page-ind__tabs-label">Jump to, </span>
            {INDUSTRIES.map((i) => (
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
                {i.tag}
              </button>
            ))}
          </div>

          <div className="page-ind__list">
            {INDUSTRIES.map((ind, idx) => (
              <div key={ind.key} id={"ind-" + ind.key}>
                <IndustryDetail ind={ind} index={idx} total={INDUSTRIES.length} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
