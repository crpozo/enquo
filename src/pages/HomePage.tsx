import { Clients } from "../components/sections/Clients";
import { Era } from "../components/sections/Era";
import { FinalCTA } from "../components/sections/FinalCTA";
import { Hero } from "../components/sections/Hero";
import { Industries } from "../components/sections/Industries";
import { Manifesto } from "../components/sections/Manifesto";
import { Products } from "../components/sections/Products";
import { ScrollPrompt } from "../components/sections/ScrollPrompt";
import { Services } from "../components/sections/Services";
import { Team } from "../components/sections/Team";
import { Ticker } from "../components/sections/Ticker";

/**
 * Home — the existing single-page landing.
 * The top nav is the primary navigation; the inner sections still carry
 * IDs so anchor links from the CTA buttons keep working.
 */
export function HomePage() {
  return (
    <>
      <Hero variant="manifesto" />

      <Era />
      <ScrollPrompt />
      <Manifesto />

      <Ticker
        sm
        items={[
          "Services · 02",
          "Six interlocking practices",
          "Three sub-groups",
          "One outcome: unlocked potential",
          "✦",
        ]}
        variant="grad"
      />

      <Services />

      <Ticker
        items={[
          "Proprietary tooling",
          "✦",
          "Harmony · Elevate · VisionX",
          "✦",
          "Sentinel ADV · EACS",
          "✦",
          "DataFuse · GovernX",
          "✦",
        ]}
        reverse
      />

      <Products />
      <Industries />
      <Clients />
      <Team />
      <FinalCTA />
    </>
  );
}
