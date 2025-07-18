import { render } from '@testing-library/react';

import OpenInNewIcon from './OpenInNewIcon';

it('OpenInNewIcon renders correctly', () => {
  const { asFragment } = render(<OpenInNewIcon />);
  expect(asFragment()).toMatchSnapshot();
});
