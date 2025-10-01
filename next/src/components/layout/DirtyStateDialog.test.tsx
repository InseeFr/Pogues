import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from '@/testing/render';

import DirtyStateDialog from './DirtyStateDialog';

describe('DirtyStateDialog', () => {
  it('renders dialog with correct title and body', async () => {
    const { getByText } = await renderWithRouter(
      <DirtyStateDialog onValidate={() => {}} onCancel={() => {}} />,
    );

    expect(getByText('Unsaved modifications')).toBeInTheDocument();
    expect(
      getByText(
        "You didn't save your changes. Are you sure you want to leave?",
      ),
    ).toBeInTheDocument();
  });

  it('calls onValidate when validate button is clicked', async () => {
    const onValidate = vi.fn();
    const { getByRole } = await renderWithRouter(
      <DirtyStateDialog onValidate={onValidate} onCancel={() => {}} />,
    );

    const validateButton = getByRole('button', { name: /validate/i });
    fireEvent.click(validateButton);

    expect(onValidate).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const onCancel = vi.fn();
    const { getByRole } = await renderWithRouter(
      <DirtyStateDialog onValidate={() => {}} onCancel={onCancel} />,
    );

    const cancelButton = getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
