import { render } from '@testing-library/react';

import PDFIcon from './PdfIcon';

it('PDFIcon renders correctly', () => {
  const { asFragment } = render(<PDFIcon />);
  expect(asFragment()).toMatchSnapshot();
});
