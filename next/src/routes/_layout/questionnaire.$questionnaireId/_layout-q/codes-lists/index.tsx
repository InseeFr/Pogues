import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { codesListsQueryOptions } from '@/api/codesLists';
import CodesListsOverview from '@/components/codesLists/overview/CodesListsOverview';

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/',
)({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(codesListsQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: codesLists } = useSuspenseQuery(
    codesListsQueryOptions(questionnaireId),
  );

  return (
    <CodesListsOverview
      questionnaireId={questionnaireId}
      codesLists={codesLists}
    />
  );
}
