import { useLocation } from "react-router-dom";

import { useReveal } from "../../hooks/useReveal";

/** The closing CTA is deliberately not on every page — only where a visitor
 *  is most likely ready to talk. Other pages rely on the nav's "Let's talk". */
const SHOW_ON = ["/", "/services", "/industries", "/who-we-are"];

export function FinalCTA() {
  const ref = useReveal<HTMLDivElement>();
  const { pathname } = useLocation();
  const path = pathname.replace(/^\/wireframe/, "") || "/";
  if (!SHOW_ON.includes(path)) return null;

  return (
    <section className="cta section" id="contact">
      <div className="cta__art" aria-hidden="true">
        <img
          src={import.meta.env.BASE_URL + "img/cta-hand.webp"}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="wrap-lg">
        <div className="cta__inner reveal" ref={ref}>
          <h2 className="cta__title">
            One Team. One Partner.
            <br />
            <em>One Outcome.</em>
          </h2>
          <p className="cta__sub">
            30 minutes with our leadership team. If we can't shorten your
            time-to-production, we'll tell you who can. We respond within one
            business day — global teams, local time.
          </p>
          <div className="cta__actions">
            <a className="btn btn--primary" href="mailto:contact@enquo.com">
              Book a strategy discussion
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a className="btn" href="mailto:contact@enquo.com">contact@enquo.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
