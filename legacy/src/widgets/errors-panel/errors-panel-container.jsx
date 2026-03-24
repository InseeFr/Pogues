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
  if (Object.keys(errorsValidation).length === 0) return {};

  const regex = includeSubPaths
    ? new RegExp(`^${path}(.)*$`)
    : new RegExp(`^${path}$`);

  const errors = [];
  for (const [filteredErrorPath, filteredErrors] of Object.entries(
    errorsValidation,
  )) {
    if (!regex.test(filteredErrorPath)) continue;

    for (const filteredError of filteredErrors) {
      errors.push({ path: filteredErrorPath, error: filteredError });
    }
  }

  return { errors };
};

const ErrorsPanelContainer = connect(mapStateToProps)(ErrorsPanel);

ErrorsPanelContainer.propTypes = propTypes;
ErrorsPanelContainer.defaultProps = defaultProps;

export default ErrorsPanelContainer;
