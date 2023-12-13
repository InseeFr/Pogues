import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { secure } from './auth';
import { App } from './layout/app';
import { DuplicateVariables } from './layout/duplicate-variables';
import { PageHome } from './layout/page-home';
import { PageQuestionnaire } from './layout/page-questionnaire';
import { PageSearchQuestionnaire } from './layout/page-search-questionnaire';
import { QuestionnaireComposition } from './layout/questionnaire-composition';
import { QuestionnaireMerge } from './layout/questionnaire-merge';
import { QuestionnaireTcmComposition } from './layout/questionnaire-tcm-composition';

function Router() {
  const { pathname } = useLocation();
  return (
    <App>
      <Switch>
        <Route exact path="/" component={secure(PageHome)} />
        <Route
          exact
          path="/questionnaire/:id"
          component={secure(PageQuestionnaire)}
        />
        <Route
          exact
          path="/questionnaire/:id/composition"
          component={secure(QuestionnaireComposition)}
        />
        <Route
          exact
          path="/questionnaire/:id/tcm-composition"
          component={secure(QuestionnaireTcmComposition)}
        />
        <Route
          exact
          path="/questionnaire/:id/merge"
          component={secure(QuestionnaireMerge)}
        />
        <Route
          exact
          path="/questionnaire/:id/duplicate-variables"
          component={secure(DuplicateVariables)}
        />
        <Route
          exact
          path="/search/questionnaires"
          component={secure(PageSearchQuestionnaire)}
        />
        {!pathname.startsWith('/authentication') && <Redirect to="/" />}
      </Switch>
    </App>
  );
}

export default Router;
