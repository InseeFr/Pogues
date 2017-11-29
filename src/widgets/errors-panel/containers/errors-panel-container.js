import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ErrorsPanel from '../components/errors-panel';

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
  const errorsByFormPath = state.errors.errorsByFormPath;
  const regex = includeSubPaths ? new RegExp(`^${path}(.)*$`) : new RegExp(`^${path}$`);
  const errors = Object.keys(errorsByFormPath)
    .filter(p => regex.test(p))
    .reduce((acc, p) => {
      return [...acc, ...errorsByFormPath[p]];
    }, []);

  return { errors };
};

const ErrorsPanelContainer = connect(mapStateToProps)(ErrorsPanel);

ErrorsPanelContainer.propTypes = propTypes;
ErrorsPanelContainer.defaultProps = defaultProps;

export default ErrorsPanelContainer;
