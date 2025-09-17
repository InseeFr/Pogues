import { render, screen } from '@testing-library/react';
import { ParseResult } from 'papaparse';

import CsvViewerTable from './CsvViewerTable';

const mockParsedCsv: ParseResult<unknown> = {
  data: [
    { Name: 'Rathalos', Age: '30', City: 'Ancient Forest' },
    { Name: 'Palico', Age: '5', City: 'Ruins Of Wyveria' },
  ],
  meta: {
    fields: ['Name', 'Age', 'City'],
    delimiter: '',
    linebreak: '',
    aborted: false,
    truncated: false,
    cursor: 0,
  },
  errors: [],
};

describe('CsvViewerTable', () => {
  it('renders table headers and rows from parsedCsv', () => {
    render(<CsvViewerTable parsedCsv={mockParsedCsv} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();

    expect(screen.getByText('Rathalos')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Palico')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Ancient Forest')).toBeInTheDocument();
    expect(screen.getByText('Ruins Of Wyveria')).toBeInTheDocument();
  });
});
