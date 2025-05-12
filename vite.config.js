import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/Guess-That-Super" : "/",
  server: {
    proxy: {
      "/api": {
        target: "https://superheroapi.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
