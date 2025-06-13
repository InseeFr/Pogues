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

const AppSecure = (props) => secure(App)(props);

function Router() {
  const { pathname } = useLocation();
  return (
    <AppSecure>
      <Switch>
        <Route exact path="/" component={PageHome} />
        <Route exact path="/questionnaire/:id" component={PageQuestionnaire} />
        <Route
          exact
          path="/questionnaire/:id/version/:versionId"
          component={PageQuestionnaire}
        />
        <Route
          exact
          path="/questionnaire/:id/composition"
          component={QuestionnaireComposition}
        />
        <Route
          exact
          path="/questionnaire/:id/tcm-composition"
          component={QuestionnaireTcmComposition}
        />
        <Route
          exact
          path="/questionnaire/:id/merge"
          component={QuestionnaireMerge}
        />
        <Route
          exact
          path="/questionnaire/:id/duplicate-variables"
          component={DuplicateVariables}
        />
        <Route
          exact
          path="/search/questionnaires"
          component={PageSearchQuestionnaire}
        />
        {!pathname.startsWith('/authentication') && <Redirect to="/" />}
      </Switch>
    </AppSecure>
  );
}

export default Router;
