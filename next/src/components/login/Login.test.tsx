import { OidcProvider } from '@/lib/auth/oidc';
import { renderWithRouter } from '@/testing/render';

import Login from './Login';

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}));

vi.mock('@/lib/auth/oidc', () => ({
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
    const { getByText } = await renderWithRouter(
      <OidcProvider>
        <Login />
      </OidcProvider>,
    );
    expect(
      getByText('You should login to access the application.'),
    ).toBeInTheDocument();
  });
});
