import { renderWithRouter } from '@/testing/render';

import CreateCodesListLayout from './CreateCodesListLayout';

describe('CreateCodesListLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <CreateCodesListLayout>Hello world</CreateCodesListLayout>,
    );

    expect(getByText('New code list')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
