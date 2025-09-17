import { renderWithRouter } from '@/testing/render';

import EditMultimodeLayout from './EditMultimodeLayout';

describe('EditMultimodeLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <EditMultimodeLayout>Hello world</EditMultimodeLayout>,
    );

    expect(getByText('Specify multimode rules')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
