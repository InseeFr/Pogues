import { screen } from '@testing-library/react'

import { renderWithRouter } from '@/testing/render'

import OpenInNewIcon from '../ui/icons/OpenInNewIcon'
import Header from './Header'
import User from './User'

vi.mock('@/components/ui/icons/OpenInNewIcon', () => ({
  default: vi.fn(),
}))

vi.mock('./User', () => ({
  default: vi.fn(),
}))

// Stub app version
vi.stubEnv('APP_VERSION', '1.2.3')

describe('Header', () => {
  const user = {
    givenName: 'John',
    familyName: 'Doe',
    stamp: 'jd123',
  }

  beforeEach(() => {
    vi.stubEnv('VITE_ENABLE_CONTACT', 'false')
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllEnvs()
    vi.stubEnv('APP_VERSION', '1.2.3')
  })

  it('renders the app name and version', async () => {
    await renderWithRouter(<Header user={user} />)

    const appNameLink = screen.getByRole('link', { name: 'Pogues' })
    expect(appNameLink).toBeInTheDocument()
    expect(appNameLink).toHaveAttribute('href', '/')

    expect(screen.getByText('v1.2.3')).toBeInTheDocument()
  })

  it('renders the documentation external link with icon', async () => {
    await renderWithRouter(<Header user={user} />)

    const docLink = screen.getByRole('link', {
      name: 'Documentation',
    })
    expect(docLink).toBeInTheDocument()
    expect(docLink).toHaveAttribute(
      'href',
      'https://inseefr.github.io/Bowie/1._Pogues/',
    )
    expect(docLink).toHaveAttribute('target', '_blank')
    expect(OpenInNewIcon).toHaveBeenCalledOnce()
  })

  it('renders User component with correct props', async () => {
    await renderWithRouter(<Header user={user} />)

    expect(User).toHaveBeenCalledWith(
      expect.objectContaining({
        user: user,
      }),
      undefined,
    )
  })

  it('render the contactUs link if enabled', async () => {
    vi.stubEnv('VITE_ENABLE_CONTACT', 'true')
    await renderWithRouter(<Header user={user} />)

    const contactLink = screen.getByRole('link', {
      name: 'Contact us',
    })
    expect(contactLink).toBeInTheDocument()
  })

  it('does not render the contactUs button if disabled', async () => {
    await renderWithRouter(<Header user={user} />)

    const contactLink = screen.queryByRole('link', {
      name: 'Contact us',
    })
    expect(contactLink).not.toBeInTheDocument()
  })
})
