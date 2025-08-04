import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { secure } from './auth';
import { App } from './layout/app';
import { PageDuplicateVariables } from './layout/page-duplicate-variables';
import { PageHome } from './layout/page-home';
import { PageQuestionnaire } from './layout/page-questionnaire';
import { PageQuestionnaireComposition } from './layout/page-questionnaire-composition';
import { PageQuestionnaireMerge } from './layout/page-questionnaire-merge';
import { PageQuestionnaireTcmComposition } from './layout/page-questionnaire-tcm-composition';
import { PageSearchQuestionnaire } from './layout/page-search-questionnaire';

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
          component={PageQuestionnaireComposition}
        />
        <Route
          exact
          path="/questionnaire/:id/tcm-composition"
          component={PageQuestionnaireTcmComposition}
        />
        <Route
          exact
          path="/questionnaire/:id/merge"
          component={PageQuestionnaireMerge}
        />
        <Route
          exact
          path="/questionnaire/:id/duplicate-variables"
          component={PageDuplicateVariables}
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
