import { connect } from 'react-redux';
import { deleteAppState } from '../../../actions/app-state';
import PageHome from '../components/page-home';

const mapDispatchToProps = {
  deleteAppState,
};

const PageHomeContainer = connect(null, mapDispatchToProps)(PageHome);

export default PageHomeContainer;
