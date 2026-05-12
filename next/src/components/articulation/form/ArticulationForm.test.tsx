import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithRouter } from '@/testing/render'

import ArticulationForm from './ArticulationForm'

const mockNavigate = vi.fn()

vi.mock('@/components/ui/form/VTLEditor')

// Mock useNavigate from @tanstack/react-router
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('ArticulationForm', () => {
  it('should enable validate button only when all articulation items fields are filled', async () => {
    // Given an empty form
    const foo = vi.fn()
    await renderWithRouter(
      <ArticulationForm questionnaireId="q-id" onSubmit={foo} />,
    )

    // Then the form is invalid and cannot be submitted
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeDisabled()
    })

    // When we fill all the inputs
    fireEvent.input(screen.getByRole('textbox', { name: 'First Name *' }), {
      target: { value: 'first name formula' },
    })
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeDisabled()
    })

    fireEvent.input(screen.getByRole('textbox', { name: 'Gender *' }), {
      target: { value: 'gender formula' },
    })
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeDisabled()
    })

    fireEvent.input(screen.getByRole('textbox', { name: 'Age *' }), {
      target: { value: 'gender formula' },
    })

    // Then the form becomes valid and can be submitted
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeEnabled()
    })

    fireEvent.submit(screen.getByRole('button', { name: /Validate/i }))
    await waitFor(() => {
      expect(foo).toHaveBeenCalledOnce()
    })
  })

  it('should display error when first name field is empty', async () => {
    // Given a form with a filled first name input
    await renderWithRouter(
      <ArticulationForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    )
    fireEvent.input(screen.getByRole('textbox', { name: 'First Name *' }), {
      target: { value: 'age formula' },
    })

    // When the first name input becomes empty
    fireEvent.input(screen.getByRole('textbox', { name: 'First Name *' }), {
      target: { value: '' },
    })

    // Then an error is displayed
    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText('You must provide a formula for first name'),
    ).toBeDefined()
  })

  it('should display error when gender field is empty', async () => {
    // Given a form with a filled gender input
    await renderWithRouter(
      <ArticulationForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    )
    fireEvent.input(screen.getByRole('textbox', { name: 'Gender *' }), {
      target: { value: 'age formula' },
    })

    // When the gender input becomes empty
    fireEvent.input(screen.getByRole('textbox', { name: 'Gender *' }), {
      target: { value: '' },
    })

    // Then an error is displayed
    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText('You must provide a formula for gender'),
    ).toBeDefined()
  })

  it('should display error when age field is empty', async () => {
    // Given a form with a filled age input
    await renderWithRouter(
      <ArticulationForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    )
    fireEvent.input(screen.getByRole('textbox', { name: 'Age *' }), {
      target: { value: 'age formula' },
    })

    // When the age input becomes empty
    fireEvent.input(screen.getByRole('textbox', { name: 'Age *' }), {
      target: { value: '' },
    })

    // Then an error is displayed
    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(screen.getByText('You must provide a formula for age')).toBeDefined()
  })

  it("allows to go back to articulation overview page by clicking 'cancel' button", async () => {
    // Given a form in dirty state
    await renderWithRouter(
      <ArticulationForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    )
    fireEvent.input(screen.getByRole('textbox', { name: 'First Name *' }), {
      target: { value: 'first name formula' },
    })

    // When we click on "cancel" button
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))

    // Then we navigate to articulation page
    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/questionnaire/$questionnaireId/articulation',
      params: { questionnaireId: 'q-id' },
      ignoreBlocker: true,
    })
  })
})
