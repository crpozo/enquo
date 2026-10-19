// Post-build step for GitHub Pages: copy dist/index.html into
// dist/<route>/index.html for every route the app serves, so a direct visit
// to /enquo/services answers 200 instead of bouncing through 404.html.
// Routes with a slug are read from the data files; anything unknown still
// falls back to the 404.html redirect (public/404.html).
import { cpSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const index = join(dist, "index.html");
if (!existsSync(index)) {
  console.error("spa-routes: dist/index.html not found, run vite build first");
  process.exit(1);
}

const slugs = (file) => {
  const p = join(root, "src", "data", file);
  if (!existsSync(p)) return [];
  return [...readFileSync(p, "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
};

// Keep in sync with the route table in src/main.tsx.
const pages = [
  "services",
  "industries",
  "case-studies",
  ...slugs("cases.ts").map((s) => `case-studies/${s}`),
  "insights",
  "who-we-are",
  "careers",
  "demo",
  "partnerships",
  ...slugs("partners.ts").map((s) => `partnerships/${s}`),
];
const prefixes = ["", "es", "wireframe"];

let n = 0;
for (const prefix of prefixes) {
  const routes = prefix ? [prefix, ...pages.map((p) => `${prefix}/${p}`)] : pages;
  for (const route of routes) {
    const dir = join(dist, ...route.split("/"));
    mkdirSync(dir, { recursive: true });
    cpSync(index, join(dir, "index.html"));
    n++;
  }
}
console.log(`spa-routes: wrote ${n} route copies of index.html`);
