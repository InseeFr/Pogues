import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import i18n from '@/lib/i18n';

import { router } from './router/__mocks__';

export const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} defaultComponent={() => component} />
      </QueryClientProvider>
    </I18nextProvider>,
  );
};

export const renderWithI18n = (component: React.ReactElement) => {
  return render(<I18nextProvider i18n={i18n}>{component}</I18nextProvider>);
};
