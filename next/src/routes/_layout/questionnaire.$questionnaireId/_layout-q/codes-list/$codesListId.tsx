import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { questionnaireQueryOptions } from '@/api/questionnaires';
import { variablesQueryOptions } from '@/api/variables';
import EditCodesList from '@/components/codesLists/edit/EditCodesList';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import { CodesList } from '@/models/codesLists';

/**
 * Page that allow to update an existing code list.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({
    context: { queryClient, t },
    params: { codesListId, questionnaireId },
  }) => {
    queryClient.ensureQueryData(questionnaireQueryOptions(questionnaireId));
    queryClient.ensureQueryData(variablesQueryOptions(questionnaireId));
    return { crumb: t('codesList.edit.crumb', { id: codesListId }) };
  },
});

function RouteComponent() {
  const { questionnaireId, codesListId } = Route.useParams();
  const {
    data: { codesLists, formulasLanguage },
  } = useSuspenseQuery(questionnaireQueryOptions(questionnaireId));
  const { data: variables } = useSuspenseQuery(
    variablesQueryOptions(questionnaireId),
  );

  let codesList;
  if (codesLists) {
    for (const element of codesLists) {
      if (element.id === codesListId) codesList = element;
    }
  }

  return (
    <ComponentWrapper codesList={codesList}>
      <EditCodesList
        questionnaireId={questionnaireId}
        codesList={codesList}
        formulasLanguage={formulasLanguage}
        variables={variables}
      />
    </ComponentWrapper>
  );
}

function ErrorComponent({ error }: Readonly<{ error: Error }>) {
  return (
    <ComponentWrapper>
      <div className="text-error">{error.message}</div>
    </ComponentWrapper>
  );
}

function ComponentWrapper({
  children,
  codesList,
}: Readonly<{ children: React.ReactNode; codesList?: CodesList }>) {
  const { t } = useTranslation();
  return (
    <>
      <ContentHeader
        title={t('codesList.edit.title', { label: codesList?.label })}
      />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
