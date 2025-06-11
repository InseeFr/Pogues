import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { questionnaireQueryOptions } from '@/api/questionnaires';
import { variablesQueryOptions } from '@/api/variables';
import CreateCodesList from '@/components/codesLists/create/CreateCodesList';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';

/**
 * Page that allow to create a new code list.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId },
  }) => {
    queryClient.ensureQueryData(questionnaireQueryOptions(questionnaireId));
    queryClient.ensureQueryData(variablesQueryOptions(questionnaireId));
    return { crumb: t('common.new') };
  },
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const {
    data: { formulasLanguage },
  } = useSuspenseQuery(questionnaireQueryOptions(questionnaireId));
  const { data: variables } = useSuspenseQuery(
    variablesQueryOptions(questionnaireId),
  );

  return (
    <ComponentWrapper>
      <CreateCodesList
        questionnaireId={questionnaireId}
        formulasLanguage={formulasLanguage}
        variables={variables}
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
      <ContentHeader title={t('codesList.create.title')} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
