import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/valleyguard",
  plugins: [react(), tailwindcss()],
  resolve: {
    // make sure only ONE copy of these is used at runtime
    dedupe: ["react", "react-dom", "@emotion/react", "@emotion/styled"],
  },
  optimizeDeps: {
    // prebundle the same single instances for Vite dev
    include: ["react", "react-dom", "@emotion/react", "@emotion/styled"],
  },
});
