import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useLang } from "../../i18n/lang";


export type HeroVariant = "manifesto" | "editorial" | "promise";

type Props = { variant?: HeroVariant };

/**
 * Hero background video — self-hosted in /public/videos/hero.mp4.
 * Vite's BASE_URL prefix makes this work both in dev (`/`) and on GitHub
 * Pages (`/enquo/`). Swap the filename if you want to A/B different clips.
 *
 * Heads up: the file is currently 43 MB (4K source). Consider compressing
 * to 1080p H.264 (~8 MB) for better first-paint performance.
 */
const HERO_VIDEO_URL = import.meta.env.BASE_URL + "videos/hero.mp4";

export function Hero({ variant = "manifesto" }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { t } = useLang();

  // Defensive: some browsers (esp. Safari) won't honor the `autoplay` attribute
  // when the element is hidden during initial mount or wrapped in transitions.
  // Calling play() once the video is ready is harmless and fixes those cases.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => { /* ignore */ });
    };
    if (v.readyState >= 2) tryPlay();
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
  }, []);

  return (
    <section className="hero section" id="intro">
      <div className="hero__bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__video"
          src={HERO_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        />
        <div className="hero__video-tint" />

        <div className="hero__aurora">
          <div className="hero__aurora-layer hero__aurora-layer--a" />
          <div className="hero__aurora-layer hero__aurora-layer--b" />
          <div className="hero__aurora-layer hero__aurora-layer--c" />
        </div>
        <div className="hero__grain" />
        <div className="hero__grid" />
      </div>

      <div className="hero__inner">

        {variant === "manifesto" && (
          <h1 className="hero__title hero__title--sentence">
            <span className="hero__mantra">{t("Design")} · {t("Build")} · {t("Run")}</span>
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
    </section>
  );
}
