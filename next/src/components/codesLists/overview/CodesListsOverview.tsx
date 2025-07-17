import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import ButtonLink, { ButtonStyle } from '@/components/ui/ButtonLink';
import Filters from '@/components/ui/Filters';
import { type CodesList } from '@/models/codesLists';
import { Filter, FilterType } from '@/models/filters';

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

  const [filteredCodesLists, setFilteredCodesLists] =
    useState<CodesList[]>(codesLists);

  const filters: Filter<CodesList>[] = [
    {
      label: t('codesLists.notUsed'),
      onFilter: (v: CodesList, filter: string[] = []) =>
        filter.includes('notUsed')
          ? !v.relatedQuestionNames || v.relatedQuestionNames.length === 0
          : true,
      options: [{ label: t('codesLists.notUsed'), value: 'notUsed' }],
      type: FilterType.ToggleGroup,
    },
    {
      label: t('codesLists.name'),
      onFilter: (v: CodesList, input?: string) =>
        input ? v.label.toLowerCase().includes(input.toLowerCase()) : true,
      placeholder: t('codesLists.search'),
      type: FilterType.Text,
    },
  ];

  return codesLists.length > 0 ? (
    <>
      <Filters<CodesList>
        filters={filters}
        data={codesLists}
        setFilteredData={setFilteredCodesLists}
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
      {t('codesLists.create')}
    </ButtonLink>
  );
}
