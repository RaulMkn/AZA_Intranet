import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const backendTarget = process.env.VITE_BACKEND_URL || "http://localhost:8080";

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      proxy: {
        "/intranet/DentalAesthetics": {
          target: backendTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
