import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TargetModes } from '@/models/questionnaires'
import { renderWithRouter } from '@/testing/render'

import ReleaseForm from './ReleaseForm'

const TARGET_MODES = [TargetModes.CAWI, TargetModes.CAPI, TargetModes.CATI]

describe('ReleaseForm', () => {
  it('should disable submit button when description is empty', async () => {
    await renderWithRouter(
      <ReleaseForm
        questionnaireId="q-id"
        seriesId="my-series-id"
        seriesLabel="my-series-label"
        onSubmit={vi.fn()}
        targetModes={TARGET_MODES}
        submitLabel="Publier"
      />,
    )

    await waitFor(() => {
      expect(screen.getByTestId('form-submit-button')).toBeDisabled()
    })
  })

  it('should enable submit button when description is filled', async () => {
    const user = userEvent.setup()

    const { getByRole } = await renderWithRouter(
      <ReleaseForm
        questionnaireId="q-id"
        seriesId="my-series-id"
        seriesLabel="my-series-label"
        onSubmit={vi.fn()}
        targetModes={TARGET_MODES}
        submitLabel="Publier"
      />,
    )

    await waitFor(() => {
      expect(screen.getByTestId('form-submit-button')).toBeDisabled()
    })

    await user.type(
      getByRole('textbox', { name: /Description/i }),
      'My release',
    )

    await waitFor(() => {
      expect(screen.getByTestId('form-submit-button')).toBeEnabled()
    })
  })

  it('should call onSubmit with form values when submitted', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    const { getByRole } = await renderWithRouter(
      <ReleaseForm
        questionnaireId="q-id"
        seriesId="my-series-id"
        seriesLabel="my-series-label"
        onSubmit={onSubmit}
        targetModes={TARGET_MODES}
        submitLabel="Publier"
      />,
    )

    await user.type(
      getByRole('textbox', { name: /Description/i }),
      'My release',
    )

    await user.click(screen.getByTestId('form-submit-button'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          releaseDescription: 'My release',
          modes: ['CAWI'],
          context: 'HOUSEHOLD',
          overrideGenerationParameters: expect.objectContaining({
            responseTimeQuestion: false,
            questionNumberingMode: 'SEQUENCE',
          }),
        }),
        expect.anything(),
      )
    })
  })

  it('should show optional parameters section for BUSINESS context', async () => {
    const user = userEvent.setup()

    await renderWithRouter(
      <ReleaseForm
        questionnaireId="q-id"
        seriesId="my-series-id"
        seriesLabel="my-series-label"
        onSubmit={vi.fn()}
        targetModes={TARGET_MODES}
        submitLabel="Publier"
      />,
    )

    const contextGroup = screen.getByRole('radiogroup', { name: /Context/ })
    const contextRadios = within(contextGroup).getAllByRole('radio')
    await user.click(contextRadios[1])

    await waitFor(() => {
      expect(screen.getByText('Optional parameters')).toBeInTheDocument()
    })
  })

  it('should hide optional parameters section for HOUSEHOLD context', async () => {
    await renderWithRouter(
      <ReleaseForm
        questionnaireId="q-id"
        seriesId="my-series-id"
        seriesLabel="my-series-label"
        onSubmit={vi.fn()}
        targetModes={TARGET_MODES}
        submitLabel="Publier"
      />,
    )

    expect(screen.queryByText('Optional parameters')).not.toBeInTheDocument()
  })

  it('should only show optional parameters section when targetMode includes CAWI', async () => {
    const user = userEvent.setup()

    await renderWithRouter(
      <ReleaseForm
        questionnaireId="q-id"
        seriesId="my-series-id"
        seriesLabel="my-series-label"
        onSubmit={vi.fn()}
        targetModes={TARGET_MODES}
        submitLabel="Publier"
      />,
    )

    const businessContextGroup = screen.getByRole('radiogroup', {
      name: /Context/,
    })
    const businessContextRadios =
      within(businessContextGroup).getAllByRole('radio')
    await user.click(businessContextRadios[1])

    await waitFor(() => {
      expect(screen.getByText('Optional parameters')).toBeInTheDocument()
    })

    const modeCheckboxes = screen.getAllByRole('checkbox')
    const cawiCheckbox = modeCheckboxes[1]

    await user.click(cawiCheckbox)

    await waitFor(() => {
      expect(screen.queryByText('Optional parameters')).not.toBeInTheDocument()
    })

    await user.click(cawiCheckbox)

    await waitFor(() => {
      expect(screen.getByText('Optional parameters')).toBeInTheDocument()
    })

    await user.click(cawiCheckbox)

    await waitFor(() => {
      expect(screen.queryByText('Optional parameters')).not.toBeInTheDocument()
    })
  })

  it('should toggle optional parameters section when switching context', async () => {
    const user = userEvent.setup()

    await renderWithRouter(
      <ReleaseForm
        questionnaireId="q-id"
        seriesId="my-series-id"
        seriesLabel="my-series-label"
        onSubmit={vi.fn()}
        targetModes={TARGET_MODES}
        submitLabel="Publier"
      />,
    )

    const contextGroup = screen.getByRole('radiogroup', { name: /Context/ })
    const contextRadios = within(contextGroup).getAllByRole('radio')

    expect(screen.queryByText('Optional parameters')).not.toBeInTheDocument()

    await user.click(contextRadios[1])

    await waitFor(() => {
      expect(screen.getByText('Optional parameters')).toBeInTheDocument()
    })

    await user.click(contextRadios[0])

    await waitFor(() => {
      expect(screen.queryByText('Optional parameters')).not.toBeInTheDocument()
    })
  })

  it('should disable submit button when series is missing', async () => {
    await renderWithRouter(
      <ReleaseForm
        questionnaireId="q-id"
        seriesId={undefined}
        seriesLabel={undefined}
        onSubmit={vi.fn()}
        targetModes={TARGET_MODES}
        submitLabel="Publier"
      />,
    )

    await waitFor(() => {
      expect(screen.getByTestId('form-submit-button')).toBeDisabled()
    })
  })
})
