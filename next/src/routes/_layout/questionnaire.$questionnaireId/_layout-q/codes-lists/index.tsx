import { createFileRoute, getRouteApi } from '@tanstack/react-router';

import { questionnaireQueryOptions } from '@/api/questionnaires';
import { getAPIToken } from '@/api/utils';
import CodesLists from '@/components/codesLists/CodesLists';

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/',
)({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) => {
    const token = await getAPIToken();

    const { codesLists } = await queryClient.ensureQueryData(
      questionnaireQueryOptions(questionnaireId, token),
    );

    return { codesLists };
  },
});

function RouteComponent() {
  const routeApi = getRouteApi(
    '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/',
  );
  const { codesLists } = routeApi.useLoaderData();
  return <CodesLists codesLists={codesLists || []} />;
}
