import { useTranslation } from 'react-i18next';

import ButtonLink, { ButtonStyle } from '@/components/ui/ButtonLink';
import FilterList from '@/components/ui/FilterList';
import Input from '@/components/ui/form/Input';
import { useFilters } from '@/hooks/useFilter';
import { type CodesList } from '@/models/codesLists';
import { FilterEnum } from '@/models/filter';

import CodesListOverviewItem from './CodesListOverviewItem';

interface CodesListsProps {
  codesLists?: CodesList[];
  questionnaireId: string;
  readonly?: boolean;
}

/**
 * Display the codes lists of the selected questionnaire and allow to edit them
 * or create a new one.
 */
export default function CodesListsOverview({
  codesLists = [],
  questionnaireId,
  readonly = false,
}: Readonly<CodesListsProps>) {
  const { t } = useTranslation();

  const { filters, updateFilterContent, getFilterContent } = useFilters([
    {
      filterType: FilterEnum.QuestionUsed,
      filterContent: false,
      clearFilterFunction: () =>
        updateFilterContent(FilterEnum.QuestionUsed, false),
    },
    {
      filterType: FilterEnum.Search,
      filterContent: '',
      clearFilterFunction: () => updateFilterContent(FilterEnum.Search, ''),
    },
  ]);

  const searchFilterContent = getFilterContent(FilterEnum.Search).toString();
  const questionUsedFilterContent = getFilterContent(FilterEnum.QuestionUsed);

  const filteredCodesLists = codesLists.filter((c) => {
    const matchesSearchFilter =
      c.id.toLowerCase().includes(searchFilterContent.toLowerCase()) ||
      c.label.toLowerCase().includes(searchFilterContent.toLowerCase());

    const matchesQuestionUsedFilter =
      !questionUsedFilterContent || c.relatedQuestionNames!.length === 0;

    return matchesSearchFilter && matchesQuestionUsedFilter;
  });

  return codesLists.length > 0 ? (
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
      <FilterList
        filters={filters}
        resultCount={filteredCodesLists.length}
        updateFilterContent={updateFilterContent}
      />
      <ul>
        {filteredCodesLists.map((codesList) => (
          <CodesListOverviewItem
            key={codesList.id}
            questionnaireId={questionnaireId}
            codesList={codesList}
            readonly={readonly}
          />
        ))}
      </ul>
    </>
  ) : (
    <ButtonLink
      to="/questionnaire/$questionnaireId/codes-lists/new"
      params={{ questionnaireId }}
      buttonStyle={ButtonStyle.Primary}
    >
      {t('codesList.overview.create')}
    </ButtonLink>
  );
}
