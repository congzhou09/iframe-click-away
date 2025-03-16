import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    historyApiFallback: {
      index: "/index.html",
    },
    port: 2025,
  },
  resolve: {
    alias: {
      "iframe-click-away": path.resolve(__dirname, "../../src"),
    },
  },
  plugins: [react()],
});
