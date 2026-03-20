import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';

import withErrorValidation from '../../../hoc/with-error-validation';
import PrecisionInput from '../components/PrecisionInput';
import { validateCode, validationSchema } from '../utils/validation';

// PropTypes and defaultProps

const propTypes = {
  formName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

// Container

export const mapStateToProps = (state, { path, formName }) => {
  const selector = formValueSelector(formName);

  return {
    currentPrecisionid: selector(state, `${path}precisionid`),
    currentPrecisionlabel: selector(state, `${path}precisionlabel`),
    currentPrecisionsize: selector(state, `${path}precisionsize`),
  };
};

const mapDispatchToProps = {
  change: change,
};

const PrecisionInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorValidation(PrecisionInput, validateCode, validationSchema));

PrecisionInputContainer.propTypes = propTypes;

export default PrecisionInputContainer;
