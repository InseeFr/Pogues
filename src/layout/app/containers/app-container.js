import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import App from '../components/app';
import { loadUnitsIfNeeded } from '../../../actions/metadata';

// Prop types and default props

const propTypes = {
  children: PropTypes.object.isRequired,
};

// Container

const mapStateToProps = ({ authType }) => ({
  authType,
});

const mapDispatchToProps = {
  loadUnitsIfNeeded,
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

AppContainer.propTypes = propTypes;

export default AppContainer;
