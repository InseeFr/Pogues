import { expect } from 'vitest';

import { ArticulationItems } from '@/models/articulation';
import { renderWithRouter } from '@/testing/render';

import { ArticulationOverviewDetails } from './ArticulationOverviewDetails';

describe('ArticulationOverviewDetails', () => {
  const defaultProps = {
    questionnaireId: 'q-id',
    articulationItems: [
      {
        label: 'Prénom',
        value: 'prenom formula',
      },
      {
        label: 'Sexe',
        value: 'gender formula',
      },
      {
        label: 'Age',
        value: 'age formula',
      },
    ] as ArticulationItems,
  };

  it('displays articulation information', async () => {
    const { getByText } = await renderWithRouter(
      <ArticulationOverviewDetails {...defaultProps} />,
    );

    expect(getByText('Prénom')).toBeInTheDocument();
    expect(getByText('prenom formula')).toBeInTheDocument();
    expect(getByText('Sexe')).toBeInTheDocument();
    expect(getByText('gender formula')).toBeInTheDocument();
    expect(getByText('Age')).toBeInTheDocument();
    expect(getByText('age formula')).toBeInTheDocument();
  });

  it('allows to edit or delete articulation', async () => {
    const { getByRole } = await renderWithRouter(
      <ArticulationOverviewDetails {...defaultProps} />,
    );

    const editButton = getByRole('link', { name: /Edit/i });

    expect(editButton).toBeEnabled();
    expect(editButton).toHaveAttribute(
      'href',
      '/questionnaire/q-id/articulation/edit',
    );
    expect(getByRole('button', { name: /Delete/i })).toBeEnabled();
  });

  it('does not allow to edit or delete articulation in readonly', async () => {
    const { queryByRole } = await renderWithRouter(
      <ArticulationOverviewDetails {...defaultProps} readonly />,
    );

    expect(queryByRole('link', { name: /Edit/i })).toBeNull();
    expect(queryByRole('button', { name: /Delete/i })).toBeNull();
  });
});
