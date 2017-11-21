import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ErrorsPanel from '../components/errors-panel';

// PropTypes and defaultProps

const propTypes = {
  id: PropTypes.string.isRequired,
};

// Container

const mapStateToProps = (state, { id }) => {
  return {
    errors: state.errorsByPanel[id],
  };
};

const ErrorsPanelContainer = connect(mapStateToProps)(ErrorsPanel);

ErrorsPanelContainer.propTypes = propTypes;

export default ErrorsPanelContainer;
