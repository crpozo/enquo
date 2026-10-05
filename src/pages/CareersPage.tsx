import { FinalCTA } from "../components/sections/FinalCTA";
import { useReveal } from "../hooks/useReveal";
import { useLang } from "../i18n/lang";
import { PageHeroArt } from "../components/sections/PageHeroArt";

type Role = { num: string; title: string; team: "Design" | "Build" | "Run" | "Industry"; location: string; type: string; blurb: string };

const ROLES: Role[] = [
  { num: "01", title: "Solution Architect", team: "Design", location: "New York, NY · Hybrid", type: "Full-time",
    blurb: "Own the architecture from first whiteboard through go-live. We do not hand off, you stay through the first 90 days of operations." },
  { num: "02", title: "Senior Data Engineer", team: "Build", location: "Ridgefield Park, NJ · Hybrid", type: "Full-time",
    blurb: "Lead foundation work for clients in financial services and healthcare. Your work survives the audit and the migration." },
  { num: "03", title: "Platform SRE", team: "Run", location: "Remote (Americas)", type: "Full-time",
    blurb: "Own the on-call for systems we built. We do not subcontract operations, incidents are ours, the fix is ours." },
  { num: "04", title: "Industry Partner, Sports & Media", team: "Industry", location: "New York, NY", type: "Full-time",
    blurb: "Bring the sector context that turns architecture into operations. You’ve lived a live event from the operator side." },
  { num: "05", title: "AI Adoption Lead", team: "Build", location: "Hybrid", type: "Full-time",
    blurb: "Instrument AI rollouts at the operator level. The bar is adoption that survives the first quarter, not just the demo." },
  { num: "06", title: "Quality Engineering Lead", team: "Run", location: "Remote (Americas)", type: "Full-time",
    blurb: "Build the test infrastructure that lets us release on Fridays. Regression bugs are a leadership-visible metric here." },
];

const VALUES = [
  { num: "01", title: "Stay through it", body: "We don’t leave at go-live. If you want to ship and walk, this isn’t the team." },
  { num: "02", title: "Numbers, not narratives", body: "We’d rather show a production metric than a slide. Public-facing case studies cite the metric." },
  { num: "03", title: "Operators welcome", body: "We hire from operations more than from consulting. The work happens where the system runs." },
];

/* Life at Enquo — what the day-to-day looks like (filler until the people
   team confirms the final list). */
const LIFE = [
  { title: "Small teams, real ownership", text: "You work on one engagement at a time, with the architect, the engineers and the operators in the same room." },
  { title: "Production is the classroom", text: "Everyone touches live systems. On-call is shared, documented and respected, never a punishment." },
  { title: "Hybrid by design", text: "New York, New Jersey and Ecuador, with remote colleagues across the Americas. We meet where the work is." },
  { title: "Learning that ships", text: "Certifications and conference time on the platforms we build with. We pay for what you’ll use next quarter." },
];

const BENEFITS = ["Health, dental and vision", "Retirement plan", "Flexible time off", "Learning and certification budget", "Hybrid and remote roles", "Equipment of your choice"];

function RoleRow({ role }: { role: Role }) {
  const ref = useReveal<HTMLAnchorElement>();
  const { t } = useLang();
  return (
    <a className="page-role reveal" ref={ref} href="mailto:careers@enquo.com?subject=Application">
      <span className="page-role__num">{role.num}</span>
      <div className="page-role__col">
        <h3 className="page-role__title">{role.title}</h3>
        <p className="page-role__blurb">{role.blurb}</p>
      </div>
      <div className="page-role__meta">
        <span className="page-role__team">{t(role.team)}</span>
        <span className="page-role__loc">{role.location}</span>
        <span className="page-role__type">{role.type}</span>
      </div>
      <span className="page-role__arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
      </span>
    </a>
  );
}

export function CareersPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const valuesRef = useReveal<HTMLDivElement>();
  const lifeRef = useReveal<HTMLDivElement>();
  const hubRef = useReveal<HTMLDivElement>();
  const rolesRef = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const roles = tr(ROLES);
  const values = tr(VALUES);
  const life = tr(LIFE);
  const benefits = tr(BENEFITS);

  return (
    <>
      <section className="page-hero section" id="top">
        <PageHeroArt src="img/heroes/careers.webp" />
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§01 · Careers")}</span>
            <span>{t("Operators welcome")}</span>
            <span className="dash" />
          </div>
          <div className="page-hero__inner reveal" ref={heroRef}>
            <h1 className="page-hero__title">
              {t("We’re hiring for the part")} <em>{t("after")}</em> {t("the demo.")}
            </h1>
            <p className="page-hero__lead">
              {t("The team is structured around three stages, Design, Build, Run, and one accountability: the people who design the system are the people who operate it.")}
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="how-we-work">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§02 · How we work")}</span>
            <span>{t("Three constants")}</span>
            <span className="dash" />
          </div>
          <div className="page-careers__values" ref={valuesRef}>
            {values.map((v) => (
              <article key={v.num} className="page-careers__value">
                <span className="page-careers__value-num">{v.num}</span>
                <h3 className="page-careers__value-title">{v.title}</h3>
                <p className="page-careers__value-body">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section car-life" id="life">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§03 · Life at Enquo")}</span>
            <span>{t("How the week actually goes")}</span>
            <span className="dash" />
          </div>
          <div className="car-life__grid reveal" ref={lifeRef}>
            <div className="car-life__list">
              {life.map((l, i) => (
                <div className="car-life__item" key={l.title} style={{ transitionDelay: `${i * 90}ms` }}>
                  <h3>{l.title}</h3>
                  <p>{l.text}</p>
                </div>
              ))}
            </div>
            <aside className="car-benefits">
              <span className="car-benefits__label">{t("What we offer")}</span>
              <ul>{benefits.map((b) => <li key={b}>{b}</li>)}</ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section car-hub" id="ecuador-hub">
        <div className="wrap-lg">
          <div className="car-hub__grid reveal" ref={hubRef}>
            <figure className="car-hub__media" aria-hidden="true">
              <img src={import.meta.env.BASE_URL + "img/who/team.webp"} alt="" loading="lazy" />
            </figure>
            <div>
              <span className="car-hub__eyebrow">{t("Ecuador Hub")}</span>
              <h2 className="car-hub__title">{t("Engineering from Ecuador, for clients across the Americas.")}</h2>
              <p className="car-hub__copy">
                {t("Our Ecuador hub is where a growing part of Enquo’s engineering, data and operations work happens: same engagements, same standards, same on-call, working in the same time zones as our clients in North America.")}
              </p>
              <p className="car-hub__copy">
                {t("If you are an engineer, data specialist or operator in Ecuador looking to work on enterprise systems that stay in production, we’d like to hear from you.")}
              </p>
              <a className="btn" href="mailto:careers@enquo.com?subject=Ecuador%20Hub">
                {t("Join the Ecuador Hub")}
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="open-roles">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">{t("§04 · Open roles")}</span>
            <span>{roles.length} {t("positions")}</span>
            <span className="dash" />
          </div>
          <div className="page-role-list" ref={rolesRef}>
            {roles.map((r) => <RoleRow key={r.num} role={r} />)}
          </div>
          <p className="car-open">
            {t("Nothing that fits right now? Send us a note anyway:")} <a href="mailto:careers@enquo.com">careers@enquo.com</a>
          </p>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
