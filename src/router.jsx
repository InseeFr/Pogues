import { Route, Switch } from 'react-router-dom';

import { secure } from './auth';
import { App } from './layout/app';
import { PageDuplicateVariables } from './layout/page-duplicate-variables';
import { PageQuestionnaire } from './layout/page-questionnaire';
import { PageQuestionnaireComposition } from './layout/page-questionnaire-composition';
import { PageQuestionnaireMerge } from './layout/page-questionnaire-merge';
import { PageQuestionnaireTcmComposition } from './layout/page-questionnaire-tcm-composition';

const AppSecure = (props) => secure(App)(props);

function Router() {
  return (
    <AppSecure>
      <Switch>
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
      </Switch>
    </AppSecure>
  );
}

export default Router;
