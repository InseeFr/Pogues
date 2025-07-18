import { render } from '@testing-library/react';

import MenuIcon from './MenuIcon';

it('MenuIcon renders correctly', () => {
  const { asFragment } = render(<MenuIcon />);
  expect(asFragment()).toMatchSnapshot();
});
