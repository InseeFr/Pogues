import { useEffect } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { allPersonalizationQueryOptions } from '@/api/personalization';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import PersonalizationsOverview from '@/components/personalization/overview/PersonalizationOverview';

/**
 * Previously handled by Public Enemy
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/personalization/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) => {
    queryClient.ensureQueryData(
      allPersonalizationQueryOptions(questionnaireId),
    );
  },
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;

  const {
    data: [questionnaire, csvData, surveyUnitData],
  } = useSuspenseQuery(allPersonalizationQueryOptions(questionnaireId));

  return (
    <ComponentWrapper>
      <PersonalizationsOverview
        questionnaireId={questionnaireId}
        data={questionnaire}
        csvData={csvData}
        surveyUnitData={surveyUnitData}
      />
    </ComponentWrapper>
  );
}

function ErrorComponent({ error }: Readonly<{ error: Error }>) {
  const navigate = useNavigate();
  const questionnaireId = Route.useParams().questionnaireId;

  // If no data is found, redirect to the creation page
  useEffect(() => {
    if (error?.message?.includes('404')) {
      navigate({
        to: '/questionnaire/$questionnaireId/personalization/new',
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
      <ContentHeader title={`${t('personalization.overview.title')}`} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
