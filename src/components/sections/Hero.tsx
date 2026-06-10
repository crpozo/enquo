import { useEffect, useRef } from "react";


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
          <h1 className="hero__title">
            <span>Design.</span>
            <span className="line2">
              <em className="accent">Build.</em>
            </span>
            <span>Run.</span>
            <span className="line2 stroke">One team.</span>
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
            The operational backbone of modern enterprises, built for the human
            rhythm. Human-driven data solutions, owned end-to-end by the partner
            who designed them. No handoffs.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#services">
              Explore our work
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a className="btn" href="#contact">Let's talk</a>
          </div>
          <dl className="hero__stats">
            <div>
              <dt>$3B+</dt>
              <dd>Value delivered across engagements</dd>
            </div>
            <div>
              <dt>30+</dt>
              <dd>Enterprise clients across 6 industries</dd>
            </div>
            <div>
              <dt>98%</dt>
              <dd>Client retention through multi-year programs</dd>
            </div>
          </dl>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span className="line" />
          <span>Scroll to see the lifecycle</span>
        </div>
      </div>
    </section>
  );
}
