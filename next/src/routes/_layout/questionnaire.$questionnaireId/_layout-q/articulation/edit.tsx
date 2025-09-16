import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import {
  articulationQueryOptions,
  articulationVariablesQueryOptions,
} from '@/api/articulation';
import EditArticulation from '@/components/articulation/edit/EditArticulation';
import EditArticulationLayout from '@/components/articulation/edit/EditArticulationLayout';
import ErrorComponent from '@/components/layout/ErrorComponent';

/**
 * Page for editing the existing articulation items of a questionnaire.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/articulation/edit',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <EditArticulationLayout>
      <ErrorComponent error={error.message} />
    </EditArticulationLayout>
  ),
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) => {
    await Promise.all([
      queryClient.ensureQueryData(articulationQueryOptions(questionnaireId)),
      queryClient.ensureQueryData(
        articulationVariablesQueryOptions(questionnaireId),
      ),
    ]);
  },
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: articulation } = useSuspenseQuery(
    articulationQueryOptions(questionnaireId),
  );
  const { data: variables } = useSuspenseQuery(
    articulationVariablesQueryOptions(questionnaireId),
  );

  return (
    <EditArticulationLayout>
      <EditArticulation
        questionnaireId={questionnaireId}
        variables={variables}
        articulationItems={articulation.items}
      />
    </EditArticulationLayout>
  );
}
