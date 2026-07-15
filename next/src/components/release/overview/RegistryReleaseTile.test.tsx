import { TargetModes } from '@/models/questionnaires'
import { renderWithI18n } from '@/testing/render'
import { computeDayFromDate } from '@/utils/date'

import type { RegistryRelease } from '../../../models/releases'
import { RegistryReleaseTile } from './RegistryReleaseTile'

describe('RegistryReleaseTile', () => {
  const mockRelease: RegistryRelease = {
    collectionInstrumentId: 'COL-123',
    version: 2,
    author: 'maelle',
    releaseDate: new Date('2025-06-15T10:00:00Z').getTime(),
    poguesVersionId: '550e8400-e29b-41d4-a716-446655440001',
    releaseDescription: 'ESA 2026',
    mode: TargetModes.CAPI,
    context: 'BUSINESS',
    overrideGenerationParameters: {
      questionNumberingMode: 'SEQUENCE',
      responseTimeQuestion: true,
    },
    visualizeUrl: 'https://visu.example.com/esa-2026',
  }

  beforeEach(() => {
    vi.stubEnv('VITE_TROMBI_URL', 'https://trombi.example.com')
  })

  it('displays all publication information', () => {
    const { getByText } = renderWithI18n(
      <RegistryReleaseTile release={mockRelease} />,
    )

    expect(getByText('ESA 2026')).toBeInTheDocument()
    expect(getByText('COL-123')).toBeInTheDocument()
    expect(getByText('2')).toBeInTheDocument()
    expect(getByText('BUSINESS')).toBeInTheDocument()
    expect(
      getByText('550e8400-e29b-41d4-a716-446655440001'),
    ).toBeInTheDocument()
    expect(getByText('maelle')).toBeInTheDocument()
    expect(
      getByText(computeDayFromDate(new Date(mockRelease.releaseDate))),
    ).toBeInTheDocument()
  })

  it('shows optional parameters when context is BUSINESS', () => {
    const { getByText } = renderWithI18n(
      <RegistryReleaseTile release={mockRelease} />,
    )

    expect(
      getByText((content) => content.startsWith('Optional parameters')),
    ).toBeInTheDocument()
    expect(getByText('By sequence')).toBeInTheDocument()
  })

  it('does not show optional parameters when context is not BUSINESS', () => {
    const release: RegistryRelease = {
      ...mockRelease,
      context: 'HOUSEHOLD',
    }
    const { queryByText } = renderWithI18n(
      <RegistryReleaseTile release={release} />,
    )

    expect(
      queryByText((content) => content.startsWith('Optional parameters')),
    ).toBeNull()
  })

  it('does not show optional parameters when overrideGenerationParameters is null', () => {
    const release: RegistryRelease = {
      ...mockRelease,
      overrideGenerationParameters: null,
    }
    const { queryByText } = renderWithI18n(
      <RegistryReleaseTile release={release} />,
    )

    expect(
      queryByText((content) => content.startsWith('Optional parameters')),
    ).toBeNull()
  })

  it('renders visualize link with visualizeUrl', () => {
    const { getAllByRole } = renderWithI18n(
      <RegistryReleaseTile release={mockRelease} />,
    )

    const links = getAllByRole('link')
    expect(links[0]).toHaveAttribute(
      'href',
      'https://visu.example.com/esa-2026',
    )
    expect(links[0]).toHaveAttribute('target', '_blank')
  })

  it('renders poguesVersionId link with visualizeUrl', () => {
    const { getAllByRole } = renderWithI18n(
      <RegistryReleaseTile release={mockRelease} />,
    )

    const links = getAllByRole('link')
    expect(links[1]).toHaveAttribute(
      'href',
      'https://visu.example.com/esa-2026',
    )
    expect(links[1]).toHaveAttribute('target', '_blank')
  })

  it('renders author link with trombi URL', () => {
    const { getByText } = renderWithI18n(
      <RegistryReleaseTile release={mockRelease} />,
    )

    const authorLink = getByText('maelle').closest('a')
    expect(authorLink).toHaveAttribute(
      'href',
      'https://trombi.example.com/maelle',
    )
    expect(authorLink).toHaveAttribute('target', '_blank')
  })

  it('renders a copy button for the collection instrument ID', () => {
    const { getByRole } = renderWithI18n(
      <RegistryReleaseTile release={mockRelease} />,
    )

    expect(
      getByRole('button', { name: 'Copy to clipboard' }),
    ).toBeInTheDocument()
  })
})
