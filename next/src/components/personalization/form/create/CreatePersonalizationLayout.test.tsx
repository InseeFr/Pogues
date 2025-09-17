import { renderWithRouter } from '@/testing/render';

import CreatePersonalizationLayout from './CreatePersonalizationLayout';

describe('CreatePersonalizationLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <CreatePersonalizationLayout>Hello world</CreatePersonalizationLayout>,
    );

    expect(getByText('Create a personalization')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
