import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouter } from '@/testing/render'

import Form from './Form'

describe('Form component', () => {
  it('allows to validate a form in dirty state', async () => {
    // Given a valid form in dirty state
    const user = userEvent.setup()
    const foo = vi.fn().mockImplementation((e) => e.preventDefault())
    await renderWithRouter(
      <Form onCancel={vi.fn()} onSubmit={foo} isDirty isValid />,
    )

    expect(screen.getByRole('button', { name: /validate/i })).toBeEnabled()

    // When we click on the validate button
    await user.click(screen.getByRole('button', { name: /validate/i }))

    // Then it triggers the onSubmit action
    expect(foo).toHaveBeenCalledOnce()
  })

  it('does not allow to validate a form not in dirty state', async () => {
    // Given a valid form not in dirty state
    const user = userEvent.setup()
    const foo = vi.fn()
    await renderWithRouter(
      <Form onCancel={vi.fn()} onSubmit={foo} isDirty={false} isValid />,
    )

    expect(screen.getByRole('button', { name: /validate/i })).toBeDisabled()

    // When we click on the validate button
    await user.click(screen.getByRole('button', { name: /validate/i }))

    // Then nothing happens
    expect(foo).not.toHaveBeenCalled()
  })

  it('does not allow to validate if the form is not valid', async () => {
    // Given an invalid form
    const user = userEvent.setup()
    const foo = vi.fn()
    await renderWithRouter(
      <Form onCancel={vi.fn()} onSubmit={foo} isDirty isValid={false} />,
    )

    expect(screen.getByRole('button', { name: /validate/i })).toBeDisabled()

    // When we click on the validate button
    await user.click(screen.getByRole('button', { name: /validate/i }))

    // Then nothing happens
    expect(foo).not.toHaveBeenCalled()
  })

  it('allows to override validate button label', async () => {
    // Given a form not with a custom validate label 'modify'
    const user = userEvent.setup()
    const foo = vi.fn()
    await renderWithRouter(
      <Form
        onCancel={vi.fn()}
        onSubmit={foo}
        validateLabel="modify"
        isDirty
        isValid
      />,
    )

    expect(screen.getByRole('button', { name: /modify/i })).toBeEnabled()

    // When we click on the modify button
    await user.click(screen.getByRole('button', { name: /modify/i }))

    // Then it triggers the onSubmit action
    expect(foo).toHaveBeenCalledOnce()
  })

  it('allows to cancel', async () => {
    // Given a form not in dirty state
    const user = userEvent.setup()
    const foo = vi.fn()
    await renderWithRouter(<Form onCancel={foo} onSubmit={vi.fn()} />)

    expect(screen.getByRole('button', { name: /cancel/i })).toBeEnabled()

    // When we click on the cancel button
    await user.click(screen.getByRole('button', { name: /cancel/i }))

    // Then it triggers the onCancel action
    expect(foo).toHaveBeenCalledOnce()
  })
})
