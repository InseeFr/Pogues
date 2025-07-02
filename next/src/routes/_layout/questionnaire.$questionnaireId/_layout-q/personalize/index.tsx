import { useEffect, useMemo, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { personalizationFileQueryOptions, personalizationQueryOptions } from '@/api/personalize';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import PersonalizationsOverview from '@/components/personalization/PersonalizationOverview';
import Papa, { ParseResult } from 'papaparse';


/**
 * Previously handled by Public Enemy
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/personalize/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({
    context: { queryClient },
    params: { questionnaireId },
  }) => {
    const questionnaire = await queryClient.ensureQueryData(
      personalizationQueryOptions(questionnaireId),
    );
    const publicEnemyId = questionnaire?.id; // or the 
    if (publicEnemyId) {
      await queryClient.ensureQueryData(
        personalizationFileQueryOptions(publicEnemyId),
      );
    }
  },
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: questionnaire } = useSuspenseQuery(
    personalizationQueryOptions(questionnaireId),
  );

  const publicEnemyId = questionnaire.id;

  const { data: csvData } = useSuspenseQuery(
    personalizationFileQueryOptions(publicEnemyId),
  );

  const [parsedCsv, setParsedCsv] = useState<ParseResult | null>(null);
  useMemo(() => {
    if (!csvData) return;

    csvData.text().then((csvText) => {
      const result = Papa.parse(csvText, {
        header: true,
      });
      setParsedCsv(result);
    });
  }, [csvData]);
  return (
    <ComponentWrapper>
      <PersonalizationsOverview questionnaireId={questionnaireId} data={questionnaire} csvData={parsedCsv} />
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
