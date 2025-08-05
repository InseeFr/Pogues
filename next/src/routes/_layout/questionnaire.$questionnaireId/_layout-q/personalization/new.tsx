import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { personalizationFromPoguesQueryOptions } from '@/api/personalization';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import CreatePersonalization from '@/components/personalization/form/create/CreatePersonalization';
import {
  PersonalizationQuestionnaire,
  SurveyContext,
} from '@/models/personalizationQuestionnaire';

/**
 * Page that allow to create a new survey unit dataset.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/personalization/new',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
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
    <ComponentWrapper>
      <CreatePersonalization data={data} questionnaireId={questionnaireId} />
    </ComponentWrapper>
  );
}
function ErrorComponent({ error }: Readonly<{ error: Error }>) {
  return (
    <ComponentWrapper>
      <div className="text-error">{error.message}</div>
    </ComponentWrapper>
  );
}

function ComponentWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { t } = useTranslation();
  return (
    <>
      <ContentHeader title={t('personalization.create.title')} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
