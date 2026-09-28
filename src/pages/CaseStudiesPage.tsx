import { Link } from "react-router-dom";

import { CASES, type CaseStudy } from "../data/cases";
import { FinalCTA } from "../components/sections/FinalCTA";
import { useReveal } from "../hooks/useReveal";
import { PageHeroArt } from "../components/sections/PageHeroArt";
import { useLang } from "../i18n/lang";

/* Rich brand tints cycled across the bento tiles (no photos needed). */
const TINTS = ["violet", "teal", "rose", "orange", "magenta", "indigo"] as const;

function CaseTile({ s, i }: { s: CaseStudy; i: number }) {
  const ref = useReveal<HTMLAnchorElement>();
  const featured = i === 0;
  const { t } = useLang();
  return (
    <Link
      to={`/case-studies/${s.slug}`}
      className="case-tile reveal"
      data-tint={TINTS[i % TINTS.length]}
      data-feat={featured}
      ref={ref}
    >
      <div className="case-tile__art" aria-hidden="true">
        <div className="case-tile__grad" />
        <div className="case-tile__halftone" />
        <svg className="case-tile__motif" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
          <g fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1">
            <circle cx="100" cy="100" r="34" />
            <circle cx="100" cy="100" r="64" strokeOpacity="0.3" />
            <circle cx="100" cy="100" r="92" strokeOpacity="0.16" />
            <circle cx="100" cy="38" r="4" fill="#fff" stroke="none" />
            <circle cx="158" cy="120" r="4" fill="#fff" stroke="none" />
            <circle cx="52" cy="142" r="4" fill="#fff" stroke="none" />
            <path d="M100 38 L100 100 L158 120 M100 100 L52 142" strokeOpacity="0.3" />
          </g>
        </svg>
        <span className="case-tile__watermark">{s.num}</span>
      </div>

      <div className="case-tile__scrim" aria-hidden="true" />

      <div className="case-tile__body">
        <div className="case-tile__top">
          <span className="case-tile__num">{t("Case")} · {s.num}</span>
          <span className="case-tile__industry">{s.industry}</span>
        </div>

        <h3 className="case-tile__headline">{s.headline}</h3>

        <div className="case-tile__meta">
          <div className="case-tile__foot">
            <span className="case-tile__duration">{s.duration}</span>
            <span className="case-tile__cta">
              {t("Read case")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CaseStudiesPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const cases = tr(CASES);
  return (
    <>
      <section className="page-hero section" id="top">
        <PageHeroArt src="img/heroes/cases.webp" />
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§01 · Case Studies")}</span>
            <span>{t("Real systems. Real numbers.")}</span>
            <span className="dash" />
          </div>

          <div className="page-hero__inner reveal" ref={heroRef}>
            <h1 className="page-hero__title">
              {t("The systems we ran are")} <em>{t("still running")}</em>.
            </h1>
            <p className="page-hero__lead">
              {t("Each case below names the industry, the outcome, how long we were engaged, and the practices applied.")}
            </p>
            <p className="page-hero__statement">
              <span className="page-hero__statement-mark" /> {t("Every metric on this page came out of production, not a deck.")}
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="cases">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§02 · Selected work")}</span>
            <span>{cases.length} {t("cases")}</span>
            <span className="dash" />
          </div>
          <h2 className="page-cases__title">{t("Selected Case Studies")}</h2>

          <div className="case-bento">
            {cases.map((s, i) => (
              <CaseTile key={s.num} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
