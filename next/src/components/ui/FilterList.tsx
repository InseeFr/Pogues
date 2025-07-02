import React from 'react';

import { useTranslation } from 'react-i18next';

import ButtonIcon from '@/components/ui/ButtonIcon';
import CloseIcon from '@/components/ui/icons/CloseIcon';
import { Filter, FilterEnum } from '@/models/filter';

interface FilterListProps {
  filters: Filter[];
  updateFilterContent?: (
    filterType: FilterEnum,
    content: string | boolean,
  ) => void;
  resultCount?: number;
}

const FilterList: React.FC<FilterListProps> = ({
  filters = [],
  updateFilterContent = () => {},
  resultCount,
}) => {
  const { t } = useTranslation();

  const activeFilterCount = filters.filter(
    (filter) => filter.filterContent,
  ).length;

  return (
    <div className="flex flex-row gap-3 mv-4 items-baseline">
      <span className="font-medium text-base/10">
        {t('filter.active', { count: activeFilterCount })}&nbsp;
      </span>
      {filters.map((filter) =>
        typeof filter.filterContent === 'boolean' ? (
          <div
            key={filter.filterType}
            className={`border px-1 py-2 rounded-full flex items-center ${
              filter.filterContent
                ? 'bg-primary text-white'
                : 'bg-slate-200 text-black'
            } cursor-pointer`}
            tabIndex={0}
            role="button"
            onClick={() => {
              updateFilterContent(filter.filterType, !filter.filterContent);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                updateFilterContent(filter.filterType, !filter.filterContent);
              }
            }}
          >
            <div className="flex items-center ml-2 mr-2">
              <span className="font-medium text-sm">
                {t(`filter.${filter.filterType}`)}
              </span>
            </div>
          </div>
        ) : (
          filter.filterContent && (
            <div
              key={filter.filterType}
              className="border px-1 py-2 rounded-full flex items-center bg-primary text-white"
            >
              <div className="flex items-center ml-2">
                <span className="text-sm mr-2">
                  {t(`filter.${filter.filterType}`)}: {filter.filterContent}
                </span>
                <button title={t('filter.clear')}>
                  <CloseIcon
                    className={`cursor-pointer m-auto size-5 fill-white`}
                    onClick={filter.clearFilterFunction}
                  />
                </button>
              </div>
            </div>
          )
        ),
      )}
      {resultCount !== undefined && (
        <span className="font-medium text-md ml-auto">
          {t('filter.result', { count: resultCount })}&nbsp;
        </span>
      )}
    </div>
  );
};

export default FilterList;
