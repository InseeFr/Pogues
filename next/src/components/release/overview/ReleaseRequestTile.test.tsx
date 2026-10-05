import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'

import { TargetModes } from '@/models/questionnaires'
import { renderWithI18n } from '@/testing/render'
import { computeDayFromDate } from '@/utils/date'

import type { ReleaseRequest } from '../../../models/releases'
import { ReleaseRequestTile } from './ReleaseRequestTile'

vi.mock('@/api/versions', () => ({
  versionQueryOptions: (versionId: string) => ({
    queryKey: ['version', versionId],
    queryFn: () =>
      Promise.resolve({ id: versionId, day: '15/06/2025' } as const),
  }),
}))

function renderTile(
  request: ReleaseRequest,
  props: {
    onDelete?: (id: number) => void
  } = {},
) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return renderWithI18n(
    <QueryClientProvider client={queryClient}>
      <ReleaseRequestTile
        request={request}
        onDelete={props.onDelete ?? vi.fn()}
      />
    </QueryClientProvider>,
  )
}

describe('ReleaseRequestTile', () => {
  const baseRequest: ReleaseRequest = {
    releaseRequestId: 1,
    author: 'maelle',
    requestDate: new Date('2025-06-15T10:00:00Z').getTime(),
    status: 'RUNNING',
    statusDescription: '',
    poguesVersionId: '550e8400-e29b-41d4-a716-446655440000',
    poguesId: 'ESA2026',
    releaseDescription: 'Publication ESA 2026',
    modes: [TargetModes.CAWI],
    context: 'BUSINESS',
    overrideGenerationParameters: {
      questionNumberingMode: 'NONE',
      responseTimeQuestion: false,
    },
  }

  beforeEach(() => {
    vi.stubEnv('VITE_TROMBI_URL', 'https://trombi.example.com')
  })

  it('displays request description', () => {
    const { getByText } = renderTile(baseRequest)

    expect(getByText('Publication ESA 2026')).toBeInTheDocument()
  })

  it('shows in progress status badge', () => {
    const { getByText } = renderTile(baseRequest)

    expect(
      getByText((content) => content.startsWith('In progress')),
    ).toBeInTheDocument()
  })

  it('shows failed status badge', () => {
    const request: ReleaseRequest = { ...baseRequest, status: 'FAILED' }
    const { getByText } = renderTile(request)

    expect(
      getByText((content) => content.startsWith('Failed')),
    ).toBeInTheDocument()
  })

  it('shows completed status badge', () => {
    const request: ReleaseRequest = { ...baseRequest, status: 'COMPLETED' }
    const { getByText } = renderTile(request)

    expect(
      getByText((content) => content.startsWith('Validated')),
    ).toBeInTheDocument()
  })

  it('shows error message when failed with statusDescription', async () => {
    const user = userEvent.setup()
    const request: ReleaseRequest = {
      ...baseRequest,
      status: 'FAILED',
      statusDescription: 'Error during publication',
    }
    const { getByText, getByRole } = renderTile(request)

    await user.click(getByRole('button', { name: /Publication ESA 2026/ }))

    expect(getByText('Error during publication')).toBeInTheDocument()
  })

  it('does not show error message when in progress', () => {
    const request: ReleaseRequest = {
      ...baseRequest,
      status: 'RUNNING',
      statusDescription: 'Should not appear',
    }
    const { queryByText } = renderTile(request)

    expect(queryByText('Should not appear')).toBeNull()
  })

  it('displays expanded content on click', async () => {
    const user = userEvent.setup()
    const { getByText, getByRole } = renderTile(baseRequest)

    await user.click(getByRole('button', { name: /Publication ESA 2026/ }))

    expect(getByText('Business')).toBeInTheDocument()
    expect(getByText('maelle')).toBeInTheDocument()
    expect(getByText('CAWI')).toBeInTheDocument()
    expect(
      getByText(computeDayFromDate(new Date(baseRequest.requestDate))),
    ).toBeInTheDocument()
    expect(
      getByText((content) => content.startsWith('Optional parameters')),
    ).toBeInTheDocument()
    expect(getByText('No numbering')).toBeInTheDocument()
    expect(
      getByText('550e8400-e29b-41d4-a716-446655440000'),
    ).toBeInTheDocument()
  })

  it('collapses content on click', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByText } = renderTile(baseRequest)

    const header = getByRole('button', { name: /Publication ESA 2026/ })
    await user.click(header)
    await user.click(header)

    expect(
      queryByText((content) => content.startsWith('Optional parameters')),
    ).toBeNull()
  })

  it('shows delete button when request has failed', async () => {
    const user = userEvent.setup()
    const request: ReleaseRequest = { ...baseRequest, status: 'FAILED' }
    const { getByRole } = renderTile(request)

    await user.click(getByRole('button', { name: /Publication ESA 2026/ }))

    expect(
      getByRole('button', { name: 'Delete this request' }),
    ).toBeInTheDocument()
  })

  it('shows delete button when request is completed', async () => {
    const user = userEvent.setup()
    const request: ReleaseRequest = { ...baseRequest, status: 'COMPLETED' }
    const { getByRole } = renderTile(request)

    await user.click(getByRole('button', { name: /Publication ESA 2026/ }))

    expect(
      getByRole('button', { name: 'Delete this request' }),
    ).toBeInTheDocument()
  })

  it('does not show delete button when request is in progress', () => {
    const { queryByRole } = renderTile(baseRequest)

    expect(queryByRole('button', { name: 'Delete this request' })).toBeNull()
  })

  it('calls onDelete with releaseRequestId when delete button is clicked', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    const request: ReleaseRequest = { ...baseRequest, status: 'FAILED' }
    const { getByRole } = renderTile(request, { onDelete })

    await user.click(getByRole('button', { name: /Publication ESA 2026/ }))
    await user.click(getByRole('button', { name: 'Delete this request' }))

    expect(onDelete).toHaveBeenCalledWith(1)
  })

  it('shows version date in tooltip on hover', async () => {
    const user = userEvent.setup()
    const { getByText, getByRole, findByText } = renderTile(baseRequest)

    await user.click(getByRole('button', { name: /Publication ESA 2026/ }))

    const saveId = getByText('550e8400-e29b-41d4-a716-446655440000')
    await user.hover(saveId)

    expect(await findByText('15/06/2025')).toBeInTheDocument()
  })
})
