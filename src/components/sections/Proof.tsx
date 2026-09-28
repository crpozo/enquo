import { Link } from "react-router-dom";

import { useReveal } from "../../hooks/useReveal";
import { useLang } from "../../i18n/lang";

/** Company proof points — the numbers behind the work. */
const POINTS = [
  { value: "$3B+", label: "Value delivered", tint: "teal" },
  { value: "30+", label: "Enterprise clients", tint: "rose" },
  { value: "98%", label: "Client retention", tint: "orange" },
];

/**
 * Proven impact — big, coloured numbers with no boxes, followed by the
 * invitation into the case studies.
 */
export function Proof() {
  const headRef = useReveal<HTMLDivElement>();
  const numsRef = useReveal<HTMLDListElement>();
  const teaseRef = useReveal<HTMLDivElement>();
  const { t, tr } = useLang();
  const points = tr(POINTS);

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

        <dl className="proof__nums reveal" ref={numsRef}>
          {points.map((p) => (
            <div className="proof__num" data-tint={p.tint} key={p.value}>
              <dt>{p.value}</dt>
              <dd>{p.label}</dd>
            </div>
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
