import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { parseEnv } from 'node:util'
import { oidcSpa } from 'oidc-spa/vite-plugin'
import { defineConfig } from 'vite'
import { viteEnvs } from 'vite-envs'
import tsconfigPaths from 'vite-tsconfig-paths'

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

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    federation({
      name: 'app',
      remotes: {
        '@pogues-legacy': {
          type: 'module',
          name: '@pogues-legacy',
          entry: '/legacy-remote-entry.js',
        },
      },
      shared:
        mode === 'development'
          ? []
          : {
              react: { singleton: true, requiredVersion: '^18.3.1' },
              'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
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
            path.resolve(__dirname, '../package.json'),
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
}))
