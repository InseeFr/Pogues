import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import App from 'layout/app/components/app';
import { loadUnitsIfNeeded } from 'actions/metadata';
// Prop types and default props

const propTypes = {
  children: PropTypes.object.isRequired,
};

// Container

const mapDispatchToProps = {
  loadUnitsIfNeeded,
};

const AppContainer = connect(
  undefined,
  mapDispatchToProps,
)(App);

AppContainer.propTypes = propTypes;

export default AppContainer;
