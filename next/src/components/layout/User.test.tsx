import { fireEvent, render, screen } from '@testing-library/react';

import { renderWithI18n } from '@/tests/tests';

import User from './User';

vi.mock('@/contexts/oidc', () => ({
  useOidc: () => ({
    isUserLoggedIn: true,
  }),
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
    renderWithI18n(<User user={user} />);
    fireEvent.click(screen.getByText('GT'));
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });
});
