import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { questionnaireQueryOptions } from '@/api/questionnaires';
import { variablesQueryOptions } from '@/api/variables';
import ErrorComponent from '@/components/layout/ErrorComponent';
import EditVariable from '@/components/variables/edit/EditVariable';
import EditVariableLayout from '@/components/variables/edit/EditVariableLayout';
import { computeQuestionnaireScopes } from '@/utils/scopes';

/**
 * Page that allow to update an existing variable.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/variables/variable/$variableId',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <EditVariableLayout>
      <ErrorComponent error={error.message} />
    </EditVariableLayout>
  ),
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId, variableId },
  }) => {
    queryClient.ensureQueryData(questionnaireQueryOptions(questionnaireId));
    queryClient.ensureQueryData(variablesQueryOptions(questionnaireId));
    return { crumb: t('crumb.variable', { id: variableId }) };
  },
});

function RouteComponent() {
  const { questionnaireId, variableId } = Route.useParams();
  const { data: questionnaire } = useSuspenseQuery(
    questionnaireQueryOptions(questionnaireId),
  );
  const { data: variables } = useSuspenseQuery(
    variablesQueryOptions(questionnaireId),
  );

  const variable = variables.find((v) => v.id === variableId);

  return (
    <EditVariableLayout variable={variable}>
      <EditVariable
        questionnaireId={questionnaireId}
        variable={variable}
        scopes={questionnaire.scopes}
        variables={variables}
      />
    </EditVariableLayout>
  );
}
