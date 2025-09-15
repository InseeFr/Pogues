import { expect } from 'vitest';

import { renderWithI18n } from '@/testing/render';

import CodesListOverviewItemContent from './CodesListOverviewItemContent';

describe('CodesListOverviewItemContent', () => {
  it('display label and number of related questions', () => {
    const { getByText } = renderWithI18n(
      <CodesListOverviewItemContent
        codesList={{
          id: 'cl-id',
          label: 'my code list',
          codes: [],
          relatedQuestionNames: ['HOW_ARE_YOU'],
        }}
      />,
    );

    expect(getByText(/my code list/i)).toBeInTheDocument();
    expect(getByText(/1 question/i)).toBeInTheDocument();
  });
});
