import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/*.spec.jsx'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setUpTests.ts', 'src/setUpTests.ts'],
  },
});
