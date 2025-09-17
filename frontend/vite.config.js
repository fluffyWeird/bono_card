import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow network access
    port: 5173,
    strictPort: true,
    // Allow the loca.lt host
    allowedHosts: ["thick-brooms-create.loca.lt"],
  },
});
