/**
 * Topic-themed poster art for ChapterIntro video placeholders.
 *
 * Each kind renders a layered abstract SVG that hints at the chapter topic so
 * the speaker-card visual reads as a deliberate "video coming here" placeholder
 * instead of an empty dark panel.
 */
export type ChapterPosterKind = "manifesto" | "practices" | "products" | "sectors";

type Props = { kind: ChapterPosterKind };

export function ChapterPoster({ kind }: Props) {
  return (
    <div className="poster" aria-hidden="true">
      <svg
        className="poster__svg"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="poster-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C7B6FF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#C026D3" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="poster-glow" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {kind === "manifesto" && <ManifestoArt />}
        {kind === "practices" && <PracticesArt />}
        {kind === "products" && <ProductsArt />}
        {kind === "sectors" && <SectorsArt />}

        {/* shared overlay glow */}
        <rect width="400" height="500" fill="url(#poster-glow)" />
      </svg>
    </div>
  );
}

/* ---------- Values: three mantra pillars rendered in the top portion ---------- */
function ManifestoArt() {
  const labels = ["HUMAN", "AGILITY", "EXPERTS"] as const;
  // Pillars sit in the upper third so the center stays clear for the play CTA.
  const pillarY = 130;
  return (
    <g>
      <line x1="40" y1={pillarY} x2="360" y2={pillarY} stroke="url(#poster-grad)" strokeWidth="1.2" opacity="0.55" />
      {labels.map((t, i) => (
        <g key={t} transform={`translate(${67 + i * 133}, ${pillarY})`}>
          <circle r="4" fill="url(#poster-grad)" />
          <circle r="22" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <text
            y="-32"
            textAnchor="middle"
            fill="rgba(255,255,255,0.62)"
            fontFamily="General Sans, sans-serif"
            fontSize="12"
            fontWeight="500"
            letterSpacing="2.5"
          >
            {`0${i + 1}`}
          </text>
          <text
            y="46"
            textAnchor="middle"
            fill="rgba(255,255,255,0.85)"
            fontFamily="General Sans, sans-serif"
            fontSize="12"
            fontWeight="500"
            letterSpacing="2.5"
          >
            {t}
          </text>
        </g>
      ))}
      {/* atmospheric strokes high above and well below center */}
      <path d="M 20 70  Q 200 30  380 80"  stroke="rgba(199,182,255,0.35)" strokeWidth="0.8" fill="none" />
      <path d="M 20 410 Q 200 460 380 405" stroke="rgba(244,114,182,0.3)"  strokeWidth="0.8" fill="none" />
      <path d="M 20 440 Q 200 480 380 435" stroke="rgba(199,182,255,0.2)"  strokeWidth="0.6" fill="none" />
    </g>
  );
}

/* ---------- Services: 6 nodes in a constellation (cleared from center) ---------- */
function PracticesArt() {
  // Pushed to top and bottom thirds to keep center clear for the play CTA.
  const nodes: Array<[number, number, string]> = [
    [80, 110, "01"],
    [200, 80, "02"],
    [320, 130, "03"],
    [80, 390, "04"],
    [200, 420, "05"],
    [320, 380, "06"],
  ];
  // Build a network of nearby edges — only within each cluster (top 0..2, bot 3..5)
  // so no edges cross through the center where the play CTA lives.
  const edges: Array<[number, number]> = [];
  const sameCluster = (a: number, b: number) =>
    (a < 3 && b < 3) || (a >= 3 && b >= 3);
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (!sameCluster(i, j)) continue;
      const [x1, y1] = nodes[i];
      const [x2, y2] = nodes[j];
      if (Math.hypot(x1 - x2, y1 - y2) < 180) edges.push([i, j]);
    }
  }
  return (
    <g>
      {edges.map(([a, b], i) => {
        const [x1, y1] = nodes[a];
        const [x2, y2] = nodes[b];
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(199,182,255,0.35)"
            strokeWidth="0.8"
          />
        );
      })}
      {nodes.map(([x, y, lbl], i) => (
        <g key={i} transform={`translate(${x}, ${y})`}>
          <circle r="20" fill="rgba(124,58,237,0.18)" stroke="rgba(199,182,255,0.55)" strokeWidth="1" />
          <circle r="5" fill="url(#poster-grad)" />
          <text
            y="36"
            textAnchor="middle"
            fill="rgba(255,255,255,0.65)"
            fontFamily="General Sans, sans-serif"
            fontSize="10"
            letterSpacing="2"
            fontWeight="500"
          >
            {lbl}
          </text>
        </g>
      ))}
    </g>
  );
}

