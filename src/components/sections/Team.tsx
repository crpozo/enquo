import { useReveal } from "../../hooks/useReveal";
import { StatCounter } from "./StatCounter";

export function Team() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="team section" id="team">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">05 / Team</span>
          <span>Centered on learning, community and purpose</span>
          <span className="dash" />
        </div>

        <div className="team__grid reveal" ref={ref}>
          <div className="team__copy">
            <h2>
              Expertise &amp; experience
              <br />
              combined with <em>flexibility</em>
              <br />
              and passion.
            </h2>
            <p>
              We are a diverse group of prepared individuals united by a passion
              for problem solving and a shared vision: to make a meaningful
              impact in society. We got you.
            </p>
            <div className="hero__ctas" style={{ justifyContent: "flex-start" }}>
              <a className="btn btn--primary">
                Meet the team
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a className="btn">Join us</a>
            </div>

            <div className="team__stats">
              <div className="team__stat">
                <span className="n"><StatCounter to={7} suffix="+" /></span>
                <span className="lab mono">Years building</span>
              </div>
              <div className="team__stat">
                <span className="n"><StatCounter to={120} /></span>
                <span className="lab mono">Experts on staff</span>
              </div>
              <div className="team__stat">
                <span className="n"><StatCounter to={7} /></span>
                <span className="lab mono">Industries served</span>
              </div>
            </div>
          </div>

          <div className="team__viz">
            <div className="team__viz-grid" />

            {/* Portrait mosaic, placeholder headshots suggesting the team */}
            <div className="team__mosaic" aria-hidden="true">
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={i}
                  className={"team__mosaic-tile team__mosaic-tile--" + ((i % 5) + 1)}
                  style={{ animationDelay: `${(i * 137) % 1800}ms` }}
                />
              ))}
            </div>

            {/* Top strip, section tag + live count */}
            <div className="team__viz-top">
              <span className="team__tag">
                <span className="team__tag-dot" />
                Team · 05
              </span>
              <span className="team__count">120+ experts</span>
            </div>

            {/* Stat badges that float over the mosaic */}
            <div className="team__stat-badge team__stat-badge--a" aria-hidden="true">
              <span className="n">07</span>
              <span className="l">Industries</span>
            </div>
            <div className="team__stat-badge team__stat-badge--b" aria-hidden="true">
              <span className="n">120</span>
              <span className="l">Experts</span>
            </div>

            <div className="team__viz-quote">
              <p className="q">
                "We envision a world where every person uses data to reach their
                full potential."
              </p>
              <div className="who">
                <strong>Enquo</strong> &nbsp;·&nbsp; Brand promise
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
