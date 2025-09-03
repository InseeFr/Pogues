import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import {
  articulationQueryOptions,
  articulationVariablesQueryOptions,
} from '@/api/articulation';
import EditArticulation from '@/components/articulation/edit/EditArticulation';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';

/**
 * Page for editing the existing articulation items of a questionnaire.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/articulation/edit',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) => {
    await Promise.all([
      queryClient.ensureQueryData(articulationQueryOptions(questionnaireId)),
      queryClient.ensureQueryData(
        articulationVariablesQueryOptions(questionnaireId),
      ),
    ]);
  },
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: articulation } = useSuspenseQuery(
    articulationQueryOptions(questionnaireId),
  );
  const { data: variables } = useSuspenseQuery(
    articulationVariablesQueryOptions(questionnaireId),
  );

  return (
    <ComponentWrapper>
      <EditArticulation
        questionnaireId={questionnaireId}
        variables={variables}
        articulationItems={articulation.items}
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
      <ContentHeader title={t('articulation.edit.title')} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
