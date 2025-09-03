import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { articulationVariablesQueryOptions } from '@/api/articulation';
import CreateArticulation from '@/components/articulation/create/CreateArticulation';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';

/**
 * Page for creating an articulation for a questionnaire.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/articulation/new',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(
      articulationVariablesQueryOptions(questionnaireId),
    ),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: variables } = useSuspenseQuery(
    articulationVariablesQueryOptions(questionnaireId),
  );

  return (
    <ComponentWrapper>
      <CreateArticulation
        questionnaireId={questionnaireId}
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
      <ContentHeader title={t('articulation.create.title')} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
