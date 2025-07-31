import { connect } from 'react-redux';

import { loadUnitsIfNeeded } from '../../actions/metadata';
import App from './app';

const AppContainer = connect(null, {
  loadUnitsIfNeeded,
})(App);

export default AppContainer;
