import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from 'components/header/header';
import Footer from 'components/footer/footer';

import 'scss/pogues.scss';

const mapStateToProps = state => ({
  locale: state.locale,
});

class AppContainer extends Component {
  static propTypes = {
    locale: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div id="app">
        <Header locale={this.props.locale} />
        {this.props.children}
        <Footer locale={this.props.locale} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppContainer);
