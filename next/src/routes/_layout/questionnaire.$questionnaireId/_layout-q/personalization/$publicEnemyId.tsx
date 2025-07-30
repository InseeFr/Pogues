import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import {
  personalizationFileQueryOptions,
  personalizationFromPoguesQueryOptions,
} from '@/api/personalization';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import EditPersonalization from '@/components/personalization/form/edit/EditPersonalization';

/**
 * Page that allow to edit survey unit dataset.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/personalization/$publicEnemyId',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({
    context: { queryClient },
    params: { questionnaireId, publicEnemyId },
  }) => {
    const personalizationPromise = queryClient.ensureQueryData(
      personalizationFromPoguesQueryOptions(questionnaireId),
    );
    const filePromise = queryClient.ensureQueryData(
      personalizationFileQueryOptions(publicEnemyId),
    );
    await Promise.all([personalizationPromise, filePromise]);
  },
});

function RouteComponent() {
  const { questionnaireId, publicEnemyId } = Route.useParams();
  const { data: questionnaire } = useSuspenseQuery(
    personalizationFromPoguesQueryOptions(questionnaireId),
  );
  const { data: fileData } = useSuspenseQuery(
    personalizationFileQueryOptions(publicEnemyId),
  );

  return (
    <ComponentWrapper>
      <EditPersonalization
        data={questionnaire}
        questionnaireId={questionnaireId}
        fileData={fileData}
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
