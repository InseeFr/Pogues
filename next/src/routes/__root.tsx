import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import Layout from '@/components/layout/Layout';
import { User } from '@/hooks/useAuth';

interface RouterContext {
  user?: User;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
  loader: () => ({
    crumb: 'Accueil',
  }),
});
