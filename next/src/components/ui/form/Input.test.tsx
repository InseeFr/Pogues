import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Input from './Input'

describe('Input', () => {
  it('allow to type a value', async () => {
    // Given an Input
    const user = userEvent.setup()
    render(<Input />)

    expect(screen.getByRole('textbox')).toBeEnabled()
    expect(screen.queryByText('my value 1')).not.toBeInTheDocument()

    // When we click on the input and type something
    await user.click(screen.getByRole('textbox'))
    await user.type(screen.getByRole('textbox'), 'my value 1')

    // Then the value is set
    expect(screen.getByRole('textbox')).toHaveValue('my value 1')
  })

  it('can have a default value', async () => {
    // Given a input where 'my value 1' is set as the default value
    render(<Input defaultValue={'my value 1'} />)

    // Then 'my value 1' is already typed
    expect(screen.getByRole('textbox')).toHaveValue('my value 1')
  })

  it('can be a controlled input', async () => {
    // Given a controlled Input where 'my value 1' is the value
    const user = userEvent.setup()
    const foo = vi.fn()
    render(<Input onValueChange={foo} value="my value 1" />)

    expect(screen.getByRole('textbox')).toBeEnabled()
    expect(screen.getByRole('textbox')).toHaveValue('my value 1')

    // When we type '!'
    await user.click(screen.getByRole('textbox'))
    await user.type(screen.getByRole('textbox'), '!')

    // Then the onChange function is called with the new value
    expect(foo).toHaveBeenCalledExactlyOnceWith(
      'my value 1!',
      expect.anything(),
    )
  })
})
