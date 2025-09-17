import { renderWithRouter } from '@/testing/render';

import VersionsOverviewLayout from './VersionsOverviewLayout';

describe('VersionsOverviewLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <VersionsOverviewLayout>Hello world</VersionsOverviewLayout>,
    );

    expect(getByText('History')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
