import { render } from '@testing-library/react';

import PersonalizeIcon from './PersonalizeIcon';

it('PersonalizeIcon renders correctly', () => {
  const { asFragment } = render(<PersonalizeIcon />);
  expect(asFragment()).toMatchSnapshot();
});
