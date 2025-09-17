import { renderWithRouter } from '@/testing/render';

import ArticulationOverviewVersionLayout from './ArticulationOverviewVersionLayout';

describe('ArticulationOverviewVersionLayout', () => {
  it('is readonly and displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <ArticulationOverviewVersionLayout
        questionnaireId="my-q-id"
        versionId="my-v-id"
      >
        Hello world
      </ArticulationOverviewVersionLayout>,
    );

    expect(getByText('Articulation')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
    expect(
      getByText('This save of the survey is on readonly.'),
    ).toBeInTheDocument();
  });
});
