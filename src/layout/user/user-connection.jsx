import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadUser } from 'actions/user';
import UserConnection from './components/user-connection';

const mapStateToProps = state => ({
  user: state.appState.user,
});

const mapDispatchToProps = {
  loadUser,
};

class UserConnectionContainer extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      permission: PropTypes.string,
      id: PropTypes.string,
      picture: PropTypes.string,
    }),
    loadUser: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: {},
  };

  componentWillMount() {
    this.props.loadUser();
  }

  render() {
    const { user } = this.props;
    return <UserConnection user={user} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserConnectionContainer);
