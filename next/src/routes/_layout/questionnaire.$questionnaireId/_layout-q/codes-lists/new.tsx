import { createFileRoute } from '@tanstack/react-router';

import CreateCodesList from '@/components/codesLists/create/CreateCodesList';

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new',
)({
  component: RouteComponent,
  loader: () => ({ crumb: 'Nouveau' }),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;

  return <CreateCodesList questionnaireId={questionnaireId} />;
}
