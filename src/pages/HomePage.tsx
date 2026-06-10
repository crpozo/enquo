import { Hero } from "../components/sections/Hero";
import { HomeCases } from "../components/sections/HomeCases";
import { HomeIndustries } from "../components/sections/HomeIndustries";
import { HowWeWork } from "../components/sections/HowWeWork";
import { PlatformsStrip } from "../components/sections/PlatformsStrip";
import { WhatWeDo } from "../components/sections/WhatWeDo";
import { WhatWeFix } from "../components/sections/WhatWeFix";
import { useParallax } from "../hooks/useParallax";

/**
 * Home — leaner narrative, one scroll:
 *   Hero (video) → What We Fix → How We Work (Design/Build/Run)
 *   → What We Do (11 practices) → Case Studies → Industries.
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
      <PlatformsStrip />
      <HomeCases />
      <HomeIndustries />
    </div>
  );
}
