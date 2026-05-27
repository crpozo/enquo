import { SECTIONS } from "../../data/sections";
import { useActiveSection } from "../../hooks/useActiveSection";

export function SideIndex() {
  const active = useActiveSection();
  return (
    <aside className="side-index" aria-label="Page sections">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={"#" + s.id}
          className={"side-index__item" + (active === s.id ? " active" : "")}
        >
          <span className="dot" />
          <span>
            {s.num} / {s.short}
          </span>
        </a>
      ))}
    </aside>
  );
}
