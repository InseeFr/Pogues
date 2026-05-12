import { createRootRoute, createRouter } from '@tanstack/react-router'

const rootRoute = createRootRoute()

export const router = createRouter({
  routeTree: rootRoute,
})
