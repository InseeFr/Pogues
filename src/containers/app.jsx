import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from 'components/header/header';
import Footer from 'components/footer/footer';

import 'scss/pogues.scss';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

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

export default AppContainer;
