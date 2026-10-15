import { useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "enquo-theme";

function readInitial(): Theme {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* storage unavailable */ }
  return "dark"; // brand default
}

/**
 * Light/dark switch persisted per visitor; applied as `data-theme` on <html>.
 * `force` overrides the applied theme for the current page (e.g. pages that
 * are always light) without touching the visitor's saved preference; it also
 * sets `data-page-theme` so those pages can be styled on their own.
 */
export function useTheme(force?: Theme) {
  const [theme, setTheme] = useState<Theme>(readInitial);

  useEffect(() => {
    try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = force ?? theme;
    if (force) root.dataset.pageTheme = force;
    else delete root.dataset.pageTheme;
  }, [theme, force]);

  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}
