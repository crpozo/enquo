import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { NAV_ITEMS } from "../../data/nav";
import { useTheme } from "../../hooks/useTheme";
import { useLang } from "../../i18n/lang";
import { EnquoLogo } from "./EnquoLogo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const items = NAV_ITEMS;
  const { theme, toggle } = useTheme();
  const { lang, prefix, t, to, switchLang } = useLang();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Every page opens on a dark, imagery-led hero. While the nav floats over
  // it we keep the dark treatment (even in light mode) and only switch to the
  // theme's bar once the hero has scrolled past.
  const [overHero, setOverHero] = useState(true);

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
    <nav className={"nav" + (scrolled ? " is-scrolled" : "") + (overHero ? " is-over-hero" : "")}>
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
        <button
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
        </button>
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