/* ---------- Products: 7 staggered cards (top + bottom clusters) ---------- */
function ProductsArt() {
  // Two clusters (top + bottom) so the center stays clear for the play CTA.
  const cards: Array<[number, number, number]> = [
    // x, y, rotationDeg — top cluster
    [40, 70, -6],
    [110, 100, 4],
    [200, 75, -3],
    [275, 110, 6],
    // bottom cluster
    [60, 360, -4],
    [165, 390, 3],
    [255, 355, -7],
  ];
  return (
    <g>
      {cards.map(([x, y, rot], i) => (
        <g key={i} transform={`translate(${x}, ${y}) rotate(${rot})`}>
          <rect
            width="100"
            height="62"
            rx="6"
            fill="rgba(20,20,30,0.85)"
            stroke="rgba(199,182,255,0.4)"
            strokeWidth="1"
          />
          {/* product number */}
          <text
            x="10"
            y="20"
            fill="rgba(199,182,255,0.9)"
            fontFamily="General Sans, sans-serif"
            fontSize="9"
            letterSpacing="2"
            fontWeight="500"
          >
            {`03 / 0${i + 1}`}
          </text>
          {/* product name placeholder bar */}
          <rect x="10" y="28" width="60" height="6" rx="2" fill="rgba(255,255,255,0.65)" />
          <rect x="10" y="40" width="42" height="4" rx="1.5" fill="rgba(255,255,255,0.32)" />
          <rect x="10" y="48" width="32" height="4" rx="1.5" fill="rgba(255,255,255,0.2)" />
        </g>
      ))}
    </g>
  );
}

/* ---------- Industries: concentric arcs (rings only, no center label) ---------- */
function SectorsArt() {
  const cx = 200;
  const cy = 250;
  const rings = [80, 115, 150, 185, 220];
  const sectors = ["RTL", "ENG", "FIN", "GOV", "HLT", "TMT", "SPT"];
  return (
    <g>
      {/* radial guides — soft, no center dot */}
      {Array.from({ length: 12 }).map((_, i) => {
        const ang = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const inner = 50; // start outside the play CTA
        return (
          <line
            key={i}
            x1={cx + Math.cos(ang) * inner}
            y1={cy + Math.sin(ang) * inner}
            x2={cx + Math.cos(ang) * 230}
            y2={cy + Math.sin(ang) * 230}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.6"
          />
        );
      })}
      {/* rings */}
      {rings.map((r, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={i === rings.length - 1 ? "url(#poster-grad)" : "rgba(199,182,255,0.22)"}
          strokeWidth={i === rings.length - 1 ? 1.2 : 0.8}
          strokeDasharray={i % 2 ? "2 4" : "0"}
        />
      ))}
      {/* sector ticks around outermost ring */}
      {sectors.map((s, i) => {
        const ang = (i / sectors.length) * Math.PI * 2 - Math.PI / 2;
        const r = 220;
        const x = cx + Math.cos(ang) * r;
        const y = cy + Math.sin(ang) * r;
        return (
          <g key={s} transform={`translate(${x}, ${y})`}>
            <circle r="4" fill="url(#poster-grad)" />
            <text
              y={ang > 0 ? 18 : -10}
              textAnchor="middle"
              fill="rgba(255,255,255,0.75)"
              fontFamily="General Sans, sans-serif"
              fontSize="10"
              fontWeight="500"
              letterSpacing="2"
            >
              {s}
            </text>
          </g>
        );
      })}
    </g>
  );
}
