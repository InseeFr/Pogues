import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Filter as FilterModel } from '@/models/filters';

import Filter from './Filter';

type ActiveFilter<T> = FilterModel<T> & {
  value?: string | string[];
};

interface Props<T> {
  data: T[];
  filters: FilterModel<T>[];
  resultCount?: number;
  setFilteredData: Dispatch<SetStateAction<T[]>>;
}

/**
 * Display various filters as inputs and trigger the associated filtering
 * functions.
 */
export default function Filters<T>({
  data,
  filters,
  setFilteredData,
}: Readonly<Props<T>>) {
  const { t } = useTranslation();

  const [activeFilters, setActiveFilters] = useState<
    Map<string, ActiveFilter<T>>
  >(new Map());
  const [filteredLength, setFilteredLength] = useState<number>(data.length);

  /** Set the new filter as active, with the provided value. */
  function onActiveFilter(
    filter: FilterModel<T>,
    value: string | boolean | string[],
  ) {
    const newMap = new Map(activeFilters);

    if ((typeof value === 'string' || Array.isArray(value)) && value) {
      newMap.set(filter.label, { ...filter, value });
    } else if (typeof value === 'boolean' && value) {
      /** Bolean filter */
      newMap.set(filter.label, filter);
    } else {
      newMap.delete(filter.label);
    }

    setActiveFilters(newMap);
  }

  /* Filter the data accordingly. */
  useEffect(() => {
    let newData = [...data];
    activeFilters.forEach(({ onFilter, value }: ActiveFilter<T>) => {
      newData = newData.filter((v) => onFilter(v, value));
    });
    setFilteredData(newData);
    setFilteredLength(newData.length);
  }, [activeFilters, data, setFilteredData]);

  return (
    <div className="space-y-3">
      <div className="flex flex-row gap-x-3 items-end">
        {filters.map((filter) => (
          <Filter
            key={filter.label}
            filter={filter}
            onActiveFilter={onActiveFilter}
          />
        ))}
      </div>
      <div className="font-medium text-base/10 text-right">
        {t('filter.result', { count: filteredLength })}
      </div>
    </div>
  );
}
