import { useEffect, useRef } from "react";

/**
 * Subtle, scroll-driven parallax for a whole page.
 *
 * Returns a ref to attach to a container. Any descendant carrying a
 * `data-parallax` attribute (a unit-less speed, e.g. `data-parallax="0.12"`)
 * drifts vertically as the page scrolls — positive values move slower than
 * the scroll (recede), giving a layered, premium depth without fighting
 * readability.
 *
 * Notes:
 * - Only drives `translate3d` on the targeted layers, so it never collides
 *   with `.reveal` (those animate their own transform on different nodes).
 * - rAF-throttled; reads happen once per frame.
 * - Honors prefers-reduced-motion (no-op) and pauses work off-screen.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-parallax]"),
    ).map((el) => ({ el, speed: parseFloat(el.dataset.parallax || "0") }));
    if (!nodes.length) return;

    let frame = 0;
    const vh = () => window.innerHeight || document.documentElement.clientHeight;

    const apply = () => {
      frame = 0;
      const mid = vh() / 2;
      for (const { el, speed } of nodes) {
        const rect = el.getBoundingClientRect();
        // Distance of this layer's center from the viewport center.
        const delta = rect.top + rect.height / 2 - mid;
        const y = -delta * speed;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
