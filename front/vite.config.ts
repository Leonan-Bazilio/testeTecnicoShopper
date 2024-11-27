import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
  },
  define: {
    "process.env.GOOGLE_API_KEY": JSON.stringify(process.env.GOOGLE_API_KEY),
  },
});
