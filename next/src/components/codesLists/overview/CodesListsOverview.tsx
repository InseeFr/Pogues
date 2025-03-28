import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import ButtonLink, { ButtonStyle } from '@/components/ui/ButtonLink';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import FilterList from '@/components/ui/FilterList';
import Input from '@/components/ui/Input';
import { type CodesList } from '@/models/codesLists';
import { type Filter, FilterEnum } from '@/models/filter';

import CodesListOverviewItem from './CodesListOverviewItem';

interface CodesListsProps {
  codesLists?: CodesList[];
  questionnaireId: string;
}

/**
 * Display the codes lists of the selected questionnaire and allow to edit them
 * or create a new one.
 */
export default function CodesListsOverview({
  codesLists = [],
  questionnaireId,
}: Readonly<CodesListsProps>) {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<Filter[]>([
    {
      filterType: FilterEnum.Search,
      filterContent: '',
      clearFilterFunction: () =>
        setFilters((prevFilters) =>
          prevFilters.map((f) =>
            f.filterType === FilterEnum.Search
              ? { ...f, filterContent: '' }
              : f,
          ),
        ),
    },
  ]);

  const searchFilterContent =
    filters.find((f) => f.filterType === FilterEnum.Search)?.filterContent ||
    '';

  return (
    <div>
      <ContentHeader
        title={t('codesList.overview.title')}
        action={
          <ButtonLink
            to="/questionnaire/$questionnaireId/codes-lists/new"
            params={{ questionnaireId }}
          >
            {t('codesList.overview.create')}
          </ButtonLink>
        }
      />
      <ContentMain>
        {codesLists.length > 0 ? (
          <>
            <div>
              <Input
                label={t('codesList.overview.search')}
                placeholder={t('codesList.overview.search')}
                value={searchFilterContent}
                onChange={(e) =>
                  setFilters((prevFilters) =>
                    prevFilters.map((f) =>
                      f.filterType === FilterEnum.Search
                        ? { ...f, filterContent: e.target.value }
                        : f,
                    ),
                  )
                }
                onClear={() =>
                  setFilters((prevFilters) =>
                    prevFilters.map((f) =>
                      f.filterType === FilterEnum.Search
                        ? { ...f, filterContent: '' }
                        : f,
                    ),
                  )
                }
                showClearButton={searchFilterContent.length > 0}
              />
            </div>
            <FilterList filters={filters} />
            {codesLists
              .filter((c) => {
                return (
                  c.id
                    .toLowerCase()
                    .includes(filters[0].filterContent.toLowerCase()) ||
                  c.label
                    .toLowerCase()
                    .includes(filters[0].filterContent.toLowerCase())
                );
              })
              .map((codesList) => (
                <CodesListOverviewItem
                  key={codesList.id}
                  questionnaireId={questionnaireId}
                  codesList={codesList}
                />
              ))}
          </>
        ) : (
          <ButtonLink
            to="/questionnaire/$questionnaireId/codes-lists/new"
            params={{ questionnaireId }}
            buttonStyle={ButtonStyle.Primary}
          >
            {t('codesList.overview.create')}
          </ButtonLink>
        )}
      </ContentMain>
    </div>
  );
}
