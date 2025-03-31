import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import FilterList from '@/components/ui/FilterList';
import Input from '@/components/ui/Input';
import { useSearchFilter } from '@/hooks/useSearchFilter';
import { CodesList } from '@/models/codesLists';
import { Filter, FilterType } from '@/models/filter';

interface CodesListFilterProps {
  codesLists: CodesList[];
  onFilter: (filteredCodesLists: CodesList[]) => void;
}

/**
 * Display the codes lists research bar and allow to filter the codes lists
 * by their id or label.
 */
export default function CodesListFilter({
  codesLists,
  onFilter,
}: CodesListFilterProps) {
  const { t } = useTranslation();

  const { searchFilter, updateSearchFilter } = useSearchFilter();
  const [filters, setFilters] = useState<Filter[]>([searchFilter]);

  const searchFilterContent =
    filters.find((f) => f.type === FilterType.Search)?.filterContent || '';

  useEffect(() => {
    setFilters((prevFilters) => {
      const otherFilters = prevFilters.filter(
        (f) => f.type !== FilterType.Search,
      );
      return [...otherFilters, searchFilter];
    });
  }, [searchFilter]);

  useEffect(() => {
    const filteredCodesLists = codesLists.filter((c) => {
      return (
        c.id.toLowerCase().includes(searchFilterContent.toLowerCase()) ||
        c.label.toLowerCase().includes(searchFilterContent.toLowerCase())
      );
    });

    onFilter(filteredCodesLists);
  }, [searchFilterContent, codesLists, onFilter]);

  return (
    <div>
      <Input
        label={t('codesList.overview.search')}
        placeholder={t('codesList.overview.search')}
        value={searchFilterContent}
        onChange={(e) => updateSearchFilter(e.target.value)}
        onClear={searchFilter.clear}
        showClearButton={searchFilterContent.length > 0}
      />
      <FilterList filters={filters} />
    </div>
  );
}
