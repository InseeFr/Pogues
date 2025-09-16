import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { articulationVariablesQueryOptions } from '@/api/articulation';
import CreateArticulation from '@/components/articulation/create/CreateArticulation';
import CreateArticulationLayout from '@/components/articulation/create/CreateArticulationLayout';
import ErrorComponent from '@/components/layout/ErrorComponent';

/**
 * Page for creating an articulation for a questionnaire.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/articulation/new',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CreateArticulationLayout>
      <ErrorComponent error={error.message} />
    </CreateArticulationLayout>
  ),
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(
      articulationVariablesQueryOptions(questionnaireId),
    ),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: variables } = useSuspenseQuery(
    articulationVariablesQueryOptions(questionnaireId),
  );

  return (
    <CreateArticulationLayout>
      <CreateArticulation
        questionnaireId={questionnaireId}
        variables={variables}
      />
    </CreateArticulationLayout>
  );
}
