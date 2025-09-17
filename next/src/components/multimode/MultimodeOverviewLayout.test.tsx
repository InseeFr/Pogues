import { renderWithRouter } from '@/testing/render';

import MultimodeOverviewLayout from './MultimodeOverviewLayout';

describe('MultimodeOverviewLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <MultimodeOverviewLayout>Hello world</MultimodeOverviewLayout>,
    );

    expect(getByText('Multimode')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
