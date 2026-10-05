import { Link } from "react-router-dom";

import { CASES, type CaseStudy } from "../data/cases";
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
      <figure className="ccard__media" aria-hidden="true">
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

/* ============================================================
   Videos — informative videos (e.g. the World Cup piece); slots
   ready for the files, with a poster until they land.
   ============================================================ */
const VIDEOS = [
  { title: "Mundial", caption: "How a global tournament runs on connected data.", poster: "img/industries/sports.webp" },
  { title: "Enquo at work", caption: "Design, build and run — in the field.", poster: "img/who/team.webp" },
];

function Videos() {
  const ref = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const videos = tr(VIDEOS);
  return (
    <section className="section cvideos" id="videos">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">{t("§03 · Videos")}</span>
          <span>{t("The work, on camera")}</span>
          <span className="dash" />
        </div>
        <div className="cvideos__grid reveal" ref={ref}>
          {videos.map((v) => (
            <figure className="cvideo" key={v.title}>
              <div className="cvideo__frame">
                <img src={import.meta.env.BASE_URL + v.poster} alt="" loading="lazy" />
                <span className="cvideo__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <span className="cvideo__soon">{t("Coming soon")}</span>
              </div>
              <figcaption>
                <strong>{v.title}</strong>
                <span>{v.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
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

      <Videos />
    </>
  );
}
