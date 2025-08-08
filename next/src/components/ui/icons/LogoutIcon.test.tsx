import { render } from '@testing-library/react';

import LogoutIcon from './LogoutIcon';

it('LogoutIcon renders correctly', () => {
  const { asFragment } = render(<LogoutIcon />);
  expect(asFragment()).toMatchSnapshot();
});
