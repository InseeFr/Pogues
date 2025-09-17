import { renderWithRouter } from '@/testing/render';

import VariablesOverviewVersionLayout from './VariablesOverviewVersionLayout';

describe('VariablesOverviewVersionLayout', () => {
  it('is readonly and displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <VariablesOverviewVersionLayout
        questionnaireId="my-q-id"
        versionId="my-v-id"
      >
        Hello world
      </VariablesOverviewVersionLayout>,
    );

    expect(getByText('Variables')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
    expect(
      getByText('This save of the survey is on readonly.'),
    ).toBeInTheDocument();
  });
});
