import type { ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";
import { ChapterPoster, type ChapterPosterKind } from "./ChapterPoster";

type Props = {
  num: string;
  kind: string;
  title: ReactNode;
  quote: string;
  byline: string;
  role: string;
  duration: string;
  /** Selects the poster art for the video placeholder. */
  vizKind: ChapterPosterKind;
  /** Short caption shown in the bottom poster strip (signals the video's pitch). */
  posterHint: string;
};

/**
 * Razorpay-style speaker/quote opener for a section.
 *
 * The left "speaker card" is a video placeholder. We render topic-themed poster
 * art behind a poster strip (kind · duration · watch CTA · hint line) so each
 * card reads as a deliberate "video coming here" frame instead of an empty
 * dark panel.
 */
export function ChapterIntro({
  num,
  kind,
  title,
  quote,
  byline,
  role,
  duration,
  vizKind,
  posterHint,
}: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div className="chapter reveal" ref={ref}>
      <div className="chapter__visual">
        <div className="chapter__visual-bg" />
        <div className="chapter__visual-grid" />

        <ChapterPoster kind={vizKind} />

        {/* Top strip: kind tag + duration timecode */}
        <div className="chapter__poster-top">
          <span className="chapter__tag">
            <span className="chapter__tag-dot" />
            {kind}
          </span>
          <span className="chapter__time">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            {duration}
          </span>
        </div>

        {/* Center: play CTA with WATCH label */}
        <button className="chapter__watch" aria-label={`Play intro · ${kind}`}>
          <span className="chapter__play">
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="chapter__watch-label">Watch the chapter</span>
        </button>

        {/* Bottom strip: hint caption + placeholder badge */}
        <div className="chapter__poster-bot">
          <span className="chapter__hint">{posterHint}</span>
          <span className="chapter__badge">Preview · 4K</span>
        </div>
      </div>

      <div>
        <div className="chapter__num">
          <span>{num}</span>
          <span className="slash" />
          <span>{kind}</span>
        </div>
        <h2 className="chapter__title">{title}</h2>
        <p className="chapter__quote">{quote}</p>
        <div className="chapter__byline">
          <strong>{byline}</strong> {role}
        </div>
      </div>
    </div>
  );
}
