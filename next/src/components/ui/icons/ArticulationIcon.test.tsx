import { render } from '@testing-library/react';

import ArticulationIcon from './ArticulationIcon';

it('ArticulationIcon renders correctly', () => {
  const { asFragment } = render(<ArticulationIcon />);
  expect(asFragment()).toMatchSnapshot();
});
