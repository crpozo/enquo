import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useReveal } from "../../hooks/useReveal";
import { useLang } from "../../i18n/lang";

/** Company proof points — the numbers behind the work. */
const POINTS = [
  { prefix: "$", value: 3, suffix: "B+", label: "Value delivered", tint: "teal" },
  { prefix: "", value: 30, suffix: "+", label: "Enterprise clients", tint: "rose" },
  { prefix: "", value: 98, suffix: "%", label: "Client retention", tint: "orange" },
];

/** Counts every number up from 0 the first time the block enters view. */
function useCountUp(active: boolean, to: number, dur = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, dur]);
  return n;
}

function Point({ p, active, delay }: { p: (typeof POINTS)[number]; active: boolean; delay: number }) {
  const n = useCountUp(active, p.value);
  return (
    <div className={"proof__num" + (active ? " is-in" : "")} data-tint={p.tint} style={{ transitionDelay: `${delay}ms` }}>
      <dt>
        <span className="proof__num-glow" aria-hidden="true" />
        {p.prefix}{n}{p.suffix}
      </dt>
      <dd>{p.label}</dd>
    </div>
  );
}

/**
 * Proven impact — big, coloured numbers with no boxes that count up as the
 * block enters view, followed by the invitation into the case studies.
 */
export function Proof() {
  const headRef = useReveal<HTMLDivElement>();
  const teaseRef = useReveal<HTMLDivElement>();
  const numsRef = useRef<HTMLDListElement | null>(null);
  const [active, setActive] = useState(false);
  const { t, tr } = useLang();
  const points = tr(POINTS);

  useEffect(() => {
    const el = numsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="proof section" id="proof">
      <div className="px-glow px-glow--how" data-parallax="0.08" aria-hidden="true" />
      <div className="wrap-lg">
        <div className="proof__head reveal" ref={headRef}>
          <span className="proof__eyebrow">{t("Proven impact")}</span>
          <h2 className="proof__title">
            {t("The numbers")} <em>{t("behind the work.")}</em>
          </h2>
          <p className="proof__sub">
            {t("Enquo delivers measurable outcomes across complex enterprise environments.")}
          </p>
        </div>

        <dl className="proof__nums" ref={numsRef}>
          {points.map((p, i) => (
            <Point key={p.label} p={p} active={active} delay={i * 140} />
          ))}
        </dl>

        <div className="proof__tease reveal" ref={teaseRef}>
          <div>
            <h3 className="proof__tease-title">
              {t("Want to see how 7 days of reporting became less than an hour?")}
            </h3>
            <p className="proof__tease-copy">
              {t("Explore the work behind the results and see how Enquo solves complex enterprise challenges in practice.")}
            </p>
          </div>
          <Link className="btn btn--primary" to="/case-studies">
            {t("Explore our case studies")}
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
