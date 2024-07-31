import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import version from "vite-plugin-package-version"

export default defineConfig({
  plugins: [solid(), version()],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
});
