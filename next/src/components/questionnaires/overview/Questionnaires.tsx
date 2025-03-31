import { useEffect, useState } from 'react';

import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import ButtonLink from '@/components/ui/ButtonLink';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import FilterList from '@/components/ui/FilterList';
import Input from '@/components/ui/Input';
import { useSearchFilter } from '@/hooks/useSearchFilter';
import { type Filter, FilterType } from '@/models/filter';
import { Questionnaire } from '@/models/questionnaires';
import { Stamp } from '@/models/stamps';

import StampsSelector from './StampsSelector';
import TableQuestionnaires from './TableQuestionnaires';

interface QuestionnairesProps {
  selectedStamp: string;
  stamps?: Stamp[];
  questionnaires?: Questionnaire[];
}

/** Display the page with the questionnaires and various filters options. */
export default function Questionnaires({
  selectedStamp,
  stamps = [],
  questionnaires = [],
}: Readonly<QuestionnairesProps>) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { searchFilter, updateSearchFilter } = useSearchFilter();

  const [filters, setFilters] = useState<Filter[]>([
    {
      type: FilterType.Stamp,
      filterContent: selectedStamp,
      clear: (): void => {
        setFilters((prevFilters: Filter[]) =>
          prevFilters.map((f: Filter) =>
            f.type === FilterType.Stamp ? { ...f, filterContent: '' } : f,
          ),
        );
        navigate({
          to: '/questionnaires',
        });
      },
    },
    searchFilter,
  ]);

  useEffect(() => {
    setFilters((prevFilters) => {
      const otherFilters = prevFilters.filter(
        (f) => f.type !== FilterType.Search,
      );
      return [...otherFilters, searchFilter];
    });
  }, [searchFilter]);

  /** Change page based on stamp chosen from the selector. */
  function handleStampSelection(stamp: string) {
    setFilters((prevFilters) =>
      prevFilters.map((f) =>
        f.type === FilterType.Stamp ? { ...f, filterContent: stamp } : f,
      ),
    );
    navigate({
      to: '/questionnaires',
      search: { stamp },
    });
  }

  const searchFilterContent =
    filters.find((f) => f.type === FilterType.Search)?.filterContent || '';

  return (
    <div>
      <ContentHeader
        title={t('questionnaires.title')}
        action={
          <ButtonLink to="/questionnaires/new">
            {t('questionnaires.create')}
          </ButtonLink>
        }
      />
      <ContentMain>
        <div className="grid grid-cols-[1fr_3fr] space-x-4">
          <div>
            <StampsSelector
              selectedStamp={selectedStamp}
              stamps={stamps}
              onSelect={(id) => handleStampSelection(id)}
            />
          </div>
          <div>
            <Input
              label={t('questionnaires.search')}
              placeholder={t('questionnaires.search')}
              value={searchFilterContent}
              onChange={(e) => updateSearchFilter(e.target.value)}
              onClear={searchFilter.clear}
              showClearButton={searchFilterContent.length > 0}
            />
          </div>
        </div>
        <FilterList filters={filters} />
        {questionnaires ? (
          <TableQuestionnaires
            questionnaires={questionnaires.filter((q) => {
              return (
                q.title
                  .toLowerCase()
                  .includes(searchFilterContent.toLowerCase()) ||
                q.id.toLowerCase().includes(searchFilterContent.toLowerCase())
              );
            })}
          />
        ) : (
          <div>{t('common.loading')}</div>
        )}
      </ContentMain>
    </div>
  );
}
