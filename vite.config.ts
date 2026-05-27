import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
//
// `base` must match the GitHub Pages path. The site is served from
// `crpozo.github.io/enquo/`, so the base is `/enquo/`. If you ever move it
// (custom domain at root, different repo name), edit this single line.
export default defineConfig({
  base: "/enquo/",
  plugins: [react()],
});
