import { render } from '@testing-library/react';

import NomenclatureAltIcon from './NomenclatureAltIcon';

it('NomenclatureAltIcon renders correctly', () => {
  const { asFragment } = render(<NomenclatureAltIcon />);
  expect(asFragment()).toMatchSnapshot();
});
