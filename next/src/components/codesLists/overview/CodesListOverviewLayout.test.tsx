import { renderWithRouter } from '@/testing/render';

import CodesListOverviewLayout from './CodesListOverviewLayout';

describe('CodesListOverviewLayout', () => {
  it('displays title, children and create code list button', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <CodesListOverviewLayout questionnaireId="q-id">
        Hello world
      </CodesListOverviewLayout>,
    );

    expect(getByText('Codes lists')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();

    const createButton = getByRole('link', { name: /Create a codes list/i });

    expect(createButton).toBeEnabled();
    expect(createButton).toHaveAttribute(
      'href',
      '/questionnaire/q-id/codes-lists/new',
    );
  });
});
