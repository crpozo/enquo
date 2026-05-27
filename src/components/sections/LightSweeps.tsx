/**
 * Horizontal light beams — long-exposure light painting across the sky.
 * Inspired by sidewave.it's hero. Nearly-straight neon streaks (not curves),
 * high contrast, strong glow. Pure SVG + CSS.
 */

type Beam = {
  /** Vertical position in SVG units (0-800 viewBox). */
  y: number;
  /** Small sag amplitude (px) — keep tiny, almost straight. */
  sag: number;
  /** Stroke width — some thin (1-1.5), some hero beams (3-6). */
  w: number;
  /** Gradient id — different palettes for variety. */
  grad: "magenta" | "hotpink" | "white" | "lavender";
  /** Base opacity. */
  opacity: number;
  /** Drift animation duration (s). */
  dur: number;
  /** Animation delay (negative starts mid-loop). */
  delay: number;
  /** Whether to apply the heavy glow filter (big bright beams only). */
  glow?: boolean;
};

const BEAMS: Beam[] = [
  { y: 90,  sag: 6,  w: 1.2, grad: "white",    opacity: 0.6, dur: 28, delay: 0   },
  { y: 130, sag: 12, w: 5.5, grad: "hotpink",  opacity: 1.0, dur: 22, delay: 3,  glow: true },
  { y: 175, sag: 8,  w: 1.0, grad: "lavender", opacity: 0.55, dur: 31, delay: 6  },
  { y: 210, sag: 14, w: 6.5, grad: "magenta",  opacity: 1.0, dur: 19, delay: 1,  glow: true },
  { y: 250, sag: 5,  w: 0.8, grad: "white",    opacity: 0.45, dur: 35, delay: 8  },
  { y: 285, sag: 10, w: 3.5, grad: "hotpink",  opacity: 0.95, dur: 24, delay: 4, glow: true },
  { y: 325, sag: 7,  w: 1.5, grad: "magenta",  opacity: 0.7, dur: 27, delay: 2   },
  { y: 365, sag: 15, w: 4.5, grad: "hotpink",  opacity: 0.9, dur: 21, delay: 5,  glow: true },
  { y: 410, sag: 6,  w: 1.0, grad: "lavender", opacity: 0.5, dur: 33, delay: 7   },
  { y: 450, sag: 9,  w: 2.5, grad: "magenta",  opacity: 0.8, dur: 25, delay: 9   },
];

function beamPath(y: number, sag: number): string {
  // Nearly-straight horizontal line with a tiny sag in the middle so
  // it looks like real long-exposure light, not a CSS rule.
  const startX = -200;
  const endX = 2200;
  const midX = 1000;
  return `M ${startX} ${y - sag * 0.3} Q ${midX} ${y + sag}, ${endX} ${y - sag * 0.2}`;
}

export function LightSweeps() {
  return (
    <svg
      className="light-sweeps"
      viewBox="0 0 2000 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Hot magenta beam — strong center, fade at the ends */}
        <linearGradient id="lsw-magenta" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(192, 38, 211, 0)" />
          <stop offset="15%" stopColor="rgba(192, 38, 211, 0.7)" />
          <stop offset="38%" stopColor="rgba(244, 114, 182, 1)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
          <stop offset="62%" stopColor="rgba(244, 114, 182, 1)" />
          <stop offset="85%" stopColor="rgba(192, 38, 211, 0.7)" />
          <stop offset="100%" stopColor="rgba(192, 38, 211, 0)" />
        </linearGradient>
        {/* Hot pink beam — saturated, white core */}
        <linearGradient id="lsw-hotpink" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(244, 114, 182, 0)" />
          <stop offset="18%" stopColor="rgba(244, 114, 182, 0.85)" />
          <stop offset="45%" stopColor="rgba(255, 255, 255, 1)" />
          <stop offset="55%" stopColor="rgba(255, 255, 255, 1)" />
          <stop offset="82%" stopColor="rgba(244, 114, 182, 0.85)" />
          <stop offset="100%" stopColor="rgba(244, 114, 182, 0)" />
        </linearGradient>
        {/* Sharp white beam — high-key, thin, intense */}
        <linearGradient id="lsw-white" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(255, 255, 255, 0)" />
          <stop offset="35%" stopColor="rgba(255, 255, 255, 0.85)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
          <stop offset="65%" stopColor="rgba(255, 255, 255, 0.85)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>
        {/* Lavender soft accent */}
        <linearGradient id="lsw-lavender" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(199, 182, 255, 0)" />
          <stop offset="50%" stopColor="rgba(199, 182, 255, 0.7)" />
          <stop offset="100%" stopColor="rgba(199, 182, 255, 0)" />
        </linearGradient>

        {/* Strong neon glow — only applied to the thick "hero" beams */}
        <filter id="lsw-bigglow" x="-5%" y="-100%" width="110%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {BEAMS.map((b, i) => (
        <path
          key={i}
          className="light-sweeps__path"
          d={beamPath(b.y, b.sag)}
          stroke={`url(#lsw-${b.grad})`}
          strokeWidth={b.w}
          strokeLinecap="round"
          fill="none"
          opacity={b.opacity}
          filter={b.glow ? "url(#lsw-bigglow)" : undefined}
          style={{
            animation: `lsw-drift ${b.dur}s ease-in-out ${-b.delay}s infinite alternate`,
          }}
        />
      ))}
    </svg>
  );
}
