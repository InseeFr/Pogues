import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { questionnaireQueryOptions } from '@/api/questionnaires';
import { variablesQueryOptions } from '@/api/variables';
import CreateCodesList from '@/components/codesLists/create/CreateCodesList';

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new',
)({
  component: RouteComponent,
  loader: () => ({ crumb: 'Nouveau' }),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const {
    data: { formulasLanguage },
  } = useSuspenseQuery(questionnaireQueryOptions(questionnaireId));
  const { data: variables } = useSuspenseQuery(
    variablesQueryOptions(questionnaireId),
  );

  return (
    <CreateCodesList
      questionnaireId={questionnaireId}
      formulasLanguage={formulasLanguage}
      variables={variables}
    />
  );
}
