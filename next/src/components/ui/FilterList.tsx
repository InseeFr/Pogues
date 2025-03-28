import React from 'react';

import { useTranslation } from 'react-i18next';

import ButtonIcon from '@/components/ui/ButtonIcon';
import FilterOffIcon from '@/components/ui/icons/FilterOff';

interface FilterItem {
  filterType: string;
  filterContent: string;
}

interface FilterListProps {
  filters: FilterItem[];
  setFilters: React.Dispatch<React.SetStateAction<FilterItem[]>>;
}

const FilterList: React.FC<FilterListProps> = ({
  filters = [],
  setFilters,
}) => {
  const { t } = useTranslation();
  const onClear = () => {
    setFilters([]);
  };
  return (
    <div className="flex flex-row gap-4">
      {filters.map(
        (filter, index) =>
          filter.filterContent && (
            <div key={index} className="border border-gray-300 p-2 rounded-md">
              <div className="flex items-center gap-1">
                <span className="font-medium">{filter.filterType}:</span>
                <span>{filter.filterContent}</span>
              </div>
            </div>
          ),
      )}
      <ButtonIcon
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
        Icon={FilterOffIcon}
        title={t('common.clearFilters')}
        onClick={onClear}
        disabled={filters.length === 0}
      />
    </div>
  );
};

export default FilterList;
