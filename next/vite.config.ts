import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { oidcSpa } from "oidc-spa/vite-plugin";
import { defineConfig } from "vite";
import { viteEnvs } from "vite-envs";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    federation({
      name: "app",
      remotes: {
        "@pogues-legacy": {
          type: "module",
          name: "@pogues-legacy",
          entry: "/legacy-remote-entry.js",
        },
      },
      shared: mode === "development" ? [] : ["react/", "react-dom/"],
      runtimePlugins: ["./mfe/plugin.ts"],
    }),
    oidcSpa(),
    viteEnvs({
      // retrieve version of package.json (parent folder)
      computedEnv: async () => {
        const path = await import("node:path");
        const fs = await import("node:fs/promises");

        const packageJson = JSON.parse(
          await fs.readFile(
            path.resolve(__dirname, "../package.json"),
            "utf-8",
          ),
        );
        return {
          APP_VERSION: packageJson.version,
        };
      },
    }),
    react(),
    tsconfigPaths({
      projects: [
        "./tsconfig.json", // To avoid tsconfigPaths read website tsconfig path
      ],
    }),
  ],
  build: {
    target: "esnext",
  },
}));
