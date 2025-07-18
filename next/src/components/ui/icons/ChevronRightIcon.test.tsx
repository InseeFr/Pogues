import { render } from '@testing-library/react';

import ChevronRightIcon from './ChevronRightIcon';

it('ChevronRightIcon renders correctly', () => {
  const { asFragment } = render(<ChevronRightIcon />);
  expect(asFragment()).toMatchSnapshot();
});
