import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: {
      origin: /^https?:\/\/(?:[^:]+\.)*rota-verde365\.onrender\.com$/,
      credentials: true,
    },

    allowedHosts: ["rota-verde365.onrender.com"],
    host: true,
    port: process.env.PORT || 10000,
  },
});

// export default defineConfig({
//   // ...
//   server: {
//     // ...
//     cors: {
//       origin: /^https?:\/\/(?:[^:]+\.)*bamstore-store\.onrender\.com$/,
//       credentials: true,
//     },
//   },
//   // ...
// });
