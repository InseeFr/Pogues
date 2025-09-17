import { renderWithRouter } from '@/testing/render';

import VariablesOverviewLayout from './VariablesOverviewLayout';

describe('VariablesOverviewLayout', () => {
  it('displays title and children', async () => {
    const { getByRole, getByText } = await renderWithRouter(
      <VariablesOverviewLayout enableVariablesPageForm questionnaireId="q-id">
        Hello world
      </VariablesOverviewLayout>,
    );

    expect(getByText('Variables')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();

    const createButton = getByRole('link', { name: /Create a variable/i });

    expect(createButton).toBeEnabled();
    expect(createButton).toHaveAttribute(
      'href',
      '/questionnaire/q-id/variables/new',
    );
  });
});
