import { connect } from 'react-redux';
import App from '../components/app';
import { loadUnitsIfNeeded } from '../../../actions/metadata';

const AppContainer = connect(null, {
  loadUnitsIfNeeded,
})(App);

export default AppContainer;
