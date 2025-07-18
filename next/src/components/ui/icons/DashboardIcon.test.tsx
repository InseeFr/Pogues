import { render } from '@testing-library/react';

import DashboardIcon from './DashboardIcon';

it('DashboardIcon renders correctly', () => {
  const { asFragment } = render(<DashboardIcon />);
  expect(asFragment()).toMatchSnapshot();
});
