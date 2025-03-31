import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import ButtonLink, { ButtonStyle } from '@/components/ui/ButtonLink';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import { type CodesList } from '@/models/codesLists';

import CodesListFilter from './CodeListFilter';
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

  const [filteredCodesLists, setFilteredCodesLists] =
    useState<CodesList[]>(codesLists);

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
            <CodesListFilter
              codesLists={codesLists}
              onFilter={(filtered) => setFilteredCodesLists(filtered)}
            />
            {filteredCodesLists.map((codesList) => (
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
