import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { CursorHalo } from "../CursorHalo";
import { IntroOverlay } from "../IntroOverlay";
import { Footer } from "../chrome/Footer";
import { Nav } from "../chrome/Nav";
import { useLenis } from "../../hooks/useLenis";

type Theme = {
  accent: "violet" | "electric" | "warm" | "mono";
  density: "compact" | "spacious" | "oversized";
};

const DEFAULTS: Theme = {
  accent: "violet",
  density: "spacious",
};

/**
 * Persistent shell shared by every page: intro overlay (first visit), cursor
 * halo, scroll-progress bar, top nav, footer. The active route renders into
 * <Outlet />.
 */
export function Layout() {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  useLenis();

  // Apply theming data attrs to <html>
  useEffect(() => {
    document.documentElement.dataset.accent = DEFAULTS.accent;
    document.documentElement.dataset.density = DEFAULTS.density;
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = p + "%";
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  // Reset scroll on route change (Lenis handles its own state)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      <IntroOverlay />
      <CursorHalo />

      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress__bar" ref={progressRef} />
      </div>

      <Nav />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
