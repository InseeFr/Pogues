import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouter } from '@/testing/render'

import CreateQuestionnaire from './CreateQuestionnaire'

describe('CreateQuestionnaire', () => {
  it('is disabled on mount', async () => {
    const { getByText } = await renderWithRouter(
      <CreateQuestionnaire userStamp="my-stamp" series={[]} stamps={[]} />,
    )
    expect(getByText('Create')).toBeInTheDocument()
    expect(getByText('Create')).toBeDisabled()
  })

  it('can be submitted when form is filled with mandatory values', async () => {
    const user = userEvent.setup()
    await renderWithRouter(
      <CreateQuestionnaire userStamp="my-stamp" series={[]} stamps={[]} />,
    )

    expect(screen.getByTestId('form-submit-button')).toBeDisabled()

    await user.keyboard('my questionnaire')

    expect(screen.getByTestId('form-submit-button')).toBeDisabled()

    await user.click(screen.getByText('CAPI'))

    expect(screen.getByTestId('form-submit-button')).toBeEnabled()
  })

  it('generates the name once on title blur and preserves later edits', async () => {
    const user = userEvent.setup()
    await renderWithRouter(
      <CreateQuestionnaire userStamp="my-stamp" series={[]} stamps={[]} />,
    )

    const titleInput = screen.getByRole('textbox', {
      name: /questionnaire title/i,
    })
    const nameInput = screen.getByRole('textbox', {
      name: /short name/i,
    })

    await user.type(titleInput, 'my questionnaire')
    await user.tab()
    expect(nameInput).toHaveValue('MY_QUESTIO')

    await user.clear(nameInput)
    await user.type(nameInput, 'CUSTOMNAME')
    await user.clear(titleInput)
    await user.type(titleInput, 'another title')
    await user.tab()

    expect(nameInput).toHaveValue('CUSTOMNAME')
  })
})
