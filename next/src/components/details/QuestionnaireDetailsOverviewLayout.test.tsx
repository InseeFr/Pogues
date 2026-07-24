import { renderWithRouter } from '@/testing/render'

import DetailsOverviewLayout from './QuestionnaireDetailsOverviewLayout'

describe('DetailsOverviewLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <DetailsOverviewLayout>Hello world</DetailsOverviewLayout>,
    )

    expect(getByText('Questionnaire Details')).toBeInTheDocument()
    expect(getByText('Hello world')).toBeInTheDocument()
  })
})
