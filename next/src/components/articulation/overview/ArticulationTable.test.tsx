import { ArticulationItems } from '@/models/articulation';
import { renderWithI18n } from '@/testing/render';

import { ArticulationTable } from './ArticulationTable';

describe('ArticulationTable', () => {
  const articulationItems: ArticulationItems = [
    {
      label: 'Prénom',
      value: 'first name formula',
    },
    {
      label: 'Sexe',
      value: 'gender formula',
    },
    {
      label: 'Age',
      value: 'age formula',
    },
  ];

  it('display articulation items labels and values', async () => {
    const { getByText } = renderWithI18n(
      <ArticulationTable articulationItems={articulationItems} />,
    );

    expect(getByText('First Name')).toBeInTheDocument();
    expect(getByText('first name formula')).toBeInTheDocument();

    expect(getByText('Gender')).toBeInTheDocument();
    expect(getByText('gender formula')).toBeInTheDocument();

    expect(getByText('Age')).toBeInTheDocument();
    expect(getByText('age formula')).toBeInTheDocument();
  });
});
