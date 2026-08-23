import { defineConfig } from 'vite'

import { mockApiPlugin } from './next/mock-api/vite-plugin.ts'

/** Preview only: serves dist/ (next + legacy after postbuild). */
export default defineConfig(({ mode }) => {
  const useMockApi =
    process.env.VITE_USE_MOCK_API === 'true' || mode === 'standalone'

  return {
    appType: 'spa',
    build: { outDir: 'dist', emptyOutDir: false },
    preview: { port: 4173 },
    plugins: useMockApi ? [mockApiPlugin()] : [],
  }
})
