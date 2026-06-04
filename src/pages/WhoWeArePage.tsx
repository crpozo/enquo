import { FinalCTA } from "../components/sections/FinalCTA";
import { useReveal } from "../hooks/useReveal";

/* ============================================================
   Data
   ============================================================ */

const PRINCIPLES = [
  {
    num: "01",
    text: "Critical systems require long-term commitment, not just delivery.",
  },
  {
    num: "02",
    text: "Design, build, and run are not separate phases. They are one continuous responsibility.",
  },
  {
    num: "03",
    text: "Reliability is built from day one. It cannot be added later.",
  },
  {
    num: "04",
    text: "Success is measured in outcomes, not in what gets delivered.",
  },
];

const TEAM = [
  { role: "Founder & Operator", focus: "Strategy · Long-term commitments" },
  { role: "Design Lead",        focus: "Architecture · Solution design" },
  { role: "Build Lead",         focus: "Engineering · Platform delivery" },
  { role: "Run Lead",           focus: "Operations · Production ownership" },
  { role: "Data Lead",          focus: "Governance · KPI trust" },
  { role: "AI Lead",            focus: "Applied intelligence · Adoption" },
  { role: "Industry Partner",   focus: "Sports & Media, live operations" },
  { role: "Industry Partner",   focus: "Financial & Healthcare, controls" },
];

/* ============================================================
   Page
   ============================================================ */

export function WhoWeArePage() {
  const openingRef = useReveal<HTMLDivElement>();
  const foundingRef = useReveal<HTMLDivElement>();
  const principlesRef = useReveal<HTMLDivElement>();
  const teamRef = useReveal<HTMLDivElement>();

  return (
    <>
      <section className="page-hero section" id="top">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§01 · Who We Are</span>
            <span>Philosophy before team</span>
            <span className="dash" />
          </div>

          <div className="page-who__opening reveal" ref={openingRef}>
            <div className="page-who__opening-text">
              <h1 className="page-hero__title">
                We don&rsquo;t deliver systems.
                <br />
                We <em>take responsibility</em> for them.
              </h1>
              <p className="page-hero__lead">
                Enquo exists for the operators who carry the weight when the
                deck is gone, the slide closes, and production is live. We were
                built to stay through that part.
              </p>
              <p className="page-hero__statement">
                <span className="page-hero__statement-mark" /> We don&rsquo;t
                deliver systems. We take responsibility for them.
              </p>
            </div>

            <div className="page-who__opening-visual" aria-hidden="true">
              <div className="page-who__opening-grid" />
              <div className="page-who__opening-glow" />
              <span className="page-who__opening-label">Team · Office</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section page-who__founding" id="founding">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§02 · Founding moment</span>
            <span>Why Enquo exists</span>
            <span className="dash" />
          </div>

          <div className="page-who__founding-text reveal" ref={foundingRef}>
            <p>
              We&rsquo;ve seen too many critical systems shipped on slide decks
              and then walked away from. Audit findings outlive the consultants
              who caused them. Platforms get hot-fixed in week one. Reporting
              eats the team faster than the team can serve the mission.
            </p>
            <p>
              Enquo started as a refusal to leave at go-live. The same people
              who design the architecture run the operations. The same people
              who build the integrations own the incidents. Accountability is a
              single number, and that number stays with us.
            </p>
            <p>
              We measure ourselves on what stays standing six, twelve, twenty-four
              months after handoff. That&rsquo;s the only deliverable we believe
              in.
            </p>
          </div>
        </div>
      </section>

      <section className="section page-who__principles" id="principles">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§03 · Principles</span>
            <span>Four constants</span>
            <span className="dash" />
          </div>

          <div className="page-who__principles-grid" ref={principlesRef}>
            {PRINCIPLES.map((p) => (
              <article key={p.num} className="page-who__principle">
                <span className="page-who__principle-num">{p.num}</span>
                <p className="page-who__principle-text">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section page-who__team" id="team">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">§04 · Team</span>
            <span>Roles, not bios</span>
            <span className="dash" />
          </div>

          <p className="page-who__team-intro">
            We list roles, not bios. The work is owned by the function, not by
            an individual&rsquo;s biography. Every name behind a role is
            available the moment you sign.
          </p>

          <div className="page-who__team-grid" ref={teamRef}>
            {TEAM.map((m, i) => (
              <article key={i} className="page-who__teammate">
                <div className="page-who__teammate-avatar" aria-hidden="true">
                  <span />
                </div>
                <h3 className="page-who__teammate-role">{m.role}</h3>
                <p className="page-who__teammate-focus">{m.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
