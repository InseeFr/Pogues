import { fireEvent, screen, waitFor, within } from '@testing-library/react'

import { DatatypeType } from '@/models/datatype'
import { VariableType } from '@/models/variables'
import { renderWithRouter } from '@/testing/render'

import VariableForm from './VariableForm'

vi.mock('@/components/ui/form/VTLEditor')

describe('VariableForm', () => {
  it('should enable the button only when all required fields are filled for an external variable', async () => {
    const submitFn = vi.fn()
    const { getByRole } = await renderWithRouter(
      <VariableForm
        questionnaireId={'q-id'}
        onSubmit={submitFn}
        submitLabel="Validate"
        scopes={new Map<string, string>()}
      />,
    )

    await waitFor(() => {
      expect(screen.getByTestId('form-submit-button')).toBeDisabled()
    })

    fireEvent.input(getByRole('textbox', { name: /Name/i }), {
      target: { value: 'MY_VAR' },
    })
    fireEvent.input(getByRole('textbox', { name: /Description/i }), {
      target: { value: 'A great variable' },
    })

    await waitFor(() => {
      expect(screen.getByTestId('form-submit-button')).toBeEnabled()
    })

    fireEvent.submit(screen.getByTestId('form-submit-button'))
    await waitFor(() => {
      expect(submitFn).toBeCalled()
    })
  })

  it('should enable the button only when all required fields are filled for a calculated variable', async () => {
    const submitFn = vi.fn()
    const { getByRole, getByText } = await renderWithRouter(
      <VariableForm
        questionnaireId={'q-id'}
        onSubmit={submitFn}
        submitLabel="Validate"
        scopes={new Map<string, string>()}
      />,
    )

    await waitFor(() => {
      expect(screen.getByTestId('form-submit-button')).toBeDisabled()
    })

    fireEvent.click(within(getByText(/Calculated/i)).getByRole('radio'))

    fireEvent.input(getByRole('textbox', { name: /Name/i }), {
      target: { value: 'MY_VAR' },
    })
    fireEvent.input(getByRole('textbox', { name: /Description/i }), {
      target: { value: 'A great variable' },
    })
    fireEvent.input(getByRole('textbox', { name: /Formula/i }), {
      target: { value: 'my formula' },
    })

    await waitFor(() => {
      expect(screen.getByTestId('form-submit-button')).toBeEnabled()
    })

    fireEvent.submit(screen.getByTestId('form-submit-button'))
    await waitFor(() => {
      expect(submitFn).toBeCalled()
    })
  })

  it('should display form error when name is invalid', async () => {
    const { findAllByRole, getByRole, getByText, queryByRole } =
      await renderWithRouter(
        <VariableForm
          questionnaireId={'q-id'}
          onSubmit={vi.fn()}
          submitLabel="Validate"
          scopes={new Map<string, string>()}
        />,
      )

    expect(queryByRole('alert')).toBeNull()

    fireEvent.input(getByRole('textbox', { name: /Name/i }), {
      target: { value: 'ma' },
    })
    fireEvent.input(getByRole('textbox', { name: /Name/i }), {
      target: { value: '' },
    })

    expect(await findAllByRole('alert')).toHaveLength(1)
    expect(getByText('You must provide a name')).toBeDefined()
  })

  it('should display form error when description is invalid', async () => {
    const { findAllByRole, getByRole, getByText, queryByRole } =
      await renderWithRouter(
        <VariableForm
          questionnaireId={'q-id'}
          onSubmit={vi.fn()}
          submitLabel="Validate"
          scopes={new Map<string, string>()}
        />,
      )

    expect(queryByRole('alert')).toBeNull()

    fireEvent.input(getByRole('textbox', { name: /Description/i }), {
      target: { value: 'ma_' },
    })
    fireEvent.input(getByRole('textbox', { name: /Description/i }), {
      target: { value: '' },
    })

    expect(await findAllByRole('alert')).toHaveLength(1)
    expect(getByText('You must provide a description')).toBeDefined()
  })

  it('should disable datatype selection when variable is external (it can only be text)', async () => {
    const { getByRole } = await renderWithRouter(
      <VariableForm
        questionnaireId="q-id"
        onSubmit={vi.fn()}
        submitLabel="Validate"
        scopes={new Map<string, string>()}
      />,
    )

    const datatype = getByRole('combobox', { name: /datatype/i })
    expect(datatype).toBeDisabled()
    expect(datatype).toHaveTextContent(/text/i)
  })

  it('should disable datatype selection when editing an external variable with text datatype', async () => {
    const { getByRole } = await renderWithRouter(
      <VariableForm
        questionnaireId="q-id"
        onSubmit={vi.fn()}
        submitLabel="Validate"
        scopes={new Map<string, string>()}
        variable={{
          type: VariableType.External,
          name: 'VAR_EXT',
          description: 'test external',
          scope: '',
          datatype: {
            typeName: DatatypeType.Text,
            maxLength: 249,
          },
        }}
      />,
    )

    const datatype = getByRole('combobox', { name: /datatype/i })
    expect(datatype).toBeDisabled()
    expect(datatype).toHaveTextContent(/text/i)
  })

  it('should allow all datatype options calculated variables', async () => {
    const { findAllByRole, getByRole } = await renderWithRouter(
      <VariableForm
        questionnaireId="q-id"
        onSubmit={vi.fn()}
        submitLabel="Validate"
        scopes={new Map<string, string>()}
        variable={{
          type: VariableType.Calculated,
          name: 'VAR_CALC',
          description: 'test calculated',
          scope: '',
          datatype: {
            typeName: DatatypeType.Numeric,
            minimum: 0,
            maximum: 10,
            decimals: 0,
          },
        }}
      />,
    )

    const datatypeSelect = getByRole('combobox', { name: /datatype/i })
    expect(datatypeSelect).toBeEnabled()

    // open select
    fireEvent.click(datatypeSelect)

    // allowed options : text, date, numeric, boolean
    expect(await findAllByRole('option')).toHaveLength(4)
    expect(getByRole('option', { name: /text/i })).toBeInTheDocument()
    expect(getByRole('option', { name: /date/i })).toBeInTheDocument()
    expect(getByRole('option', { name: /number/i })).toBeInTheDocument()
    expect(getByRole('option', { name: /boolean/i })).toBeInTheDocument()
  })

  it('should allow only Text + current datatype option when editing an external variable if current datatype typename is not text', async () => {
    const { findAllByRole, getByRole } = await renderWithRouter(
      <VariableForm
        questionnaireId="q-id"
        onSubmit={vi.fn()}
        submitLabel="Validate"
        scopes={new Map<string, string>()}
        variable={{
          type: VariableType.External,
          name: 'VAR_EXT',
          description: 'test external',
          scope: '',
          datatype: {
            typeName: DatatypeType.Numeric,
            minimum: 0,
            maximum: 10,
            decimals: 0,
          },
        }}
      />,
    )

    const datatypeSelect = getByRole('combobox', { name: /datatype/i })
    expect(datatypeSelect).toBeEnabled()

    // open select
    fireEvent.click(datatypeSelect)

    // allowed options : text and current variable datatype typeName
    expect(await findAllByRole('option')).toHaveLength(2)
    expect(getByRole('option', { name: /text/i })).toBeInTheDocument()
    expect(getByRole('option', { name: /number/i })).toBeInTheDocument()
  })
})
