import { render } from '@testing-library/react';

import CancelIcon from './CancelIcon';

it('CancelIcon renders correctly', () => {
  const { asFragment } = render(<CancelIcon />);
  expect(asFragment()).toMatchSnapshot();
});
