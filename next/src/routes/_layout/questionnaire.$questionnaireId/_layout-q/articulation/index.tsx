import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { articulationQueryOptions } from '@/api/articulation';
import { ArticulationOverview } from '@/components/articulation/overview/ArticulationOverview';
import ArticulationOverviewErrorComponent from '@/components/articulation/overview/layout/ArticulationOverviewErrorComponent';
import ArticulationOverviewLayout from '@/components/articulation/overview/layout/ArticulationOverviewLayout';

/**
 * Main articulation page where we display the articulation items of our
 * questionnaire and allow to set them.
 *
 * This functionality is only available to questionnaire in CATI or CAPI,
 * with a roundabout.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/articulation/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <ArticulationOverviewLayout>
      <ArticulationOverviewErrorComponent error={error} />
    </ArticulationOverviewLayout>
  ),
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(articulationQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: articulation } = useSuspenseQuery(
    articulationQueryOptions(questionnaireId),
  );

  return (
    <ArticulationOverviewLayout>
      <ArticulationOverview
        questionnaireId={questionnaireId}
        articulationItems={articulation.items}
      />
    </ArticulationOverviewLayout>
  );
}
