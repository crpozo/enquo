import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { NAV_ITEMS } from "../../data/nav";
import { useTheme } from "../../hooks/useTheme";
import { stripPrefix, useLang } from "../../i18n/lang";
import { EnquoLogo } from "./EnquoLogo";

// Pages that are always light (white nav and page) whatever the visitor's
// theme; the theme toggle is hidden there.
const LIGHT_NAV_PATHS = new Set(["/services", "/industries", "/careers"]);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const items = NAV_ITEMS;
  const { lang, prefix, t, to, switchLang } = useLang();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const lightNav = LIGHT_NAV_PATHS.has(stripPrefix(pathname));
  const { theme, toggle } = useTheme(lightNav ? "light" : undefined);

  // Every page opens on a dark, imagery-led hero. While the nav floats over
  // it we keep the dark treatment (even in light mode) and only switch to the
  // theme's bar once the hero has scrolled past.
  const [overHero, setOverHero] = useState(true);
  const navRef = useRef<HTMLElement | null>(null);

  // Publish the nav's real height (it grows when items wrap) as --nav-h on
  // <html>, so pages can keep their content clear of the fixed bar.
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty("--nav-h", `${el.offsetHeight}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const hero = document.querySelector<HTMLElement>(".hero, .page-hero, .demo-step--intro");
      setOverHero(hero ? hero.getBoundingClientRect().bottom > 80 : false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // "Let's talk": scroll to the closing CTA when the page has one, otherwise
  // go to the home page's CTA (the banner is intentionally not on every page).
  const onTalk = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    navigate((prefix || "/") + "#contact");
  };

  return (
    <nav
      ref={navRef}
      className={
        "nav" +
        (scrolled ? " is-scrolled" : "") +
        (lightNav ? " nav-light-mode" : overHero ? " is-over-hero" : "")
      }
    >
      <EnquoLogo />

      <div className="nav__sections">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={to(item.path)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t(item.label)}
          </NavLink>
        ))}
      </div>

      <div className="nav__cta">
        <button
          type="button"
          className="nav__lang"
          onClick={switchLang}
          aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
          title={lang === "es" ? "English" : "Español"}
        >
          <span className={lang === "en" ? "is-on" : ""}>EN</span>
          <i aria-hidden="true" />
          <span className={lang === "es" ? "is-on" : ""}>ES</span>
        </button>
        {!lightNav && <button
          type="button"
          className="nav__theme"
          onClick={toggle}
          aria-label={theme === "dark" ? t("Switch to light mode") : t("Switch to dark mode")}
          title={theme === "dark" ? t("Light mode") : t("Dark mode")}
        >
          {theme === "dark" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>}
        <a className="btn btn--primary" href="#contact" onClick={onTalk}>
          {t("Let’s talk")}
          <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
