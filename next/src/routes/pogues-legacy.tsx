// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Main } from '@pogues-legacy/App';
import { createRoute } from '@tanstack/react-router';
import { ErrorBoundary } from 'react-error-boundary';

import { RouteRoot } from './root';

export const RouteQuestionnaire = createRoute({
  path: '/questionnaire/$questionnaireId',
  component: RouteComponent,
  getParentRoute: () => RouteRoot,
});

export const RouteQuestionnaireCompo = createRoute({
  path: '/questionnaire/$questionnaireId/composition',
  component: RouteComponent,
  getParentRoute: () => RouteRoot,
});

export const RouteQuestionnaireTcmCompo = createRoute({
  path: '/questionnaire/$questionnaireId/tcm-composition',
  component: RouteComponent,
  getParentRoute: () => RouteRoot,
});

export const RouteQuestionnaireMerge = createRoute({
  path: '/questionnaire/$questionnaireId/merge',
  component: RouteComponent,
  getParentRoute: () => RouteRoot,
});

function RouteComponent() {
  return (
    <ErrorBoundary
      fallback={<div>Le vieux Pogues n'est pas disponible en mode dev.</div>}
    >
      <Main />
    </ErrorBoundary>
  );
}
