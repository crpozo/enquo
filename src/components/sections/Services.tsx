import { ENQUO_SERVICES, type Service } from "../../data/enquo";
import { useReveal } from "../../hooks/useReveal";
import { ChapterIntro } from "./ChapterIntro";

type Group = {
  sub: string;
  title: string;
  kind: "core" | "frontier" | "ops";
  indexes: number[];
};

const SVC_GROUPS: Group[] = [
  { sub: "02/A", title: "Core Practices",     kind: "core",     indexes: [0, 1, 2] },
  { sub: "02/B", title: "Emerging Frontiers", kind: "frontier", indexes: [3, 4] },
  { sub: "02/C", title: "Run Operations",     kind: "ops",      indexes: [5] },
];

function SvcGroup({ group, services }: { group: Group; services: Service[] }) {
  const gridRef = useReveal<HTMLDivElement>();
  return (
    <div className="subsection">
      <div className="subsection__head">
        <span className="subsection__num">{group.sub}</span>
        <h3 className="subsection__title">{group.title}</h3>
        <span className="subsection__count">{String(services.length).padStart(2, "0")} services</span>
      </div>
      <div className="svc-grid" ref={gridRef}>
        {services.map((s, i) => (
          <article className="svc" key={s.num}>
            <div className="svc__head">
              <span className="svc__num">
                {group.sub} · {String(i + 1).padStart(2, "0")}
              </span>
              <span>Service</span>
            </div>
            <div className="svc__icon">{s.icon}</div>
            <h3 className="svc__title">{s.title}</h3>
            <p className="svc__desc">{s.desc}</p>
            <div className="svc__cta">
              <span>Read more</span>
              <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className="services section" id="services">
      <div className="wrap-lg">
        <div className="sec-label">
          <span className="num">02 / Services</span>
          <span>What we do</span>
          <span className="dash" />
        </div>

        <ChapterIntro
          num="02 / Services"
          kind="Practice Overview"
          title={<>Six interlocking <em>practices.</em></>}
          quote="We are ready to unlock your true potential, discovering the most optimal, approachable and trustworthy tech and data solutions."
          byline="Service Architecture"
          role="Six practices, one outcome"
          duration="03:12"
          vizKind="practices"
          posterHint="Six practices, three sub-groups, one outcome."
        />

        {SVC_GROUPS.map((group) => {
          const groupServices = group.indexes.map((i) => ENQUO_SERVICES[i]);
          return <SvcGroup key={group.sub} group={group} services={groupServices} />;
        })}
      </div>
    </section>
  );
}
