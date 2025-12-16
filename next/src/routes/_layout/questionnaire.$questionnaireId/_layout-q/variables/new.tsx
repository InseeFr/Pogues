import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { questionnaireQueryOptions } from '@/api/questionnaires';
import { variablesQueryOptions } from '@/api/variables';
import ErrorComponent from '@/components/layout/ErrorComponent';
import CreateVariable from '@/components/variables/create/CreateVariable';
import CreateVariableLayout from '@/components/variables/create/CreateVariableLayout';
import { Variable } from '@/models/variables';
import { computeQuestionnaireScopes } from '@/utils/scopes';

/**
 * Page that allow to create a new code list.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/variables/new',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CreateVariableLayout>
      <ErrorComponent error={error.message} />
    </CreateVariableLayout>
  ),
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId },
  }) => {
    queryClient.ensureQueryData(questionnaireQueryOptions(questionnaireId));
    return { crumb: t('crumb.new') };
  },
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: questionnaire } = useSuspenseQuery(
    questionnaireQueryOptions(questionnaireId),
  );
  const { data: variables }: { data: Variable[] } = useSuspenseQuery(
    variablesQueryOptions(questionnaireId),
  );

  return (
    <CreateVariableLayout>
      <CreateVariable
        questionnaireId={questionnaireId}
        scopes={questionnaire.scopes}
        variables={variables}
      />
    </CreateVariableLayout>
  );
}
