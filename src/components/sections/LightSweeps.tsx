/**
 * Horizontal light sweeps — long-exposure light painting across the sky.
 * Inspired by sidewave.it's hero treatment (the second variant with horizontal
 * neon streaks). Pure SVG + CSS, no WebGL.
 *
 * Renders ~7 curved horizontal paths with gradient strokes, each independently
 * animated with subtle horizontal drift + opacity pulse so the field reads as
 * continuous motion without being noisy.
 */

type Sweep = {
  /** Vertical position in SVG units (0-800 viewBox) */
  y: number;
  /** Wave amplitude — controls how curved the line is */
  amp: number;
  /** Stroke width */
  w: number;
  /** Animation duration in seconds */
  dur: number;
  /** Animation phase offset */
  delay: number;
  /** Which gradient to use */
  gradient: "purple" | "pink" | "white" | "soft";
  /** Base opacity */
  opacity: number;
};

const SWEEPS: Sweep[] = [
  { y: 120, amp: 30, w: 2.5, dur: 22, delay: 0,   gradient: "pink",   opacity: 0.85 },
  { y: 160, amp: 22, w: 1.2, dur: 28, delay: 4,   gradient: "white",  opacity: 0.55 },
  { y: 200, amp: 38, w: 3.5, dur: 19, delay: 1.5, gradient: "purple", opacity: 0.95 },
  { y: 240, amp: 18, w: 1.0, dur: 31, delay: 7,   gradient: "soft",   opacity: 0.45 },
  { y: 290, amp: 45, w: 4.2, dur: 25, delay: 2.5, gradient: "pink",   opacity: 0.8  },
  { y: 340, amp: 25, w: 1.5, dur: 33, delay: 6,   gradient: "white",  opacity: 0.6  },
  { y: 400, amp: 30, w: 2.0, dur: 27, delay: 3,   gradient: "purple", opacity: 0.7  },
  { y: 470, amp: 20, w: 1.0, dur: 35, delay: 8,   gradient: "soft",   opacity: 0.5  },
];

function buildPath(y: number, amp: number): string {
  // A smooth wavy path that extends past the viewBox so the drift looks endless
  const startX = -200;
  const endX = 2200;
  const midX1 = 500;
  const midX2 = 1200;
  const midX3 = 1700;
  return [
    `M ${startX} ${y}`,
    `Q ${midX1} ${y - amp}, ${midX2} ${y + amp * 0.4}`,
    `T ${midX3} ${y - amp * 0.3}`,
    `T ${endX} ${y + amp * 0.2}`,
  ].join(" ");
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
        <linearGradient id="lsw-purple" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(124, 58, 237, 0)" />
          <stop offset="22%" stopColor="rgba(124, 58, 237, 0.6)" />
          <stop offset="50%" stopColor="rgba(192, 38, 211, 1)" />
          <stop offset="78%" stopColor="rgba(244, 114, 182, 0.7)" />
          <stop offset="100%" stopColor="rgba(244, 114, 182, 0)" />
        </linearGradient>
        <linearGradient id="lsw-pink" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(244, 114, 182, 0)" />
          <stop offset="28%" stopColor="rgba(244, 114, 182, 0.65)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.95)" />
          <stop offset="72%" stopColor="rgba(192, 38, 211, 0.7)" />
          <stop offset="100%" stopColor="rgba(124, 58, 237, 0)" />
        </linearGradient>
        <linearGradient id="lsw-white" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(255, 255, 255, 0)" />
          <stop offset="40%" stopColor="rgba(255, 255, 255, 0.55)" />
          <stop offset="60%" stopColor="rgba(255, 255, 255, 0.55)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>
        <linearGradient id="lsw-soft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(199, 182, 255, 0)" />
          <stop offset="50%" stopColor="rgba(199, 182, 255, 0.5)" />
          <stop offset="100%" stopColor="rgba(199, 182, 255, 0)" />
        </linearGradient>
        {/* Glow filter for the brightest sweeps */}
        <filter id="lsw-glow" x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {SWEEPS.map((s, i) => (
        <path
          key={i}
          className="light-sweeps__path"
          d={buildPath(s.y, s.amp)}
          stroke={`url(#lsw-${s.gradient})`}
          strokeWidth={s.w}
          strokeLinecap="round"
          fill="none"
          opacity={s.opacity}
          filter={s.w > 2 ? "url(#lsw-glow)" : undefined}
          style={{
            animation: `lsw-drift ${s.dur}s ease-in-out ${-s.delay}s infinite alternate`,
          }}
        />
      ))}
    </svg>
  );
}
