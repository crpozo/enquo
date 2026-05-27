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
    key: "sports-media",
    tag: "Sports & Media",
    headline: "Operations that hold when 50M people are watching.",
    sub: "Live events don't tolerate retries.",
    categories: ["Build + Run", "Integrations", "Data Ops"],
    pains: [
      "Systems fail during peak events — the moments that matter most",
      "Too many vendors, no one accountable end-to-end",
      "Data inconsistency when revenue decisions are made in real time",
    ],
    enters:
      "We take ownership of the operational backbone so the platform performs under any condition.",
  },
  {
    key: "financial-healthcare",
    tag: "Financial & Healthcare",
    headline: "Decisions auditable line by line, system by system.",
    sub: "Where every action leaves a record — and every record gets read.",
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
    key: "nonprofits-public",
    tag: "Non-Profits & Public Orgs",
    headline: "Reporting that doesn't drown the mission.",
    sub: "Funders, regulators, and beneficiaries — all served from one truth.",
    categories: ["Run", "Process Automation", "Reporting"],
    pains: [
      "Field teams spend more time reporting than serving",
      "Each funder demands a different format of the same data",
      "Manual reporting introduces errors that erode trust",
    ],
    enters:
      "We automate the reporting backbone so the team spends their time on the mission, not on spreadsheets.",
  },
];

/* ============================================================
   Hero — manifesto reel placeholder
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
              Fragmented moments across industries — a platform crashing during a
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
   Industry tabs — sticky-left + content-right
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
            <span className="page-ind__tabs-label">Jump to —</span>
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
