import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ErrorCodes, isPoguesAPIError } from '@/api/error';
import { multimodeQueryOptions } from '@/api/multimode';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import MultimodeOverview from '@/components/multimode/MultimodeOverview';
import { MultimodeIsMovedRules } from '@/models/multimode';

/**
 * Display the current questionnaire multimode and allow to set them.
 *
 * This functionality is only available to questionnaire in CAWI
 * and (CATI or CAPI).
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/multimode/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(multimodeQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data }: { data: MultimodeIsMovedRules } = useSuspenseQuery(
    multimodeQueryOptions(questionnaireId),
  );

  return (
    <ComponentWrapper>
      <MultimodeOverview
        questionnaireId={questionnaireId}
        isMovedRules={data}
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

  return (
    <>
      <ContentHeader title={t('multimode.title')} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
