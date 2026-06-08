import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouter } from '@/testing/render'

import CodesListForm from './CodesListForm'

const mockNavigate = vi.fn()

vi.mock('@/components/ui/form/VTLEditor')

vi.mock('./ImportCodesListFromCsv', () => ({
  default: ({
    onImportSuccess,
    onCancel,
  }: {
    onImportSuccess: (v: unknown) => void
    onCancel: () => void
  }) => (
    <div>
      <button
        type="button"
        onClick={() =>
          onImportSuccess({
            label: '',
            codes: [
              { value: 'imported-code', label: 'Imported Label', codes: [] },
            ],
          })
        }
      >
        Trigger import
      </button>
      <button type="button" onClick={onCancel}>
        Cancel import
      </button>
    </div>
  ),
}))

// Mock useNavigate from @tanstack/react-router
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('CodesListForm', () => {
  it('should enable the button only when all fields are filled', async () => {
    const submitFn = vi.fn()
    await renderWithRouter(
      <CodesListForm
        questionnaireId="q-id"
        onSubmit={submitFn}
        variables={[]}
      />,
    )

    await waitFor(() => {
      const submitButton = screen
        .getAllByRole('button')
        .find((button) => button.getAttribute('type') === 'submit')
      expect(submitButton).toBeTruthy()
      expect(submitButton).toHaveAttribute('aria-disabled', 'true')
    })

    await userEvent.clear(
      screen.getByRole('textbox', { name: /Code list name/i }),
    )
    await userEvent.type(
      screen.getByRole('textbox', { name: /Code list name/i }),
      'my label',
    )

    await waitFor(() => {
      const submitButton = screen
        .getAllByRole('button')
        .find((button) => button.getAttribute('type') === 'submit')
      expect(submitButton).toBeTruthy()
      expect(submitButton).toHaveAttribute('aria-disabled', 'true')
    })

    await userEvent.clear(screen.getAllByRole('textbox')[1]) // codes.0.value
    await userEvent.type(screen.getAllByRole('textbox')[1], 'my code value')
    await userEvent.clear(screen.getAllByRole('textbox')[2]) // codes.0.label
    await userEvent.type(screen.getAllByRole('textbox')[2], 'my code label')

    await waitFor(() => {
      const submitButton = screen
        .getAllByRole('button')
        .find((button) => button.getAttribute('type') === 'submit')
      expect(submitButton).toBeTruthy()
      expect(submitButton).not.toHaveAttribute('aria-disabled', 'true')
    })

    const submitButton = screen
      .getAllByRole('button')
      .find((button) => button.getAttribute('type') === 'submit')
    expect(submitButton).toBeTruthy()
    await userEvent.click(submitButton!)
    await waitFor(() => {
      expect(submitFn).toBeCalled()
    })
  })

  it('should display "must have label" error when empty', async () => {
    await renderWithRouter(
      <CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    )

    await userEvent.clear(
      screen.getByRole('textbox', { name: /Code list name/i }),
    )
    await userEvent.type(
      screen.getByRole('textbox', { name: /Code list name/i }),
      'my label',
    )
    await userEvent.clear(
      screen.getByRole('textbox', { name: /Code list name/i }),
    )

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(screen.getByText('You must provide a label')).toBeDefined()
  })

  it('should display "code must have value" error when empty', async () => {
    await renderWithRouter(
      <CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    )

    await userEvent.clear(screen.getAllByRole('textbox')[1]) // codes.0.value
    await userEvent.type(screen.getAllByRole('textbox')[1], 'my code value')
    await userEvent.clear(screen.getAllByRole('textbox')[1])

    expect((await screen.findAllByRole('alert')).length).toBeGreaterThanOrEqual(
      1,
    )
    expect(screen.getByText('Your code must have a value')).toBeDefined()
  })

  it('should display "code must have label" error when empty', async () => {
    await renderWithRouter(
      <CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    )

    await userEvent.clear(screen.getAllByRole('textbox')[2]) // codes.0.label
    await userEvent.type(screen.getAllByRole('textbox')[2], 'my code value')
    await userEvent.clear(screen.getAllByRole('textbox')[2])

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(screen.getByText('Your code must have a label')).toBeDefined()
  })

  it('should display "value must be unique" error when duplicate value', async () => {
    await renderWithRouter(
      <CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    )

    await userEvent.click(screen.getByRole('button', { name: /Add a code/i }))
    await userEvent.clear(screen.getAllByRole('textbox')[1]) // codes.0.value
    await userEvent.type(screen.getAllByRole('textbox')[1], 'abc')
    await userEvent.clear(screen.getAllByRole('textbox')[3]) // codes.1.value
    await userEvent.type(screen.getAllByRole('textbox')[3], 'abc')

    await waitFor(async () => {
      expect(
        (await screen.findAllByRole('alert')).length,
      ).toBeGreaterThanOrEqual(2)
    })
    expect(
      await screen.findAllByText('Value must be unique: "abc"'),
    ).toHaveLength(2)
  })

  it('should add and remove a code correctly', async () => {
    await renderWithRouter(
      <CodesListForm
        questionnaireId="q-id"
        onSubmit={vi.fn()}
        variables={[]}
      />,
    )

    // Adding a code
    await userEvent.click(screen.getByRole('button', { name: /Add a code/i }))
    await userEvent.clear(screen.getAllByRole('textbox')[3]) // codes.1.value
    await userEvent.type(screen.getAllByRole('textbox')[3], 'code1')
    await userEvent.clear(screen.getAllByRole('textbox')[4]) // codes.1.label
    await userEvent.type(screen.getAllByRole('textbox')[4], 'label1')

    // Remove the code
    await userEvent.click(screen.getAllByTitle('Delete')[1])

    await waitFor(() => {
      expect(screen.queryAllByRole('textbox').length).toBe(3) // Should be back to 3 textboxes (label, codes.0.value, codes.0.label)
    })
  })

  it("allows to go back to codesLists overview page by clicking 'cancel' button", async () => {
    await renderWithRouter(
      <CodesListForm
        questionnaireId="q-id"
        onSubmit={vi.fn()}
        variables={[]}
      />,
    )

    await userEvent.clear(
      screen.getByRole('textbox', { name: /Code list name/i }),
    )
    await userEvent.type(
      screen.getByRole('textbox', { name: /Code list name/i }),
      'my label',
    )

    const cancelButton = screen.getByRole('button', { name: /cancel/i })

    expect(cancelButton).toBeEnabled()
    await userEvent.click(cancelButton)

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/questionnaire/$questionnaireId/codes-lists',
      params: { questionnaireId: 'q-id' },
      ignoreBlocker: true,
    })
  })

  it('should fill the form with imported codes and close the panel on import success', async () => {
    await renderWithRouter(
      <CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    )

    await userEvent.click(screen.getByRole('button', { name: /Import codes/i }))

    await userEvent.click(
      screen.getByRole('button', { name: /Trigger import/i }),
    )

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: /Trigger import/i }),
      ).toBeNull()
    })

    await waitFor(() => {
      expect(screen.getAllByRole('textbox')[1]).toHaveValue('imported-code') // codes.0.value
      expect(screen.getAllByRole('textbox')[2]).toHaveValue('Imported Label') // codes.0.label
    })
  })
})
