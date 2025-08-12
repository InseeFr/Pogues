import { render } from '@testing-library/react';

import HomeIcon from './HomeIcon';

it('HomeIcon renders correctly', () => {
  const { asFragment } = render(<HomeIcon />);
  expect(asFragment()).toMatchSnapshot();
});
