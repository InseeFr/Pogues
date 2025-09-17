import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { questionnaireQueryOptions } from '@/api/questionnaires';
import { variablesQueryOptions } from '@/api/variables';
import CreateCodesList from '@/components/codesLists/create/CreateCodesList';
import CreateCodesListLayout from '@/components/codesLists/create/CreateCodesListLayout';
import ErrorComponent from '@/components/layout/ErrorComponent';

/**
 * Page that allow to create a new code list.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CreateCodesListLayout>
      <ErrorComponent error={error.message} />
    </CreateCodesListLayout>
  ),
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId },
  }) => {
    queryClient.ensureQueryData(questionnaireQueryOptions(questionnaireId));
    queryClient.ensureQueryData(variablesQueryOptions(questionnaireId));
    return { crumb: t('crumb.new') };
  },
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const {
    data: { formulasLanguage },
  } = useSuspenseQuery(questionnaireQueryOptions(questionnaireId));
  const { data: variables } = useSuspenseQuery(
    variablesQueryOptions(questionnaireId),
  );

  return (
    <CreateCodesListLayout>
      <CreateCodesList
        questionnaireId={questionnaireId}
        formulasLanguage={formulasLanguage}
        variables={variables}
      />
    </CreateCodesListLayout>
  );
}
