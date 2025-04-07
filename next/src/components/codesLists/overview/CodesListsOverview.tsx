import { useTranslation } from 'react-i18next';

import ButtonLink, { ButtonStyle } from '@/components/ui/ButtonLink';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import FilterList from '@/components/ui/FilterList';
import Input from '@/components/ui/Input';
import { useFilters } from '@/hooks/useFilter';
import { type CodesList } from '@/models/codesLists';
import { FilterEnum } from '@/models/filter';

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

  const { filters, updateFilterContent, getFilterContent } = useFilters([
    {
      filterType: FilterEnum.Search,
      filterContent: '',
      clearFilterFunction: () => updateFilterContent(FilterEnum.Search, ''),
    },
  ]);

  const searchFilterContent = getFilterContent(FilterEnum.Search);

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
                  updateFilterContent(FilterEnum.Search, e.target.value)
                }
                onClear={() => updateFilterContent(FilterEnum.Search, '')}
                showClearButton={searchFilterContent.length > 0}
              />
            </div>
            <FilterList filters={filters} />
            {codesLists
              .filter((c) => {
                return (
                  c.id
                    .toLowerCase()
                    .includes(searchFilterContent.toLowerCase()) ||
                  c.label
                    .toLowerCase()
                    .includes(searchFilterContent.toLowerCase())
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
