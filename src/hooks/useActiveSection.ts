import { useEffect, useState } from "react";
import { SECTIONS } from "../data/sections";

/** Scroll-spy returning the id of the section currently dominant in the viewport. */
export function useActiveSection(): string {
  const [active, setActive] = useState<string>("intro");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return active;
}
