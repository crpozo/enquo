import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { NAV_ITEMS } from "../../data/nav";
import { EnquoLogo } from "./EnquoLogo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={"nav" + (scrolled ? " is-scrolled" : "")}>
      <EnquoLogo />

      <div className="nav__sections">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="nav__cta">
        {/* Every page ends with a FinalCTA whose id is "contact" — Lenis
            intercepts the hash link and smooth-scrolls there. */}
        <a className="btn btn--primary" href="#contact">
          Let&rsquo;s talk
          <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
