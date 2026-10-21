import { Link, useParams } from "react-router-dom";

import { CASES, getCaseBySlug, imageCut, type CaseStudy } from "../data/cases";
import { useReveal } from "../hooks/useReveal";
import { useLang } from "../i18n/lang";

/* ============================================================
   Case detail — hero (metric + headline + intro + capabilities +
   photo/video slot) → challenge → visual flow → approach →
   before / after → impact → what we delivered → technologies →
   business impact → next case.
   ============================================================ */

/**
 * Logo files in /public/img/partners for the technologies we name. `h` is the
 * optical height (px) in a 184px tile; `mono` marks white logos, shown in a
 * single dark tone on the light theme; `dark` is a dark-wordmark variant;
 * `label` sets a name beside a logo that is only an icon.
 */
type TechLogo = { file: string; h: number; mono?: boolean; dark?: string; label?: string };
const TECH_LOGO: Record<string, TechLogo> = {
  Snowflake: { file: "snowflake", h: 34 },
  dbt: { file: "dbt", h: 34, dark: "dbt-dark" },
  Streamlit: { file: "streamlit", h: 28, mono: true },
  "Azure DevOps": { file: "azure-devops-icon", h: 40, label: "Azure DevOps" },
  Pega: { file: "pega", h: 30, mono: true },
  Azure: { file: "azure", h: 34 },
  Domo: { file: "domo", h: 30, mono: true },
  Tableau: { file: "tableau", h: 30 },
  Salesforce: { file: "salesforce", h: 34 },
  ServiceNow: { file: "servicenow", h: 26 },
};

function TechLogos({ items }: { items: string[] }) {
  const src = (file: string) => import.meta.env.BASE_URL + `img/partners/${file}.png`;
  return (
    <ul className="cd-techlogos">
      {items.map((x) => {
        const logo = TECH_LOGO[x];
        return (
          <li key={x} title={x} style={logo ? ({ "--logo-h": logo.h } as React.CSSProperties) : undefined}>
            {!logo && <span>{x}</span>}
            {logo && (
              <img
                className={logo.dark ? "cd-techlogos__img--on-dark" : undefined}
                src={src(logo.file)}
                alt={logo.label ? "" : x}
                loading="lazy"
                data-mono={logo.mono || undefined}
              />
            )}
            {logo?.dark && <img className="cd-techlogos__img--on-light" src={src(logo.dark)} alt={x} loading="lazy" />}
            {logo?.label && <span className="cd-techlogos__label">{logo.label}</span>}
          </li>
        );
      })}
    </ul>
  );
}

/** Before → after metric on one line: "7 days" (muted) → "<1 hour" (neon). */
function MetricValue({ value }: { value: string }) {
  const [from, to] = value.split(" → ");
  if (to === undefined) return <>{value}</>;
  return (
    <>
      <span className="cd-impact__from">{from}</span>{" "}
      <span className="cd-impact__arrow" aria-hidden="true">→</span>{" "}
      <span className="cd-impact__to">{to}</span>
    </>
  );
}

function Check() {
  return (
    <svg className="cd-ba__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
  );
}

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
          <figure
            className="cd-hero__media"
            aria-hidden="true"
            data-cut={imageCut(c.image)}
            style={imageCut(c.image) ? ({ "--cut": imageCut(c.image) } as React.CSSProperties) : undefined}
          >
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
        <div className="cd-approach reveal" ref={ref}>
          <div className="cd-approach__text">
            <span className="cd-label">{t("The approach")}</span>
            <h2 className="cd-title">{c.approach.title}</h2>
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
              <ol>{c.after.map((s) => <li key={s}><Check />{s}</li>)}</ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Impact({ c }: { c: CaseStudy }) {
  const ref = useReveal<HTMLDListElement>();
  const { t } = useLang();
  const isBa = (m: CaseStudy["impact"][number]) => m.value.includes(" → ");
  return (
    <section className="section cd-block" id="impact">
      <div className="wrap-lg">
        <span className="cd-label">{t("The impact")}</span>
        <dl className="cd-impact reveal" ref={ref} data-n={c.impact.length} data-ba={c.impact.some(isBa) || undefined}>
          {c.impact.map((m) => (
            <div key={m.label} className={isBa(m) ? "cd-impact__item--ba" : undefined}>
              <dt aria-label={isBa(m) ? m.spoken : undefined}>
                <span className="cd-impact__glow" aria-hidden="true" />
                <MetricValue value={m.value} />
              </dt>
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
                <TechLogos items={c.technologies} />
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
        <div className="cd-bi cd-bi--photo reveal" ref={ref}>
          <div className="cd-bi__text">
            <span className="cd-label">{t("Business impact")}</span>
            <h2 className="cd-bi__title">{c.businessImpact.title}</h2>
            <p className="cd-prose">{c.businessImpact.text}</p>
          </div>
          <figure className="cd-bi__media">
            <img src={import.meta.env.BASE_URL + c.closingImage} alt={c.closingAlt} loading="lazy" />
          </figure>
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
