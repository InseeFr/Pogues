import { renderWithRouter } from '@/testing/render';

import CodesListOverviewVersionLayout from './CodesListOverviewVersionLayout';

describe('CodesListOverviewVersionLayout', () => {
  it('is readonly and displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <CodesListOverviewVersionLayout
        questionnaireId="my-q-id"
        versionId="my-v-id"
      >
        Hello world
      </CodesListOverviewVersionLayout>,
    );

    expect(getByText('Codes lists')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
    expect(
      getByText('This save of the survey is on readonly.'),
    ).toBeInTheDocument();
  });
});
