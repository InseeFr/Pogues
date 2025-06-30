import { waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { renderWithRouter } from '@/tests/tests';

import ContentHeader from './ContentHeader';

describe('ContentHeader', () => {
  it('display readonly banner', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(<ContentHeader isReadonly title="my title" />),
    );

    expect(
      getByText(/This version of the survey is on readonly./i),
    ).toBeInTheDocument();
  });

  it('do not display readonly banner', async () => {
    const { queryByText } = await waitFor(() =>
      renderWithRouter(<ContentHeader title="my title" />),
    );

    expect(
      queryByText(/This version of the survey is on readonly./i),
    ).toBeNull();
  });
});
