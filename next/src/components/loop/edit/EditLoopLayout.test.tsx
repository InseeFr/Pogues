import { renderWithRouter } from '@/testing/render'

import EditLoopLayout from './EditLoopLayout'

describe('EditLoopLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <EditLoopLayout
        loop={{
          id: 'my-loop',
          name: 'MY_LOOP',
          initialMember: 'S1',
          finalMember: 'S2',
          basedOn: 'my-scope',
        }}
      >
        Hello world
      </EditLoopLayout>,
    )

    expect(getByText('Edit loop: MY_LOOP')).toBeInTheDocument()
    expect(getByText('Hello world')).toBeInTheDocument()
  })
})
