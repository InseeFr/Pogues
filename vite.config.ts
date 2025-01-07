import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default {
  base: './',
  plugins: [
    react(),
    tsconfigPaths({
      projects: [
        './tsconfig.json', // To avoid tsconfigPaths read website tsconfig path
      ],
    }),
    federation({
      name: '@pogues-legacy',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/main.jsx',
      },
      shared: ['react/', 'react-dom/'],
    }),
  ],
  build: {
    target: 'esnext',
  },
  define: {
    global: 'window',
  },
};
