import { renderWithI18n } from '@/tests/tests';

import SpinnerIcon from './SpinnerIcon';

it('SpinnerIcon renders correctly', () => {
  const { asFragment } = renderWithI18n(<SpinnerIcon />);
  expect(asFragment()).toMatchSnapshot();
});
