import { FinalCTA } from "../components/sections/FinalCTA";
import { useReveal } from "../hooks/useReveal";

type Role = {
  num: string;
  title: string;
  team: "Design" | "Build" | "Run" | "Industry";
  location: string;
  type: string;
  blurb: string;
};

const ROLES: Role[] = [
  {
    num: "01",
    title: "Solution Architect",
    team: "Design",
    location: "New York, NY · Hybrid",
    type: "Full-time",
    blurb:
      "Own the architecture from first whiteboard through go-live. We do not hand off — you stay through the first 90 days of operations.",
  },
  {
    num: "02",
    title: "Senior Data Engineer",
    team: "Build",
    location: "Ridgefield Park, NJ · Hybrid",
    type: "Full-time",
    blurb:
      "Lead foundation work for clients in financial services and healthcare. Your work survives the audit and the migration.",
  },
  {
    num: "03",
    title: "Platform SRE",
    team: "Run",
    location: "Remote (Americas)",
    type: "Full-time",
    blurb:
      "Own the on-call for systems we built. We do not subcontract operations — incidents are ours, the fix is ours.",
  },
  {
    num: "04",
    title: "Industry Partner — Sports & Media",
    team: "Industry",
    location: "New York, NY",
    type: "Full-time",
    blurb:
      "Bring the sector context that turns architecture into operations. You&rsquo;ve lived a live event from the operator side.",
  },
  {
    num: "05",
    title: "AI Adoption Lead",
    team: "Build",
    location: "Hybrid",
    type: "Full-time",
    blurb:
      "Instrument AI rollouts at the operator level. The bar is adoption that survives the first quarter, not just the demo.",
  },
  {
    num: "06",
    title: "Quality Engineering Lead",
    team: "Run",
    location: "Remote (Americas)",
    type: "Full-time",
    blurb:
      "Build the test infrastructure that lets us release on Fridays. Regression bugs are a leadership-visible metric here.",
  },
];

const VALUES = [
  {
    num: "01",
    title: "Stay through it",
    body: "We don&rsquo;t leave at go-live. If you want to ship and walk, this isn&rsquo;t the team.",
  },
  {
    num: "02",
    title: "Numbers, not narratives",
    body: "We&rsquo;d rather show a production metric than a slide. Public-facing case studies cite the metric.",
  },
  {
    num: "03",
    title: "Operators welcome",
    body: "We hire from operations more than from consulting. The work happens where the system runs.",
  },
];

function RoleRow({ role }: { role: Role }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <a className="page-role reveal" ref={ref}>
      <span className="page-role__num">{role.num}</span>
      <div className="page-role__col">
        <h3 className="page-role__title">{role.title}</h3>
        <p className="page-role__blurb">{role.blurb}</p>
      </div>
      <div className="page-role__meta">
        <span className="page-role__team">{role.team}</span>
        <span className="page-role__loc">{role.location}</span>
        <span className="page-role__type">{role.type}</span>
      </div>
      <span className="page-role__arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}

export function CareersPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const valuesRef = useReveal<HTMLDivElement>();
  const rolesRef = useReveal<HTMLDivElement>();

  return (
    <>
      <section className="page-hero section" id="top">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§01 · Careers</span>
            <span>Operators welcome</span>
            <span className="dash" />
          </div>

          <div className="page-hero__inner reveal" ref={heroRef}>
            <h1 className="page-hero__title">
              We&rsquo;re hiring for the part <em>after</em> the demo.
            </h1>
            <p className="page-hero__lead">
              The team is structured around three stages — Design, Build, Run —
              and one accountability: the people who design the system are the
              people who operate it.
            </p>
            <p className="page-hero__statement">
              <span className="page-hero__statement-mark" /> Operators welcome.
              Consultants who don&rsquo;t run what they build, less so.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="how-we-work">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§02 · How we work</span>
            <span>Three constants</span>
            <span className="dash" />
          </div>
          <div className="page-careers__values" ref={valuesRef}>
            {VALUES.map((v) => (
              <article key={v.num} className="page-careers__value">
                <span className="page-careers__value-num">{v.num}</span>
                <h3 className="page-careers__value-title">{v.title}</h3>
                <p
                  className="page-careers__value-body"
                  dangerouslySetInnerHTML={{ __html: v.body }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="open-roles">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§03 · Open roles</span>
            <span>{ROLES.length} positions</span>
            <span className="dash" />
          </div>

          <div className="page-role-list" ref={rolesRef}>
            {ROLES.map((r) => (
              <RoleRow key={r.num} role={r} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
