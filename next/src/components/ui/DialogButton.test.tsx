import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithI18n } from '@/testing/render'

import DialogButton from './DialogButton'

describe('DialogButton', () => {
  it('can be opened and closed', async () => {
    const user = userEvent.setup()

    const { queryByText, getByText } = renderWithI18n(
      <DialogButton body="body" label="label" title="title" />,
    )

    const openButton = screen.getByRole('button', { name: 'label' })
    await user.click(openButton)

    expect(getByText('title')).toBeInTheDocument()
    expect(getByText('body')).toBeInTheDocument()
    expect(getByText('Cancel')).toBeInTheDocument()

    await user.click(screen.getByText('Cancel'))

    expect(queryByText('title')).toBeNull()
    expect(queryByText('body')).toBeNull()
  })
})
