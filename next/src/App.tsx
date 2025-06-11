import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { OidcProvider } from '@/contexts/oidc';
import { useAuth } from '@/hooks/useAuth';
import i18next from '@/i18n/i18n';

import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  context: { queryClient, t: i18next.t, user: undefined },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <OidcProvider
      ErrorFallback={({ initializationError }) => (
        <h1 className="text-error">
          {initializationError.isAuthServerLikelyDown ? (
            <>
              Sorry our authentication server is currently down, please try
              again later
            </>
          ) : (
            // NOTE: Check initializationError.message for debug information.
            // It's an error on your end no need to show it to the user.
            <>Unexpected authentication error </>
          )}
        </h1>
      )}
    >
      <InnerApp />
    </OidcProvider>
  );
}

function InnerApp() {
  const user = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ user }} />
    </QueryClientProvider>
  );
}
