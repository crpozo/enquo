/**
 * Long-exposure star trails — radial light streaks rotating slowly around a
 * focal point. Inspired by sidewave.it's hero treatment. Pure SVG, no WebGL.
 *
 * Renders ~140 thin lines radiating from a center; the whole group rotates
 * over 120s for the time-lapse effect. Length and opacity vary per-line so
 * the field reads as a star field, not a fan.
 */

const LINE_COUNT = 140;

type Props = {
  /** SVG-space center X (default: 60% of width — slightly right of center). */
  cx?: number;
  /** SVG-space center Y (default: 30% — upper third). */
  cy?: number;
  /** Rotation period in seconds (default 120). */
  duration?: number;
};

export function StarTrails({ cx = 600, cy = 300, duration = 120 }: Props) {
  const lines = Array.from({ length: LINE_COUNT }, (_, i) => {
    // Deterministic pseudo-randomness from index
    const seed = (i * 9301 + 49297) % 233280;
    const rand = seed / 233280;
    const angle = (i / LINE_COUNT) * Math.PI * 2;

    const innerR = 60 + rand * 80; // start radius — keep a clear core
    const outerR = innerR + 80 + rand * 320; // varied trail length
    const opacity = 0.15 + ((i * 7) % 13) / 30; // 0.15 .. 0.6
    const stroke = (i * 5) % 23 === 0 ? "#F472B6" : (i * 11) % 17 === 0 ? "#C7B6FF" : "#FFFFFF";

    return {
      x1: cx + Math.cos(angle) * innerR,
      y1: cy + Math.sin(angle) * innerR,
      x2: cx + Math.cos(angle) * outerR,
      y2: cy + Math.sin(angle) * outerR,
      opacity,
      stroke,
      width: 0.4 + rand * 0.7,
    };
  });

  return (
    <svg
      className="star-trails"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="star-core" cx={cx} cy={cy} r="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.65)" />
          <stop offset="50%" stopColor="rgba(199, 182, 255, 0.25)" />
          <stop offset="100%" stopColor="rgba(199, 182, 255, 0)" />
        </radialGradient>
        <radialGradient id="star-fade" cx={cx} cy={cy} r="500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </radialGradient>
        <mask id="star-trails-mask">
          <rect width="1200" height="800" fill="url(#star-fade)" />
        </mask>
      </defs>

      {/* Soft glowing core where the streaks originate */}
      <circle cx={cx} cy={cy} r="60" fill="url(#star-core)" />

      {/* Rotating radial streaks */}
      <g
        className="star-trails__group"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          animation: `star-spin ${duration}s linear infinite`,
        }}
        mask="url(#star-trails-mask)"
      >
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={l.stroke}
            strokeWidth={l.width}
            strokeLinecap="round"
            opacity={l.opacity}
          />
        ))}
      </g>

      {/* Counter-rotating fainter layer for depth */}
      <g
        className="star-trails__group-b"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          animation: `star-spin ${duration * 1.6}s linear infinite reverse`,
          opacity: 0.5,
        }}
        mask="url(#star-trails-mask)"
      >
        {lines
          .filter((_, i) => i % 3 === 0)
          .map((l, i) => (
            <line
              key={"b-" + i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2 + (Math.random() - 0.5) * 40}
              y2={l.y2 + (Math.random() - 0.5) * 40}
              stroke={l.stroke}
              strokeWidth={l.width * 0.7}
              strokeLinecap="round"
              opacity={l.opacity * 0.7}
            />
          ))}
      </g>
    </svg>
  );
}

/**
 * Concentric pulse rings — Sidewave-style ripple emanating from a focal point.
 * Useful as a brand accent overlaid on the hero.
 */
type PulseProps = {
  cx?: number;
  cy?: number;
};

export function ConcentricPulse({ cx = 600, cy = 300 }: PulseProps) {
  const ringCount = 5;
  return (
    <svg
      className="concentric-pulse"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {Array.from({ length: ringCount }).map((_, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="20"
          fill="none"
          stroke="#C7B6FF"
          strokeWidth="1"
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: `pulse-ring 4.5s cubic-bezier(0.2, 0.7, 0.2, 1) ${i * 0.9}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}
