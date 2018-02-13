import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from 'layout/header/header';
import Footer from 'layout/footer/footer';

import 'scss/pogues.scss';

import { APP } from 'constants/dom-constants';

const { COMPONENT_ID } = APP;

// Prop types and default props

const propTypes = {
  children: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadUnitsIfNeeded: PropTypes.func.isRequired
};

// Component

class App extends Component {
  static propTypes = propTypes;

  componentWillMount() {
    this.props.loadUser();
    this.props.loadUnitsIfNeeded();
  }

  render() {
    return (
      <div id={COMPONENT_ID}>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
