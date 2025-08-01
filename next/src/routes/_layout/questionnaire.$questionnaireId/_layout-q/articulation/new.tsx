import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import CreateArticulation from '@/components/articulation/create/CreateArticulation';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';

import { mockLoopVariables } from './mock';

/**
 * Page for creating an articulation for a questionnaire.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/articulation/new',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;

  // TODO: get the list of variables when endpoint will be available,
  // it will be the variables with the scope of the loop on which the roundabout is based
  const variables = mockLoopVariables;

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
      <ContentHeader title={t('questionnaire.navigation.articulation')} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
