import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { lenisRef } from "../hooks/useLenis";

/**
 * Global scroll reset: every time the pathname changes the window goes back
 * to the top (Lenis included, so a scroll still in flight cannot drag the
 * new page down). A location with a #hash scrolls to that element instead,
 * once it has rendered. Mounted once, right under <BrowserRouter>.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // The app decides where each page opens; the browser must not restore
    // the previous document position on top of it.
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: 0 });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return () => window.clearTimeout(t);
    }
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
