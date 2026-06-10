/**
 * One-shot image pipeline: picks the chosen brand images from
 * /assets/IMAGENES ENQUO (the exported deck), resizes them for the web and
 * emits WebP into /public/img. Partner logos are copied as-is (small PNGs
 * with transparency). Run: `node scripts/optimize-images.mjs`
 * (requires `npm i --no-save sharp`).
 */
import { copyFileSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const A = "assets/IMAGENES ENQUO";

const resized = [
  // industries tiles
  [`${A}/ChatGPT Image 13 may 2026, 09_51_51 a.m.png`, "public/img/industries/retail.webp", 900],
  [`${A}/ChatGPT Image 18 may 2026, 02_36_04 p.m.png`, "public/img/industries/energy.webp", 900],
  [`${A}/IMAGENES/ASSETS ENQUO-27.png`, "public/img/industries/financial.webp", 900],
  // Manufacturing & Industrial → blue metallic ribbons w/ data labels (precision)
  [`${A}/ChatGPT Image 19 may 2026, 03_29_10 p.m.png`, "public/img/industries/manufacturing.webp", 900],
  [`${A}/Gemini_Generated_Image_d39hcad39hcad39h - Topaz Bloom, escala 2x.png`, "public/img/industries/health.webp", 900],
  [`${A}/Gemini_Generated_Image_ra47dwra47dwra47.png`, "public/img/industries/sports.webp", 900],
  // how we work lifecycle — orange (discover/run) · magenta (build) · teal (design)
  [`${A}/ChatGPT Image 19 may 2026, 02_26_38 p.m.png`, "public/img/how/discover.webp", 900],
  [`${A}/Gemini_Generated_Image_7mdqef7mdqef7mdq - Topaz Bloom, escala 2x.png`, "public/img/how/design.webp", 1200],
  [`${A}/IMAGENES/ASSETS ENQUO-15.png`, "public/img/how/build.webp", 1200],
  [`${A}/Gemini_Generated_Image_a5fht6a5fht6a5fh.png`, "public/img/how/run.webp", 1200],
  // services stage heroes — teal (design) · magenta (build) · orange (run)
  [`${A}/Gemini_Generated_Image_6mkzuh6mkzuh6mkz - Topaz Bloom, escala 2x.png`, "public/img/services/design.webp", 1400],
  [`${A}/IMAGENES/ASSETS ENQUO-16.png`, "public/img/services/build.webp", 1400],
  [`${A}/Gemini_Generated_Image_3c6elg3c6elg3c6e.png`, "public/img/services/run.webp", 1400],
  // page-hero backdrops (wide, copy space) — home-banner-like atmosphere
  [`${A}/IMAGENES/ASSETS ENQUO-22.png`, "public/img/heroes/services.webp", 1900],
  [`${A}/IMAGENES/ASSETS ENQUO-26.png`, "public/img/heroes/industries.webp", 1900],
  [`${A}/IMAGENES/ASSETS ENQUO-01.png`, "public/img/heroes/cases.webp", 1900],
  [`${A}/IMAGENES/ASSETS ENQUO-30.png`, "public/img/heroes/insights.webp", 1900],
  [`${A}/IMAGENES/ASSETS ENQUO-02.png`, "public/img/heroes/who.webp", 1900],
  [`${A}/IMAGENES/ASSETS ENQUO-12.png`, "public/img/heroes/careers.webp", 1900],
  // who we are
  [`${A}/IMAGENES/ASSETS ENQUO-09.png`, "public/img/who/founding.webp", 1400],
  [`${A}/IMAGENES/ASSETS ENQUO-04.png`, "public/img/who/team.webp", 1200],
  // the problem → executive with spyglass on a glowing pedestal (vision)
  [`${A}/ChatGPT Image 19 may 2026, 02_26_38 p.m.png`, "public/img/problem.webp", 1100],
  [`${A}/IMAGENES/ASSETS ENQUO-21.png`, "public/img/cta-hand.webp", 1400],
];

// Partner / platform logos (white or dark-safe variants from the deck).
const logos = [
  ["31", "oracle"], ["33", "snowflake"], ["34", "dbt"], ["35", "ms-fabric"],
  ["37", "azure-devops"], ["44", "capital-one"], ["46", "questionpro"],
  ["47", "redshift"], ["48", "salesforce"], ["49", "servicenow"],
  ["51", "qualtrics"], ["52", "tableau"], ["54", "azure"],
  ["56", "data-factory"], ["58", "cybersource"], ["61", "erwin"],
];

for (const dir of ["public/img/industries", "public/img/how", "public/img/heroes", "public/img/services", "public/img/who", "public/img/partners"]) {
  mkdirSync(dir, { recursive: true });
}

for (const [src, out, w] of resized) {
  const meta = await sharp(src).metadata();
  await sharp(src)
    .resize({ width: Math.min(w, meta.width) })
    .webp({ quality: 80 })
    .toFile(out);
  console.log("resized", out);
}

for (const [num, name] of logos) {
  copyFileSync(`${A}/LOGOTIPOS/ASSETS ENQUO-${num}.png`, `public/img/partners/${name}.png`);
  console.log("copied", name);
}
