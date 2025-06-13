import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '@/tests/tests';

import Dialog from './Dialog';

describe('Dialog', () => {
  it('can be opened and closed', async () => {
    expect(true).toBeTruthy();
    const user = userEvent.setup();
    const { queryByText, getByText } = renderWithRouter(
      <Dialog body="body" label="label" title="title" />,
    );
    expect(getByText('label')).toBeInTheDocument();
    await user.click(screen.getByText('label'));
    expect(getByText('title')).toBeInTheDocument();
    expect(getByText('body')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    await user.click(screen.getByText('Cancel'));
    expect(queryByText('title')).toBeNull();
    expect(queryByText('body')).toBeNull();
  });
});
