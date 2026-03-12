import { renderWithRouter } from '@/testing/render';

import Login from './Login';

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}));

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Display login button', async () => {
    const { getByText } = await renderWithRouter(<Login login={vi.fn()} />);
    expect(
      getByText('You should login to access the application.'),
    ).toBeInTheDocument();
  });
});
