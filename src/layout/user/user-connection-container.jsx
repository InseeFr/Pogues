import { connect } from 'react-redux';

import UserConnection from './components/user-connection';
import { getUser } from '../../reducers/selectors';

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(UserConnection);
