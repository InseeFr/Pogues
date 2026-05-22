import { AxiosError, AxiosHeaders } from 'axios'

import { renderWithRouter } from '@/testing/render'

import ErrorComponent, { LegacyPoguesError } from './ErrorComponent'

function mockAxiosError(status: number) {
  return new AxiosError('error', undefined, undefined, undefined, {
    data: {},
    status,
    statusText: '',
    headers: new AxiosHeaders(),
    config: { headers: new AxiosHeaders() },
  })
}

describe('ErrorComponent', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('displays 404 error info', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={mockAxiosError(404)} />,
    )

    expect(getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(getByText('Error 404')).toBeInTheDocument()
    expect(
      getByText(
        'The page you are looking for does not exist or has been moved.',
      ),
    ).toBeInTheDocument()
  })

  it('displays 401 error info', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={mockAxiosError(401)} />,
    )

    expect(getByRole('heading', { name: 'Unauthorized' })).toBeInTheDocument()
    expect(getByText('Error 401')).toBeInTheDocument()
    expect(
      getByText('You need to be logged in to access this page.'),
    ).toBeInTheDocument()
  })

  it('displays 403 error info', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={mockAxiosError(403)} />,
    )

    expect(getByRole('heading', { name: 'Access denied' })).toBeInTheDocument()
    expect(getByText('Error 403')).toBeInTheDocument()
    expect(
      getByText('You do not have permission to access this page.'),
    ).toBeInTheDocument()
  })

  it('displays 400 error info', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={mockAxiosError(400)} />,
    )

    expect(getByRole('heading', { name: 'Bad request' })).toBeInTheDocument()
    expect(getByText('Error 400')).toBeInTheDocument()
    expect(getByText('The request sent was invalid.')).toBeInTheDocument()
  })

  it('displays 500 error info', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={mockAxiosError(500)} />,
    )

    expect(getByRole('heading', { name: 'Server error' })).toBeInTheDocument()
    expect(getByText('Error 500')).toBeInTheDocument()
    expect(getByText('Something went wrong on our end.')).toBeInTheDocument()
  })

  it('displays unhandled error info for unknown status codes', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={mockAxiosError(503)} />,
    )

    expect(
      getByRole('heading', { name: 'Unexpected error' }),
    ).toBeInTheDocument()
    expect(getByText('Error 503')).toBeInTheDocument()
    expect(getByText('Something went wrong.')).toBeInTheDocument()
  })

  it('displays server error for non-axios errors', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={new Error('boom')} />,
    )

    expect(getByRole('heading', { name: 'Server error' })).toBeInTheDocument()
    expect(getByText('Error 500')).toBeInTheDocument()
  })

  it('displays customMessage instead of subtitle and paragraph', async () => {
    const { getByRole, getByText, queryByText } = await renderWithRouter(
      <ErrorComponent
        error={mockAxiosError(404)}
        customMessage="Something specific went wrong"
      />,
    )

    expect(getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(getByText('Something specific went wrong')).toBeInTheDocument()
    expect(
      queryByText(
        'The page you are looking for does not exist or has been moved.',
      ),
    ).not.toBeInTheDocument()
  })

  it('renders a back to home link', async () => {
    const { getByRole } = await renderWithRouter(
      <ErrorComponent error={mockAxiosError(404)} />,
    )

    expect(getByRole('link', { name: 'Back to home' })).toBeInTheDocument()
  })

  function mockLegacyPoguesError(statusCode: number, message: string) {
    return {
      statusCode,
      message,
      name: 'Error',
    } as LegacyPoguesError
  }

  it('displays 404 error info for LegacyPoguesError', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={mockLegacyPoguesError(404, 'Not found')} />,
    )

    expect(getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(getByText('Error 404')).toBeInTheDocument()
    expect(
      getByText(
        'The page you are looking for does not exist or has been moved.',
      ),
    ).toBeInTheDocument()
  })

  it('displays 401 error info for LegacyPoguesError', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={mockLegacyPoguesError(401, 'Unauthorized')} />,
    )

    expect(getByRole('heading', { name: 'Unauthorized' })).toBeInTheDocument()
    expect(getByText('Error 401')).toBeInTheDocument()
    expect(
      getByText('You need to be logged in to access this page.'),
    ).toBeInTheDocument()
  })

  it('displays 403 error info for LegacyPoguesError', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={mockLegacyPoguesError(403, 'Forbidden')} />,
    )

    expect(getByRole('heading', { name: 'Access denied' })).toBeInTheDocument()
    expect(getByText('Error 403')).toBeInTheDocument()
    expect(
      getByText('You do not have permission to access this page.'),
    ).toBeInTheDocument()
  })

  it('displays 400 error info for LegacyPoguesError', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={mockLegacyPoguesError(400, 'Bad request')} />,
    )

    expect(getByRole('heading', { name: 'Bad request' })).toBeInTheDocument()
    expect(getByText('Error 400')).toBeInTheDocument()
    expect(getByText('The request sent was invalid.')).toBeInTheDocument()
  })

  it('displays 500 error info for LegacyPoguesError', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={mockLegacyPoguesError(500, 'Server error')} />,
    )

    expect(getByRole('heading', { name: 'Server error' })).toBeInTheDocument()
    expect(getByText('Error 500')).toBeInTheDocument()
    expect(getByText('Something went wrong on our end.')).toBeInTheDocument()
  })

  it('displays unhandled error info for unknown status codes in LegacyPoguesError', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent
        error={mockLegacyPoguesError(503, 'Service unavailable')}
      />,
    )

    expect(
      getByRole('heading', { name: 'Unexpected error' }),
    ).toBeInTheDocument()
    expect(getByText('Error 503')).toBeInTheDocument()
    expect(getByText('Something went wrong.')).toBeInTheDocument()
  })

  it('displays server error for objects without statusCode property', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={{ message: 'Some error' } as unknown as Error} />,
    )

    expect(getByRole('heading', { name: 'Server error' })).toBeInTheDocument()
    expect(getByText('Error 500')).toBeInTheDocument()
  })

  it('displays server error for objects without message property', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={{ statusCode: 404 } as unknown as Error} />,
    )

    expect(getByRole('heading', { name: 'Server error' })).toBeInTheDocument()
    expect(getByText('Error 500')).toBeInTheDocument()
  })

  it('displays server error for null errors', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={null as unknown as Error} />,
    )

    expect(getByRole('heading', { name: 'Server error' })).toBeInTheDocument()
    expect(getByText('Error 500')).toBeInTheDocument()
  })

  it('displays server error for undefined errors', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={undefined as unknown as Error} />,
    )

    expect(getByRole('heading', { name: 'Server error' })).toBeInTheDocument()
    expect(getByText('Error 500')).toBeInTheDocument()
  })

  it('displays server error for non-object errors', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <ErrorComponent error={'string error' as unknown as Error} />,
    )

    expect(getByRole('heading', { name: 'Server error' })).toBeInTheDocument()
    expect(getByText('Error 500')).toBeInTheDocument()
  })

  it('displays a mailto link when error requires contact', async () => {
    vi.stubEnv('VITE_CONTACT_EMAIL', 'support@example.com')
    const { getByRole } = await renderWithRouter(
      <ErrorComponent error={mockAxiosError(403)} />,
    )

    const emailLink = getByRole('link', { name: 'support@example.com' })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:support@example.com')
  })

  it('does not display a mailto link when error requires contact but the env var is not set', async () => {
    const { queryByRole } = await renderWithRouter(
      <ErrorComponent error={mockAxiosError(403)} />,
    )

    expect(queryByRole('link', { name: /support@/ })).not.toBeInTheDocument()
  })

  it('does not display a mailto link for errors that do not require contact', async () => {
    vi.stubEnv('VITE_CONTACT_EMAIL', 'support@example.com')
    const { queryByRole } = await renderWithRouter(
      <ErrorComponent error={mockAxiosError(404)} />,
    )

    expect(
      queryByRole('link', { name: 'support@example.com' }),
    ).not.toBeInTheDocument()
  })
})
