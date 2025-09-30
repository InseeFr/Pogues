import { renderWithRouter } from '@/testing/render';

import ArticulationOverviewLayout from './ArticulationOverviewLayout';

describe('ArticulationOverviewLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <ArticulationOverviewLayout>Hello world</ArticulationOverviewLayout>,
    );

    expect(getByText('Articulation')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
