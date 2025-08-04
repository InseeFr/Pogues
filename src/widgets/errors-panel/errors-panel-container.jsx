import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ErrorsPanel from './errors-panel';

// PropTypes and defaultProps

const propTypes = {
  path: PropTypes.string.isRequired,
  includeSubPaths: PropTypes.bool,
};

const defaultProps = {
  includeSubPaths: false,
};

// Container

const mapStateToProps = (state, { path, includeSubPaths }) => {
  const errorsValidation = {
    ...state.errors.errorsValidation,
    ...state.errors.errorsSubformValidation,
  };
  const regex = includeSubPaths
    ? new RegExp(`^${path}(.)*$`)
    : new RegExp(`^${path}$`);

  const errors = Object.keys(errorsValidation)
    .filter((p) => regex.test(p))
    .reduce((acc, p) => {
      return [...acc, ...errorsValidation[p]];
    }, []);

  return { errors };
};

const ErrorsPanelContainer = connect(mapStateToProps)(ErrorsPanel);

ErrorsPanelContainer.propTypes = propTypes;
ErrorsPanelContainer.defaultProps = defaultProps;

export default ErrorsPanelContainer;
