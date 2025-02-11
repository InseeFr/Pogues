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
    plugins: withFederation
      ? [
          ...defaultPlugin,
          federation({
            name: '@pogues-legacy',
            filename: 'remote-entry.js',
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
      renderBuiltUrl(_filename, { hostType }) {
        /**
         * For js files,
         * We need the urls to be relative not absolute (fix issue when we load directly /questionnaire/{id}),
         * But as for the rest, it must remain absolute to allow application works in legacy and with the new application.
         */
        if (hostType === 'js') return { relative: true };
      },
    },
  };
};

export default buildViteConf(true);
