import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "vite-dist",
    rollupOptions: {
      input: {
        main: "./vite.html",
      },
    },
  },
});
