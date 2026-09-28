import { FinalCTA } from "../components/sections/FinalCTA";
import { Hero } from "../components/sections/Hero";
import { HomeIndustries } from "../components/sections/HomeIndustries";
import { HowWeWork } from "../components/sections/HowWeWork";
import { PlatformsStrip } from "../components/sections/PlatformsStrip";
import { Proof } from "../components/sections/Proof";
import { WhatWeFix } from "../components/sections/WhatWeFix";
import { useLang } from "../i18n/lang";
import { useParallax } from "../hooks/useParallax";

/**
 * Home — one scroll:
 *   Hero → The Problem → Our Services (Discover / Design / Build / Run
 *   journey) → Proven impact → Industries (compact) →
 *   Built alongside the best in technology (logos) → CTA.
 *
 * The whole page runs subtle scroll parallax: each section carries a
 * `data-parallax` glow layer driven by `useParallax`.
 */
export function HomePage() {
  const parallaxRef = useParallax<HTMLDivElement>();
  const { t } = useLang();

  return (
    <div className="home" ref={parallaxRef}>
      <Hero variant="manifesto" />
      <WhatWeFix />
      <HowWeWork />
      <Proof />
      <HomeIndustries />
      <section className="home-tech" id="technology">
        <PlatformsStrip
          label={
            <>
              {t("Built alongside")} <em>{t("the best in technology.")}</em>
            </>
          }
        />
      </section>
      <FinalCTA />
    </div>
  );
}
