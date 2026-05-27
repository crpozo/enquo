import { useEffect, useRef } from "react";

import { ConcentricPulse, StarTrails } from "./StarTrails";

export type HeroVariant = "manifesto" | "editorial" | "promise";

type Props = { variant?: HeroVariant };

/**
 * Hero background video — swappable.
 *
 * Replace with your own self-hosted MP4 for production. Requirements:
 *   - H.264 MP4 (best cross-browser support); WebM optional as a <source> sibling
 *   - 1080p max (don't ship 4K to the browser — bandwidth waste)
 *   - 8–20s seamless loop, no audio track
 *   - Dark, abstract, slow motion (the aurora + overlay tint it purple)
 *
 * The default below is a free Pexels CDN clip. Browsers that block autoplay
 * or fail to load it gracefully degrade to the animated aurora behind.
 */
const HERO_VIDEO_URL =
  "https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4";

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
        <StarTrails cx={780} cy={260} duration={140} />
        <ConcentricPulse cx={780} cy={260} />
        <div className="hero__grain" />
        <div className="hero__grid" />
      </div>

      <div className="hero__inner">
        <div className="hero__meta">
          <div className="hero__meta-left">
            <span className="pulse" />
            <span>Sprint '26 · New York · New Jersey</span>
          </div>
          <div className="hero__meta-right">
            A purpose driven
            <br />
            technology &amp; data company
          </div>
        </div>

        {variant === "manifesto" && (
          <h1 className="hero__title">
            <span>Human</span>
            <span className="line2">
              <em className="accent">driven</em>
            </span>
            <span>data</span>
            <span className="line2 stroke">solutions.</span>
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
            We use data and technology as catalysts for positive change — pairing
            world-class expertise with the humility to ask better questions. The
            future is not loud, it is built.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#services">
              Explore our work
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a className="btn" href="#contact">Get a quote</a>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span className="line" />
          <span>Scroll to see 20+ capabilities</span>
        </div>
      </div>
    </section>
  );
}
