import { ArticulationVariablesLabel } from '@/models/articulation'
import { renderWithRouter } from '@/testing/render'

import { ArticulationOverview } from './ArticulationOverview'

describe('ArticulationOverview', () => {
  it('displays articulation information', async () => {
    const { getByText } = await renderWithRouter(
      <ArticulationOverview
        questionnaireId="q-id"
        articulationItems={[
          {
            label: ArticulationVariablesLabel.FirstName,
            value: 'prenom formula',
          },
          { label: ArticulationVariablesLabel.Gender, value: 'gender formula' },
          { label: ArticulationVariablesLabel.Age, value: 'age formula' },
        ]}
      />,
    )

    expect(getByText('First Name')).toBeInTheDocument()
    expect(getByText('prenom formula')).toBeInTheDocument()
  })
})
