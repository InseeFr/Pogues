import { render } from '@testing-library/react';

import AddIcon from './AddIcon';

it('AddIcon renders correctly', () => {
  const { asFragment } = render(<AddIcon />);
  expect(asFragment()).toMatchSnapshot();
});
