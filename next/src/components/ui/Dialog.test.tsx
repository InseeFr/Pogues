import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Dialog from './Dialog';

describe('Dialog', () => {
  it('can be opened and closed', async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <Dialog body="body" label="label" title="title" />,
    );
    expect(getByText('label')).toBeInTheDocument();
    await user.click(screen.getByText('label'));
    expect(getByText('title')).toBeInTheDocument();
    expect(getByText('body')).toBeInTheDocument();
    expect(getByText('close')).toBeInTheDocument();
    await user.click(screen.getByText('close'));
    expect(getByText('title')).not.toBeInTheDocument();
    expect(getByText('body')).not.toBeInTheDocument();
  });
});
