import { renderWithRouter } from '@/testing/render';

import NomenclatureOverviewVersionLayout from './NomenclatureOverviewVersionLayout';

describe('NomenclatureOverviewVersionLayout', () => {
  it('is readonly and displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <NomenclatureOverviewVersionLayout
        questionnaireId="my-q-id"
        versionId="my-v-id"
      >
        Hello world
      </NomenclatureOverviewVersionLayout>,
    );

    expect(getByText('Nomenclatures')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
    expect(
      getByText('This save of the survey is on readonly.'),
    ).toBeInTheDocument();
  });
});
