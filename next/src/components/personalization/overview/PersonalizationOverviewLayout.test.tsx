import { renderWithRouter } from '@/testing/render';

import PersonalizationOverviewLayout from './PersonalizationOverviewLayout';

describe('PersonalizationOverviewLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <PersonalizationOverviewLayout>
        Hello world
      </PersonalizationOverviewLayout>,
    );

    expect(getByText('Personalization')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
