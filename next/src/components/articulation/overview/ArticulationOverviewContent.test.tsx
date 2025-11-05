import { renderWithI18n, renderWithRouter } from '@/testing/render';

import { ArticulationOverviewContent } from './ArticulationOverviewContent';

describe('ArticulationOverviewContent', () => {
  it('displays roundabout summary information', async () => {
    const { getByText } = await renderWithRouter(
      <ArticulationOverviewContent
        questionnaireId="q-id"
        articulationItems={[
          { label: 'Prénom', value: 'prenom formula' },
          { label: 'Sexe', value: 'gender formula' },
          { label: 'Age', value: 'age formula' },
        ]}
      />,
    );

    expect(getByText('First Name')).toBeInTheDocument();
    expect(getByText('prenom formula')).toBeInTheDocument();
  });

  it('displays that there are no summary when empty in readonly and does not allow to set articulation', async () => {
    const { getByText, queryByRole } = renderWithI18n(
      <ArticulationOverviewContent
        questionnaireId="q1"
        articulationItems={undefined}
        readonly
      />,
    );

    expect(queryByRole('link', { name: 'Create an articulation' })).toBeNull();
    expect(
      getByText('Roundabout summary has not been specified in this version.'),
    ).toBeInTheDocument();
  });

  it('allows to set roundabout summary from scratch when empty ', async () => {
    const { getByRole } = await renderWithRouter(
      <ArticulationOverviewContent
        questionnaireId="q1"
        articulationItems={undefined}
        readonly={false}
      />,
    );

    const button = getByRole('link', { name: 'Create the roundabout summary' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute(
      'href',
      '/questionnaire/q1/articulation/new',
    );
  });
});
