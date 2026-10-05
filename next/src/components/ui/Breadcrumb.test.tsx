import { screen, within } from '@testing-library/react'

import type { ReactNode } from 'react'

import { renderWithI18n } from '@/testing/render'

import Breadcrumb from './Breadcrumb'

interface CrumbMatch {
  id: string
  fullPath: string
  status: string
  loaderData: { crumb?: string }
}

interface MockLinkProps {
  children: ReactNode
  className?: string
  to: string
}

const { isMatchMock, LinkMock, useMatchesMock } = vi.hoisted(() => ({
  isMatchMock: vi.fn(),
  LinkMock: vi.fn(),
  useMatchesMock: vi.fn(),
}))

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>()
  return {
    ...actual,
    Link: LinkMock,
    isMatch: isMatchMock,
    useMatches: useMatchesMock,
  }
})

const createMatch = (
  id: string,
  fullPath: string,
  crumb?: string,
  status = 'success',
): CrumbMatch => ({
  id,
  fullPath,
  status,
  loaderData: { crumb },
})

const renderLinkMock = ({ children, className, to }: MockLinkProps) => (
  <a className={className} href={to}>
    {children}
  </a>
)

describe('Breadcrumb', () => {
  beforeEach(() => {
    isMatchMock.mockReset()
    isMatchMock.mockImplementation(
      (match: CrumbMatch) => match.loaderData?.crumb != null,
    )
    LinkMock.mockReset()
    LinkMock.mockImplementation(renderLinkMock)
    useMatchesMock.mockReset()
  })

  it('renders nothing while a match is pending', () => {
    useMatchesMock.mockReturnValue([
      createMatch('root', '/', undefined, 'pending'),
    ])

    renderWithI18n(<Breadcrumb />)

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('renders an empty navigation when no match has a crumb', () => {
    useMatchesMock.mockReturnValue([createMatch('root', '/')])

    renderWithI18n(<Breadcrumb />)

    const navigation = screen.getByRole('navigation', {
      name: /Breadcrumb/i,
    })
    expect(within(navigation).queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('renders the breadcrumb landmark with an accessible label', () => {
    useMatchesMock.mockReturnValue([createMatch('root', '/', 'Home')])

    renderWithI18n(<Breadcrumb />)

    expect(
      screen.getByRole('navigation', { name: /Breadcrumb/i }),
    ).toBeInTheDocument()
  })

  it('renders a single crumb as the current page without a link', () => {
    useMatchesMock.mockReturnValue([createMatch('root', '/', 'Home')])

    renderWithI18n(<Breadcrumb />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText('Home')).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByText('/')).not.toBeInTheDocument()
  })

  it('renders intermediate crumbs as links pointing to their fullPath', () => {
    useMatchesMock.mockReturnValue([
      createMatch('root', '/', 'Home'),
      createMatch('questionnaires', '/questionnaires', 'Questionnaires'),
      createMatch('detail', '/questionnaires/1', 'Détails'),
    ])

    renderWithI18n(<Breadcrumb />)

    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveAttribute('href', '/')
    expect(homeLink).toHaveClass('text-action-primary')
    expect(homeLink).toHaveClass('font-semibold')

    const questionnairesLink = screen.getByRole('link', {
      name: 'Questionnaires',
    })
    expect(questionnairesLink).toHaveAttribute('href', '/questionnaires')
    expect(LinkMock).toHaveBeenCalledWith(
      expect.objectContaining({ to: '/questionnaires' }),
      expect.anything(),
    )
  })

  it('renders the last crumb as the current page', () => {
    useMatchesMock.mockReturnValue([
      createMatch('root', '/', 'Home'),
      createMatch('detail', '/questionnaires/1', 'Détails'),
    ])

    renderWithI18n(<Breadcrumb />)

    expect(screen.getByText('Détails')).toHaveAttribute('aria-current', 'page')
  })

  it('renders a separator between each non-current crumb', () => {
    useMatchesMock.mockReturnValue([
      createMatch('root', '/', 'Home'),
      createMatch('questionnaires', '/questionnaires', 'Questionnaires'),
      createMatch('detail', '/questionnaires/1', 'Détails'),
    ])

    renderWithI18n(<Breadcrumb />)

    const separators = screen.getAllByText('/')
    expect(separators).toHaveLength(2)
    for (const separator of separators) {
      expect(separator).toHaveAttribute('aria-hidden', 'true')
    }
  })
})
