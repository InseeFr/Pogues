import { render } from '@testing-library/react';

import ResetIcon from './ResetIcon';

it('ResetIcon renders correctly', () => {
  const { asFragment } = render(<ResetIcon />);
  expect(asFragment()).toMatchSnapshot();
});
