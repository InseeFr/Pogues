import { connect } from 'react-redux';
import { deleteAppState } from 'actions/app-state';
import { getUser } from 'reducers/selectors';
import PageHome from '../components/page-home';

const mapDispatchToProps = {
  deleteAppState,
};

const mapStateToProps = state => {
  return {
    stamp: getUser(state).stamp,
  };
};

const PageHomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageHome);

export default PageHomeContainer;
