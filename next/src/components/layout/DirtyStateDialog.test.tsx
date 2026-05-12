import { fireEvent } from '@testing-library/react'

import { renderWithRouter } from '@/testing/render'

import DirtyStateDialog from './DirtyStateDialog'

describe('DirtyStateDialog', () => {
  it('displays information about dirty state and triggers appropriate actions on click', async () => {
    // Given the dirty state dialog
    const onValidateMock = vi.fn()
    const onCancelMock = vi.fn()
    const { getByRole, getByText } = await renderWithRouter(
      <DirtyStateDialog onValidate={onValidateMock} onCancel={onCancelMock} />,
    )

    // Then it warns the user about potential data loss and step to take
    expect(getByText('Unsaved modifications')).toBeInTheDocument()
    expect(
      getByText(
        "You didn't save your changes. Are you sure you want to leave?",
      ),
    ).toBeInTheDocument()

    // When we click on 'validate' button
    fireEvent.click(getByRole('button', { name: /validate/i }))

    // Then it triggers validate action
    expect(onValidateMock).toHaveBeenCalledOnce()
    expect(onCancelMock).not.toHaveBeenCalled()

    onValidateMock.mockClear()

    // When we click on 'cancel' button
    fireEvent.click(getByRole('button', { name: /cancel/i }))

    // Then it triggers cancel action
    expect(onValidateMock).not.toHaveBeenCalled()
    expect(onCancelMock).toHaveBeenCalledOnce()
  })
})
