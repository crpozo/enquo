import { useEffect, useRef, useState } from "react";

type Props = {
  /** Display value such as "47%", "3.5×" or "$3B+": the number counts up, the
   *  text around it stays fixed. Takes precedence over `to` / `suffix`. */
  value?: string;
  to?: number;
  prefix?: string;
  suffix?: string;
  /** Count duration in ms. */
  duration?: number;
};

/** "3.5×" → { prefix: "", num: 3.5, decimals: 1, sep: ".", suffix: "×" } */
export function parseStat(value: string) {
  const m = value.match(/^(\D*?)(\d+(?:([.,])(\d+))?)(.*)$/);
  if (!m) return null;
  return {
    prefix: m[1],
    num: parseFloat(m[2].replace(",", ".")),
    sep: m[3] ?? ".",
    decimals: m[4]?.length ?? 0,
    suffix: m[5],
  };
}

/**
 * Counts up from 0 to the target once the element enters the viewport.
 * Only the digits animate: prefix and suffix are rendered around them, and
 * screen readers get the final value straight away.
 */
export function StatCounter({ value, to = 0, prefix = "", suffix = "", duration = 1400 }: Props) {
  const parsed = value ? parseStat(value) : null;
  const target = parsed?.num ?? to;
  const decimals = parsed?.decimals ?? 0;
  const sep = parsed?.sep ?? ".";
  const pre = parsed?.prefix ?? prefix;
  const post = parsed?.suffix ?? suffix;

  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }

    let raf = 0;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(eased * target);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  const digits = n.toFixed(decimals).replace(".", sep);

  return (
    <span ref={ref} className="stat-anim" aria-label={pre + target.toFixed(decimals).replace(".", sep) + post}>
      <span aria-hidden="true">
        {pre}
        {digits}
        {post}
      </span>
    </span>
  );
}
