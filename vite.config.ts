import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: [
        './tsconfig.json', // To avoid tsconfigPaths read website tsconfig path
      ],
    }),
  ],
  define: {
    global: 'window',
  },
  test: {
    include: ['**/*.spec.jsx'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
});
