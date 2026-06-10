import { useReveal } from "../../hooks/useReveal";

export function FinalCTA() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="cta section" id="contact">
      <div className="cta__art" aria-hidden="true">
        <img
          src={import.meta.env.BASE_URL + "img/cta-hand.webp"}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="wrap-lg">
        <div className="cta__inner reveal" ref={ref}>
          <div className="cta__eyebrow">06 / Let's build</div>
          <h2 className="cta__title">
            The future is not loud.
            <br />
            It is <em>built</em>.
          </h2>
          <p className="cta__sub">
            We envision a world where every person uses data to reach their full
            potential. Let's connect.
          </p>
          <div className="cta__actions">
            <a className="btn btn--primary">
              Get a quote
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a className="btn">sales@enquotech.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
