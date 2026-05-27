import { ENQUO_PILLARS } from "../../data/enquo";
import { useReveal } from "../../hooks/useReveal";
import { ChapterIntro } from "./ChapterIntro";

export function Manifesto() {
  const introRef = useReveal<HTMLParagraphElement>();
  const pillarsRef = useReveal<HTMLDivElement>();

  return (
    <section className="manifesto section" id="values">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">01 / Values</span>
          <span>What we stand for</span>
          <span className="dash" />
        </div>

        <ChapterIntro
          num="01 / Values"
          kind="Brand Manifesto"
          title={<>What makes us <em>different</em>.</>}
          quote="Different from all other data companies, we embrace the reality that we may not have all the answers. We see this as a strength."
          byline="The Enquo Promise"
          role="Centered on learning, community and purpose"
          duration="01:42"
          vizKind="manifesto"
          posterHint="Human · Agility · Experts — our three pillars."
        />

        <p className="manifesto__quote reveal" ref={introRef}>
          We are <em>centered on learning, community and purpose.</em> A team
          that bridges any business need — <span className="strike">complicated</span> simply.
        </p>

        <div className="pillars" ref={pillarsRef}>
          {ENQUO_PILLARS.map((p) => (
            <div className="pillar" key={p.num}>
              <div className="pillar__num">{p.num} —</div>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
