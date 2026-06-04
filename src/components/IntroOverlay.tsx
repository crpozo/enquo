import { useEffect, useState } from "react";

import { EnquoLogo } from "./chrome/EnquoLogo";

const SESSION_KEY = "enquo:intro:shown";

/**
 * Brand-mantra page-load overlay.
 *
 * Three words fade through (HUMAN · DRIVEN · DATA), the logo mark forms,
 * then the whole overlay dissolves into the hero. Click anywhere to skip.
 *
 * Plays once per tab (sessionStorage flag) so HMR / refreshes don't replay it
 * during dev. Skips immediately for reduced-motion users.
 */
export function IntroOverlay() {
  // Decide synchronously whether we should mount at all.
  const [active, setActive] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (window.sessionStorage.getItem(SESSION_KEY) === "1") return false;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (!active) return;
    // Lock scroll during intro.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const total = 3400; // ms, must match CSS keyframes total duration
    const t = window.setTimeout(() => {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setActive(false);
    }, total);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  if (!active) return null;

  const skip = () => {
    window.sessionStorage.setItem(SESSION_KEY, "1");
    setActive(false);
  };

  return (
    <div className="intro" role="presentation" onClick={skip}>
      <div className="intro__bg" aria-hidden="true" />
      <div className="intro__stage">
        <span className="intro__word intro__word--1">Human.</span>
        <span className="intro__word intro__word--2">Driven.</span>
        <span className="intro__word intro__word--3">Data.</span>
        <span className="intro__brand">
          <EnquoLogo static_ height={96} className="intro__brand-svg" />
        </span>
      </div>
      <button className="intro__skip" onClick={skip} type="button">
        Skip
      </button>
    </div>
  );
}
