import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TargetModes } from '@/models/questionnaires'
import { renderWithRouter } from '@/testing/render'

import ReleaseForm from './ReleaseForm'

const TARGET_MODES = [TargetModes.CAWI, TargetModes.CAPI, TargetModes.CATI]

async function renderReleaseForm(
  overrides: {
    onSubmit?: (values: { releaseDescription: string }) => void
    isPublishDisabled?: boolean
    seriesId?: string
    seriesLabel?: string
  } = {},
) {
  return renderWithRouter(
    <ReleaseForm
      questionnaireId="q-id"
      seriesId="my-series-id"
      seriesLabel="my-series-label"
      onSubmit={vi.fn()}
      targetModes={TARGET_MODES}
      submitLabel="Publier"
      isPublishDisabled={false}
      {...overrides}
    />,
  )
}

describe('ReleaseForm', () => {
  it('should disable submit button when description is empty', async () => {
    await renderReleaseForm()

    await waitFor(() => {
      expect(screen.getByTestId('form-submit-button')).toBeDisabled()
    })
  })

  it('should enable submit button when description is filled', async () => {
    const user = userEvent.setup()

    const { getByRole } = await renderReleaseForm()

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

    const { getByRole } = await renderReleaseForm({ onSubmit })

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
            responseTimeQuestion: true,
            questionNumberingMode: 'SEQUENCE',
          }),
        }),
        expect.anything(),
      )
    })
  })

  it('should show optional parameters section for BUSINESS context', async () => {
    const user = userEvent.setup()

    await renderReleaseForm()

    const contextGroup = screen.getByRole('radiogroup', { name: /Context/ })
    const contextRadios = within(contextGroup).getAllByRole('radio')
    await user.click(contextRadios[1])

    await waitFor(() => {
      expect(
        screen.getByText(
          'Optional parameters applied to Web questionnaires only',
        ),
      ).toBeInTheDocument()
    })
  })

  it('should hide optional parameters section for HOUSEHOLD context', async () => {
    await renderReleaseForm()

    expect(
      screen.queryByText(
        'Optional parameters applied to Web questionnaires only',
      ),
    ).not.toBeInTheDocument()
  })

  it('should only show optional parameters section when targetMode includes CAWI', async () => {
    const user = userEvent.setup()

    await renderReleaseForm()

    const businessContextGroup = screen.getByRole('radiogroup', {
      name: /Context/,
    })
    const businessContextRadios =
      within(businessContextGroup).getAllByRole('radio')
    await user.click(businessContextRadios[1])

    await waitFor(() => {
      expect(
        screen.getByText(
          'Optional parameters applied to Web questionnaires only',
        ),
      ).toBeInTheDocument()
    })

    const modeCheckboxes = screen.getAllByRole('checkbox')
    const cawiCheckbox = modeCheckboxes[1]

    await user.click(cawiCheckbox)

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Optional parameters applied to Web questionnaires only',
        ),
      ).not.toBeInTheDocument()
    })

    await user.click(cawiCheckbox)

    await waitFor(() => {
      expect(
        screen.getByText(
          'Optional parameters applied to Web questionnaires only',
        ),
      ).toBeInTheDocument()
    })

    await user.click(cawiCheckbox)

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Optional parameters applied to Web questionnaires only',
        ),
      ).not.toBeInTheDocument()
    })
  })

  it('should toggle optional parameters section when switching context', async () => {
    const user = userEvent.setup()

    await renderReleaseForm()

    const contextGroup = screen.getByRole('radiogroup', { name: /Context/ })
    const contextRadios = within(contextGroup).getAllByRole('radio')

    expect(
      screen.queryByText(
        'Optional parameters applied to Web questionnaires only',
      ),
    ).not.toBeInTheDocument()

    await user.click(contextRadios[1])

    await waitFor(() => {
      expect(
        screen.getByText(
          'Optional parameters applied to Web questionnaires only',
        ),
      ).toBeInTheDocument()
    })

    await user.click(contextRadios[0])

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Optional parameters applied to Web questionnaires only',
        ),
      ).not.toBeInTheDocument()
    })
  })

  it('should disable submit button when series is missing', async () => {
    await renderReleaseForm({ seriesId: undefined, seriesLabel: undefined })

    await waitFor(() => {
      expect(screen.getByTestId('form-submit-button')).toBeDisabled()
    })
  })

  it('should keep submit button disabled when publishing is blocked', async () => {
    const user = userEvent.setup()

    const { getByRole } = await renderReleaseForm({ isPublishDisabled: true })

    await user.type(
      getByRole('textbox', { name: /Description/i }),
      'My release',
    )

    expect(screen.getByTestId('form-submit-button')).toBeDisabled()
  })

  it('should not call onSubmit when publishing is blocked', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    const { getByRole } = await renderReleaseForm({
      onSubmit,
      isPublishDisabled: true,
    })

    await user.type(
      getByRole('textbox', { name: /Description/i }),
      'My release{enter}',
    )

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled()
    })
  })
})
