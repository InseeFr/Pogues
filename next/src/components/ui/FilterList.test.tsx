import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Filter, FilterType } from '@/models/filter';

import FilterList from './FilterList';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { count?: number }) => {
      if (key === 'filter.active') {
        return `${options?.count || 0} active filters`;
      }
      return key;
    },
  }),
}));

describe('FilterList Component', () => {
  const mockFilters: Filter[] = [
    {
      type: FilterType.Search,
      filterContent: 'example search',
      clear: vi.fn(),
    },
    {
      type: FilterType.Stamp,
      filterContent: 'example stamp',
      clear: vi.fn(),
    },
  ];

  it('renders the active filter count correctly', () => {
    render(<FilterList filters={mockFilters} />);

    expect(screen.getByText('2 active filters')).toBeInTheDocument();
  });

  it('renders all active filters', () => {
    render(<FilterList filters={mockFilters} />);

    expect(screen.getByText('example search')).toBeInTheDocument();
    expect(screen.getByText('example stamp')).toBeInTheDocument();
  });

  it('clear the filter when the clear button is clicked', () => {
    render(<FilterList filters={mockFilters} />);

    const clearButtons = screen.getAllByTitle('filter.clear');
    fireEvent.click(clearButtons[0]);

    expect(mockFilters[0].clear).toHaveBeenCalled();
  });

  it('does not render the filter list if no filters have content', () => {
    const emptyFilters: Filter[] = [
      { type: FilterType.Search, filterContent: '', clear: vi.fn() },
      { type: FilterType.Stamp, filterContent: '', clear: vi.fn() },
    ];

    render(<FilterList filters={emptyFilters} />);

    expect(screen.queryByText(/active filters/)).not.toBeInTheDocument();
  });
});
