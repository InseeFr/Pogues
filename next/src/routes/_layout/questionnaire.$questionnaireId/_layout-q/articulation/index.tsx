import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ArticulationOverview } from '@/components/articulation/overview/ArticulationOverview';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';

import { mockArticulationItems, mockLoopVariables } from './mock';

/**
 * Main articulation page where we display the articulation items of our
 * questionnaire and allow to create or edit it.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/articulation/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;

  // TODO: get the list of variables when endpoint will be available,
  // it will be the variables with the scope of the loop on which the roundabout is based
  const variables = mockLoopVariables;

  // TODO: get articulation when endpoint will be available, then extract its items object
  const articulationItems = mockArticulationItems;

  return (
    <ComponentWrapper>
      <ArticulationOverview
        questionnaireId={questionnaireId}
        variables={variables}
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
