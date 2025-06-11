import { act } from 'react';

import { fireEvent, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { renderWithRouter } from '@/tests/tests';

import CodesListOverviewItem from './CodesListOverviewItem';

describe('CodesListOverviewItem', () => {
  it('toggles the expanded section when the expand button is clicked', async () => {
    const { container } = renderWithRouter(
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

    // By default the codes list content is hidden
    const codesListContent = container.querySelector(
      '#codes-list-content-cl-id',
    );
    expect(codesListContent).toHaveAttribute('hidden');

    const expandButton = screen.getByRole('button', {
      name: 'Expand',
    });
    expect(expandButton).toHaveAttribute('aria-expanded', 'false');

    // After clicking the expand button, the section should expand
    await act(async () => {
      fireEvent.click(expandButton);
    });
    expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    expect(codesListContent).not.toHaveAttribute('hidden');

    // After clicking again, the section should collapse
    await act(async () => {
      fireEvent.click(expandButton);
    });
    expect(expandButton).toHaveAttribute('aria-expanded', 'false');
    expect(codesListContent).toHaveAttribute('hidden');
  });

  it('cannot be deleted when there are related questions', async () => {
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

    // We need to extand the codes list section, else delete button is hidden by default
    const expandButton = screen.getByRole('button', {
      name: 'Expand',
    });

    await act(async () => {
      fireEvent.click(expandButton);
    });

    expect(screen.getByRole('button', { name: /Delete/i })).toBeDisabled();
  });

  it('can be deleted when there are no related questions', async () => {
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

    // We need to extand the codes list section, else delete button is hidden by default
    const expandButton = screen.getByRole('button', {
      name: 'Expand',
    });

    await act(async () => {
      fireEvent.click(expandButton);
    });

    expect(screen.getByRole('button', { name: /Delete/i })).toBeEnabled();
  });
});
