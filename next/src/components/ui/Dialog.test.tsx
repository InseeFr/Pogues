import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouter } from '@/testing/render'

import Dialog from './Dialog'

describe('Dialog', () => {
  it('can be opened and closed with a trigger button', async () => {
    const user = userEvent.setup()

    const { queryByText, getByText } = await renderWithRouter(
      <Dialog body="body" title="title">
        <button>Open Dialog</button>
      </Dialog>,
    )

    const openButton = screen.getByRole('button', { name: 'Open Dialog' })
    await user.click(openButton)

    expect(getByText('title')).toBeInTheDocument()
    expect(getByText('body')).toBeInTheDocument()
    expect(getByText('Cancel')).toBeInTheDocument()

    await user.click(screen.getByText('Cancel'))

    expect(queryByText('title')).toBeNull()
    expect(queryByText('body')).toBeNull()
  })

  it('centers the button when there is a single button', async () => {
    const user = userEvent.setup()

    await renderWithRouter(
      <Dialog body="body" title="title">
        <button>Open Dialog</button>
      </Dialog>,
    )

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

    const actionsContainer = screen.getByText('Cancel').closest('div')
    expect(actionsContainer).toHaveClass('justify-center')
  })

  it('right-aligns the buttons when there are two buttons', async () => {
    const user = userEvent.setup()

    await renderWithRouter(
      <Dialog body="body" title="title" onValidate={vi.fn()}>
        <button>Open Dialog</button>
      </Dialog>,
    )

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

    const actionsContainer = screen.getByText('Cancel').closest('div')
    expect(actionsContainer).toHaveClass('justify-end')
  })
})
