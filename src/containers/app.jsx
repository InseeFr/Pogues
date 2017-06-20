import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from 'actions/user';

import Header from 'components/header/header';
import Footer from 'components/footer/footer';

import 'scss/pogues.scss';

const mapStateToProps = state => ({
  locale: state.locale,
});

const mapDispatchToProps = {
  loadUser,
};


class AppContainer extends Component {
  static propTypes = {
    locale: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadUser().then(user => {
      console.log('finish', user);
    });
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
