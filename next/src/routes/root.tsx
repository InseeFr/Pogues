import { Link, Outlet, createRootRoute } from '@tanstack/react-router';

import { RouteIndex } from './home';
import {
  RouteQuestionnaire,
  RouteQuestionnaireCompo,
  RouteQuestionnaireMerge,
  RouteQuestionnaireTcmCompo,
} from './pogues-legacy';

export const RouteRoot = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/questionnaire/m233viez" className="[&.active]:font-bold">
          Questionnaires
        </Link>
      </div>
      <hr />
      <main>
        <Outlet />
      </main>
    </>
  ),
});

export const routeTree = RouteRoot.addChildren([
  RouteIndex,
  RouteQuestionnaire,
  RouteQuestionnaireCompo,
  RouteQuestionnaireTcmCompo,
  RouteQuestionnaireMerge,
]);
