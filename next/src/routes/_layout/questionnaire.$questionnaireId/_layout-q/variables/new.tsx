import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { variablesQueryOptions } from '@/api/variables';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import CreateVariable from '@/components/variables/create/CreateVariable';

const enableVariablesPageForm = import.meta.env.VITE_ENABLE_VARIABLES_PAGE_FORM;

/**
 * Page that allow to create a new code list.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/variables/new',
)({
  beforeLoad: ({ params: { questionnaireId } }) => {
    if (!enableVariablesPageForm) {
      throw redirect({
        to: '/questionnaire/$questionnaireId/variables',
        params: { questionnaireId },
      });
    }
  },
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId },
  }) => {
    queryClient.ensureQueryData(variablesQueryOptions(questionnaireId));
    return { crumb: t('crumb.new') };
  },
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: variables } = useSuspenseQuery(
    variablesQueryOptions(questionnaireId),
  );

  const scopes = new Set<string>();
  for (const variable of variables) {
    if (variable.scope) {
      scopes.add(variable.scope);
    }
  }

  return (
    <ComponentWrapper>
      <CreateVariable questionnaireId={questionnaireId} scopes={scopes} />
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
      <ContentHeader title={t('variable.create.title')} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
