import { renderWithRouter } from '@/testing/render'

import ContactUs from './ContactUs'

describe('ContactUs', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('renders the contact us title', async () => {
    const { getByRole } = await renderWithRouter(<ContactUs />)

    expect(
      getByRole('heading', { name: 'Contact us', level: 1 }),
    ).toBeInTheDocument()
  })

  it('renders the conception team contact information', async () => {
    vi.stubEnv('VITE_CONTACT_MAIL_CONCEPTION', 'conception@example.com')

    const { getByRole, getByText } = await renderWithRouter(<ContactUs />)

    expect(
      getByRole('heading', {
        name: 'Contact conception team',
        level: 2,
      }),
    ).toBeInTheDocument()

    expect(getByText('conception@example.com')).toBeInTheDocument()

    expect(
      getByRole('link', { name: 'conception@example.com' }),
    ).toHaveAttribute('href', 'mailto:conception@example.com')
  })

  it('renders the general team contact information', async () => {
    vi.stubEnv('VITE_CONTACT_MAIL_GENERAL', 'general@example.com')

    const { getByRole, getByText } = await renderWithRouter(<ContactUs />)

    expect(
      getByRole('heading', {
        name: 'Contact general team',
        level: 2,
      }),
    ).toBeInTheDocument()

    expect(getByText('general@example.com')).toBeInTheDocument()

    expect(getByRole('link', { name: 'general@example.com' })).toHaveAttribute(
      'href',
      'mailto:general@example.com',
    )
  })

  it('renders the FAQ link', async () => {
    vi.stubEnv('VITE_FREQUENTLY_ASKED_QUESTIONS_URL', 'https://example.com/faq')

    const { getByRole } = await renderWithRouter(<ContactUs />)

    expect(
      getByRole('heading', {
        name: 'Frequently asked questions',
        level: 2,
      }),
    ).toBeInTheDocument()

    const faqLink = getByRole('link', {
      name: /🧐 Frequents issues/i,
    })

    expect(faqLink).toHaveAttribute('href', 'https://example.com/faq')
  })

  it('opens the FAQ link in a new tab', async () => {
    vi.stubEnv('VITE_FREQUENTLY_ASKED_QUESTIONS_URL', 'https://example.com/faq')

    const { getByRole } = await renderWithRouter(<ContactUs />)

    const faqLink = getByRole('link', {
      name: /🧐 Frequents issues/i,
    })

    expect(faqLink).toHaveAttribute('target', '_blank')
    expect(faqLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the back to home link', async () => {
    const { getByRole } = await renderWithRouter(<ContactUs />)

    expect(getByRole('link', { name: 'Back to home' })).toBeInTheDocument()
  })

  it('renders the decorative penguin image as hidden from assistive technologies', async () => {
    const { container } = await renderWithRouter(<ContactUs />)

    const image = container.querySelector('img[src="/ContactPenguin.svg"]')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', '')
    expect(image).toHaveAttribute('aria-hidden', 'true')
  })
})
