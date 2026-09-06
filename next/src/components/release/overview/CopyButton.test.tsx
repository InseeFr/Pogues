import userEvent from '@testing-library/user-event'

import { renderWithI18n } from '@/testing/render'

import { CopyButton } from './CopyButton'

describe('CopyButton', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
      configurable: true,
      writable: true,
    })
  })

  it('renders with copy icon initially', () => {
    const { container } = renderWithI18n(<CopyButton text="ABC-123" />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('has correct accessible name before copy', () => {
    const { getByRole } = renderWithI18n(<CopyButton text="ABC-123" />)

    expect(
      getByRole('button', { name: 'Copy to clipboard' }),
    ).toBeInTheDocument()
  })

  it('copies text and shows copied label after click', async () => {
    const user = userEvent.setup()
    const { findByText, container } = renderWithI18n(
      <CopyButton text="ABC-123" />,
    )

    await user.click(container.querySelector('button')!)

    expect(await findByText('Copied')).toBeInTheDocument()
  })
})
