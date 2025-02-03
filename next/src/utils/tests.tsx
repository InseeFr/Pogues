import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { render } from '@testing-library/react';

import { router } from '@/router/__mocks__';

export const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      {/* @ts-expect-error: we should have a better router mock*/}
      <RouterProvider router={router} defaultComponent={() => component} />
    </QueryClientProvider>,
  );
};
