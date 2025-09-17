import { renderWithRouter } from '@/testing/render';

import MultimodeOverviewVersionLayout from './MultimodeOverviewVersionLayout';

describe('MultimodeOverviewVersionLayout', () => {
  it('is readonly and displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <MultimodeOverviewVersionLayout
        questionnaireId="my-q-id"
        versionId="my-v-id"
      >
        Hello world
      </MultimodeOverviewVersionLayout>,
    );

    expect(getByText('Multimode')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
    expect(
      getByText('This save of the survey is on readonly.'),
    ).toBeInTheDocument();
  });
});
