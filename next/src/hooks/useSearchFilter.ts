import { useState } from 'react';

import { Filter, FilterType } from '@/models/filter';

export function useSearchFilter(initialValue = '') {
  const [searchFilter, setSearchFilter] = useState<Filter>({
    type: FilterType.Search,
    filterContent: initialValue,
    clear: () => setSearchFilter((prev) => ({ ...prev, filterContent: '' })),
  });

  const updateSearchFilter = (value: string) => {
    setSearchFilter((prev) => ({ ...prev, filterContent: value }));
  };

  return { searchFilter, updateSearchFilter };
}
