import { Link, useParams } from "react-router-dom";

import { CASES, getCaseBySlug } from "../data/cases";
import { FinalCTA } from "../components/sections/FinalCTA";
import { useReveal } from "../hooks/useReveal";

export function CaseStudyDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const study = getCaseBySlug(slug);

  if (!study) return <NotFound />;

  // 2 related cases — same industry first, then fill from the rest.
  const related = [
    ...CASES.filter((c) => c.slug !== study.slug && c.industry === study.industry),
    ...CASES.filter((c) => c.slug !== study.slug && c.industry !== study.industry),
  ].slice(0, 2);

  return (
    <>
      <CaseHero study={study} />
      <CaseSituation study={study} />
      <CaseApproach study={study} />
      <CaseOutcomes study={study} />
      {related.length > 0 && <RelatedCases related={related} />}
      <FinalCTA />
    </>
  );
}

/* ============================================================ */

function CaseHero({ study }: { study: ReturnType<typeof getCaseBySlug> & object }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="page-hero section" id="top">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">Case · {study.num}</span>
          <span>{study.industry}</span>
          <span className="dash" />
          <Link to="/case-studies" className="case-detail__back">
            ← All cases
          </Link>
        </div>

        <div className="case-detail__hero reveal" ref={ref}>
          <p className="case-detail__client">{study.client}</p>
          <h1 className="case-detail__headline">{study.headline}</h1>

          <div className="case-detail__result-band">
            <span className="case-detail__result-label">Result</span>
            <p className="case-detail__result-text">{study.result}</p>
          </div>

          <div className="case-detail__meta">
            <span className="case-detail__duration">{study.duration}</span>
            <div className="case-detail__tags">
              {study.tags.map((t) => (
                <span key={t} className="case-detail__tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseSituation({ study }: { study: ReturnType<typeof getCaseBySlug> & object }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section case-detail__block" id="situation">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">§01 · Situation</span>
          <span>What we walked into</span>
          <span className="dash" />
        </div>
        <div className="case-detail__prose reveal" ref={ref}>
          {study.situation.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseApproach({ study }: { study: ReturnType<typeof getCaseBySlug> & object }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section case-detail__block case-detail__block--shade" id="approach">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">§02 · Approach</span>
          <span>What we did</span>
          <span className="dash" />
        </div>
        <div className="case-detail__prose reveal" ref={ref}>
          {study.approach.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {study.stack.length > 0 && (
          <div className="case-detail__stack">
            <span className="case-detail__stack-label">Stack &amp; methods</span>
            <div className="case-detail__stack-tags">
              {study.stack.map((s) => (
                <span key={s} className="case-detail__stack-tag">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CaseOutcomes({ study }: { study: ReturnType<typeof getCaseBySlug> & object }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section case-detail__block" id="outcomes">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">§03 · Outcomes</span>
          <span>What stayed standing</span>
          <span className="dash" />
        </div>
        <div className="case-detail__outcomes" ref={ref}>
          {study.outcomes.map((o) => (
            <article key={o.label} className="case-detail__outcome">
              <span className="case-detail__outcome-metric">{o.metric}</span>
              <span className="case-detail__outcome-label">{o.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedCases({ related }: { related: ReturnType<typeof getCaseBySlug>[] & object[] }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section case-detail__block case-detail__block--shade" id="related">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">§04 · Related</span>
          <span>Other engagements</span>
          <span className="dash" />
        </div>
        <div className="case-detail__related" ref={ref}>
          {related.map((r) => (
            <Link key={r!.slug} to={`/case-studies/${r!.slug}`} className="case-detail__related-card">
              <header>
                <span className="case-detail__related-num">Case · {r!.num}</span>
                <span className="case-detail__related-industry">{r!.industry}</span>
              </header>
              <h3>{r!.headline}</h3>
              <p>{r!.result}</p>
              <span className="case-detail__related-cta">
                Read case
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="page-hero section" id="top">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">404 · Case not found</span>
          <span>This case study isn&rsquo;t in our archive.</span>
          <span className="dash" />
        </div>
        <h1 className="page-hero__title">
          We don&rsquo;t have a case at <em>that slug</em>.
        </h1>
        <p className="page-hero__lead">
          The case you&rsquo;re looking for may have been renamed or removed.
          Head back to the full archive.
        </p>
        <p>
          <Link to="/case-studies" className="btn btn--primary">
            ← Browse all cases
          </Link>
        </p>
      </div>
    </section>
  );
}
