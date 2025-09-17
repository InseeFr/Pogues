import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { multimodeQueryOptions } from '@/api/multimode';
import MultimodeOverview from '@/components/multimode/MultimodeOverview';
import MultimodeOverviewErrorComponent from '@/components/multimode/MultimodeOverviewErrorComponent';
import MultimodeOverviewLayout from '@/components/multimode/MultimodeOverviewLayout';
import { type MultimodeIsMovedRules } from '@/models/multimode';

/**
 * Display the current questionnaire multimode and allow to set them.
 *
 * This functionality is only available to questionnaire in CAWI
 * and (CATI or CAPI).
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/multimode/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <MultimodeOverviewLayout>
      <MultimodeOverviewErrorComponent error={error} />
    </MultimodeOverviewLayout>
  ),
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(multimodeQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data }: { data: MultimodeIsMovedRules } = useSuspenseQuery(
    multimodeQueryOptions(questionnaireId),
  );

  return (
    <MultimodeOverviewLayout>
      <MultimodeOverview
        questionnaireId={questionnaireId}
        isMovedRules={data}
      />
    </MultimodeOverviewLayout>
  );
}
