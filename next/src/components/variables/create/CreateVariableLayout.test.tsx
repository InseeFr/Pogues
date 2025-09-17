import { renderWithRouter } from '@/testing/render';

import CreateVariableLayout from './CreateVariableLayout';

describe('CreateVariableLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <CreateVariableLayout>Hello world</CreateVariableLayout>,
    );

    expect(getByText('New variable')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
