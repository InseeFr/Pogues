import React from 'react';
import { Router, hashHistory, Route, IndexRoute, Redirect } from 'react-router';

import App from 'containers/app';
import PageHome from 'containers/page-home';
import PageHelp from 'containers/page-help';
import PageQuestionnaire from 'containers/page-questionnaire';

function RouterContainer() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={PageHome} />
        <Route exact path="/help" component={PageHelp} />
        <Route exact path="/questionnaire/:id" component={PageQuestionnaire} />
        <Redirect from="*" to="/" />
      </Route>
    </Router>
  );
}

export default RouterContainer;
