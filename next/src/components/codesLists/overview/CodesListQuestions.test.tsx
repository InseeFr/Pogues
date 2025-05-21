import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

import RelatedQuestions from '@/components/ui/RelatedQuestions';
import { renderWithRouter } from '@/utils/tests';

describe('CodesListQuestions', () => {
  it('display related questions count and details on click', async () => {
    const user = userEvent.setup();
    const { getByText } = renderWithRouter(
      <RelatedQuestions
        relatedQuestionNames={['HOW_ARE_YOU', 'WHAT_IS_YOUR_NAME']}
      />,
    );

    expect(getByText('2 questions')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /2 questions/i }));
    expect(getByText('HOW_ARE_YOU')).toBeInTheDocument();
    expect(getByText('WHAT_IS_YOUR_NAME')).toBeInTheDocument();
  });

  it('work when there are no questions', () => {
    const { getByText } = renderWithRouter(
      <RelatedQuestions relatedQuestionNames={[]} />,
    );

    expect(getByText('0 questions')).toBeInTheDocument();
  });
});
