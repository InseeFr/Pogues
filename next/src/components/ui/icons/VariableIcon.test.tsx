import { render } from '@testing-library/react';

import VariableIcon from './VariableIcon';

it('VariableIcon renders correctly', () => {
  const { asFragment } = render(<VariableIcon />);
  expect(asFragment()).toMatchSnapshot();
});
