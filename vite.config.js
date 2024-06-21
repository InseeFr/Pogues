import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  test: {
    include: ['**/*.spec.jsx'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setUpTests.ts'],
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
});
