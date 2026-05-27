import { useReveal } from "../../hooks/useReveal";

export function Era() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="era">
      <div className="era__bg" aria-hidden="true" />
      <div className="era__inner reveal reveal--lg" ref={ref}>
        <div className="era__num">Sprint '26 — Enquo Brief 01</div>
        <h2 className="era__title">
          <span className="line">The data era</span>
          <span className="line grad">is human.</span>
        </h2>
        <p className="era__sub">
          Most data companies promise speed. We promise something rarer —
          solutions built with humility, designed for humans, deployed with care.
          Welcome to a new chapter in technology consulting.
        </p>
      </div>
    </section>
  );
}
