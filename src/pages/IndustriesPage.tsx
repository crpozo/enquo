import { useState } from "react";

import { FinalCTA } from "../components/sections/FinalCTA";
import { useReveal } from "../hooks/useReveal";

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

const INDUSTRIES: Industry[] = [
  {
    key: "tech",
    tag: "Tech",
    headline: "Ship fast without the platform buckling later.",
    sub: "Velocity that doesn't mortgage tomorrow's stability.",
    categories: ["Design + Build", "Platform Engineering", "Data Ops"],
    pains: [
      "The last platform needed hotfixes in week one",
      "Scaling events expose what testing never did",
      "Tech debt now slows every release",
    ],
    enters:
      "We design and build platforms that stay stable well beyond go-live, and we own the on-call once they ship.",
  },
  {
    key: "sports",
    tag: "Sports",
    headline: "Operations that hold when 50M people are watching.",
    sub: "Live events don't tolerate retries.",
    categories: ["Build + Run", "Integrations", "Data Ops"],
    pains: [
      "Systems fail during peak events, the moments that matter most",
      "Too many vendors, no one accountable end-to-end",
      "Data inconsistency when revenue decisions are made in real time",
    ],
    enters:
      "We take ownership of the operational backbone so the platform performs under any condition.",
  },
  {
    key: "media-entertainment",
    tag: "Media & Entertainment",
    headline: "Audience scale without the pipeline breaking.",
    sub: "Every stream, every drop, every spike, accounted for.",
    categories: ["Build + Run", "Platform Engineering", "Analytics"],
    pains: [
      "Traffic spikes turn launches into incidents",
      "Content and audience data live in separate silos",
      "Monetization decisions wait on reconciled numbers",
    ],
    enters:
      "We run the distribution and data backbone so launches scale and the numbers stay trustworthy in real time.",
  },
  {
    key: "oil-gas",
    tag: "Oil & Gas",
    headline: "Decisions you can defend, from the field to the board.",
    sub: "Where downtime and compliance both carry a heavy price.",
    categories: ["Design + Build", "Systems Integration", "Data Trust"],
    pains: [
      "Operational data is trapped in legacy and proprietary systems",
      "Regulatory reporting is a manual, error-prone cycle",
      "Asset decisions rely on numbers no one fully trusts",
    ],
    enters:
      "We integrate operational and enterprise data into one trustworthy foundation, auditable by default.",
  },
  {
    key: "financial-services",
    tag: "Financial Services",
    headline: "Decisions auditable line by line, system by system.",
    sub: "Where every action leaves a record, and every record gets read.",
    categories: ["Design + Build", "Compliance", "Data Trust"],
    pains: [
      "Audit findings live longer than the systems that caused them",
      "Reconciliation between systems is a quarterly fire drill",
      "Risk teams and engineering speak different languages",
    ],
    enters:
      "We design data foundations and controls so the system is audit-ready by default, not by remediation.",
  },
  {
    key: "healthcare",
    tag: "Healthcare",
    headline: "Clinical-grade data everyone can agree on.",
    sub: "When the numbers change treatment, they have to be right.",
    categories: ["Design + Build + Run", "KPI Governance", "Analytics"],
    pains: [
      "The same KPI carries three definitions across institutions",
      "Board and clinical reporting take weeks to reconcile",
      "Disagreement over data delays decisions that matter",
    ],
    enters:
      "We build the KPI canon and the data foundation beneath it, so one version of truth drives every decision.",
  },
];

/* ============================================================
   Hero, manifesto reel placeholder
   ============================================================ */

function ReelHero() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="page-hero page-hero--reel section" id="top">
      <div className="page-reel reveal" ref={ref}>
        <div className="page-reel__visual">
          <div className="page-reel__bg" />
          <div className="page-reel__grid" />

          <button className="page-reel__play" aria-label="Play manifesto reel">
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          <div className="page-reel__top">
            <span className="page-reel__tag">
              <span className="page-reel__tag-dot" /> §01 · Manifesto reel
            </span>
            <span className="page-reel__duration">00:58</span>
          </div>

          <div className="page-reel__bot">
            <p className="page-reel__caption">
              Fragmented moments across industries, a platform crashing during a
              live event, a compliance audit, a non-profit drowning in manual
              reporting. No voiceover. Just the pain. Brand anchor at the end.
            </p>
            <span className="page-reel__badge">Play manifesto · 00:58</span>
          </div>
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
