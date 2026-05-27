import { ENQUO_INDUSTRIES } from "../../data/enquo";
import { useReveal } from "../../hooks/useReveal";
import { ChapterIntro } from "./ChapterIntro";
import { IndViz } from "./IndViz";

export function Industries() {
  const gridRef = useReveal<HTMLDivElement>();
  return (
    <section className="industries section" id="industries">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">04 / Industries</span>
          <span>Where we operate</span>
          <span className="dash" />
        </div>

        <ChapterIntro
          num="04 / Industries"
          kind="Sector Reach"
          title={<>Bridging any need. <em>Any sector.</em></>}
          quote="Decades of cross-sector expertise compressed into every engagement. Seven verticals, one playbook for transformation."
          byline="Industry Coverage"
          role="From financial services to brain-computer interfaces in sports"
          duration="02:24"
          vizKind="sectors"
          posterHint="Seven verticals — Retail · Energy · Finance · Gov · Health · TMT · Sports."
        />

        <div className="ind-grid" ref={gridRef}>
          {ENQUO_INDUSTRIES.map((ind) => (
            <article className="ind" key={ind.num}>
              <div className="ind__viz">
                <IndViz kind={ind.viz} />
              </div>
              <div className="ind__num">04 / {ind.num}</div>
              <h3 className="ind__name">{ind.name}</h3>
              <p className="ind__desc">{ind.desc}</p>
              <div className="ind__more">Explore →</div>
            </article>
          ))}

          {/* CTA card — fills the 8th cell of the 4×2 grid so there's no
              empty placeholder slot. Doubles as a conversion path. */}
          <a className="ind ind--cta" href="#contact">
            <div className="ind__viz ind__viz--cta" aria-hidden="true">
              <svg viewBox="0 0 200 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="ind-cta-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#C7B6FF" />
                    <stop offset="60%" stopColor="#C026D3" />
                    <stop offset="100%" stopColor="#F472B6" />
                  </linearGradient>
                </defs>
                <path
                  d="M 20 40 L 160 40"
                  stroke="url(#ind-cta-grad)"
                  strokeWidth="1.4"
                  fill="none"
                />
                <path
                  d="M 150 28 L 170 40 L 150 52"
                  stroke="url(#ind-cta-grad)"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="20" cy="40" r="3" fill="url(#ind-cta-grad)" />
              </svg>
            </div>
            <div className="ind__num">04 / 08</div>
            <h3 className="ind__name">Your sector?</h3>
            <p className="ind__desc">
              We bridge any business need — no matter how big or small. Tell us
              about yours.
            </p>
            <div className="ind__more ind__more--cta">Let&rsquo;s talk →</div>
          </a>
        </div>
      </div>
    </section>
  );
}
