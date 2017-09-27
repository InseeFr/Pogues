import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from 'actions/user';
import { loadUnits } from 'actions/metadata';

import Header from 'layout/header/header';
import Footer from 'layout/footer/footer';

import { loadQuestionnaireList } from 'actions/questionnaire-list';
import { loadCollections } from 'actions/questionnaire';

import 'scss/pogues.scss';

const mapStateToProps = state => {
  return {
    user: state.appState.user,
  };
};

const mapDispatchToProps = {
  loadUser,
  loadUnits,
  loadQuestionnaireList,
  loadCollections,
};

export class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    loadUnits: PropTypes.func.isRequired,
    loadQuestionnaireList: PropTypes.func.isRequired,
    loadCollections: PropTypes.func.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      permission: PropTypes.string,
      id: PropTypes.string,
      picture: PropTypes.string,
    }),
  };

  componentWillMount() {
    this.props.loadUser();
    this.props.loadUnits();
    this.props.loadCollections();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.user.permission !== this.props.user.permission) {
      this.props.loadQuestionnaireList(nextProps.user.permission);
    }
  }

  render() {
    return (
      <div id="app">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
