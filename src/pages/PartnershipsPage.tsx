import { PageHeroArt } from "../components/sections/PageHeroArt";
import { PlatformsStrip } from "../components/sections/PlatformsStrip";
import { useReveal } from "../hooks/useReveal";
import { useLang } from "../i18n/lang";

/**
 * Partnerships — the platforms and companies Enquo works with, and the two
 * doors in: businesses looking for a partner, partners looking to join.
 */
export function PartnershipsPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const introRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();
  const { t } = useLang();

  return (
    <div className="partners-page">
      <section className="page-hero section" id="top">
        <PageHeroArt src="img/who/team.webp" />
        <div className="wrap-lg">
          <div className="page-hero__inner reveal" ref={heroRef}>
            <h1 className="page-hero__title">
              {t("Better work happens when the right teams")}
              <br />
              <em>{t("work together.")}</em>
            </h1>
            <p className="page-hero__lead">
              {t("Enquo partners with the platforms and companies that help businesses move with confidence — bringing the right capabilities together to design, build, and run what matters most.")}
            </p>
          </div>
        </div>
      </section>

      <section className="section page-partners__intro" id="what-we-do">
        <div className="wrap-lg">
          <div className="page-partners__grid reveal" ref={introRef}>
            <div>
              <span className="page-partners__eyebrow">{t("What we do")}</span>
              <h2 className="page-partners__title">
                {t("We connect technology, expertise, and execution around")}{" "}
                <em>{t("what your business needs.")}</em>
              </h2>
            </div>
            <p className="page-partners__copy">
              {t("Our partnerships extend Enquo’s capabilities across data, applications, AI, integration, and operations, giving teams access to the platforms and expertise needed at every stage of the technology lifecycle.")}
            </p>
          </div>
        </div>
      </section>

      <section className="page-partners__strip" id="partners">
        <PlatformsStrip />
      </section>

      <section className="section page-partners__cta" id="contact">
        <div className="wrap-lg">
          <div className="page-partners__cta-grid reveal" ref={ctaRef}>
            <div>
              <p className="page-partners__lede">
                {t("Whether you’re starting from the ground up or optimizing what’s already running, we help turn technology into lasting operational value.")}
              </p>
              <h2 className="page-partners__title">
                {t("Let’s build")} <em>{t("what’s next.")}</em>
              </h2>
              <p className="page-partners__copy">
                {t("Whether you’re looking for the right technology partner or exploring what we could build together, we’d like to talk.")}
              </p>
            </div>

            <div className="page-partners__doors">
              <a className="page-partners__door" href="mailto:contact@enquo.com?subject=Let%27s%20talk">
                <span className="page-partners__door-label">{t("For businesses")}</span>
                <span className="page-partners__door-cta">
                  {t("Let’s talk")}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a className="page-partners__door" href="mailto:contact@enquo.com?subject=Partner%20with%20Enquo">
                <span className="page-partners__door-label">{t("For potential partners")}</span>
                <span className="page-partners__door-cta">
                  {t("Partner with Enquo")}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
