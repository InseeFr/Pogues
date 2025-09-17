import { renderWithRouter } from '@/testing/render';

import CreateArticulationLayout from './CreateArticulationLayout';

describe('CreateArticulationLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <CreateArticulationLayout>Hello world</CreateArticulationLayout>,
    );

    expect(getByText('New articulation')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
