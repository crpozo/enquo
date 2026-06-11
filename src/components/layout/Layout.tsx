import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
 *
 * Wireframe mode: the same shell + pages mounted under /wireframe get
 * `data-wireframe` on <html> (styled by wireframe.css) and internal link
 * clicks are rewritten so navigation stays inside /wireframe.
 */
export function Layout() {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isWireframe = pathname === "/wireframe" || pathname.startsWith("/wireframe/");
  useLenis();

  // Apply theming data attrs to <html>
  useEffect(() => {
    document.documentElement.dataset.accent = DEFAULTS.accent;
    document.documentElement.dataset.density = DEFAULTS.density;
  }, []);

  // Wireframe mode flag on <html>
  useEffect(() => {
    if (isWireframe) {
      document.documentElement.dataset.wireframe = "true";
    } else {
      delete document.documentElement.dataset.wireframe;
    }
  }, [isWireframe]);

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

  // In wireframe mode, keep internal navigation inside /wireframe so the
  // whole site can be walked through without leaving the undesigned view.
  const onClickCapture = (e: React.MouseEvent) => {
    if (!isWireframe) return;
    const a = (e.target as HTMLElement).closest?.("a");
    if (!a) return;
    const rawHref = a.getAttribute("href") ?? "";
    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:")) return;
    if (a.origin !== window.location.origin) return;
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    let path = a.pathname;
    if (base && path.startsWith(base)) path = path.slice(base.length) || "/";
    if (path === "/wireframe" || path.startsWith("/wireframe/")) return;
    e.preventDefault();
    navigate("/wireframe" + (path === "/" ? "" : path) + a.hash);
  };

  return (
    <div onClickCapture={onClickCapture}>
      <IntroOverlay />

      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress__bar" ref={progressRef} />
      </div>

      <Nav />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
