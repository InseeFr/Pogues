import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { personalizationQueryOptions } from '@/api/personalize';
import PersonalizationsOverview from '@/components/personalization/PersonalizationOverview';
import { PersonalizationQuestionnaire } from '@/models/personalizationQuestionnaire';

/**
 * Previously handled by Public Enemy
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/personalize/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(personalizationQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data }: { data: PersonalizationQuestionnaire } = useSuspenseQuery(
    personalizationQueryOptions(questionnaireId),
  );
  return (
    <PersonalizationsOverview questionnaireId={questionnaireId} data={data} />
  );
}

function ErrorComponent({ error }: Readonly<{ error: Error }>) {
  return <div className="text-error">{error.message}</div>;
}
