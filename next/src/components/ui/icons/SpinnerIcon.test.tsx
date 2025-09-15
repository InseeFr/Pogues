import { renderWithI18n } from '@/testing/render';

import SpinnerIcon from './SpinnerIcon';

it('SpinnerIcon renders correctly', () => {
  const { asFragment } = renderWithI18n(<SpinnerIcon />);
  expect(asFragment()).toMatchSnapshot();
});
