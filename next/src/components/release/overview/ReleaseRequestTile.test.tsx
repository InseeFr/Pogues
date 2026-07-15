import userEvent from '@testing-library/user-event'

import { TargetModes } from '@/models/questionnaires'
import { renderWithI18n } from '@/testing/render'
import { computeDayFromDate } from '@/utils/date'

import type { ReleaseRequest } from '../../../models/releases'
import { ReleaseRequestTile } from './ReleaseRequestTile'

describe('ReleaseRequestTile', () => {
  const baseRequest: ReleaseRequest = {
    trackerId: 1,
    author: 'maelle',
    requestDate: new Date('2025-06-15T10:00:00Z').getTime(),
    currentStep: 'BUILD_PARAMETERS',
    status: 'RUNNING',
    statusDescription: '',
    poguesVersionId: '550e8400-e29b-41d4-a716-446655440000',
    poguesId: 'ESA2026',
    releaseDescription: 'Publication ESA 2026',
    mode: TargetModes.CAWI,
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
    const { getByText } = renderWithI18n(
      <ReleaseRequestTile request={baseRequest} onDelete={vi.fn()} />,
    )

    expect(getByText('Publication ESA 2026')).toBeInTheDocument()
  })

  it('shows in progress status badge', () => {
    const { getByText } = renderWithI18n(
      <ReleaseRequestTile request={baseRequest} onDelete={vi.fn()} />,
    )

    expect(
      getByText((content) => content.startsWith('In progress')),
    ).toBeInTheDocument()
  })

  it('shows failed status badge', () => {
    const request: ReleaseRequest = { ...baseRequest, status: 'FAILED' }
    const { getByText } = renderWithI18n(
      <ReleaseRequestTile request={request} onDelete={vi.fn()} />,
    )

    expect(
      getByText((content) => content.startsWith('Failed')),
    ).toBeInTheDocument()
  })

  it('shows error message when failed with statusDescription', async () => {
    const user = userEvent.setup()
    const request: ReleaseRequest = {
      ...baseRequest,
      status: 'FAILED',
      statusDescription: 'Error during publication',
    }
    const { getByText, getByRole } = renderWithI18n(
      <ReleaseRequestTile request={request} onDelete={vi.fn()} />,
    )

    await user.click(getByRole('button', { name: /Publication ESA 2026/ }))

    expect(getByText('Error during publication')).toBeInTheDocument()
  })

  it('does not show error message when in progress', () => {
    const request: ReleaseRequest = {
      ...baseRequest,
      status: 'RUNNING',
      statusDescription: 'Should not appear',
    }
    const { queryByText } = renderWithI18n(
      <ReleaseRequestTile request={request} onDelete={vi.fn()} />,
    )

    expect(queryByText('Should not appear')).toBeNull()
  })

  it('displays expanded content on click', async () => {
    const user = userEvent.setup()
    const { getByText, getByRole } = renderWithI18n(
      <ReleaseRequestTile request={baseRequest} onDelete={vi.fn()} />,
    )

    await user.click(getByRole('button', { name: /Publication ESA 2026/ }))

    expect(getByText('BUSINESS')).toBeInTheDocument()
    expect(getByText('maelle')).toBeInTheDocument()
    expect(
      getByText(computeDayFromDate(new Date(baseRequest.requestDate))),
    ).toBeInTheDocument()
    expect(
      getByText((content) => content.startsWith('Optional parameters')),
    ).toBeInTheDocument()
    expect(getByText('No numbering')).toBeInTheDocument()
  })

  it('collapses content on click', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByText } = renderWithI18n(
      <ReleaseRequestTile request={baseRequest} onDelete={vi.fn()} />,
    )

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
    const { getByRole } = renderWithI18n(
      <ReleaseRequestTile request={request} onDelete={vi.fn()} />,
    )

    await user.click(getByRole('button', { name: /Publication ESA 2026/ }))

    expect(
      getByRole('button', { name: 'Delete this request' }),
    ).toBeInTheDocument()
  })

  it('shows delete button when request is completed', async () => {
    const user = userEvent.setup()
    const request: ReleaseRequest = { ...baseRequest, status: 'COMPLETED' }
    const { getByRole } = renderWithI18n(
      <ReleaseRequestTile request={request} onDelete={vi.fn()} />,
    )

    await user.click(getByRole('button', { name: /Publication ESA 2026/ }))

    expect(
      getByRole('button', { name: 'Delete this request' }),
    ).toBeInTheDocument()
  })

  it('does not show delete button when request is in progress', () => {
    const { queryByRole } = renderWithI18n(
      <ReleaseRequestTile request={baseRequest} onDelete={vi.fn()} />,
    )

    expect(queryByRole('button', { name: 'Delete this request' })).toBeNull()
  })

  it('calls onDelete with trackerId when delete button is clicked', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    const request: ReleaseRequest = { ...baseRequest, status: 'FAILED' }
    const { getByRole } = renderWithI18n(
      <ReleaseRequestTile request={request} onDelete={onDelete} />,
    )

    await user.click(getByRole('button', { name: /Publication ESA 2026/ }))
    await user.click(getByRole('button', { name: 'Delete this request' }))

    expect(onDelete).toHaveBeenCalledWith(1)
  })
})
