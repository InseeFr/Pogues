import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

// https://vitest.dev/config/file.html
export default defineConfig(
  mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        setupFiles: ['tests/setup.ts', 'tests/setupEnzyme.ts'],
        coverage: {
          reporter: ['text', 'lcov'],
        },
      },
    }),
  ),
);
