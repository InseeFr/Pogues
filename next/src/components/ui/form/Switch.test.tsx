import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Switch from './Switch'

describe('Switch', () => {
  it('indicates whether a setting is on or off and allow to change it', async () => {
    // Given a Switch
    const user = userEvent.setup()
    render(<Switch />)

    // Then it can be clicked and is unchecked by default
    expect(screen.getByRole('switch')).toBeEnabled()
    expect(screen.getByRole('switch')).not.toBeChecked()

    // When we click on the switch
    await user.click(screen.getByRole('switch'))

    // Then it is checked
    expect(screen.getByRole('switch')).toBeEnabled()
    expect(screen.getByRole('switch')).toBeChecked()
  })
})
