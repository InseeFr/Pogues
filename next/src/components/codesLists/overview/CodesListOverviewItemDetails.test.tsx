import { waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { renderWithRouter } from '@/testing/render';

import CodesListOverviewItemDetails from './CodesListOverviewItemDetails';

describe('CodesListOverviewItemDetails', () => {
  it('cannot be deleted when there are related questions', async () => {
    const { getByRole } = await waitFor(() =>
      renderWithRouter(
        <CodesListOverviewItemDetails
          codesList={{
            id: 'cl-id',
            label: 'my code list',
            codes: [],
            relatedQuestionNames: ['HOW_ARE_YOU'],
          }}
          questionnaireId="q-id"
        />,
      ),
    );

    expect(getByRole('button', { name: /Delete/i })).toBeDisabled();
  });

  it('can be deleted when there are no related questions', async () => {
    const { getByRole } = await waitFor(() =>
      renderWithRouter(
        <CodesListOverviewItemDetails
          codesList={{
            id: 'cl-id',
            label: 'my code list',
            codes: [],
            relatedQuestionNames: [],
          }}
          questionnaireId="q-id"
        />,
      ),
    );

    expect(getByRole('button', { name: /Delete/i })).toBeEnabled();
  });

  it('cannot be edited on readonly', async () => {
    const { queryByRole } = await waitFor(() =>
      renderWithRouter(
        <CodesListOverviewItemDetails
          codesList={{
            id: 'cl-id',
            label: 'my code list',
            codes: [],
            relatedQuestionNames: [],
          }}
          questionnaireId="q-id"
          readonly
        />,
      ),
    );

    expect(queryByRole('button', { name: /Delete/i })).toBeNull();
    expect(queryByRole('button', { name: /Duplicate/i })).toBeNull();
    expect(queryByRole('button', { name: /Edit/i })).toBeNull();
  });
});
