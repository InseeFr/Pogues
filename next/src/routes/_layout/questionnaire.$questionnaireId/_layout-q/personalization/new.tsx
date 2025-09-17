import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { personalizationFromPoguesQueryOptions } from '@/api/personalization';
import ErrorComponent from '@/components/layout/ErrorComponent';
import CreatePersonalization from '@/components/personalization/form/create/CreatePersonalization';
import CreatePersonalizationLayout from '@/components/personalization/form/create/CreatePersonalizationLayout';
import {
  type PersonalizationQuestionnaire,
  type SurveyContext,
} from '@/models/personalizationQuestionnaire';

/**
 * Page that allow to create a new survey unit dataset.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/personalization/new',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CreatePersonalizationLayout>
      <ErrorComponent error={error.message} />
    </CreatePersonalizationLayout>
  ),
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(
      personalizationFromPoguesQueryOptions(questionnaireId),
    ),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data }: { data: PersonalizationQuestionnaire } = useSuspenseQuery(
    personalizationFromPoguesQueryOptions(questionnaireId),
  );
  // household context is set by default (feedback changes)
  data.context = { name: 'HOUSEHOLD', value: 'Ménage' } as SurveyContext;

  return (
    <CreatePersonalizationLayout>
      <CreatePersonalization data={data} questionnaireId={questionnaireId} />
    </CreatePersonalizationLayout>
  );
}
