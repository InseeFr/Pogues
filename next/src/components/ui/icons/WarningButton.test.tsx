import { render } from '@testing-library/react';

import WarningIcon from './WarningIcon';

it('WarningIcon renders correctly', () => {
  const { asFragment } = render(<WarningIcon />);
  expect(asFragment()).toMatchSnapshot();
});
