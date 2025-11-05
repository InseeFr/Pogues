import { render } from '@testing-library/react';

import ProtocolesIcon from './ProtocolesIcon';

it('ProtocolesIcon renders correctly', () => {
  const { asFragment } = render(<ProtocolesIcon />);
  expect(asFragment()).toMatchSnapshot();
});
