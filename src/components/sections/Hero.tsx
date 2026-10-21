import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useLang } from "../../i18n/lang";


export type HeroVariant = "manifesto" | "editorial" | "promise";

type Props = { variant?: HeroVariant };

/**
 * Hero background video — self-hosted in /public/videos. Phones get a 720p
 * cut and a 960px poster; the source is picked before `src` is set, so only
 * one file is ever requested. Vite's BASE_URL prefix makes the paths work in
 * dev (`/`) and on GitHub Pages (`/enquo/`).
 */
const BASE = import.meta.env.BASE_URL;
const NARROW = "(max-width: 760px)";
const HERO_MEDIA = {
  wide: { video: BASE + "videos/hero.mp4", poster: BASE + "img/heroes/home-hero.webp" },
  narrow: { video: BASE + "videos/hero-720.mp4", poster: BASE + "img/heroes/home-hero-960.webp" },
};
/** Visitor's pause choice for this session ("1" paused, "0" playing). */
const PAUSE_KEY = "enquo-hero-video-paused";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function readPaused(): boolean {
  if (prefersReducedMotion()) return true;
  try { return sessionStorage.getItem(PAUSE_KEY) === "1"; } catch { return false; }
}

export function Hero({ variant = "manifesto" }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { t } = useLang();
  const [media] = useState(() =>
    typeof window !== "undefined" && window.matchMedia?.(NARROW).matches ? HERO_MEDIA.narrow : HERO_MEDIA.wide,
  );
  // Reduced motion: never autoplays, the poster stands in (WCAG 2.2.2 /
  // 2.3.3). Otherwise it plays unless the visitor paused it this session.
  const [paused, setPaused] = useState(readPaused);

  // Some browsers (esp. Safari) won't honor `autoplay` when the element is
  // hidden during mount or wrapped in transitions; calling play() once the
  // video is ready fixes those cases. Pausing is applied the same way.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) { v.pause(); return; }
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => { /* ignore */ });
    };
    if (v.readyState >= 2) tryPlay();
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
  }, [paused]);

  const togglePaused = () => {
    setPaused((was) => {
      try { sessionStorage.setItem(PAUSE_KEY, was ? "0" : "1"); } catch { /* storage unavailable */ }
      return !was;
    });
  };

  return (
    <section className="hero section" id="intro">
      <div className="hero__bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__video"
          src={media.video}
          poster={media.poster}
          autoPlay={!paused}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
        />
        <div className="hero__video-tint" />
        <div className="hero__grain" />
        <div className="hero__grid" />
      </div>

      <div className="hero__inner">

        {variant === "manifesto" && (
          <h1 className="hero__title hero__title--sentence">
            <span className="line">
              {t("We")} <em className="accent">{t("design, build, and run")}</em> {t("intelligent systems across your enterprise.")}
            </span>
          </h1>
        )}
        {variant === "editorial" && (
          <h1 className="hero__title">
            <span>passionate</span>
            <span className="line2">
              <em className="accent">about</em> data
            </span>
            <span className="stroke">&amp; technology.</span>
          </h1>
        )}
        {variant === "promise" && (
          <h1 className="hero__title">
            <span>we unlock</span>
            <span className="line2">
              <em className="accent">true</em>
            </span>
            <span className="stroke">potential.</span>
          </h1>
        )}

        <div className="hero__lead">
          <p className="hero__lead-text">
            {t("Enquo connects data, applications, automation, and AI into systems built for production and owned through operation.")}
          </p>
          <div className="hero__ctas">
            <Link className="btn btn--primary" to="/services">
              {t("Explore our services")}
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link className="btn" to="/case-studies">{t("See our work")}</Link>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span className="line" />
          <span>{t("Scroll to see the lifecycle")}</span>
        </div>
      </div>

      <button
        type="button"
        className="hero__video-toggle"
        onClick={togglePaused}
        aria-label={paused ? t("Play background video") : t("Pause background video")}
      >
        {paused ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
        )}
      </button>
    </section>
  );
}
