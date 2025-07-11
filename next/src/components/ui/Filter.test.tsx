import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Filter as FilterModel, FilterType } from '@/models/filters';

import Filter from './Filter';

describe('Filter', () => {
  it('works with text filter', async () => {
    const user = userEvent.setup();
    const onActiveFilterMock = vi.fn();
    const onFilterMock = vi.fn();
    const filter: FilterModel<unknown> = {
      label: 'Mon filtre',
      type: FilterType.Text,
      onFilter: onFilterMock,
    };

    const { getByText } = render(
      <Filter filter={filter} onActiveFilter={onActiveFilterMock} />,
    );

    expect(getByText(/Mon filtre/i)).toBeInTheDocument();
    await user.click(getByText(/Mon filtre/i));
    await user.keyboard('a');

    expect(onActiveFilterMock).toHaveBeenCalledOnce();
    expect(onActiveFilterMock).toHaveBeenCalledWith(filter, 'a');
  });
});
