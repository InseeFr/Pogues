import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'

import { SurveyModeEnum } from '@/api/models/poguesModel'
import type { QuestionnaireDetailsDTO } from '@/api/models/questionnaireDetailsDTO'
import type { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import type { SerieItem } from '@/models/series'
import { renderWithRouter } from '@/testing/render'

import EditQuestionnaireDetails from './EditQuestionnaireDetails'

const {
  mockGetSerieById,
  mockNavigate,
  mockPutQuestionnaireDetail,
  mockToastError,
  mockToastSuccess,
} = vi.hoisted(() => ({
  mockGetSerieById: vi.fn(),
  mockNavigate: vi.fn(),
  mockPutQuestionnaireDetail: vi.fn(),
  mockToastError: vi.fn(),
  mockToastSuccess: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: mockToastError,
    success: mockToastSuccess,
    promise: (
      promise: Promise<unknown>,
      messages: { success: string; error: (error: Error) => string },
    ) => {
      void promise.then(
        () => mockToastSuccess(messages.success),
        (error: Error) => mockToastError(messages.error(error)),
      )
      return promise
    },
  },
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

vi.mock('@/api/questionnaireDetails', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@/api/questionnaireDetails')>()
  return {
    ...actual,
    putQuestionnaireDetail: mockPutQuestionnaireDetail,
  }
})

const series: SerieItem[] = [
  { id: 's1', label: 'Serie 1', uri: 'urn1' },
  { id: 's2', label: 'Serie 2', uri: 'urn2' },
]

const questionnaireDetails: QuestionnaireDetailsDTO = {
  id: 'q123',
  name: 'MNABSOLUTE',
  label: '[mn] absolute cinema',
  targetMode: [SurveyModeEnum.CAPI],
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
  altLabel: 'altLabel',
}

async function openConfirmationDialog() {
  const user = userEvent.setup()
  const titleInput = screen.getByRole('textbox', {
    name: /questionnaire title/i,
  })
  await user.clear(titleInput)
  await user.type(titleInput, 'Updated questionnaire title')
  await waitFor(() => {
    expect(screen.getByTestId('form-submit-button')).toBeEnabled()
  })
  await user.click(screen.getByTestId('form-submit-button'))
  return user
}

describe('EditQuestionnaireDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetSerieById.mockResolvedValue(mockSerieDetail)
  })

  it('renders the form with questionnaire details', async () => {
    await renderWithRouter(
      <EditQuestionnaireDetails
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    expect(
      screen.getByRole('textbox', { name: /questionnaire title/i }),
    ).toHaveValue('[mn] absolute cinema')
    expect(screen.getByTestId('form-submit-button')).toBeInTheDocument()
  })

  it('renders the questionnaire fields with their labels', async () => {
    await renderWithRouter(
      <EditQuestionnaireDetails
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    expect(
      screen.getByRole('textbox', { name: /short name/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(4)
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('opens confirmation dialog on form submit', async () => {
    await renderWithRouter(
      <EditQuestionnaireDetails
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    await openConfirmationDialog()

    expect(screen.getByText('Confirm changes')).toBeInTheDocument()
    expect(
      screen.getByText('Are you sure you want to save the changes?'),
    ).toBeInTheDocument()
  })

  it('closes dialog on cancel', async () => {
    await renderWithRouter(
      <EditQuestionnaireDetails
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    const user = await openConfirmationDialog()
    expect(screen.getByText('Confirm changes')).toBeInTheDocument()

    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: /cancel/i,
      }),
    )

    expect(screen.queryByText('Confirm changes')).not.toBeInTheDocument()
  })

  it('calls mutation and shows success toast on confirm', async () => {
    mockGetSerieById.mockResolvedValue(mockSerieDetail)
    mockPutQuestionnaireDetail.mockResolvedValue({})
    await renderWithRouter(
      <EditQuestionnaireDetails
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    const user = await openConfirmationDialog()
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
    await renderWithRouter(
      <EditQuestionnaireDetails
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    const user = await openConfirmationDialog()
    await user.click(screen.getByRole('button', { name: /validate/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Error updating questionnaire details',
      )
    })
  })

  it('shows error toast when getSerieById fails', async () => {
    mockGetSerieById.mockRejectedValue(new Error('Not found'))
    await renderWithRouter(
      <EditQuestionnaireDetails
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    const user = await openConfirmationDialog()
    await user.click(screen.getByRole('button', { name: /validate/i }))

    await waitFor(() => {
      expect(mockGetSerieById).toHaveBeenCalledWith('s1')
      expect(toast.error).toHaveBeenCalledWith(
        'Error updating questionnaire details',
      )
    })
  })

  it('renders read-only details without form actions', async () => {
    await renderWithRouter(
      <EditQuestionnaireDetails
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
        readOnly
      />,
    )

    expect(
      screen.getByRole('textbox', { name: /questionnaire title/i }),
    ).toHaveValue('[mn] absolute cinema')
    expect(screen.queryByTestId('form-submit-button')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /cancel/i }),
    ).not.toBeInTheDocument()
    expect(mockPutQuestionnaireDetail).not.toHaveBeenCalled()
  })

  it('navigates back to the questionnaire when cancel is clicked', async () => {
    await renderWithRouter(
      <EditQuestionnaireDetails
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    await userEvent.click(screen.getByRole('button', { name: /cancel/i }))

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/questionnaire/$questionnaireId',
      params: { questionnaireId: 'q123' },
    })
  })

  it('displays a validation error when the title is cleared', async () => {
    const user = userEvent.setup()
    await renderWithRouter(
      <EditQuestionnaireDetails
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    const titleInput = screen.getByRole('textbox', {
      name: /questionnaire title/i,
    })
    await user.clear(titleInput)

    await waitFor(() => {
      expect(screen.getByText(/must provide a title/i)).toBeInTheDocument()
    })
  })

  it('displays a short name length error for an invalid questionnaire', async () => {
    await renderWithRouter(
      <EditQuestionnaireDetails
        questionnaireId="q123"
        questionnaireDetails={{
          ...questionnaireDetails,
          name: 'WAYTOOLONGNAME',
        }}
        series={series}
      />,
    )

    await waitFor(() => {
      expect(screen.getByText(/10 characters or less/i)).toBeInTheDocument()
    })
  })

  it('clears the selected serie when its delete button is clicked', async () => {
    const user = userEvent.setup()
    mockPutQuestionnaireDetail.mockResolvedValue({})
    await renderWithRouter(
      <EditQuestionnaireDetails
        questionnaireId="q123"
        questionnaireDetails={questionnaireDetails}
        series={series}
      />,
    )

    await user.click(screen.getByTitle(/delete/i))
    await user.click(screen.getByTestId('form-submit-button'))
    await user.click(screen.getByRole('button', { name: /validate/i }))

    await waitFor(() => {
      expect(mockPutQuestionnaireDetail).toHaveBeenCalledWith(
        'q123',
        expect.objectContaining({ dataCollection: undefined }),
      )
    })
  })
})
