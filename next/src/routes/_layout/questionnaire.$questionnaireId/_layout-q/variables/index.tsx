import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { variablesQueryOptions } from '@/api/variables';
import ErrorComponent from '@/components/layout/ErrorComponent';
import VariablesOverview from '@/components/variables/overview/VariablesOverview';
import VariablesOverviewLayout from '@/components/variables/overview/VariablesOverviewLayout';
import { type Variable } from '@/models/variables';

const enableVariablesPageForm = import.meta.env.VITE_ENABLE_VARIABLES_PAGE_FORM;

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/variables/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CustomLayout>
      <ErrorComponent error={error.message} />
    </CustomLayout>
  ),
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(variablesQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data }: { data: Variable[] } = useSuspenseQuery(
    variablesQueryOptions(questionnaireId),
  );

  return (
    <CustomLayout>
      <VariablesOverview questionnaireId={questionnaireId} variables={data} />
    </CustomLayout>
  );
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { questionnaireId } = Route.useParams();

  return (
    <VariablesOverviewLayout
      enableVariablesPageForm={enableVariablesPageForm}
      questionnaireId={questionnaireId}
    >
      {children}
    </VariablesOverviewLayout>
  );
}
