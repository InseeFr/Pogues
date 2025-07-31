import { render, screen } from '@testing-library/react';

import ErrorTile from './ErrorTile';

describe('ErrorTile', () => {
  it('renders error details as a list', () => {
    const error = {
      message: 'Upload failed',
      details: [
        { dataIndex: 1, attributeKey: 'id', message: 'ID is required' },
        { dataIndex: 2, attributeKey: 'name', message: 'Name is required' },
      ],
    };
    render(<ErrorTile error={error} />);
    expect(screen.getByText('Upload failed')).toBeInTheDocument();
    expect(screen.getByText('ID is required')).toBeInTheDocument();
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('does not render details list if details is empty or missing', () => {
    const error = { message: 'No details', details: [] };
    const { container } = render(<ErrorTile error={error} />);
    expect(container.querySelector('ul')).not.toBeInTheDocument();
  });
});
