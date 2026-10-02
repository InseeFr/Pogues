import { defineConfig, mergeConfig } from 'vitest/config';

import { buildViteConf } from './vite.config';

// https://vitest.dev/config/file.html
export default defineConfig(
  mergeConfig(
    buildViteConf(false),
    defineConfig({
      test: {
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        setupFiles: ['tests/setup.ts'],
        coverage: {
          include: ['src/**/*.{ts,tsx}'],
          exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
          reporter: ['text', 'lcov'],
        },
      },
    }),
  ),
);
