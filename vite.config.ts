import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import type { UserConfig } from 'vite';
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

export const buildViteConf = (withFederation: boolean): UserConfig => {
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
    // https://vite.dev/guide/build.html#advanced-base-options
    experimental: {
      renderBuiltUrl(filename, { hostType }) {
        /**
         * For html file (only index.html),
         * We need the urls to be absolute, not relative (fix issue when we load directly /questionnaire/{id}),
         * because we set baseURl to "./" to make legacy and next work together
         * But as for the rest, it must remain relative to allow application works in legacy and with the new application.
         */
        if (hostType === 'html') {
          return `/${filename}`;
        } else {
          return { relative: true };
        }
      },
    },
  };
};

export default buildViteConf(true);
