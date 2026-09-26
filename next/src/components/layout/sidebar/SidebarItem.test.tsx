import { render, screen } from '@testing-library/react'

import * as React from 'react'

import SidebarItem from './SidebarItem'

const mockMatchRoute = vi.fn()

type MockLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string
  params?: Record<string, string | undefined>
}

vi.mock('@tanstack/react-router', () => ({
  Link: React.forwardRef<HTMLAnchorElement, MockLinkProps>(
    ({ to, params, ...props }, ref) => (
      <a ref={ref} href={to} data-params={JSON.stringify(params)} {...props} />
    ),
  ),
  useMatchRoute: () => mockMatchRoute,
}))

vi.mock('./SidebarIcon', () => ({
  default: ({
    label,
    onIconClick,
  }: {
    label: string
    onIconClick?: () => void
  }) => (
    <span data-testid="sidebar-icon" onClick={onIconClick}>
      {label}
    </span>
  ),
}))

const defaultProps = {
  Icon: () => <svg data-testid="icon" />,
  label: 'Questionnaire',
  path: '/questionnaires/$questionnaireId/$versionId',
  questionnaireId: 'questionnaire-1',
  versionId: 'version-1',
  isDisabled: false,
  isHidden: false,
  innerPaths: [],
  onIconClick: vi.fn(),
}

describe('SidebarItem', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockMatchRoute.mockReturnValue(false)
  })

  it('renders the sidebar item properly', () => {
    render(<SidebarItem {...defaultProps} />)

    expect(
      screen.getByRole('link', { name: 'Questionnaire' }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-icon')).toBeInTheDocument()
  })

  it('does not render anything when the item is hidden', () => {
    render(<SidebarItem {...defaultProps} isHidden />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByTestId('sidebar-icon')).not.toBeInTheDocument()
  })

  it('marks the item as current when its own path matches', () => {
    mockMatchRoute.mockImplementation(
      (options: { to: string }) => options.to === defaultProps.path,
    )

    render(<SidebarItem {...defaultProps} />)

    const link = screen.getByRole('link', { name: 'Questionnaire' })
    expect(link).toHaveAttribute('aria-current', 'true')
  })

  it('marks the item as current when an inner path matches', () => {
    const innerPaths = [
      '/questionnaires/$questionnaireId/$versionId/questions',
      '/questionnaires/$questionnaireId/$versionId/settings',
    ]
    mockMatchRoute.mockImplementation(
      (options: { to: string }) => options.to === innerPaths[1],
    )

    render(<SidebarItem {...defaultProps} innerPaths={innerPaths} />)

    const link = screen.getByRole('link', { name: 'Questionnaire' })
    expect(link).toHaveAttribute('aria-current', 'true')
  })

  it('is not marked as current when no path matches', () => {
    render(<SidebarItem {...defaultProps} />)

    const link = screen.getByRole('link', { name: 'Questionnaire' })
    expect(link).toHaveAttribute('aria-current', 'false')
  })

  it('sets aria-disabled and removes the item from keyboard navigation when disabled', () => {
    render(<SidebarItem {...defaultProps} isDisabled />)

    const link = screen.getByRole('link', { name: 'Questionnaire' })

    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).toHaveAttribute('tabindex', '-1')
  })

  it('links have proper parameters', () => {
    render(<SidebarItem {...defaultProps} />)

    const link = screen.getByRole('link', { name: 'Questionnaire' })

    expect(link).toHaveAttribute(
      'data-params',
      JSON.stringify({
        questionnaireId: 'questionnaire-1',
        versionId: 'version-1',
      }),
    )
  })
})
