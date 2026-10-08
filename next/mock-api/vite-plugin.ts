import type { Connect, Plugin } from 'vite'

import { handleMockApi, sendMockResult } from './handle.ts'

function mockApiMiddleware(): Connect.NextHandleFunction {
  return async (req, res, next) => {
    try {
      if (!req.url) return next()
      const host = req.headers.host ?? 'localhost'
      const url = new URL(req.url, `http://${host}`)
      const result = await handleMockApi(req, url)
      if (!result) return next()
      sendMockResult(res, result)
    } catch (error) {
      console.error('[mock-api]', error)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'mock-api failure' }))
    }
  }
}

/**
 * In-memory Pogues API for local standalone (dev + preview).
 * On when VITE_USE_MOCK_API=true.
 */
export function mockApiPlugin(): Plugin {
  return {
    name: 'pogues-mock-api',
    configureServer(server) {
      server.middlewares.use(mockApiMiddleware())
    },
    configurePreviewServer(server) {
      server.middlewares.use(mockApiMiddleware())
    },
  }
}
