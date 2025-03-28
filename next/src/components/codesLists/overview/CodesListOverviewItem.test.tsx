import { screen } from '@testing-library/react';
import { expect } from 'vitest';

import { renderWithRouter } from '@/utils/tests';

import CodesListOverviewItem from './CodesListOverviewItem';

describe('CodesListOverviewItem', () => {
  it('cannot be deleted when there are related questions', () => {
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
    );

    expect(screen.getByRole('button', { name: /Delete/i })).toBeDisabled();
  });

  it('can be deleted when there are no related questions', () => {
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
    );

    expect(screen.getByRole('button', { name: /Delete/i })).toBeEnabled();
  });
});
