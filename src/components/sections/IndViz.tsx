import { useMemo } from "react";
import type { IndustryVizKind } from "../../data/enquo";

type Props = { kind: IndustryVizKind };

/** Small per-industry SVG decoration. Stable per mount (random "grid" pattern memoized). */
export function IndViz({ kind }: Props) {
  // Memoize the random `grid` pattern so it doesn't reshuffle on re-render.
  const gridPattern = useMemo(() => {
    if (kind !== "grid") return null;
    return Array.from({ length: 5 }, (_, r) =>
      Array.from({ length: 12 }, (_, c) => ({
        r,
        c,
        big: Math.random() > 0.7,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    ).flat();
  }, [kind]);

  switch (kind) {
    case "wave":
      return (
        <svg viewBox="0 0 200 80" preserveAspectRatio="none">
          <path
            d="M0,40 Q25,15 50,40 T100,40 T150,40 T200,40"
            stroke="white"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M0,55 Q25,30 50,55 T100,55 T150,55 T200,55"
            stroke="white"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
        </svg>
      );
    case "bars":
      return (
        <svg viewBox="0 0 200 80" preserveAspectRatio="none">
          {[20, 50, 30, 65, 40, 75, 35, 55, 45, 70].map((h, i) => (
            <rect key={i} x={i * 20 + 4} y={80 - h} width="12" height={h} fill="white" opacity="0.65" />
          ))}
        </svg>
      );
    case "candles":
      return (
        <svg viewBox="0 0 200 80" preserveAspectRatio="none">
          {(
            [
              [10, 25, 65, 40, 55],
              [30, 30, 70, 35, 60],
              [50, 20, 55, 30, 50],
              [70, 35, 75, 40, 65],
              [90, 25, 60, 30, 55],
              [110, 40, 70, 45, 50],
              [130, 30, 65, 35, 60],
              [150, 35, 75, 40, 55],
              [170, 20, 50, 25, 45],
              [190, 25, 60, 30, 50],
            ] as const
          ).map(([x, hiY, lowY, openY, closeY], i) => (
            <g key={i} stroke="white" strokeWidth="1">
              <line x1={x} y1={hiY} x2={x} y2={lowY} opacity="0.6" />
              <rect
                x={x - 4}
                y={Math.min(openY, closeY)}
                width="8"
                height={Math.abs(closeY - openY)}
                fill="white"
                opacity={i % 2 ? 0.8 : 0.3}
              />
            </g>
          ))}
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 200 80" preserveAspectRatio="none">
          {gridPattern!.map((d) => (
            <circle
              key={`${d.r}-${d.c}`}
              cx={d.c * 18 + 8}
              cy={d.r * 16 + 8}
              r={d.big ? 2.5 : 1.2}
              fill="white"
              opacity={d.opacity}
            />
          ))}
        </svg>
      );
    case "pulse":
      return (
        <svg viewBox="0 0 200 80" preserveAspectRatio="none">
          <polyline
            points="0,40 30,40 40,40 50,20 60,60 70,30 80,40 100,40 130,40 140,40 150,15 160,55 170,30 180,40 200,40"
            stroke="white"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
      );
    case "network": {
      const nodes: Array<[number, number]> = [
        [40, 20], [70, 50], [100, 18], [130, 55], [160, 25], [180, 50], [20, 55],
      ];
      return (
        <svg viewBox="0 0 200 80" preserveAspectRatio="none">
          {nodes.map(([x, y], i) => (
            <g key={i}>
              {nodes.slice(i + 1).map(([x2, y2], j) =>
                Math.hypot(x - x2, y - y2) < 60 ? (
                  <line
                    key={j}
                    x1={x}
                    y1={y}
                    x2={x2}
                    y2={y2}
                    stroke="white"
                    strokeWidth="0.6"
                    opacity="0.4"
                  />
                ) : null,
              )}
              <circle cx={x} cy={y} r="3" fill="white" opacity="0.85" />
            </g>
          ))}
        </svg>
      );
    }
    case "arc":
      return (
        <svg viewBox="0 0 200 80" preserveAspectRatio="none">
          <path d="M10,70 Q100,-20 190,70" stroke="white" strokeWidth="1.4" fill="none" />
          <circle cx="100" cy="14" r="3" fill="white" />
          <line
            x1="100"
            y1="14"
            x2="100"
            y2="70"
            stroke="white"
            strokeWidth="0.6"
            strokeDasharray="2 3"
            opacity="0.5"
          />
        </svg>
      );
    default:
      return null;
  }
}
