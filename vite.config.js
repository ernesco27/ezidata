import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        outDir: "dist",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust this limit if necessary
  },
  //  server: {
  //    host: true,
  //    strictPort: true,
  //    port: 8080,
  //  },
  server: {
    port: 5173,
  },
  // build: {
  //   outDir: "dist",
  // },
  preview: {
    port: 8080,
  },
});
