import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import App from '../components/app';
import { loadUnitsIfNeeded } from '../../../actions/metadata';
import { getToken } from '../../../reducers/selectors';

// Prop types and default props

const propTypes = {
  children: PropTypes.object.isRequired,
};

// Container

const mapStateToProps = state => ({
  token: getToken(state),
});

const mapDispatchToProps = {
  loadUnitsIfNeeded,
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

AppContainer.propTypes = propTypes;

export default AppContainer;
