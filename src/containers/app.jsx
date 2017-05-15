import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import PageHome from 'components/page-home';
import PageHelp from 'components/page-help';
import PageQuestionnaire from 'components/questionnaire/page-questionnaire';

import 'scss/pogues.scss';

const App = () => {
  return (
    <div id="app">
      <Header />
      <Switch>
        <Route exact path="/" component={PageHome} />
        <Route path="/help" component={PageHelp} />
        <Route path="/questionnaire/:id" component={PageQuestionnaire} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
