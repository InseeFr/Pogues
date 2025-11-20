import { renderWithRouter } from '@/testing/render';

import QuestionnaireSidebar from './QuestionnaireSidebar';

describe('QuestionnaireSidebar', () => {
  it('displays navigation links', async () => {
    const { getByText } = await renderWithRouter(<QuestionnaireSidebar />);

    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/Questionnaire/i)).toBeInTheDocument();
    expect(getByText(/Codes lists/i)).toBeInTheDocument();
    expect(getByText(/Nomenclatures/i)).toBeInTheDocument();
    expect(getByText(/History/i)).toBeInTheDocument();
  });
});
