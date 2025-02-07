import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';

import { User } from '@/hooks/useAuth';

interface RouterContext {
  user?: User;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  // TODO add once we have a homepage
  //loader: () => ({ crumb: 'Accueil' }),
});
