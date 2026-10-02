import { createRequire } from 'node:module'

import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import { oidcSpa } from 'oidc-spa/vite-plugin'
import { defineConfig, loadEnv } from 'vite'
import { viteEnvs } from 'vite-envs'
import tsconfigPaths from 'vite-tsconfig-paths'

import { mockApiPlugin } from './mock-api/vite-plugin.ts'

const require = createRequire(import.meta.url)

/** antlr-editor is CJS → force monaco ESM (AMD min build breaks under Vite). */
function resolveMonacoEsm(): string {
  const requireFromAntlr = createRequire(
    require.resolve('@making-sense/antlr-editor/package.json'),
  )
  return requireFromAntlr
    .resolve('monaco-editor')
    .replace(/min[/\\]vs[/\\]index\.js$/, 'esm/vs/index.js')
}

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useMockApi =
    process.env.VITE_USE_MOCK_API === 'true' || env.VITE_USE_MOCK_API === 'true'

  return {
    resolve: {
      alias: {
        'monaco-editor': resolveMonacoEsm(),
      },
    },
    optimizeDeps: {
      include: ['monaco-editor'],
    },
    plugins: [
      ...(useMockApi ? [mockApiPlugin()] : []),
      federation({
        name: 'app',
        remotes: {
          '@pogues-legacy': {
            type: 'module',
            name: '@pogues-legacy',
            entry: '/legacy-remote-entry.js',
          },
        },
        // Remote is typed via @ts-expect-error in LegacyComponent; skip MF DTS.
        dts: false,
        // Empty shared in serve for HMR; keep shared for builds.
        shared:
          command === 'serve'
            ? []
            : {
                react: {
                  singleton: true,
                  requiredVersion: '^19.0.0',
                },
                'react-dom': {
                  singleton: true,
                  requiredVersion: '^19.0.0',
                },
              },
        runtimePlugins: ['./mfe/plugin.ts'],
      }),
      oidcSpa(),
      viteEnvs({
        // retrieve version of package.json (parent folder)
        computedEnv: async () => {
          const path = await import('node:path')
          const fs = await import('node:fs/promises')

          const packageJson = JSON.parse(
            await fs.readFile(
              path.resolve(import.meta.dirname, '../package.json'),
              'utf-8',
            ),
          )
          return {
            APP_VERSION: packageJson.version,
          }
        },
      }),
      react(),
      tsconfigPaths({
        projects: [
          './tsconfig.json', // To avoid tsconfigPaths read website tsconfig path
        ],
      }),
    ],
    build: {
      target: 'esnext',
    },
  }
})
