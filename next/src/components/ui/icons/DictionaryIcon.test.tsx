import { render } from '@testing-library/react';

import DictionaryIcon from './DictionaryIcon';

it('DictionaryIcon renders correctly', () => {
  const { asFragment } = render(<DictionaryIcon />);
  expect(asFragment()).toMatchSnapshot();
});
