import { renderWithRouter } from '@/testing/render';

import VariablesOverviewLayout from './VariablesOverviewLayout';

describe('VariablesOverviewLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <VariablesOverviewLayout>Hello world</VariablesOverviewLayout>,
    );

    expect(getByText('Variables')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
