import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ErrorCodes, isPoguesAPIError } from '@/api/error';
import { multimodeFromVersionQueryOptions } from '@/api/multimode';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import MultimodeOverview from '@/components/multimode/MultimodeOverview';

/**
 * Display the multimode of the questionnaire backup.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/multimode',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId, versionId },
  }) => {
    queryClient.ensureQueryData(
      multimodeFromVersionQueryOptions(questionnaireId, versionId),
    );
    return { crumb: t('crumb.multimode') };
  },
});

function RouteComponent() {
  const { questionnaireId, versionId } = Route.useParams();
  const { data } = useSuspenseQuery(
    multimodeFromVersionQueryOptions(questionnaireId, versionId),
  );

  return (
    <ComponentWrapper>
      <MultimodeOverview
        questionnaireId={questionnaireId}
        isMovedRules={data}
        readonly
      />
    </ComponentWrapper>
  );
}

function ErrorComponent({ error }: Readonly<{ error: Error }>) {
  const { t } = useTranslation();
  let errorMessage = error.message;

  if (
    isPoguesAPIError(error) &&
    error.response?.data.errorCode ===
      ErrorCodes.QuestionnaireFormulaLanguageNotVTL
  ) {
    errorMessage = t('multimode.error.formulaNotVtl');
  }

  return (
    <ComponentWrapper>
      <div className="text-error">{errorMessage}</div>
    </ComponentWrapper>
  );
}

function ComponentWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { t } = useTranslation();
  const { questionnaireId, versionId } = Route.useParams();

  return (
    <>
      <ContentHeader
        isReadonly
        questionnaireId={questionnaireId}
        title={t('multimode.title')}
        versionId={versionId}
      />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
