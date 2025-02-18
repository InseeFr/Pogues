import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { questionnaireQueryOptions } from '@/api/questionnaires';
import EditCodesList from '@/components/codesLists/edit/EditCodesList';

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId',
)({
  component: RouteComponent,
  loader: async ({
    context: { queryClient },
    params: { codesListId, questionnaireId },
  }) => {
    queryClient.ensureQueryData(questionnaireQueryOptions(questionnaireId));
    return { crumb: `Liste de codes ${codesListId}` };
  },
});

function RouteComponent() {
  const { questionnaireId, codesListId } = Route.useParams();
  const {
    data: { codesLists },
  } = useSuspenseQuery(questionnaireQueryOptions(questionnaireId));
  let codesList;
  if (codesLists) {
    for (const element of codesLists) {
      if (element.id === codesListId) codesList = element;
    }
  }

  return (
    <EditCodesList questionnaireId={questionnaireId} codesList={codesList} />
  );
}
