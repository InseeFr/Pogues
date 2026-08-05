import { MOCK_PUBLICATIONS } from '@/api/releases'
import { TargetModes } from '@/models/questionnaires'
import { renderWithRouter } from '@/testing/render'

import type { ReleaseRequest } from '../../models/releases'
import ReleaseOverview from './ReleaseOverview'

const pendingRequests: ReleaseRequest[] = [
  {
    releaseRequestId: 1,
    author: 'xbeltv',
    requestDate: new Date('2026-07-06T10:30:00').getTime(),
    status: 'RUNNING',
    statusDescription: '',
    poguesVersionId: '550e8400-e29b-41d4-a716-446655440000',
    poguesId: 'SRCV_REINTERRO',
    releaseDescription: 'Recette intégrée oct 2025 pour SRCV_REINTERRO 2026',
    modes: [TargetModes.CAPI],
    context: 'HOUSEHOLD',
    overrideGenerationParameters: {
      questionNumberingMode: 'SEQUENCE',
      responseTimeQuestion: true,
    },
  },
  {
    releaseRequestId: 2,
    author: 'nazdsn',
    requestDate: new Date('2026-07-05T14:15:00').getTime(),
    status: 'FAILED',
    statusDescription: 'Erreur lors de la génération Eno',
    poguesVersionId: '550e8400-e29b-41d4-a716-446655440001',
    poguesId: 'SRCV_REINTERRO',
    releaseDescription: 'Autre demande de publication pour SRCV_REINTERRO 2026',
    modes: [TargetModes.CAWI],
    context: 'BUSINESS',
    overrideGenerationParameters: {
      questionNumberingMode: 'NONE',
      responseTimeQuestion: false,
    },
  },
  {
    releaseRequestId: 3,
    author: 'bcbab8',
    requestDate: new Date('2026-07-04T09:00:00').getTime(),
    status: 'FAILED',
    statusDescription: 'Erreur 409 - Conflit de version',
    poguesVersionId: '550e8400-e29b-41d4-a716-446655440002',
    poguesId: 'SRCV_REINTERRO',
    releaseDescription: 'Recette intégrée oct 2025 pour SRCV_REINTERRO 2026',
    modes: [TargetModes.CAWI],
    context: 'HOUSEHOLD',
    overrideGenerationParameters: {
      questionNumberingMode: 'ALL',
      responseTimeQuestion: true,
    },
  },
]

const defaultProps = {
  pendingRequests,
  releases: MOCK_PUBLICATIONS,
}

describe('ReleaseOverview', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_TROMBI_URL', 'https://trombi.example.com')
  })

  it('renders both sections with correct headers', async () => {
    const { getByText } = await renderWithRouter(
      <ReleaseOverview {...defaultProps} />,
    )

    expect(getByText('My release requests')).toBeInTheDocument()
    expect(getByText('My publications')).toBeInTheDocument()
  })

  it('renders all request tiles', async () => {
    const { getByText, getAllByText } = await renderWithRouter(
      <ReleaseOverview {...defaultProps} />,
    )

    expect(
      getAllByText('Recette intégrée oct 2025 pour SRCV_REINTERRO 2026').length,
    ).toBe(2)
    expect(
      getByText('Autre demande de publication pour SRCV_REINTERRO 2026'),
    ).toBeInTheDocument()
  })

  it('renders all publication tiles', async () => {
    const { getByText } = await renderWithRouter(
      <ReleaseOverview {...defaultProps} />,
    )

    expect(getByText('ESA 2026 PROD')).toBeInTheDocument()
    expect(getByText('ESA 2026 TEST TERRAIN')).toBeInTheDocument()
    expect(getByText("Publication la plus ancienne d'ESA")).toBeInTheDocument()
  })

  it('renders requests sorted by date descending', async () => {
    const { getAllByText } = await renderWithRouter(
      <ReleaseOverview {...defaultProps} />,
    )

    const descriptions = getAllByText(
      (content) =>
        content.includes('SRCV_REINTERRO 2026') &&
        !content.includes('Failed') &&
        !content.includes('In progress'),
    )
    expect(descriptions.length).toBeGreaterThanOrEqual(2)
  })

  it('shows empty message when there are no pending requests', async () => {
    const { getByText } = await renderWithRouter(
      <ReleaseOverview pendingRequests={[]} releases={MOCK_PUBLICATIONS} />,
    )

    expect(getByText('No release available')).toBeInTheDocument()
    expect(getByText('My release requests')).toBeInTheDocument()
    expect(getByText('My publications')).toBeInTheDocument()
  })

  it('shows noPublication message when there are no requests and no publications', async () => {
    const { getByText } = await renderWithRouter(
      <ReleaseOverview pendingRequests={[]} releases={[]} />,
    )

    expect(
      getByText('The questionnaire has not yet been published'),
    ).toBeInTheDocument()
  })
})
