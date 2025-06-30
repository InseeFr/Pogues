import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { variablesQueryOptions } from '@/api/variables';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import ButtonLink from '@/components/ui/ButtonLink';
import VariablesOverview from '@/components/variables/overview/VariablesOverview';
import type { Variable } from '@/models/variables';

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/variables/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(variablesQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data }: { data: Variable[] } = useSuspenseQuery(
    variablesQueryOptions(questionnaireId),
  );

  return (
    <ComponentWrapper>
      <VariablesOverview questionnaireId={questionnaireId} variables={data} />
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
  const questionnaireId = Route.useParams().questionnaireId;

  return (
    <>
      <ContentHeader
        title={t('variables.title')}
        action={
          <ButtonLink
            to="/questionnaire/$questionnaireId/variables/new"
            params={{ questionnaireId }}
          >
            {t('variables.create')}
          </ButtonLink>
        }
      />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
