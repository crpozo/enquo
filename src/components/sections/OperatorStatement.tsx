/**
 * Operator statement banner — full-bleed white band placed between the hero
 * and the Era moment. Replaces the original marquee ticker. The line below
 * is the brand-anchor pulled from the Services page (§04 RUN).
 */
export function OperatorStatement() {
  return (
    <section className="operator" aria-labelledby="operator-statement">
      <div className="operator__inner">
        <p className="operator__eyebrow">
          <span className="operator__dot" />
          The enquo manifesto
        </p>
        <h2 id="operator-statement" className="operator__line">
          If we build it, we run it.
          <br />
          If it breaks, we <span className="operator__accent">own</span> it.
        </h2>
        <p className="operator__attr">
          <span className="operator__rule" /> Operating principle &middot; design
          &middot; build &middot; run
        </p>
      </div>
    </section>
  );
}
