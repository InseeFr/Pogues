import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import ButtonLink from '@/components/ui/ButtonLink';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import FilterList from '@/components/ui/FilterList';
import Input from '@/components/ui/Input';
import { useFilters } from '@/hooks/useFilter';
import { FilterEnum } from '@/models/filter';
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

  const searchParams = new URLSearchParams(window.location.search);
  const stampFromUrl = searchParams.get('stamp') || '';

  const { filters, updateFilterContent, getFilterContent } = useFilters([
    {
      filterType: FilterEnum.Stamp,
      filterContent: stampFromUrl,
      clearFilterFunction: () => {
        updateFilterContent(FilterEnum.Stamp, '');
        navigate({ to: '/questionnaires' });
      },
    },
    {
      filterType: FilterEnum.Search,
      filterContent: '',
      clearFilterFunction: () => updateFilterContent(FilterEnum.Search, ''),
    },
  ]);

  /** Change page based on stamp chosen from the selector. */
  function handleStampSelection(stamp: string) {
    updateFilterContent(FilterEnum.Stamp, stamp);
    navigate({
      to: '/questionnaires',
      search: { stamp },
    });
  }

  const searchFilterContent = getFilterContent(FilterEnum.Search);

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
              onChange={(e) =>
                updateFilterContent(FilterEnum.Search, e.target.value)
              }
              onClear={() => updateFilterContent(FilterEnum.Search, '')}
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
