import { createRequire } from 'node:module';
import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { oidcSpa } from 'oidc-spa/vite-plugin';
import { type UserConfig, defineConfig } from 'vite';
import { viteEnvs } from 'vite-envs';
import tsconfigPaths from 'vite-tsconfig-paths';

const require = createRequire(import.meta.url);

/** antlr-editor is CJS → force monaco ESM (AMD min build breaks under Vite). */
function resolveMonacoEsm(): string {
  const requireFromAntlr = createRequire(
    require.resolve('@making-sense/antlr-editor/package.json'),
  );
  const cjsEntry = requireFromAntlr.resolve('monaco-editor');
  const esmEntry = cjsEntry.replace(
    /min[/\\]vs[/\\](?:index|editor[/\\]editor\.main)\.js$/,
    'esm/vs/index.js',
  );
  if (esmEntry === cjsEntry) {
    throw new Error(
      `Unable to map monaco-editor CJS entry to ESM: ${cjsEntry}`,
    );
  }
  return esmEntry;
}

// https://vite.dev/config/
const defaultPlugin = [
  react(),
  oidcSpa(),
  viteEnvs(),
  tsconfigPaths({
    projects: [
      './tsconfig.json', // To avoid tsconfigPaths read website tsconfig path
    ],
  }),
];

const mFSharedConfig = {
  react: { singleton: true, requiredVersion: '^19.0.0' },
  'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
};

export const buildViteConf = (
  withFederation: boolean,
  mode: string,
): UserConfig => {
  return {
    plugins: withFederation
      ? [
          ...defaultPlugin,
          federation({
            name: '@pogues-legacy',
            filename: 'legacy-remote-entry.js',
            exposes: {
              './App': './src/main.tsx',
            },
            // Host types the remote locally; MF DTS fails on transitive .d.ts (e.g. zod).
            dts: false,
            shared: mode === 'development' ? [] : mFSharedConfig,
          }),
        ]
      : defaultPlugin,
    resolve: {
      alias: {
        'monaco-editor': resolveMonacoEsm(),
      },
    },
    build: {
      target: 'esnext',
    },
    css: {
      preprocessorOptions: {
        scss: {
          // bootstrap-sass / font-awesome still use legacy Sass syntax
          quietDeps: true,
          silenceDeprecations: [
            'slash-div',
            'import',
            'global-builtin',
            'color-functions',
          ],
        },
      },
    },
    define: {
      global: 'window',
    },
    // https://vite.dev/guide/build.html#advanced-base-options
    experimental: {
      renderBuiltUrl(_filename, { hostType }) {
        /**
         * Relative URLs so assets work both standalone and under /legacy/ (MFE).
         * Absolute /assets/... would 404 when the host serves legacy from /legacy/.
         */
        if (hostType === 'js' || hostType === 'css') return { relative: true };
      },
    },
  };
};

export default defineConfig(({ mode }) => buildViteConf(true, mode));
