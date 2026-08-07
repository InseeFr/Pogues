import { renderWithRouter } from '@/testing/render'

import CreateReleaseLayout from './CreateReleaseLayout'

describe('CreateCodesListLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <CreateReleaseLayout>Hello world</CreateReleaseLayout>,
    )

    expect(getByText('New release')).toBeInTheDocument()
    expect(getByText('Hello world')).toBeInTheDocument()
  })
})
