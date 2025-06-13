import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';
import { TFunction } from 'i18next';

import { User } from '@/hooks/useAuth';

interface RouterContext {
  user?: User;
  queryClient: QueryClient;
  t: TFunction;
}

export const Route = createRootRouteWithContext<RouterContext>()();
