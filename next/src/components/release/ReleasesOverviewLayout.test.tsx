import { renderWithI18n } from '@/testing/render'

import ReleaseOverviewLayout from './ReleasesOverviewLayout'

vi.mock('@/components/ui/ButtonLink', () => ({
  default: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}))

vi.mock('@/components/ui/Breadcrumb', () => ({
  default: () => null,
}))

describe('ReleaseOverviewLayout', () => {
  it('renders title and create button', () => {
    const { getByText } = renderWithI18n(
      <ReleaseOverviewLayout questionnaireId="quest-123">
        <p>child content</p>
      </ReleaseOverviewLayout>,
    )

    expect(getByText('Releases')).toBeInTheDocument()
    expect(getByText('Create a release')).toBeInTheDocument()
  })

  it('renders children', () => {
    const { getByText } = renderWithI18n(
      <ReleaseOverviewLayout questionnaireId="quest-123">
        <p>child content</p>
      </ReleaseOverviewLayout>,
    )

    expect(getByText('child content')).toBeInTheDocument()
  })

  it('renders create button with correct link', () => {
    const { container } = renderWithI18n(
      <ReleaseOverviewLayout questionnaireId="quest-123">
        <p>child content</p>
      </ReleaseOverviewLayout>,
    )

    const link = container.querySelector('a')
    expect(link).toHaveAttribute(
      'href',
      '/questionnaire/$questionnaireId/releases/new',
    )
  })
})
