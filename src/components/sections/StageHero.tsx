import { useReveal } from "../../hooks/useReveal";
import type { Stage } from "../../data/services";

/* Design → turquesa · Build → rosado · Run → naranja */
const TINT: Record<Stage["tag"], "teal" | "rose" | "orange"> = {
  Design: "teal",
  Build: "rose",
  Run: "orange",
};

/**
 * Generated motif per stage — pure SVG so it ships with no asset files.
 * Design: blueprint arcs · Build: assembling dot-grid · Run: live signal.
 */
function Motif({ tag }: { tag: Stage["tag"] }) {
  if (tag === "Design") {
    return (
      <svg className="stage-hero__motif" viewBox="0 0 400 220" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
        {[44, 88, 132, 176, 220].map((r, i) => (
          <circle key={r} cx="340" cy="210" r={r} fill="none" stroke="#fff" strokeOpacity="0.16" strokeWidth="1">
            <animate attributeName="r" values={`${r};${r + 10};${r}`} dur={`${4 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    );
  }
  if (tag === "Build") {
    return (
      <svg className="stage-hero__motif" viewBox="0 0 400 220" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
        {Array.from({ length: 6 }).flatMap((_, c) =>
          Array.from({ length: 4 }).map((__, r) => (
            <rect key={`${c}-${r}`} x={250 + c * 26} y={40 + r * 40} width="14" height="14" rx="2" fill="#fff" fillOpacity="0.14">
              <animate attributeName="fill-opacity" values="0.05;0.28;0.05" dur={`${2.4 + ((c + r) % 4) * 0.5}s`} repeatCount="indefinite" />
            </rect>
          )),
        )}
      </svg>
    );
  }
  return (
    <svg className="stage-hero__motif" viewBox="0 0 400 220" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 130 L110 130 L138 70 L166 180 L196 110 L224 130 L400 130"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.24"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="14 8"
      >
        <animate attributeName="stroke-dashoffset" values="44;0" dur="1.6s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

export function StageHero({ stage }: { stage: Stage }) {
  const ref = useReveal<HTMLDivElement>();
  const tint = TINT[stage.tag];
  const mediaSrc = stage.media ? import.meta.env.BASE_URL + stage.media.src : null;

  return (
    <div className="stage-hero reveal" data-tint={tint} ref={ref}>
      {mediaSrc ? (
        <div className="stage-hero__media" aria-hidden="true">
          {stage.media!.type === "video" ? (
            <video src={mediaSrc} autoPlay muted loop playsInline preload="auto" />
          ) : (
            <img src={mediaSrc} alt="" />
          )}
        </div>
      ) : (
        <div className="stage-hero__art" aria-hidden="true">
          <div className="stage-hero__grad" />
          <div className="stage-hero__grid" />
          <div className="stage-hero__orb stage-hero__orb--a" data-parallax="0.05" />
          <div className="stage-hero__orb stage-hero__orb--b" />
          <Motif tag={stage.tag} />
          <span className="stage-hero__num">{stage.num}</span>
        </div>
      )}

      <div className="stage-hero__scrim" aria-hidden="true" />

      <div className="stage-hero__content">
        <h2 className="stage-hero__statement">{stage.statement}</h2>
        <div className="stage-hero__result">
          <span className="stage-hero__result-eyebrow">Result from our work</span>
          <div className="stage-hero__result-row">
            <strong className="stage-hero__result-value">{stage.metricValue}</strong>
            <span className="stage-hero__result-rule" aria-hidden="true" />
            <p className="stage-hero__result-label">{stage.metricLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
