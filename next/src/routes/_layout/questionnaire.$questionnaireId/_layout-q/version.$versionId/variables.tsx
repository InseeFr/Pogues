import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { variablesFromVersionQueryOptions } from '@/api/variables';
import ErrorComponent from '@/components/layout/ErrorComponent';
import VariablesOverview from '@/components/variables/overview/VariablesOverview';
import VariablesOverviewVersionLayout from '@/components/variables/overview/VariablesOverviewVersionLayout';
import { type Variable } from '@/models/variables';

/**
 * Variables page that provide a recap of the the various variables used by
 * our questionnaire backup.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/variables',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CustomLayout>
      <ErrorComponent error={error.message} />
    </CustomLayout>
  ),
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId, versionId },
  }) => {
    queryClient.ensureQueryData(
      variablesFromVersionQueryOptions(questionnaireId, versionId),
    );
    return { crumb: t('crumb.variables') };
  },
});

function RouteComponent() {
  const { questionnaireId, versionId } = Route.useParams();
  const { data }: { data: Variable[] } = useSuspenseQuery(
    variablesFromVersionQueryOptions(questionnaireId, versionId),
  );

  return (
    <CustomLayout>
      <VariablesOverview questionnaireId={questionnaireId} variables={data} />
    </CustomLayout>
  );
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { questionnaireId, versionId } = Route.useParams();

  return (
    <VariablesOverviewVersionLayout
      questionnaireId={questionnaireId}
      versionId={versionId}
    >
      {children}
    </VariablesOverviewVersionLayout>
  );
}
