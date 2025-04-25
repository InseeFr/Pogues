import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { versionsQueryOptions } from '@/api/versions';
import VersionsOverview from '@/components/versions/VersionsOverview';
import { Version } from '@/models/version';

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/versions/',
)({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(versionsQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data }: { data: Version[] } = useSuspenseQuery(
    versionsQueryOptions(questionnaireId),
  );

  return <VersionsOverview questionnaireId={questionnaireId} versions={data} />;
}
