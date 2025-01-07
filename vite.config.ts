import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
const defaultPlugin = [
  react(),
  tsconfigPaths({
    projects: [
      './tsconfig.json', // To avoid tsconfigPaths read website tsconfig path
    ],
  }),
];

export const buildViteConf = (withFederation: boolean) => {
  return {
    base: './',
    plugins: withFederation
      ? [
          ...defaultPlugin,
          federation({
            name: '@pogues-legacy',
            filename: 'remoteEntry.js',
            exposes: {
              './App': './src/main.jsx',
            },
            shared: ['react/', 'react-dom/'],
          }),
        ]
      : defaultPlugin,
    build: {
      target: 'esnext',
    },
    define: {
      global: 'window',
    },
  };
};

export default buildViteConf(true);
