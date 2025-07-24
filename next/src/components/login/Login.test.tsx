import { waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { OidcProvider } from '@/contexts/oidc';
import { renderWithRouter } from '@/tests/tests';

import Login from './Login';

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}));

vi.mock('@/contexts/oidc', () => ({
  useOidc: () => ({
    login: vi.fn(),
  }),
  OidcProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Display login button', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <OidcProvider>
          <Login />
        </OidcProvider>,
      ),
    );
    expect(
      getByText('You should login to access the application.'),
    ).toBeInTheDocument();
  });
});
