import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://markclarus1990.github.io/hmua-admin/", // Set the base path for GitHub Pages
});
