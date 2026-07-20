import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import {
  FlowLogics,
  FormulasLanguages,
  TargetModes,
} from '@/models/questionnaires'
import type { SerieItem } from '@/models/series'
import { renderWithRouter } from '@/testing/render'

import QuestionnaireDetailsForm from './QuestionnaireDetailsForm'
import type { FormValues } from './schema'

const { mockNavigate, mockGetSerieById } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockGetSerieById: vi.fn(),
}))

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/api/series', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/series')>()
  return {
    ...actual,
    getSerieById: mockGetSerieById,
  }
})

const series: SerieItem[] = [
  { id: 's1', label: 'Serie 1', uri: 'uri 1' },
  { id: 's2', label: 'Serie 2', uri: 'uri 2' },
]

const mockSerieDetail: SerieDetailDTO = {
  id: 's1',
  uri: 'http://example.com/s1',
  label: 'Serie 1',
  altLabel: 'S1',
  operations: [
    { id: 'op1', uri: 'http://example.com/op1', label: 'Operation 1' },
  ],
}

const validDefaultValues: Partial<FormValues> = {
  name: 'MNABSOLUTE',
  title: '[mn] absolute cinema',
  serie: 's1',
  agency: 'fr.insee',
  targetModes: [TargetModes.CAPI],
  flowLogic: FlowLogics.Filter,
  formulasLanguage: FormulasLanguages.VTL,
}

describe('QuestionnaireDetailsForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetSerieById.mockResolvedValue(mockSerieDetail)
  })

  it('renders all form fields with correct labels', async () => {
    await renderWithRouter(
      <QuestionnaireDetailsForm
        series={series}
        onSubmit={vi.fn()}
        submitLabel="Edit"
      />,
    )

    expect(
      screen.getByRole('textbox', { name: /questionnaire id/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /questionnaire title/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /ddi agency/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(4)
    expect(screen.getAllByRole('radiogroup')).toHaveLength(2)
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('disables submit button when form is invalid', async () => {
    await renderWithRouter(
      <QuestionnaireDetailsForm
        series={series}
        onSubmit={vi.fn()}
        submitLabel="Edit"
      />,
    )

    expect(screen.getByTestId('form-submit-button')).toBeDisabled()
  })

  it('enables submit button when form becomes valid and dirty', async () => {
    const user = userEvent.setup()
    await renderWithRouter(
      <QuestionnaireDetailsForm
        series={series}
        defaultValues={validDefaultValues}
        onSubmit={vi.fn()}
        submitLabel="Edit"
      />,
    )

    const titleInput = screen.getByRole('textbox', {
      name: /questionnaire title/i,
    })
    await user.clear(titleInput)
    await user.type(titleInput, 'Updated Title')

    await waitFor(() => {
      expect(screen.getByTestId('form-submit-button')).toBeEnabled()
    })
  })

  it('calls onSubmit with form values when submitted', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    await renderWithRouter(
      <QuestionnaireDetailsForm
        series={series}
        defaultValues={validDefaultValues}
        onSubmit={onSubmit}
        submitLabel="Edit"
      />,
    )

    const titleInput = screen.getByRole('textbox', {
      name: /questionnaire title/i,
    })
    await user.clear(titleInput)
    await user.type(titleInput, 'Updated Title')

    await user.click(screen.getByTestId('form-submit-button'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce()
    })
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Updated Title',
        name: 'MNABSOLUTE',
        serie: 's1',
      }),
    )
  })

  it('navigates to /questionnaires on cancel', async () => {
    const user = userEvent.setup()
    await renderWithRouter(
      <QuestionnaireDetailsForm
        series={series}
        onSubmit={vi.fn()}
        submitLabel="Edit"
      />,
    )

    await user.click(screen.getByRole('button', { name: /cancel/i }))

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/questionnaires',
      ignoreBlocker: true,
    })
  })

  it('renders in readOnly mode without form buttons', async () => {
    await renderWithRouter(
      <QuestionnaireDetailsForm
        series={series}
        onSubmit={vi.fn()}
        submitLabel="Edit"
        readOnly
      />,
    )

    expect(screen.queryByTestId('form-submit-button')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /cancel/i }),
    ).not.toBeInTheDocument()
  })

  it('fetches serie details when serie defaults are provided', async () => {
    mockGetSerieById.mockResolvedValue(mockSerieDetail)

    await renderWithRouter(
      <QuestionnaireDetailsForm
        series={series}
        defaultValues={validDefaultValues}
        onSubmit={vi.fn()}
        submitLabel="Edit"
      />,
    )

    await waitFor(() => {
      expect(mockGetSerieById).toHaveBeenCalledWith('s1')
    })
  })

  it('does not fetch serie details when serie is empty', async () => {
    await renderWithRouter(
      <QuestionnaireDetailsForm
        series={series}
        onSubmit={vi.fn()}
        submitLabel="Edit"
      />,
    )

    await waitFor(() => {
      expect(mockGetSerieById).not.toHaveBeenCalled()
    })
  })

  it('displays validation error when title is cleared', async () => {
    const user = userEvent.setup()
    await renderWithRouter(
      <QuestionnaireDetailsForm
        series={series}
        onSubmit={vi.fn()}
        submitLabel="Edit"
      />,
    )

    const titleInput = screen.getByRole('textbox', {
      name: /questionnaire title/i,
    })
    await user.type(titleInput, 'A')
    await user.clear(titleInput)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(screen.getByText(/must provide a title/i)).toBeInTheDocument()
  })
})
