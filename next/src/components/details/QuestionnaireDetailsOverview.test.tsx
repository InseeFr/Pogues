import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'

import { FlowLogicEnum, FormulasLanguageEnum } from '@/api/models/poguesModel'
import type { QuestionnaireDetailsDTO } from '@/api/models/questionnaireDetailsDTO'
import type { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import {
  FlowLogics,
  FormulasLanguages,
  TargetModes,
} from '@/models/questionnaires'
import type { SerieItem } from '@/models/series'
import { renderWithRouter } from '@/testing/render'

import QuestionnaireDetailsOverview from './QuestionnaireDetailsOverview'

const { mockGetSerieById, mockPutQuestionnaireDetail } = vi.hoisted(() => ({
  mockGetSerieById: vi.fn(),
  mockPutQuestionnaireDetail: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { error: vi.fn(), success: vi.fn() },
}))

vi.mock('@/api/series', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/series')>()
  return {
    ...actual,
    getSerieById: mockGetSerieById,
  }
})

vi.mock('@/api/questionnaireDetails', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@/api/questionnaireDetails')>()
  return {
    ...actual,
    putQuestionnaireDetail: mockPutQuestionnaireDetail,
  }
})

vi.mock('./form/QuestionnaireDetailsForm', () => ({
  default: vi.fn(
    ({
      onSubmit,
      submitLabel,
    }: {
      onSubmit: (data: Record<string, unknown>) => void
      submitLabel: string
    }) => (
      <button
        type="button"
        onClick={() =>
          onSubmit({
            name: 'MNABSOLUTE',
            title: '[mn] absolute cinema',
            serie: 's1',
            agency: 'fr.insee',
            targetModes: [TargetModes.CAPI],
            flowLogic: FlowLogics.Filter,
            formulasLanguage: FormulasLanguages.VTL,
          })
        }
      >
        {submitLabel}
      </button>
    ),
  ),
}))

const series: SerieItem[] = [{ id: 's1', label: 'Serie 1', uri: 'urn1' }]

const questionnaireDetails: QuestionnaireDetailsDTO = {
  id: 'q123',
  name: 'MNABSOLUTE',
  label: '[mn] absolute cinema',
  flowLogic: FlowLogicEnum.Filter,
  formulasLanguage: FormulasLanguageEnum.VTL,
  targetMode: ['CAPI'],
  agency: 'fr.insee',
  owner: 'ESQUIE',
  dataCollection: {
    serie: { id: 's1', uri: 'uri', label: 'Serie 1', altLabel: 'S1' },
  },
}

const mockSerieDetail: SerieDetailDTO = {
  id: 's1',
  uri: 'http://example.com/s1',
  label: 'Serie 1',
}

describe('QuestionnaireDetailsOverview', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the form with questionnaire details', async () => {
    await renderWithRouter(
      <QuestionnaireDetailsOverview
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
  })

  it('opens confirmation dialog on form submit', async () => {
    const user = userEvent.setup()
    await renderWithRouter(
      <QuestionnaireDetailsOverview
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    await user.click(screen.getByRole('button', { name: /edit/i }))

    expect(screen.getByText('Confirm changes')).toBeInTheDocument()
    expect(
      screen.getByText('Are you sure you want to save the changes?'),
    ).toBeInTheDocument()
  })

  it('closes dialog on cancel', async () => {
    const user = userEvent.setup()
    await renderWithRouter(
      <QuestionnaireDetailsOverview
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    await user.click(screen.getByRole('button', { name: /edit/i }))
    expect(screen.getByText('Confirm changes')).toBeInTheDocument()

    await user.click(screen.getAllByRole('button', { name: /cancel/i })[0])

    expect(screen.queryByText('Confirm changes')).not.toBeInTheDocument()
  })

  it('calls mutation and shows success toast on confirm', async () => {
    mockGetSerieById.mockResolvedValue(mockSerieDetail)
    mockPutQuestionnaireDetail.mockResolvedValue({})
    const user = userEvent.setup()

    await renderWithRouter(
      <QuestionnaireDetailsOverview
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    await user.click(screen.getByRole('button', { name: /edit/i }))
    await user.click(screen.getByRole('button', { name: /validate/i }))

    await waitFor(() => {
      expect(mockPutQuestionnaireDetail).toHaveBeenCalledOnce()
    })
    expect(toast.success).toHaveBeenCalledWith(
      'Questionnaire details updated successfully',
    )
  })

  it('shows error toast when mutation fails', async () => {
    mockGetSerieById.mockResolvedValue(mockSerieDetail)
    mockPutQuestionnaireDetail.mockRejectedValue(new Error('Network error'))
    const user = userEvent.setup()

    await renderWithRouter(
      <QuestionnaireDetailsOverview
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    await user.click(screen.getByRole('button', { name: /edit/i }))
    await user.click(screen.getByRole('button', { name: /validate/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Error updating questionnaire details',
      )
    })
  })

  it('shows error toast when getSerieById fails', async () => {
    mockGetSerieById.mockRejectedValue(new Error('Not found'))
    const user = userEvent.setup()

    await renderWithRouter(
      <QuestionnaireDetailsOverview
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    await user.click(screen.getByRole('button', { name: /edit/i }))
    await user.click(screen.getByRole('button', { name: /validate/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Error updating questionnaire details',
      )
    })
  })
})
