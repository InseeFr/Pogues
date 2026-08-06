import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as React from 'react'

import ButtonLink from './ButtonLink'

interface MockLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
}

vi.mock('@tanstack/react-router', () => {
  return {
    createLink: (Component: React.ElementType) =>
      React.forwardRef<HTMLAnchorElement, MockLinkProps>(
        ({ to, ...props }, ref) => {
          return <Component ref={ref} href={to} {...props} />
        },
      ),
  }
})

describe('ButtonLink', () => {
  it('should call onClick when link is clicked', async () => {
    const user = userEvent.setup()
    const foo = vi.fn()
    render(
      <ButtonLink to="/" onClick={foo}>
        Mon bouton
      </ButtonLink>,
    )

    await user.click(screen.getByRole('link', { name: /Mon bouton/i }))
    expect(foo).toHaveBeenCalledOnce()
  })

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const foo = vi.fn()
    render(
      <ButtonLink to="/" onClick={foo} disabled={true}>
        Mon bouton
      </ButtonLink>,
    )

    await user.click(screen.getByRole('link', { name: /Mon bouton/i }))
    expect(foo).not.toHaveBeenCalled()
  })

  it('should render with correct href', () => {
    render(<ButtonLink to="/questionnaires">Mon lien</ButtonLink>)
    expect(screen.getByRole('link', { name: /Mon lien/i })).toHaveAttribute(
      'href',
      '/questionnaires',
    )
  })
})
