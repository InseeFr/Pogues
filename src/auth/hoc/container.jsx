import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = state => {
  const { authType } = state;
  return { authType };
};

export default connect(mapStateToProps)(Component);
