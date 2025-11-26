import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This tells Vite to proxy requests starting with /api to the Express server
    proxy: {
      "/api": {
        // Target is your backend server URL and port
        target: "http://localhost:5000",
        changeOrigin: true, // Needed for virtual hosting
        secure: false, // Use false for http://localhost
      },
    },
  },
});
