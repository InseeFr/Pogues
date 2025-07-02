import { useMemo, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import Papa, { type ParseResult } from 'papaparse';
import { useTranslation } from 'react-i18next';

import {
  personalizationFileQueryOptions,
  personalizationNewQueryOptions,
} from '@/api/personalize';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import EditPersonalization from '@/components/personalization/edit/EditPersonalization';
import { PersonalizationQuestionnaire } from '@/models/personalizationQuestionnaire';

/**
 * Page that allow to edit survey unit dataset.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/personalize/$publicEnemyId',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({
    context: { queryClient },
    params: { questionnaireId, publicEnemyId },
  }) => {
    await queryClient.ensureQueryData(
      personalizationNewQueryOptions(questionnaireId),
    );
    await queryClient.ensureQueryData(
      personalizationFileQueryOptions(publicEnemyId),
    );
  },
});

function RouteComponent() {
  const { questionnaireId, publicEnemyId } = Route.useParams();
  const { data }: { data: PersonalizationQuestionnaire } = useSuspenseQuery(
    personalizationNewQueryOptions(questionnaireId),
  );
  const { data: csvData } = useSuspenseQuery(
    personalizationFileQueryOptions(publicEnemyId),
  );

  const [parsedCsv, setParsedCsv] = useState<ParseResult<unknown> | null>(null);

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
      <EditPersonalization
        data={data}
        questionnaireId={questionnaireId}
        csvData={parsedCsv}
      />
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
      <ContentHeader title={t('personalization.edit.title')} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
