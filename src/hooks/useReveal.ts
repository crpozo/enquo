import { useEffect, useRef } from "react";

type Options = {
  rootMargin?: string;
};

/**
 * Adds `.in` to the returned ref when it scrolls into view.
 *
 * Safety net: if the element is already visible OR has already scrolled past
 * on mount, mark it `in` immediately — IntersectionObserver may not fire
 * for deep-linked or fast-scroll arrivals. Also force-shows after 4s as a
 * final fallback, and respects prefers-reduced-motion.
 */
export function useReveal<T extends Element = HTMLDivElement>(opts: Options = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion → show instantly
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }

    // Immediate check: if already visible OR already past, mark in.
    const checkNow = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh && r.bottom > -100) return true;
      if (r.bottom < 0) return true;
      return false;
    };
    if (checkNow()) {
      el.classList.add("in");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: opts.rootMargin ?? "0px 0px -8% 0px" },
    );
    obs.observe(el);

    const t = window.setTimeout(() => {
      if (!el.classList.contains("in")) el.classList.add("in");
    }, 4000);

    return () => {
      obs.disconnect();
      window.clearTimeout(t);
    };
  }, [opts.rootMargin]);

  return ref;
}
