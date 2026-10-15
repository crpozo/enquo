import { useEffect } from "react";

/** Must match `[data-parallax-img] { scale }` in motion.css. */
const SCALE = 1.14;

/**
 * Parallax for cropped photos, site-wide. Any image carrying
 * `data-parallax-img` drifts vertically inside its frame as it crosses the
 * viewport. CSS oversizes it (`scale`) and the drift is capped at that extra
 * margin, so the edges never show. The hook writes the individual
 * `translate` property, leaving `transform` free for hover zooms.
 *
 * Only images currently on screen are updated (IntersectionObserver), at
 * most once per frame. Re-scans when `key` changes (pass the route).
 */
export function useImageParallax(key: string) {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax-img]"));
    if (!nodes.length) return;

    const visible = new Set<HTMLElement>();
    let frame = 0;

    const apply = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      visible.forEach((el) => {
        // Measure the frame, not the moving image, so the motion is stable.
        const box = (el.parentElement ?? el).getBoundingClientRect();
        // 1 (frame entering at the bottom) … -1 (leaving at the top)
        const p = Math.max(-1, Math.min(1, (box.top + box.height / 2 - mid) / (mid + box.height / 2)));
        const travel = (box.height * (SCALE - 1)) / 2;
        el.style.translate = `0 ${(-p * travel).toFixed(2)}px`;
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(apply); };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) visible.add(el);
        else visible.delete(el);
      });
      onScroll();
    }, { rootMargin: "10% 0px" });
    nodes.forEach((el) => io.observe(el));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      nodes.forEach((el) => { el.style.translate = ""; });
    };
  }, [key]);
}
