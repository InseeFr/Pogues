import { fireEvent, render, screen } from '@testing-library/react';

import User from './User';

const logout = vi.fn();
vi.mock('@/contexts/oidc', () => ({
  useOidc: () => ({
    isUserLoggedIn: true,
    logout,
  }),
}));

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}));

const user = { givenName: 'Guybrush', familyName: 'Threepwood', token: '' };

describe('User', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays user initials', () => {
    const { getByText } = render(<User user={user} />);
    expect(getByText('GT')).toBeInTheDocument();
  });

  it('shows logout menu item when user is logged in', () => {
    render(<User user={user} />);
    fireEvent.click(screen.getByText('GT'));
    expect(screen.getByText('common.logout')).toBeInTheDocument();
    expect(screen.queryByText('common.login')).not.toBeInTheDocument();
  });
});
