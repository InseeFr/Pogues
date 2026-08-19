import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'

import { TargetModes } from '@/models/questionnaires'
import { renderWithI18n } from '@/testing/render'
import { computeDayFromDate } from '@/utils/date'

import type { RegistryRelease } from '../../../models/releases'
import { RegistryReleaseTile } from './RegistryReleaseTile'

vi.mock('@/api/versions', () => ({
  versionQueryOptions: (versionId: string) => ({
    queryKey: ['version', versionId],
    queryFn: () =>
      Promise.resolve({ id: versionId, day: '15/06/2025' } as const),
  }),
}))

function renderTile(release: RegistryRelease) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return renderWithI18n(
    <QueryClientProvider client={queryClient}>
      <RegistryReleaseTile release={release} />
    </QueryClientProvider>,
  )
}

describe('RegistryReleaseTile', () => {
  const mockRelease: RegistryRelease = {
    author: 'maelle',
    releaseDate: new Date('2025-06-15T10:00:00Z').getTime(),
    poguesVersionId: '550e8400-e29b-41d4-a716-446655440001',
    releaseDescription: 'ESA 2026',
    context: 'BUSINESS',
    collectionInstruments: [
      {
        mode: TargetModes.CAPI,
        collectionInstrumentId: 'COL-123',
        version: 2,
        overrideGenerationParameters: {
          questionNumberingMode: 'SEQUENCE',
          responseTimeQuestion: true,
        },
        visualizeUrl: 'https://visu.example.com/esa-2026',
      },
    ],
  }

  beforeEach(() => {
    vi.stubEnv('VITE_TROMBI_URL', 'https://trombi.example.com')
  })

  it('displays description, author, publication date and context in the root card', () => {
    const { getByText } = renderTile(mockRelease)

    expect(getByText('ESA 2026')).toBeInTheDocument()
    expect(getByText('maelle')).toBeInTheDocument()
    expect(
      getByText(computeDayFromDate(new Date(mockRelease.releaseDate))),
    ).toBeInTheDocument()
    expect(getByText('Business')).toBeInTheDocument()
  })

  it('displays the pogues save id in the root card', () => {
    const { getByText } = renderTile(mockRelease)

    expect(
      getByText('550e8400-e29b-41d4-a716-446655440001'),
    ).toBeInTheDocument()
  })

  it('renders one expandable subcard per collection instrument', () => {
    const release: RegistryRelease = {
      ...mockRelease,
      collectionInstruments: [
        {
          mode: TargetModes.CAWI,
          collectionInstrumentId: 'COL-CAWI',
          version: 2,
          overrideGenerationParameters: null,
          visualizeUrl: 'https://visu.example.com/esa-2026-cawi',
        },
        ...mockRelease.collectionInstruments,
      ],
    }
    const { getByRole } = renderTile(release)

    expect(getByRole('button', { name: 'CAWI' })).toBeInTheDocument()
    expect(getByRole('button', { name: 'CAPI' })).toBeInTheDocument()
  })

  it('shows collection instrument details when the subcard is expanded', async () => {
    const user = userEvent.setup()
    const { getByRole, getByText } = renderTile(mockRelease)

    await user.click(getByRole('button', { name: 'CAPI' }))

    expect(getByText('COL-123')).toBeInTheDocument()
    expect(getByText('2')).toBeInTheDocument()
    expect(
      getByText((content) => content.startsWith('Optional parameters')),
    ).toBeInTheDocument()
    expect(getByText('By sequence')).toBeInTheDocument()
  })

  it('hides collection instrument details when the subcard is collapsed', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByText } = renderTile(mockRelease)

    expect(queryByText('COL-123')).toBeNull()

    const modeHeader = getByRole('button', { name: 'CAPI' })
    await user.click(modeHeader)
    await user.click(modeHeader)

    expect(queryByText('COL-123')).toBeNull()
  })

  it('does not show optional parameters when overrideGenerationParameters is null', async () => {
    const user = userEvent.setup()
    const release: RegistryRelease = {
      ...mockRelease,
      collectionInstruments: [
        {
          ...mockRelease.collectionInstruments[0],
          overrideGenerationParameters: null,
        },
      ],
    }
    const { getByRole, queryByText } = renderTile(release)

    await user.click(getByRole('button', { name: 'CAPI' }))

    expect(
      queryByText((content) => content.startsWith('Optional parameters')),
    ).toBeNull()
  })

  it('renders the visualize button of the collection instrument', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const user = userEvent.setup()
    const { getByRole } = renderTile(mockRelease)

    await user.click(getByRole('button', { name: 'CAPI' }))

    const visualizeButton = getByRole('button', {
      name: 'Visualize collection instrument',
    })
    expect(visualizeButton).toBeInTheDocument()

    await user.click(visualizeButton)
    expect(openSpy).toHaveBeenCalledWith(
      'https://visu.example.com/esa-2026',
      '_blank',
      'noopener,noreferrer',
    )
    openSpy.mockRestore()
  })

  it('renders author link with trombi URL', () => {
    const { getByText } = renderTile(mockRelease)

    const authorLink = getByText('maelle').closest('a')
    expect(authorLink).toHaveAttribute(
      'href',
      'https://trombi.example.com/maelle',
    )
    expect(authorLink).toHaveAttribute('target', '_blank')
  })

  it('renders a copy button for the collection instrument ID when expanded', async () => {
    const user = userEvent.setup()
    const { getByRole } = renderTile(mockRelease)

    await user.click(getByRole('button', { name: 'CAPI' }))

    expect(
      getByRole('button', { name: 'Copy to clipboard' }),
    ).toBeInTheDocument()
  })

  it('shows version date in tooltip on hover', async () => {
    const user = userEvent.setup()
    const { getByText, findByText } = renderTile(mockRelease)

    const saveId = getByText('550e8400-e29b-41d4-a716-446655440001')
    await user.hover(saveId)

    expect(await findByText('15/06/2025')).toBeInTheDocument()
  })
})
