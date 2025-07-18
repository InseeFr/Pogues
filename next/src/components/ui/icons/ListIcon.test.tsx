import { render } from '@testing-library/react';

import ListIcon from './ListIcon';

it('ListIcon renders correctly', () => {
  const { asFragment } = render(<ListIcon />);
  expect(asFragment()).toMatchSnapshot();
});
