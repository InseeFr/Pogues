import { render } from '@testing-library/react';

import DeleteIcon from './DeleteIcon';

it('DeleteIcon renders correctly', () => {
  const { asFragment } = render(<DeleteIcon />);
  expect(asFragment()).toMatchSnapshot();
});
