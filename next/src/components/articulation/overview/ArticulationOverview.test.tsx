import { renderWithRouter } from '@/testing/render';

import { ArticulationOverview } from './ArticulationOverview';

describe('ArticulationOverview', () => {
  it('displays articulation information', async () => {
    const { getByText } = await renderWithRouter(
      <ArticulationOverview
        questionnaireId="q-id"
        articulationItems={[
          { label: 'Prénom', value: 'prenom formula' },
          { label: 'Sexe', value: 'gender formula' },
          { label: 'Age', value: 'age formula' },
        ]}
      />,
    );

    expect(getByText('Prénom')).toBeInTheDocument();
    expect(getByText('prenom formula')).toBeInTheDocument();
  });
});
