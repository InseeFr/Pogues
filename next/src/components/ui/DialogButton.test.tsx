import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithI18n } from '@/testing/render';

import DialogButton from './DialogButton';

describe('DialogButton', () => {
  it('can be opened and closed', async () => {
    expect(true).toBeTruthy();
    const user = userEvent.setup();
    const { queryByText, getByText } = await waitFor(() =>
      renderWithI18n(<DialogButton body="body" label="label" title="title" />),
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
