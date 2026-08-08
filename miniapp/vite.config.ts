import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/FonteVita/miniapp/",
  resolve: {
    alias: {
      "@": import.meta.dirname + "/src",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
