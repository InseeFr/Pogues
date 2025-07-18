import { render } from '@testing-library/react';

import UserIcon from './UserIcon';

it('UserIcon renders correctly', () => {
  const { asFragment } = render(<UserIcon />);
  expect(asFragment()).toMatchSnapshot();
});
