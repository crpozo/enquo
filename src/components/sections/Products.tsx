import { ENQUO_PRODUCTS } from "../../data/enquo";
import { useReveal } from "../../hooks/useReveal";
import { ChapterIntro } from "./ChapterIntro";

export function Products() {
  const listRef = useReveal<HTMLDivElement>();
  return (
    <section className="products section" id="products">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">03 / Products</span>
          <span>Proprietary tooling</span>
          <span className="dash" />
        </div>

        <ChapterIntro
          num="03 / Products"
          kind="Product Suite"
          title={<>Seven products. <em>One</em> stack.</>}
          quote="With AI, fast conversions, robust implementations and flexible outsourcing, we empower you to thrive in any industry."
          byline="Enquo Product Suite"
          role="From application modernization to data governance"
          duration="04:08"
          vizKind="products"
          posterHint="Harmony · Elevate · VisionX · Sentinel · EACS · DataFuse · GovernX"
        />

        <div className="prod-list" ref={listRef}>
          {ENQUO_PRODUCTS.map((p) => (
            <a className="prod" key={p.num}>
              <span className="prod__num">03 / {p.num}</span>
              <div>
                <h3 className="prod__name">{p.name}</h3>
                <span className="prod__tag">{p.tag}</span>
              </div>
              <p className="prod__desc">{p.desc}</p>
              <span className="prod__arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
