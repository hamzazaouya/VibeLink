import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { fileURLToPath, URL } from "url";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // Use Vite's recommended alias path
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
  optimizeDeps: {
    include: [
      "clsx",
      "tailwind-merge",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-alert-dialog",
      "class-variance-authority",
    ],
  },
});
