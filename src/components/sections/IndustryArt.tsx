import { useState } from "react";

import type { Industry, IndustryVizKind } from "../../data/enquo";

/**
 * Per-industry thematic art for the home Industries tiles.
 *
 * No photos in the repo, so each sector gets a themed icon over a sector-tinted
 * gradient + halftone texture. If an industry sets `image`, that real cover is
 * used instead (drop a file in /public/industries and reference it).
 */

/* A recognizable line icon per sector, keyed by the industry's viz kind. */
function ThemeIcon({ viz }: { viz: IndustryVizKind }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "#fff",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (viz) {
    case "wave": // Consumer, Retail & Logistics — shopping bag
      return (
        <svg {...common}>
          <path d="M13 17h22l-2 22H15z" />
          <path d="M19 17v-3a5 5 0 0 1 10 0v3" />
          <path d="M19 23a5 5 0 0 0 10 0" />
        </svg>
      );
    case "bars": // Energy & Industrial — power bolt
      return (
        <svg {...common}>
          <path d="M26 6 14 27h9l-2 15 14-22h-9z" />
        </svg>
      );
    case "candles": // Financial Services — upward trend
      return (
        <svg {...common}>
          <path d="M8 40h32" />
          <path d="M10 32l9-8 7 5 12-14" />
          <path d="M31 15h8v8" />
        </svg>
      );
    case "grid": // Government & Public Sector — institutional building
      return (
        <svg {...common}>
          <path d="M8 20 24 9l16 11" />
          <path d="M11 20v15M19 20v15M29 20v15M37 20v15" />
          <path d="M7 39h34" />
        </svg>
      );
    case "pulse": // Health Care — heart + pulse
      return (
        <svg {...common}>
          <path d="M24 39S9 30 9 19a8 8 0 0 1 15-3 8 8 0 0 1 15 3c0 11-15 20-15 20z" />
          <path d="M15 24h5l3-5 3 9 2-4h5" />
        </svg>
      );
    case "network": // Tech, Telecom & Media — microchip
      return (
        <svg {...common}>
          <rect x="16" y="16" width="16" height="16" rx="2" />
          <circle cx="24" cy="24" r="3" />
          <path d="M20 16v-5M28 16v-5M20 37v-5M28 37v-5M16 20h-5M16 28h-5M37 20h-5M37 28h-5" />
        </svg>
      );
    case "arc": // Sports — trophy
      return (
        <svg {...common}>
          <path d="M17 9h14v9a7 7 0 0 1-14 0z" />
          <path d="M17 12h-5v3a5 5 0 0 0 5 5M31 12h5v3a5 5 0 0 1-5 5" />
          <path d="M24 25v6M19 39h10M21 39l1-8h4l1 8" />
        </svg>
      );
    default:
      return null;
  }
}

export function IndustryArt({ ind }: { ind: Industry }) {
  const [imgFailed, setImgFailed] = useState(false);
  const img = ind.image ? import.meta.env.BASE_URL + ind.image : null;
  const showImage = img && !imgFailed;

  return (
    <>
      {/* Themed art is always rendered, so a missing/failed photo degrades to it. */}
      <div className="ind-sq__grad" />
      <div className="ind-sq__halftone" />
      <div className="ind-sq__icon">
        <ThemeIcon viz={ind.viz} />
      </div>

      {showImage && (
        <img
          className="ind-sq__img"
          src={img}
          alt=""
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      )}
    </>
  );
}
