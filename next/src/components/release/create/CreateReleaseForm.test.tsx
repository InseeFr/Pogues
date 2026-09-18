import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TargetModes } from '@/models/questionnaires'
import { renderWithRouter } from '@/testing/render'

import CreateReleaseForm from './CreateReleaseForm'

const { toastSuccess, toastError, mockPostRelease } = vi.hoisted(() => ({
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
  mockPostRelease: vi.fn(),
}))

vi.mock('react-hot-toast', () => {
  type ToastHandlers = {
    loading: string
    success: string | ((data: unknown) => string)
    error: string | ((error: unknown) => string)
  }

  return {
    __esModule: true,
    default: {
      promise: vi.fn((promise: Promise<unknown>, msgs: ToastHandlers) => {
        promise.then(
          (data: unknown) => {
            const message =
              typeof msgs.success === 'function'
                ? msgs.success(data)
                : msgs.success
            toastSuccess(message)
          },
          (error: unknown) => {
            const message =
              typeof msgs.error === 'function' ? msgs.error(error) : msgs.error
            toastError(message)
          },
        )
        return promise
      }),
      error: toastError,
      success: toastSuccess,
    },
  }
})

vi.mock('@/api/releases', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/releases')>()
  return {
    ...actual,
    postRelease: mockPostRelease,
  }
})

const TARGET_MODES = [TargetModes.CAWI, TargetModes.CAPI, TargetModes.CATI]
const ALREADY_PUBLISHED_MESSAGE =
  'Cannot publish: a publication (or publication request) already exists for the latest version of this questionnaire'

function createAxiosError(status: number) {
  return {
    isAxiosError: true,
    response: { status },
  }
}

async function renderCreateReleaseForm() {
  return renderWithRouter(
    <CreateReleaseForm
      questionnaireId="q-id"
      seriesId="my-series-id"
      seriesLabel="my-series-label"
      targetModes={TARGET_MODES}
      isPublishDisabled={false}
    />,
  )
}

async function submitRelease(user: ReturnType<typeof userEvent.setup>) {
  await user.type(
    screen.getByRole('textbox', { name: /Description/i }),
    'My release',
  )

  await waitFor(() => {
    expect(screen.getByTestId('form-submit-button')).toBeEnabled()
  })

  await user.click(screen.getByTestId('form-submit-button'))
}

describe('CreateReleaseForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows the already-published banner when publish fails with a 409', async () => {
    mockPostRelease.mockRejectedValue(createAxiosError(409))
    const user = userEvent.setup()

    await renderCreateReleaseForm()

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    await submitRelease(user)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        ALREADY_PUBLISHED_MESSAGE,
      )
    })
  })

  it('shows an error toast when publish fails with a 409', async () => {
    mockPostRelease.mockRejectedValue(createAxiosError(409))
    const user = userEvent.setup()

    await renderCreateReleaseForm()
    await submitRelease(user)

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith(
        expect.stringContaining(ALREADY_PUBLISHED_MESSAGE),
      )
    })
  })

  it('does not show the already-published banner on a 404 error', async () => {
    mockPostRelease.mockRejectedValue(createAxiosError(404))
    const user = userEvent.setup()

    await renderCreateReleaseForm()
    await submitRelease(user)

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith(
        expect.stringContaining('Questionnaire not found'),
      )
    })

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('does not show the already-published banner on success', async () => {
    mockPostRelease.mockResolvedValue({})
    const user = userEvent.setup()

    await renderCreateReleaseForm()
    await submitRelease(user)

    await waitFor(() => {
      expect(mockPostRelease).toHaveBeenCalledOnce()
    })

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
