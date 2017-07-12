import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Redirections from 'questionnaire/components/redirections/redirections';

const mapStateToProps = () => {
  const redirections = [];

  return {
    redirections,
  };
};

const mapDispatchToProps = {};

class RedirectionsContainer extends Component {
  static propTypes = {
    redirections: PropTypes.array.isRequired,
  };

  componentWillMount() {}

  render() {
    const { redirections } = this.props;
    return <Redirections redirections={redirections} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedirectionsContainer);
