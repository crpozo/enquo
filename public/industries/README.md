# Industry tile photos (optional swap-in)

The home Industries tiles render generated themed art (sector icon + tinted
gradient) by default. To use a real photo for any sector, drop an image file in
this folder and point the matching industry's `image` field at it in
`src/data/enquo.tsx`.

## How to enable one

1. Add a square image here, e.g. `financial.jpg` (recommended ~1000×1000,
   JPG/WebP, dark/moody works best behind the white label).
2. In `src/data/enquo.tsx`, on that industry add:
   `image: "industries/financial.jpg"`

If the file is missing or fails to load, the tile automatically falls back to
the generated themed art — so a bad path never shows a broken image.

## Suggested filenames (current home set)

| Industry                      | suggested file              |
| ----------------------------- | --------------------------- |
| Consumer, Retail & Logistics  | industries/retail.jpg       |
| Energy & Industrial           | industries/energy.jpg       |
| Financial Services            | industries/financial.jpg    |
| Government & Public Sector    | industries/government.jpg   |
| Health Care                   | industries/health.jpg       |
| Tech, Telecom & Media         | industries/tech.jpg         |
| Sports                        | industries/sports.jpg       |

Paths are relative to the site base (Vite's `BASE_URL`), so just use
`industries/<file>` — it resolves correctly on GitHub Pages too.
