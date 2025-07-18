import { render } from '@testing-library/react';

import SearchOffIcon from './SearchOffIcon';

it('SearchOffIcon renders correctly', () => {
  const { asFragment } = render(<SearchOffIcon />);
  expect(asFragment()).toMatchSnapshot();
});
