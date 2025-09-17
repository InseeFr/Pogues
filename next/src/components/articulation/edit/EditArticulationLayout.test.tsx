import { renderWithRouter } from '@/testing/render';

import EditArticulationLayout from './EditArticulationLayout';

describe('EditArticulationLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <EditArticulationLayout>Hello world</EditArticulationLayout>,
    );

    expect(getByText('Edit the articulation')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
