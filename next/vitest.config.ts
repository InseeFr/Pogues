import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

// https://vitest.dev/config/file.html
export default mergeConfig(
  viteConfig({
    mode: 'development',
    command: 'serve',
  }),
  defineConfig({
    test: {
      globals: true,
      globalSetup: 'tests/globalSetup.ts',
      setupFiles: 'tests/setup.ts',
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      coverage: {
        reporter: ['text', 'lcov'],
      },
    },
  }),
);
