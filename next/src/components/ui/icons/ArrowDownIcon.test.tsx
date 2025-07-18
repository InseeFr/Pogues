import { render } from '@testing-library/react';

import ArrowDownIcon from './ArrowDownIcon';

it('ArrowDownIcon renders correctly', () => {
  const { asFragment } = render(<ArrowDownIcon />);
  expect(asFragment()).toMatchSnapshot();
});
