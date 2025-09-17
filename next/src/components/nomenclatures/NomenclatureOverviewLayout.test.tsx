import { renderWithRouter } from '@/testing/render';

import NomenclatureOverviewLayout from './NomenclatureOverviewLayout';

describe('NomenclatureOverviewLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <NomenclatureOverviewLayout>Hello world</NomenclatureOverviewLayout>,
    );

    expect(getByText('Nomenclatures')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
