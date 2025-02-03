import { render } from '@testing-library/react';

import User from './User';

describe('User', () => {
  it('displays user initials', () => {
    const user = { givenName: 'Guybrush', familyName: 'Threepwood', token: '' };
    const { getByText } = render(<User user={user} />);
    expect(getByText('GT')).toBeInTheDocument();
  });
});
