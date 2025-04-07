import { useCallback, useState } from 'react';

import { Filter, FilterEnum } from '@/models/filter';

/**
 * Custom hook to manage filters in a component.
 * It provides functions to update, clear, and retrieve filter values.
 */
export function useFilters(initialFilters: Filter[]) {
  const [filters, setFilters] = useState<Filter[]>(initialFilters);

  const updateFilterContent = useCallback(
    (filterType: FilterEnum, content: string) => {
      setFilters((prevFilters) =>
        prevFilters.map((f) =>
          f.filterType === filterType ? { ...f, filterContent: content } : f,
        ),
      );
    },
    [],
  );

  const getFilterContent = useCallback(
    (filterType: FilterEnum) =>
      filters.find((f) => f.filterType === filterType)?.filterContent || '',
    [filters],
  );

  return {
    filters,
    updateFilterContent,
    getFilterContent,
  };
}
