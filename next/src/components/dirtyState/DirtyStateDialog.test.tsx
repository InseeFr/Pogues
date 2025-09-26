import { fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import { DirtyStateProvider } from '@/contexts/DirtyStateContext';
import { renderWithRouter } from '@/testing/render';

import { DirtyStateDialog } from './DirtyStateDialog';

const proceedMock = vi.fn();

// Mock useBlocker from @tanstack/react-router
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router');
  return {
    ...actual,
    useBlocker: vi.fn(() => ({
      status: 'blocked',
      next: {},
      proceed: proceedMock,
    })),
  };
});

describe('DirtyStateDialog', () => {
  beforeEach(() => {
    proceedMock.mockReset();
  });

  it('should display the dialog when blocked', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <DirtyStateProvider>
        <DirtyStateDialog />
      </DirtyStateProvider>,
    );

    expect(getByText('Unsaved modifications')).toBeInTheDocument();

    const cancelButton = getByRole('button', { name: 'Cancel' });
    const validateButton = getByRole('button', { name: 'Validate' });

    expect(cancelButton).toBeEnabled();
    expect(validateButton).toBeEnabled();
  });

  it('should proceed navigation on validate', async () => {
    const { getByRole } = await renderWithRouter(
      <DirtyStateProvider>
        <DirtyStateDialog />
      </DirtyStateProvider>,
    );

    const validateButton = getByRole('button', { name: 'Validate' });
    fireEvent.click(validateButton);

    expect(proceedMock).toHaveBeenCalled();
  });

  it('should close the dialog on cancel without proceeding navigation', async () => {
    const { getByRole } = await renderWithRouter(
      <DirtyStateProvider>
        <DirtyStateDialog />
      </DirtyStateProvider>,
    );

    const cancelButton = getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(proceedMock).not.toHaveBeenCalled();
  });
});
