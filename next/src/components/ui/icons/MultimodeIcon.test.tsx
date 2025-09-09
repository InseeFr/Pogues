import { render } from '@testing-library/react';

import MultimodeIcon from './MultimodeIcon';

it('MultimodeIcon renders correctly', () => {
  const { asFragment } = render(<MultimodeIcon />);
  expect(asFragment()).toMatchSnapshot();
});
