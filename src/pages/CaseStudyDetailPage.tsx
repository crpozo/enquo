import { Link, useParams } from "react-router-dom";

import { CASES, getCaseBySlug, type CaseStudy } from "../data/cases";
import { useReveal } from "../hooks/useReveal";
import { useLang } from "../i18n/lang";

/* ============================================================
   Case detail — hero (metric + headline + intro + capabilities +
   photo/video slot) → challenge → visual flow → approach →
   before / after → impact → what we delivered → technologies →
   business impact → next case.
   ============================================================ */

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
  );
}

function Hero({ c }: { c: CaseStudy }) {
  const ref = useReveal<HTMLDivElement>();
  const { t } = useLang();
  return (
    <section className="page-hero section cd-hero" id="top">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">{t("Case")} · {c.num}</span>
          <span>{c.client} · {c.industry}</span>
          <span className="dash" />
          <Link to="/case-studies" className="case-detail__back">← {t("All cases")}</Link>
        </div>
        <div className="cd-hero__grid reveal" ref={ref}>
          <div className="cd-hero__text">
            <span className="cd-hero__cat">{c.category}</span>
            <p className="cd-hero__metric">{c.metric}</p>
            <h1 className="cd-hero__headline">{c.headline}</h1>
            <p className="cd-hero__intro">{c.intro}</p>
            <div className="cd-hero__caps">
              <span className="cd-label">{t("Capabilities")}</span>
              <ul>{c.capabilities.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
          <figure className="cd-hero__media" aria-hidden="true">
            <img src={import.meta.env.BASE_URL + c.image} alt="" />
          </figure>
        </div>
      </div>
    </section>
  );
}

function Challenge({ c }: { c: CaseStudy }) {
  const ref = useReveal<HTMLDivElement>();
  const { t } = useLang();
  return (
    <section className="section cd-block" id="challenge">
      <div className="wrap-lg">
        <div className="cd-grid reveal" ref={ref}>
          <div>
            <span className="cd-label">{t("The challenge")}</span>
            <h2 className="cd-title">{c.challenge.title}</h2>
          </div>
          <ol className="cd-bullets">
            {c.challenge.bullets.map((b, i) => (
              <li key={b.label}>
                <span className="cd-bullets__num">0{i + 1}</span>
                <div>
                  <strong>{b.label}</strong>
                  <p>{b.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="cd-flow" aria-label={t("Visual flow")}>
          {c.flow.map((step, i) => (
            <div className="cd-flow__step" key={step} style={{ animationDelay: `${i * 120}ms` }}>
              <span>{step}</span>
              {i < c.flow.length - 1 && <i className="cd-flow__arrow" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach({ c }: { c: CaseStudy }) {
  const ref = useReveal<HTMLDivElement>();
  const { t } = useLang();
  return (
    <section className="section cd-block cd-block--shade" id="approach">
      <div className="wrap-lg">
        <div className="cd-grid reveal" ref={ref}>
          <div>
            <span className="cd-label">{t("The approach")}</span>
            <h2 className="cd-title">{c.approach.title}</h2>
          </div>
          <p className="cd-prose">{c.approach.text}</p>
        </div>
        <div className="cd-ba">
          <div className="cd-ba__col cd-ba__col--before">
            <span className="cd-label">{t("Before")}</span>
            <ol>{c.before.map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
          <span className="cd-ba__arrow" aria-hidden="true"><Arrow /></span>
          <div className="cd-ba__col cd-ba__col--after">
            <span className="cd-label">{t("After")}</span>
            <ol>{c.after.map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Impact({ c }: { c: CaseStudy }) {
  const ref = useReveal<HTMLDListElement>();
  const { t } = useLang();
  return (
    <section className="section cd-block" id="impact">
      <div className="wrap-lg">
        <span className="cd-label">{t("The impact")}</span>
        <dl className="cd-impact reveal" ref={ref} data-n={c.impact.length}>
          {c.impact.map((m) => (
            <div key={m.label}>
              <dt>{m.value}</dt>
              <dd>{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Delivered({ c }: { c: CaseStudy }) {
  const ref = useReveal<HTMLDivElement>();
  const { t } = useLang();
  return (
    <section className="section cd-block cd-block--shade" id="delivered">
      <div className="wrap-lg">
        <div className="cd-grid reveal" ref={ref}>
          <div>
            <span className="cd-label">{t("What we delivered")}</span>
            {c.technologies.length > 0 && (
              <div className="cd-tech">
                <span className="cd-label cd-label--muted">{t("Technologies")}</span>
                <ul>{c.technologies.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            )}
          </div>
          <ul className="cd-delivered">
            {c.delivered.map((d) => (
              <li key={d.label}>
                <strong>{d.label}</strong>
                <p>{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BusinessImpact({ c }: { c: CaseStudy }) {
  const ref = useReveal<HTMLDivElement>();
  const { t } = useLang();
  return (
    <section className="section cd-block" id="business-impact">
      <div className="wrap-lg">
        <div className="cd-bi reveal" ref={ref}>
          <span className="cd-label">{t("Business impact")}</span>
          <h2 className="cd-bi__title">{c.businessImpact.title}</h2>
          <p className="cd-prose">{c.businessImpact.text}</p>
        </div>
      </div>
    </section>
  );
}

function NextCase({ next }: { next: CaseStudy | undefined }) {
  const ref = useReveal<HTMLDivElement>();
  const { t } = useLang();
  return (
    <section className="section cd-block cd-block--shade" id="next">
      <div className="wrap-lg">
        {next ? (
          <Link to={`/case-studies/${next.slug}`} className="cd-next reveal" ref={ref as never}>
            <span className="cd-label">{t("Next case")} →</span>
            <span className="cd-next__industry">{next.industry}</span>
            <span className="cd-next__metric">{next.metric}</span>
            <span className="cd-next__headline">{next.headline}</span>
            <span className="cd-next__cta">{t("Read next case")} <Arrow /></span>
          </Link>
        ) : (
          <div className="cd-next cd-next--all reveal" ref={ref}>
            <span className="cd-label">{t("Explore more case studies")} →</span>
            <span className="cd-next__headline">{t("See what the work delivered.")}</span>
            <span className="cd-next__copy">{t("Explore measurable outcomes across industries, technologies, and business challenges.")}</span>
            <Link to="/case-studies" className="btn btn--primary">{t("View all case studies")} <Arrow /></Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function CaseStudyDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { tr } = useLang();
  const raw = getCaseBySlug(slug);
  if (!raw) return <NotFound />;
  const c = tr(raw);
  const idx = CASES.findIndex((x) => x.slug === raw.slug);
  const next = idx < CASES.length - 1 ? tr(CASES[idx + 1]) : undefined;

  return (
    <>
      <Hero c={c} />
      <Challenge c={c} />
      <Approach c={c} />
      <Impact c={c} />
      <Delivered c={c} />
      <BusinessImpact c={c} />
      <NextCase next={next} />
    </>
  );
}

function NotFound() {
  const { t } = useLang();
  return (
    <section className="page-hero section" id="top">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">{t("404 · Case not found")}</span>
          <span>{t("This case study isn’t in our archive.")}</span>
          <span className="dash" />
        </div>
        <h1 className="page-hero__title">
          {t("We don’t have a case at")} <em>{t("that slug")}</em>.
        </h1>
        <p className="page-hero__lead">
          {t("The case you’re looking for may have been renamed or removed. Head back to the full archive.")}
        </p>
        <p>
          <Link to="/case-studies" className="btn btn--primary">← {t("Browse all cases")}</Link>
        </p>
      </div>
    </section>
  );
}
