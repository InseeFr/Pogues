import { renderWithRouter } from '@/testing/render';

import ContentHeader from './ContentHeader';

describe('ContentHeader', () => {
  it('display readonly banner', async () => {
    const { getByText } = await renderWithRouter(
      <ContentHeader isReadonly title="my title" />,
    );

    expect(
      getByText(/This save of the survey is on readonly./i),
    ).toBeInTheDocument();
  });

  it('do not display readonly banner', async () => {
    const { queryByText } = await renderWithRouter(
      <ContentHeader title="my title" />,
    );

    expect(queryByText(/This save of the survey is on readonly./i)).toBeNull();
  });
});
