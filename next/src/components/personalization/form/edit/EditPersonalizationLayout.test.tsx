import { renderWithRouter } from '@/testing/render';

import EditPersonalizationLayout from './EditPersonalizationLayout';

describe('EditPersonalizationLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <EditPersonalizationLayout>Hello world</EditPersonalizationLayout>,
    );

    expect(getByText('Edit personalization')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
