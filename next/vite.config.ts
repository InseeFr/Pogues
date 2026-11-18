import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { parseEnv } from 'node:util'
import { oidcSpa } from 'oidc-spa/vite-plugin'
import { defineConfig, loadEnv } from 'vite'
import { viteEnvs } from 'vite-envs'
import csp from 'vite-plugin-csp-guard'
import tsconfigPaths from 'vite-tsconfig-paths'

import { type CspPolicy, createCspPolicy } from '../scripts/csp-policy.cjs'
import { mockApiPlugin } from './mock-api/vite-plugin.ts'

/**
 * Legacy is loaded as a federated module inside next, so it reads next's
 * `window.__VITE_ENVS`. On build, we declare legacy env variables in next too
 * (next values take precedence) so they are injected and can be overridden at
 * runtime by `vite-envs.sh`.
 * Precedence: next/.env.local > next/.env > legacy/.env.local > legacy/.env
 * (next/.env.local is applied on top by vite-envs itself).
 */
function buildMergedEnvOptions() {
  const readEnv = (file: string) => {
    const filePath = path.resolve(__dirname, file)
    return fs.existsSync(filePath)
      ? parseEnv(fs.readFileSync(filePath, 'utf-8'))
      : {}
  }

  const mergedEnv = {
    ...readEnv('../legacy/.env'),
    ...readEnv('../legacy/.env.local'),
    ...readEnv('.env'),
  }

  const outDir = path.resolve(__dirname, 'node_modules/.vite-envs')
  fs.mkdirSync(outDir, { recursive: true })
  const declarationFile = path.join(outDir, '.env.merged')
  fs.writeFileSync(
    declarationFile,
    Object.entries(mergedEnv)
      .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
      .join('\n'),
  )

  return {
    declarationFile,
    // avoid adding legacy variables to next's src/vite-env.d.ts
    ambientModuleDeclarationFilePath: path.join(outDir, 'vite-env.d.ts'),
  }
}

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

function serializeCspPolicy(policy: CspPolicy): string {
  const directives = Object.keys(policy) as (keyof CspPolicy)[]

  return directives
    .map((directive) => `${directive} ${policy[directive].join(' ')}`)
    .join('; ')
}

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useMockApi =
    process.env.VITE_USE_MOCK_API === 'true' || env.VITE_USE_MOCK_API === 'true'
  const cspPolicy = createCspPolicy(env, 5173, command === 'serve')

  return {
    server: {
      headers: {
        'Content-Security-Policy': serializeCspPolicy(cspPolicy),
      },
    },
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
        ...(command === 'build' ? buildMergedEnvOptions() : {}),
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
      // Use server headers for dev CSP & skip build policy transformation.
      csp({
        // Inject csp policies in the <meta> head component (useful for local testing)
        // Use dev: true to enable it
        dev: {
          run: false,
        },
        build: {
          override: true,
        },
        policy: cspPolicy,
        transformPolicy: (_policy, { command }) =>
          command === 'build' ? null : undefined,
      }),
      tsconfigPaths({
        projects: [
          './tsconfig.json', // To avoid tsconfigPaths read website tsconfig path
        ],
      }),
    ],
    build: {
      target: 'esnext',
      assetsInlineLimit: (filePath) => {
        if (filePath.endsWith('editorWebWorkerMain.js')) {
          // To avoid having multiple csp warning in dev mode (only related to VTL editor (AntlrEditor))
          return false
        }
      },
    },
  }
})
