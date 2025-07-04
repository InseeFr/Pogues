import { waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { renderWithRouter } from '@/tests/tests';

import QuestionnaireNavigation from './QuestionnaireNavigation';

describe('QuestionnaireNavigation', () => {
  it('display navigation links', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(<QuestionnaireNavigation />),
    );

    expect(getByText(/Overview/i)).toBeInTheDocument();
    expect(getByText(/Code lists/i)).toBeInTheDocument();
    expect(getByText(/Nomenclatures/i)).toBeInTheDocument();
    expect(getByText(/History/i)).toBeInTheDocument();
  });
});
