import { render } from '@testing-library/react';

import ArrowUpIcon from './ArrowUpIcon';

it('ArrowUpIcon renders correctly', () => {
  const { asFragment } = render(<ArrowUpIcon />);
  expect(asFragment()).toMatchSnapshot();
});
