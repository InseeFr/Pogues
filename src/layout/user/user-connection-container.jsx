import { connect } from 'react-redux';

import UserConnection from './components/user-connection';

const mapStateToProps = () => ({
  // user: getUser(state),
});

export default connect(mapStateToProps)(UserConnection);
