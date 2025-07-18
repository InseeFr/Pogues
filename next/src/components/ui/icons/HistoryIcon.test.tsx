import { render } from '@testing-library/react';

import HistoryIcon from './HistoryIcon';

it('HistoryIcon renders correctly', () => {
  const { asFragment } = render(<HistoryIcon />);
  expect(asFragment()).toMatchSnapshot();
});
