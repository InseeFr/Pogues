import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { nomenclaturesQueryOptions } from '@/api/nomenclatures';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import PersonalizationsOverview from '@/components/personalization/PersonalizationOverview';

/**
 * Previously handled by Public Enemy
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/personalize/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(nomenclaturesQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;

  return (
    <ComponentWrapper>
      <PersonalizationsOverview questionnaireId={questionnaireId} />
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
      <ContentHeader title={`${t('personalization.title')}`} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
