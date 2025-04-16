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
      <span className="font-medium text-md">
        {t('filter.active', { count: activeFilterCount })}&nbsp;
      </span>
      {filters.map((filter, index) =>
        typeof filter.filterContent === 'boolean' ? (
          <div
            key={index}
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
              key={index}
              className="border p-1 rounded-full flex items-center bg-slate-200"
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
                  onClick={filter.clearFilterFunction || (() => {})}
                />
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
