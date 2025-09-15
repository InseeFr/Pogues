import { waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { renderWithRouter } from '@/testing/render';

import QuestionnaireNavigation from './QuestionnaireNavigation';

describe('QuestionnaireNavigation', () => {
  it('display navigation links', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(<QuestionnaireNavigation />),
    );

    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/Questionnaire/i)).toBeInTheDocument();
    expect(getByText(/Codes lists/i)).toBeInTheDocument();
    expect(getByText(/Nomenclatures/i)).toBeInTheDocument();
    expect(getByText(/History/i)).toBeInTheDocument();
  });
});
