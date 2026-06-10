import { FinalCTA } from "../components/sections/FinalCTA";
import { Hero } from "../components/sections/Hero";
import { HomeIndustries } from "../components/sections/HomeIndustries";
import { HowWeWork } from "../components/sections/HowWeWork";
import { WhatWeDo } from "../components/sections/WhatWeDo";
import { WhatWeFix } from "../components/sections/WhatWeFix";
import { useParallax } from "../hooks/useParallax";

/**
 * Home — the frame structure, one scroll:
 *   Hero (Design. Build. Run.) → The Problem → Our Model (lifecycle)
 *   → Services Preview → Industries → CTA.
 *
 * The whole page runs subtle scroll parallax: each section carries a
 * `data-parallax` glow layer driven by `useParallax`.
 */
export function HomePage() {
  const parallaxRef = useParallax<HTMLDivElement>();

  return (
    <div className="home" ref={parallaxRef}>
      <Hero variant="manifesto" />
      <WhatWeFix />
      <HowWeWork />
      <WhatWeDo />
      <HomeIndustries />
      <FinalCTA />
    </div>
  );
}
