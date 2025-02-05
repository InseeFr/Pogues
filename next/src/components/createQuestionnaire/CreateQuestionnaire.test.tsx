import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '@/utils/tests';

import CreateQuestionnaire from './CreateQuestionnaire';

describe('CreateQuestionnaire', () => {
  it('is disabled on mount', () => {
    const { getByText } = renderWithRouter(<CreateQuestionnaire />);
    expect(getByText('Valider')).toBeInTheDocument();
    expect(getByText('Valider')).toBeDisabled();
  });

  it('can be submitted when form is filled with mandatory values', async () => {
    const user = userEvent.setup();
    const { getByText } = renderWithRouter(<CreateQuestionnaire />);

    expect(getByText('Valider')).toBeDisabled();

    await user.keyboard('my questionnaire');

    expect(getByText('Valider')).toBeDisabled();

    await user.click(screen.getByText('CAPI'));

    expect(getByText('Valider')).toBeEnabled();
  });
});
