import { Link } from "react-router-dom";

import { STAGES } from "../../data/services";
import { useLang } from "../../i18n/lang";

/** Enquo's social profiles (Follow column). */
const SOCIAL = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/enquotech",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M8 10.5V16M8 7.75v.01M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1 1 2.1 2.6V16" />
      </>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61572075207952",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M13.2 21v-7.6h2.3M10.4 13.4h5.1M13.2 21V9.8c0-1.3.8-2 2-2h1.3" />
      </>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/enquotech/",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.3 6.7v.01" />
      </>
    ),
  },
];

export function Footer() {
  const { t, tr } = useLang();
  const stages = tr(STAGES);
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <h3>Enquo</h3>
          <p>
            {t("A purpose-driven technology company passionate about using data and technology as a catalyst for positive change.")}
          </p>
          <div className="footer__addr">
            1270 Ave of the Americas
            <br />
            New York, NY 10020
            <br />
            <br />
            100 Challenger Road, Suite 101
            <br />
            Ridgefield Park, NJ 07660
          </div>
        </div>
        <div className="footer__col footer__col--services">
          <h4>{t("Services")}</h4>
          {stages.map((stage) => (
            <div className="footer__stage" key={stage.tag}>
              <Link className="footer__stage-name" to={`/services#${stage.tag.toLowerCase()}`}>
                {t(stage.tag)}
              </Link>
              <ul>
                {stage.cards.map((c) => (
                  <li key={c.title}>
                    <Link to="/services">{c.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__col">
          <h4>{t("Contact")}</h4>
          <ul>
            <li>contact@enquo.com</li>
            <li>(551) 258-4342</li>
            <li>Fax (551) 258-2451</li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>{t("Follow")}</h4>
          <ul className="footer__social">
            {SOCIAL.map((n) => (
              <li key={n.name}>
                <a href={n.href} target="_blank" rel="noopener noreferrer" aria-label={t(`Enquo on ${n.name}`)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {n.icon}
                  </svg>
                  {n.name}
                </a>
              </li>
            ))}
            <li>{t("Newsletter")}</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="meta">© 2026 Enquo · {t("Human driven data solutions")}</span>
        <div className="links">
          <a>{t("Cookies")}</a>
          <a>{t("Privacy")}</a>
          <a>{t("Terms")}</a>
          <a>{t("Accessibility")}</a>
        </div>
      </div>
    </footer>
  );
}
