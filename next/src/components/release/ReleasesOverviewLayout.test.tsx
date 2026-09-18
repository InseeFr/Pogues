import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithI18n } from '@/testing/render'

import ReleasesOverviewLayout from './ReleasesOverviewLayout'

const BLOCK_MESSAGE =
  'Cannot publish: a publication (or publication request) already exists for the latest version of this questionnaire'

vi.mock('@/components/ui/ButtonLink', () => ({
  default: ({
    children,
    to,
    onClick,
  }: {
    children: React.ReactNode
    to: string
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
  }) => (
    <a
      href={to}
      onClick={(event) => {
        onClick?.(event)
        event.preventDefault()
      }}
    >
      {children}
    </a>
  ),
}))

vi.mock('@/components/ui/Breadcrumb', () => ({
  default: () => null,
}))

function renderLayout({
  isPublishDisabled = false,
}: { isPublishDisabled?: boolean } = {}) {
  return renderWithI18n(
    <ReleasesOverviewLayout
      questionnaireId="quest-123"
      isPublishDisabled={isPublishDisabled}
    >
      <p>child content</p>
    </ReleasesOverviewLayout>,
  )
}

describe('ReleaseOverviewLayout', () => {
  it('renders title and create button', () => {
    const { getByText } = renderLayout()

    expect(getByText('Releases')).toBeInTheDocument()
    expect(getByText('Create a release')).toBeInTheDocument()
  })

  it('renders children', () => {
    const { getByText } = renderLayout()

    expect(getByText('child content')).toBeInTheDocument()
  })

  it('renders create button with correct link', () => {
    const { container } = renderLayout()

    const link = container.querySelector('a')
    expect(link).toHaveAttribute(
      'href',
      '/questionnaire/$questionnaireId/releases/new',
    )
  })

  it('opens a dialog when publishing is blocked', async () => {
    const { getByText } = renderLayout({ isPublishDisabled: true })

    await userEvent.click(getByText('Create a release'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Cannot publish')).toBeInTheDocument()
    expect(screen.getByText(BLOCK_MESSAGE)).toBeInTheDocument()
  })

  it('does not open the dialog when publishing is allowed', async () => {
    const { getByText } = renderLayout()

    await userEvent.click(getByText('Create a release'))

    expect(screen.queryByText(BLOCK_MESSAGE)).not.toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
