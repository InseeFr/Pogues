import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';

import { variablesQueryOptions } from '@/api/variables';
import ErrorComponent from '@/components/layout/ErrorComponent';
import CreateVariable from '@/components/variables/create/CreateVariable';
import CreateVariableLayout from '@/components/variables/create/CreateVariableLayout';

const enableVariablesPageForm = import.meta.env.VITE_ENABLE_VARIABLES_PAGE_FORM;

/**
 * Page that allow to create a new code list.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/variables/new',
)({
  beforeLoad: ({ params: { questionnaireId } }) => {
    if (!enableVariablesPageForm) {
      throw redirect({
        to: '/questionnaire/$questionnaireId/variables',
        params: { questionnaireId },
      });
    }
  },
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
    queryClient.ensureQueryData(variablesQueryOptions(questionnaireId));
    return { crumb: t('crumb.new') };
  },
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: variables } = useSuspenseQuery(
    variablesQueryOptions(questionnaireId),
  );

  const scopes = new Set<string>();
  for (const variable of variables) {
    if (variable.scope) {
      scopes.add(variable.scope);
    }
  }

  return (
    <CreateVariableLayout>
      <CreateVariable questionnaireId={questionnaireId} scopes={scopes} />
    </CreateVariableLayout>
  );
}
