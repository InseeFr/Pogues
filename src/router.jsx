import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import { App } from 'layout/app';
import { PageHome } from 'layout/page-home';
import { PageSearchQuestionnaire } from 'layout/page-search-questionnaire';
import { PageQuestionnaire } from 'layout/page-questionnaire';

function RouterContainer() {
  return (
    <HashRouter>
      <App>
        <Route exact path="/" component={PageHome} />
        <Route exact path="/questionnaire/:id" component={PageQuestionnaire} />
        <Route
          exact
          path="/search/questionnaires"
          component={PageSearchQuestionnaire}
        />
        <Redirect from="*" to="/" />
      </App>
    </HashRouter>
  );
}

export default RouterContainer;
