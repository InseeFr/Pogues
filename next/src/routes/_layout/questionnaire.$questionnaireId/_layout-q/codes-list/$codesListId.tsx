import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { questionnaireQueryOptions } from '@/api/questionnaires';
import { variablesQueryOptions } from '@/api/variables';
import EditCodesList from '@/components/codesLists/edit/EditCodesList';
import EditCodesListLayout from '@/components/codesLists/edit/EditCodesListLayout';
import ErrorComponent from '@/components/layout/ErrorComponent';

/**
 * Page that allow to update an existing code list.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <EditCodesListLayout>
      <ErrorComponent error={error.message} />
    </EditCodesListLayout>
  ),
  loader: async ({
    context: { queryClient, t },
    params: { codesListId, questionnaireId },
  }) => {
    queryClient.ensureQueryData(questionnaireQueryOptions(questionnaireId));
    queryClient.ensureQueryData(variablesQueryOptions(questionnaireId));
    return { crumb: t('crumb.codesList', { id: codesListId }) };
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
    <EditCodesListLayout codesList={codesList}>
      <EditCodesList
        questionnaireId={questionnaireId}
        codesList={codesList}
        formulasLanguage={formulasLanguage}
        variables={variables}
      />
    </EditCodesListLayout>
  );
}
