import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserConnection from './components/user-connection';

const mapStateToProps = state => ({
  user: state.appState.user,
});

class UserConnectionContainer extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      permission: PropTypes.string,
      id: PropTypes.string,
      picture: PropTypes.string,
    }),
  };

  static defaultProps = {
    user: {},
  };

  render() {
    const { user } = this.props;
    return <UserConnection user={user} />;
  }
}

export default connect(mapStateToProps)(UserConnectionContainer);
