import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
//
// `base` must match the GitHub Pages path. For `crpozo.github.io/enquo/` that
// is `/enquo/`. Override via env if you ever serve from a different path:
//   VITE_BASE=/ npm run build   (root domain)
export default defineConfig({
  base: process.env.VITE_BASE ?? "/enquo/",
  plugins: [react()],
});
