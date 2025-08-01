import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import EditArticulation from '@/components/articulation/edit/EditArticulation';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';

import { mockArticulationItems, mockLoopVariables } from './mock';

/**
 * Page for editing the existing articulation items of a questionnaire.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/articulation/edit',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;

  // TODO: get the list of variables when endpoint will be available,
  // it will be the variables with the scope of the loop on which the roundabout is based
  const mockVariables = mockLoopVariables;

  // TODO: get articulation when endpoint will be available, then extract its items object
  const articulationItems = mockArticulationItems;

  return (
    <ComponentWrapper>
      <EditArticulation
        questionnaireId={questionnaireId}
        variables={mockVariables}
        articulationItems={articulationItems}
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
