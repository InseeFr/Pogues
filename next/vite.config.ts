import { federation } from '@module-federation/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteEnvs } from 'vite-envs';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: false }),
    federation({
      name: 'app',
      remotes: {
        '@pogues-legacy': {
          type: 'module',
          name: '@pogues-legacy',
          entry: 'http://localhost:5145/remote-entry.js',
        },
      },
      shared: mode === 'development' ? [] : ['react/', 'react-dom/'],
      runtimePlugins: ['./mfe/plugin.ts'],
    }),
    viteEnvs({
      computedEnv: () => ({
        APP_VERSION: process.env.npm_package_version,
      }),
    }),
    react(),
    tsconfigPaths({
      projects: [
        './tsconfig.json', // To avoid tsconfigPaths read website tsconfig path
      ],
    }),
  ],
  build: {
    target: 'esnext',
  },
}));
