import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from 'actions/user';

import Header from 'layout/header/header';
import Footer from 'layout/footer/footer';

import 'scss/pogues.scss';

const mapDispatchToProps = {
  loadUser,
};

export class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadUser();
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

export default connect(undefined, mapDispatchToProps)(AppContainer);
