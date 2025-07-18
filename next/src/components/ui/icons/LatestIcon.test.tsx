import { render } from '@testing-library/react';

import LatestIcon from './LatestIcon';

it('LatestIcon renders correctly', () => {
  const { asFragment } = render(<LatestIcon />);
  expect(asFragment()).toMatchSnapshot();
});
