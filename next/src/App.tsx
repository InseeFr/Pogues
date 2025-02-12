import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { OidcProvider } from '@/contexts/oidc';
import { useAuth } from '@/hooks/useAuth';

import './i18n/i18n';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient, user: undefined },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <OidcProvider>
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
