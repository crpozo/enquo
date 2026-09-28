import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ES } from "./es";

export type Lang = "en" | "es";

/** Language is carried by the URL: /es/... is Spanish, everything else English. */
export function langFromPath(pathname: string): Lang {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

/** Path with any language / wireframe prefix removed ("/es/services" → "/services"). */
export function stripPrefix(pathname: string): string {
  const p = pathname.replace(/^\/es(?=\/|$)/, "").replace(/^\/wireframe(?=\/|$)/, "");
  return p || "/";
}

/** Route prefix for the current mode: "/es", "/wireframe" or "". */
export function prefixFromPath(pathname: string): string {
  if (langFromPath(pathname) === "es") return "/es";
  if (pathname === "/wireframe" || pathname.startsWith("/wireframe/")) return "/wireframe";
  return "";
}

/** Join a prefix and an app path ("/es" + "/" → "/es", "/es" + "/x" → "/es/x"). */
export function withPrefix(prefix: string, path: string): string {
  if (!prefix) return path;
  return path === "/" ? prefix : prefix + path;
}

/** Keys that hold identifiers / asset paths — never translated by `tr`. */
const SKIP_KEYS = new Set([
  "slug", "key", "id", "src", "image", "logo", "media", "viz", "cat", "team",
  "category", "tag", "path", "num", "icon", "accent", "stack",
]);

function translate(lang: Lang, s: string): string {
  if (lang === "en") return s;
  return ES[s] ?? s;
}

function deepTranslate<T>(lang: Lang, v: T): T {
  if (lang === "en") return v;
  if (typeof v === "string") return translate(lang, v) as unknown as T;
  if (Array.isArray(v)) return v.map((x) => deepTranslate(lang, x)) as unknown as T;
  if (v && typeof v === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      out[k] = SKIP_KEYS.has(k) ? val : deepTranslate(lang, val);
    }
    return out as T;
  }
  return v;
}

/**
 * Language hook. `t` translates one UI string, `tr` deep-translates a data
 * object (arrays / nested objects) leaving identifiers untouched. Strings
 * without a Spanish entry fall back to English.
 */
export function useLang() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const lang = langFromPath(pathname);
  const prefix = prefixFromPath(pathname);

  return useMemo(() => {
    const t = (s: string) => translate(lang, s);
    const tr = <T,>(v: T): T => deepTranslate(lang, v);
    const to = (path: string) => withPrefix(prefix, path);
    const switchLang = () => {
      const bare = stripPrefix(pathname);
      const target = lang === "es" ? bare : withPrefix("/es", bare);
      navigate(target + hash);
    };
    return { lang, prefix, t, tr, to, switchLang };
  }, [lang, prefix, pathname, hash, navigate]);
}
