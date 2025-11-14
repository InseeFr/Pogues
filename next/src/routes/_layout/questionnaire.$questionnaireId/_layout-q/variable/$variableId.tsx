import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { questionnaireQueryOptions } from '@/api/questionnaires';
import { variablesQueryOptions } from '@/api/variables';
import EditCodesList from '@/components/codesLists/edit/EditCodesList';
import EditCodesListLayout from '@/components/codesLists/edit/EditCodesListLayout';
import ErrorComponent from '@/components/layout/ErrorComponent';
import EditVariable from '@/components/variables/edit/EditVariable';
import EditVariableLayout from '@/components/variables/edit/EditVariableLayout';

/**
 * Page that allow to update an existing variable.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/variable/$variableId',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <EditCodesListLayout>
      <ErrorComponent error={error.message} />
    </EditCodesListLayout>
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
  const { data: variables } = useSuspenseQuery(
    variablesQueryOptions(questionnaireId),
  );

  const variable = variables.find((v) => v.id === variableId);

  const scopes = new Set<string>();
  for (const variable of variables) {
    if (variable.scope) {
      scopes.add(variable.scope);
    }
  }

  return (
    <EditVariableLayout variable={variable}>
      <EditVariable
        questionnaireId={questionnaireId}
        variable={variable}
        scopes={scopes}
      />
    </EditVariableLayout>
  );
}
