import { useEffect } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { personalizationQueryOptions } from '@/api/personalize';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
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
    <ComponentWrapper>
      <PersonalizationsOverview questionnaireId={questionnaireId} data={data} />
    </ComponentWrapper>
  );
}

function ErrorComponent({ error }: Readonly<{ error: Error }>) {
  const navigate = useNavigate();
  const questionnaireId = Route.useParams().questionnaireId;

  // If an existing data set is not found, redirect to the creation page
  useEffect(() => {
    if (error?.message?.includes('404')) {
      navigate({
        to: '/questionnaire/$questionnaireId/personalize/new',
        params: { questionnaireId },
        replace: true,
      });
    }
  }, [error, navigate, questionnaireId]);

  if (error?.message?.includes('404')) {
    return null;
  }

  return <div className="text-error">{error.message}</div>;
}

function ComponentWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();
  return (
    <>
      <ContentHeader
        title={`${t('personalization.overview.title')}`}
        action={null}
      />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
