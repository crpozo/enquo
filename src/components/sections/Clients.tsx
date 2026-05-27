import { ENQUO_CLIENTS } from "../../data/enquo";
import { Ticker } from "./Ticker";

export function Clients() {
  return (
    <section className="clients" id="clients">
      <div className="clients__label">
        Trusted by <em>industry leaders</em> across the Americas
      </div>
      <Ticker items={ENQUO_CLIENTS.map((c) => ({ text: c }))} variant="default" />
    </section>
  );
}
