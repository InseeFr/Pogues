import { waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { ArticulationItems } from '@/models/articulation';
import { renderWithRouter } from '@/testing/render';

import { ArticulationOverviewDetails } from './ArticulationOverviewDetails';
import { ArticulationTable } from './ArticulationTable';

vi.mock('./ArticulationTable', () => ({
  ArticulationTable: vi.fn(),
}));

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

  it('displays articulation table', async () => {
    await waitFor(() =>
      renderWithRouter(<ArticulationOverviewDetails {...defaultProps} />),
    );

    expect(ArticulationTable).toHaveBeenCalledWith(
      expect.objectContaining({
        articulationItems: defaultProps.articulationItems,
      }),
      expect.anything(),
    );
  });

  it('can edit articulation', async () => {
    const { getByRole } = await waitFor(() =>
      renderWithRouter(<ArticulationOverviewDetails {...defaultProps} />),
    );

    const editButton = getByRole('link', { name: /Edit/i });

    expect(editButton).toBeEnabled();
    expect(editButton).toHaveAttribute(
      'href',
      '/questionnaire/q-id/articulation/edit',
    );
  });

  it('can delete articulation', async () => {
    const { getByRole } = await waitFor(() =>
      renderWithRouter(<ArticulationOverviewDetails {...defaultProps} />),
    );

    expect(getByRole('button', { name: /Delete/i })).toBeEnabled();
  });

  it('cannot edit articulation if readonly', async () => {
    const { queryByRole } = await waitFor(() =>
      renderWithRouter(
        <ArticulationOverviewDetails {...defaultProps} readonly />,
      ),
    );

    expect(queryByRole('link', { name: /Edit/i })).toBeNull();
  });

  it('cannot delete articulation if readonly', async () => {
    const { queryByRole } = await waitFor(() =>
      renderWithRouter(
        <ArticulationOverviewDetails {...defaultProps} readonly />,
      ),
    );

    expect(queryByRole('button', { name: /Delete/i })).toBeNull();
  });
});
