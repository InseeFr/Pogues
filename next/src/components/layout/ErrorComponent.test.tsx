import { AxiosError, AxiosHeaders } from 'axios'

import { renderWithRouter } from '@/testing/render'

import ErrorComponent from './ErrorComponent'

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
})
