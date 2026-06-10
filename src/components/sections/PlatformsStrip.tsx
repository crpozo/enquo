/** Platform / partner logos exported from the brand deck (white variants,
 *  made for dark backgrounds). Rendered as a slow marquee. */
const LOGOS = [
  "snowflake", "dbt", "azure", "ms-fabric", "data-factory", "azure-devops",
  "redshift", "tableau", "salesforce", "servicenow", "oracle", "qualtrics",
  "questionpro", "erwin", "cybersource", "capital-one",
];

export function PlatformsStrip() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section className="platforms" aria-label="Platforms we build on">
      <div className="platforms__label">
        The platforms we <em>design, build and run on</em>
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
