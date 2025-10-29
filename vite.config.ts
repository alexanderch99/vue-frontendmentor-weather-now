import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/vue-frontendmentor-weather-now/",
  build: {
    outDir: "./",
  },
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Weather Now",
        short_name: "Weather Now",
        start_url: "/vue-frontendmentor-weather-now/",
        display: "standalone",
        background_color: "#23a4ec",
        theme_color: "#23a4ec",
        icons: [
          {
            src: "/vue-frontendmentor-weather-now/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/vue-frontendmentor-weather-now/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/vue-frontendmentor-weather-now/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/vue-frontendmentor-weather-now/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
