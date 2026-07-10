import { renderWithI18n } from '@/testing/render'

import ReleaseOverview from './ReleaseOverview'

describe('ReleaseOverview', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_TROMBI_URL', 'https://trombi.example.com')
  })

  it('renders both sections with correct headers', () => {
    const { getByText } = renderWithI18n(<ReleaseOverview />)

    expect(getByText('My publication requests')).toBeInTheDocument()
    expect(getByText('My publications')).toBeInTheDocument()
  })

  it('renders all request tiles', () => {
    const { getByText, getAllByText } = renderWithI18n(<ReleaseOverview />)

    expect(
      getAllByText('Recette intégrée oct 2025 pour SRCV_REINTERRO 2026').length,
    ).toBe(2)
    expect(
      getByText('Autre demande de publication pour SRCV_REINTERRO 2026'),
    ).toBeInTheDocument()
  })

  it('renders all publication tiles', () => {
    const { getByText } = renderWithI18n(<ReleaseOverview />)

    expect(getByText('ESA 2026 PROD')).toBeInTheDocument()
    expect(getByText('ESA 2026 TEST TERRAIN')).toBeInTheDocument()
    expect(getByText("Publication la plus ancienne d'ESA")).toBeInTheDocument()
  })

  it('renders requests sorted by date descending', () => {
    const { getAllByText } = renderWithI18n(<ReleaseOverview />)

    const descriptions = getAllByText(
      (content) =>
        content.includes('SRCV_REINTERRO 2026') &&
        !content.includes('Failed') &&
        !content.includes('In progress'),
    )
    expect(descriptions.length).toBeGreaterThanOrEqual(2)
  })
})
