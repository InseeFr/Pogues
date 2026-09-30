import { render, screen } from '@testing-library/react'

import Banner, { BannerStyle } from './Banner'

describe('Banner', () => {
  it('renders the message', () => {
    render(<Banner message="My message" />)

    expect(
      screen.getByRole('heading', { name: 'My message' }),
    ).toBeInTheDocument()
  })

  it('uses the status role and info styles by default', () => {
    render(<Banner message="My message" />)

    const banner = screen.getByRole('status')
    expect(banner).toHaveClass('bg-blue-100', 'text-blue-800', 'border')
  })

  it('uses the alert role and warning styles', () => {
    render(<Banner message="My message" type={BannerStyle.Warning} />)

    const banner = screen.getByRole('alert')
    expect(banner).toHaveClass('bg-orange-100', 'text-orange-800')
  })

  it('uses the alert role and error styles', () => {
    render(<Banner message="My message" type={BannerStyle.Error} />)

    const banner = screen.getByRole('alert')
    expect(banner).toHaveClass('bg-red-100', 'text-red-800', 'border')
  })

  it('renders the details as a list', () => {
    render(
      <Banner
        message="My message"
        details={[
          { message: 'first detail' },
          { message: 'second detail', dataIndex: 3 },
        ]}
      />,
    )

    expect(screen.getByText('first detail')).toBeInTheDocument()
    expect(screen.getByText('second detail')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('renders the provided aria label', () => {
    render(<Banner message="My message" ariaLabel="custom-banner-label" />)

    expect(screen.getByLabelText('custom-banner-label')).toBeInTheDocument()
  })
})
