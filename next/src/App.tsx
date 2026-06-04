import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { useUser } from '@/hooks/useUser'
import i18next from '@/lib/i18n'

import ErrorComponent from './components/layout/ErrorComponent'
import Layout from './components/layout/Layout'
import DefaultPendingComponent from './components/ui/Waiting'
import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient()

// Create a new router instance
const router = createRouter({
  scrollRestoration: true,
  routeTree,
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  context: { queryClient, t: i18next.t, user: undefined },
  defaultNotFoundComponent: () => (
    <Layout>
      <ErrorComponent
        error={{ statusCode: 404, message: 'Not found', name: '' }}
      />
    </Layout>
  ),
  defaultPendingComponent: DefaultPendingComponent,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <InnerApp />
}

function InnerApp() {
  const user = useUser()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ user }} />
    </QueryClientProvider>
  )
}
