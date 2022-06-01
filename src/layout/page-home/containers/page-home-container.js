import { connect } from 'react-redux';

import PageHome from '../components/page-home';

import { deleteAppState } from 'actions/app-state';

const mapDispatchToProps = {
  deleteAppState,
};

const PageHomeContainer = connect(null, mapDispatchToProps)(PageHome);

export default PageHomeContainer;
