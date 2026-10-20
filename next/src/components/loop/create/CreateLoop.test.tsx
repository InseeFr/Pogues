import { screen } from '@testing-library/react'

import { renderWithRouter } from '@/testing/render'

import CreateLoop from './CreateLoop'

vi.mock('@/components/ui/form/VTLEditor')

describe('CreateLoop', () => {
  it('should show the loop form', async () => {
    await renderWithRouter(
      <CreateLoop questionnaireId="q-id" scopes={new Map()} loopMembers={[]} />,
    )

    expect(
      screen.getByRole('textbox', { name: /Loop name/i }),
    ).toBeInTheDocument()
  })
})
