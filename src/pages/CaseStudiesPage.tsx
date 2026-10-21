import { Link } from "react-router-dom";

import { CASES, imageCut, type CaseStudy } from "../data/cases";
import { useReveal } from "../hooks/useReveal";
import { useLang } from "../i18n/lang";
import { PageHeroArt } from "../components/sections/PageHeroArt";

/* ============================================================
   Flash cards — CASE · 01 / industry / main metric / headline /
   practices / READ CASE. Large editorial blocks, image-led.
   ============================================================ */
function CaseCard({ s, i }: { s: CaseStudy; i: number }) {
  const ref = useReveal<HTMLAnchorElement>();
  const { t } = useLang();
  return (
    <Link to={`/case-studies/${s.slug}`} className="ccard reveal" ref={ref} style={{ transitionDelay: `${i * 90}ms` }}>
      <figure
        className="ccard__media"
        aria-hidden="true"
        data-cut={imageCut(s.image)}
        style={imageCut(s.image) ? ({ "--cut": imageCut(s.image) } as React.CSSProperties) : undefined}
      >
        <img src={import.meta.env.BASE_URL + s.image} alt="" loading="lazy" />
      </figure>
      <div className="ccard__body">
        <div className="ccard__top">
          <span className="ccard__num">{t("Case")} · {s.num}</span>
          <span className="ccard__industry">{s.industry}</span>
        </div>
        <p className="ccard__metric">{s.metricShort}</p>
        <h2 className="ccard__headline">{s.cardHeadline}</h2>
        <div className="ccard__foot">
          <span className="ccard__meta">{s.tags.join(" · ")}</span>
          <span className="ccard__cta">
            {t("Read case")}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </span>
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
              {t("Results you can")} <em>{t("put a number on.")}</em>
            </h1>
            <p className="page-hero__lead">
              {t("From faster reporting to more reliable operations, see the measurable impact behind our work.")}
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
          <div className="ccards">
            {cases.map((s, i) => (
              <CaseCard key={s.slug} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
