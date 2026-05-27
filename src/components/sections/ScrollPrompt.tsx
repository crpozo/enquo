import { ENQUO_INDUSTRIES, ENQUO_PRODUCTS, ENQUO_SERVICES } from "../../data/enquo";

export function ScrollPrompt() {
  const total = ENQUO_SERVICES.length + ENQUO_PRODUCTS.length + ENQUO_INDUSTRIES.length;
  return (
    <section className="scroll-prompt" aria-hidden="true">
      <p className="scroll-prompt__big">
        Scroll to see <em>{total}+ capabilities</em>
      </p>
      <div className="scroll-prompt__meta">
        <strong>{ENQUO_SERVICES.length}</strong> Services ·{" "}
        <strong>{ENQUO_PRODUCTS.length}</strong> Products ·{" "}
        <strong>{ENQUO_INDUSTRIES.length}</strong> Industries
        <br />
        One blueprint for human-driven data.
      </div>
    </section>
  );
}
