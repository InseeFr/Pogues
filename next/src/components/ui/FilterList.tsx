import React from 'react';

import { useTranslation } from 'react-i18next';

import ButtonIcon from '@/components/ui/ButtonIcon';
import CloseIcon from '@/components/ui/icons/CloseIcon';
import { Filter } from '@/models/filter';

interface FilterListProps {
  filters: Filter[];
}

const FilterList: React.FC<FilterListProps> = ({ filters = [] }) => {
  const { t } = useTranslation();

  const activeFilterCount = filters.filter(
    (filter) => filter.filterContent,
  ).length;

  return (
    <>
      {activeFilterCount > 0 && (
        <div className="flex flex-row gap-1">
          <span className="font-medium text-md">
            {t('filter.active', { count: activeFilterCount })}&nbsp;
          </span>
        </div>
      )}
      <div className="flex flex-row gap-4 mv-4">
        {filters.map(
          (filter, index) =>
            filter.filterContent && (
              <div
                key={index}
                className="border p-2 rounded-full flex items-center bg-slate-200"
              >
                <div className="flex items-center ml-2">
                  <span className="font-medium text-sm">
                    {t(`filter.${filter.filterType}`)}:&nbsp;
                  </span>
                  <span className="font-normal text-xs">
                    {filter.filterContent}
                  </span>
                  <ButtonIcon
                    className="ml-2"
                    Icon={CloseIcon}
                    iconProps={{ height: '16px', width: '16px' }}
                    title={t('filter.clear')}
                    onClick={filter.clearFilterFunction}
                  />
                </div>
              </div>
            ),
        )}
      </div>
    </>
  );
};

export default FilterList;
