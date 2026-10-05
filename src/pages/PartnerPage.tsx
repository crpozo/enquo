import { Link, useParams } from "react-router-dom";

import { CASES } from "../data/cases";
import { getPartner } from "../data/partners";
import { useReveal } from "../hooks/useReveal";
import { useLang } from "../i18n/lang";

/** Alliance page — what the partnership brings, capabilities, proof. */
export function PartnerPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { t, tr } = useLang();
  const heroRef = useReveal<HTMLDivElement>();
  const bringsRef = useReveal<HTMLDivElement>();
  const proofRef = useReveal<HTMLDivElement>();
  const raw = getPartner(slug);
  if (!raw) {
    return (
      <section className="page-hero section" id="top">
        <div className="wrap-lg">
          <h1 className="page-hero__title">{t("We don’t have an alliance at")} <em>{t("that address")}</em>.</h1>
          <p><Link to="/partnerships" className="btn btn--primary">← {t("All partnerships")}</Link></p>
        </div>
      </section>
    );
  }
  const p = tr(raw);
  const cases = tr(CASES.filter((c) => raw.cases.includes(c.slug)));

  return (
    <div className="partner-page">
      <section className="page-hero section" id="top">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("Alliance")}</span>
            <span>{p.status === "partner" ? t("Alliance partner") : t("Alliance in progress")}</span>
            <span className="dash" />
            <Link to="/partnerships" className="case-detail__back">← {t("All partnerships")}</Link>
          </div>
          <div className="page-hero__inner reveal" ref={heroRef}>
            <div className="partner-hero__mark">
              {p.logo ? <img src={import.meta.env.BASE_URL + `img/partners/${p.logo}.png`} alt={p.name} /> : <span>{p.name}</span>}
            </div>
            <h1 className="page-hero__title">
              {t("Enquo")} <em>+ {p.name}</em>
            </h1>
            <p className="page-hero__lead">{p.intro}</p>
            <a className="btn" href={p.site} target="_blank" rel="noreferrer">{p.name} ↗</a>
          </div>
        </div>
      </section>

      <section className="section cd-block" id="brings">
        <div className="wrap-lg">
          <div className="cd-grid reveal" ref={bringsRef}>
            <div>
              <span className="cd-label">{t("What the alliance brings")}</span>
              <h2 className="cd-title">{t("Platform expertise, owned through operation.")}</h2>
              <div className="cd-tech">
                <span className="cd-label cd-label--muted">{t("Capabilities")}</span>
                <ul>{p.capabilities.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
            </div>
            <ul className="cd-delivered">
              {p.brings.map((b) => (
                <li key={b.title}>
                  <strong>{b.title}</strong>
                  <p>{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {cases.length > 0 && (
        <section className="section cd-block cd-block--shade" id="proof">
          <div className="wrap-lg">
            <span className="cd-label">{t("In the field")}</span>
            <div className="partner-cases reveal" ref={proofRef}>
              {cases.map((c) => (
                <Link to={`/case-studies/${c.slug}`} className="partner-case" key={c.slug}>
                  <span className="partner-case__industry">{c.client} · {c.industry}</span>
                  <span className="partner-case__metric">{c.metricShort}</span>
                  <span className="partner-case__headline">{c.cardHeadline}</span>
                  <span className="cd-next__cta">{t("Read case")} <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section cd-block" id="contact">
        <div className="wrap-lg">
          <div className="cd-next cd-next--all">
            <span className="cd-label">{t("Talk to us")}</span>
            <span className="cd-next__headline">{t("Running")} {p.name}{t(", or planning to?")}</span>
            <span className="cd-next__copy">{t("Tell us where the process or the data is getting stuck. We’ll bring the people who have solved it on this platform.")}</span>
            <a className="btn btn--primary" href={`mailto:contact@enquo.com?subject=${encodeURIComponent(p.name + " alliance")}`}>{t("Let’s talk")}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
