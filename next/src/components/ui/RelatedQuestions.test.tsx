import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

import { renderWithI18n } from '@/testing/render';

import RelatedQuestions from './RelatedQuestions';

describe('CodesListQuestions', () => {
  it('display related questions count and details on click', async () => {
    const user = userEvent.setup();
    const { getByText } = renderWithI18n(
      <RelatedQuestions
        relatedQuestionNames={['HOW_ARE_YOU', 'WHAT_IS_YOUR_NAME']}
      />,
    );

    expect(getByText('2 questions')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /2 questions/i }));
    expect(getByText('HOW_ARE_YOU')).toBeInTheDocument();
    expect(getByText('WHAT_IS_YOUR_NAME')).toBeInTheDocument();
  });

  it('work when there are no questions', async () => {
    const { getByText } = renderWithI18n(
      <RelatedQuestions relatedQuestionNames={[]} />,
    );

    expect(getByText('0 questions')).toBeInTheDocument();
  });
});
