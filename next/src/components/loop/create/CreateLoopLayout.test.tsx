import { renderWithRouter } from '@/testing/render';
import CreateLoopLayout from './CreateLoopLayout';


describe('CreateLoopLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <CreateLoopLayout>Hello world</CreateLoopLayout>,
    );

    expect(getByText('New variable')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
