/** Platform / partner logos exported from the brand deck (white variants,
 *  made for dark backgrounds). Rendered as a slow marquee. */
const LOGOS = [
  "snowflake", "dbt", "azure", "ms-fabric", "data-factory", "azure-devops",
  "redshift", "tableau", "salesforce", "servicenow", "oracle", "qualtrics",
  "questionpro", "erwin", "cybersource", "capital-one",
];

import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { useLang } from "../../i18n/lang";

export function PlatformsStrip({ label, to }: { label?: ReactNode; to?: string }) {
  const { t } = useLang();
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section className="platforms" aria-label={t("Platforms we build on")}>
      <div className="platforms__label">
        {to ? (
          <Link to={to} className="platforms__link">
            {label ?? (<>{t("The platforms")} <em>{t("behind our work.")}</em></>)}
            <span className="platforms__link-arrow" aria-hidden="true">→</span>
          </Link>
        ) : (
          label ?? (<>{t("The platforms")} <em>{t("behind our work.")}</em></>)
        )}
      </div>
      <div className="platforms__viewport">
        <div className="platforms__track">
          {doubled.map((name, i) => (
            <img
              key={i}
              className="platforms__logo"
              src={import.meta.env.BASE_URL + `img/partners/${name}.png`}
              alt={i < LOGOS.length ? name.replace(/-/g, " ") : ""}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
