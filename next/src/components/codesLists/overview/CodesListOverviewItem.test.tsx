import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

import { renderWithRouter } from '@/tests/tests';

import CodesListOverviewItem from './CodesListOverviewItem';

describe('CodesListOverviewItem', () => {
  it('cannot be deleted when there are related questions', async () => {
    const user = userEvent.setup();

    const { getByRole } = await waitFor(() =>
      renderWithRouter(
        <CodesListOverviewItem
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

    await user.click(getByRole('button', { name: 'Expand' }));

    expect(screen.getByRole('button', { name: /Delete/i })).toBeDisabled();
  });

  it('can be deleted when there are no related questions', async () => {
    const user = userEvent.setup();

    const { getByRole } = await waitFor(() =>
      renderWithRouter(
        <CodesListOverviewItem
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

    await user.click(getByRole('button', { name: 'Expand' }));

    expect(screen.getByRole('button', { name: /Delete/i })).toBeEnabled();
  });
});
