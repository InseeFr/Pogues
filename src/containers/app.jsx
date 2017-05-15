import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import PageHome from 'components/page-home';
import PageHelp from 'components/page-help';
import PageQuestionnaire from 'components/questionnaire/page-questionnaire';

import 'scss/pogues.scss';

const mapStateToProps = state => ({
  locale: state.locale,
});

const App = ({ locale }) => {
  return (
    <div id="app">
      <Header locale={locale} />
      <Switch>
        <Route exact path="/" component={PageHome} />
        <Route path="/help" component={PageHelp} />
        <Route path="/questionnaire/:id" component={PageQuestionnaire} />
        <Redirect to="/" />
      </Switch>
      <Footer locale={locale} />
    </div>
  );
};

App.propTypes = {
  locale: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(App);
