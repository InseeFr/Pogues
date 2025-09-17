import { render, screen } from '@testing-library/react';

import JsonViewer from './JsonViewer';

const jsonString = JSON.stringify(
  { Name: 'Rathalos', Age: '30', City: 'Ancient Forest' },
  null,
  2,
);

describe('JsonViewer', () => {
  it('renders highlighted JSON', () => {
    render(<JsonViewer data={jsonString} />);

    expect(screen.getByText('"Name"')).toBeInTheDocument();
    expect(screen.getByText('"Rathalos"')).toBeInTheDocument();
    expect(screen.getByText('"30"')).toBeInTheDocument();
    expect(screen.getByText('"Ancient Forest"')).toBeInTheDocument();
  });
});
