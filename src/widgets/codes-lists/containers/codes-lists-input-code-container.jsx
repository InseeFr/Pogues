import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';

import CodesListsInputCode from '../components/codes-lists-input-code';
import { validateCode, validationSchema } from '../utils/validation';

import withErrorValidation from '../../../hoc/with-error-validation';

// PropTypes and defaultProps

const propTypes = {
  formName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

// Container

export const mapStateToProps = (state, { path, formName }) => {
  const selector = formValueSelector(formName);

  return {
    currentValue: selector(state, `${path}value`),
    currentLabel: selector(state, `${path}label`),
    currentPrecisionid: selector(state, `${path}precisionid`),
    currentPrecisionlabel: selector(state, `${path}precisionlabel`),
    currentPrecisionsize: selector(state, `${path}precisionsize`),
  };
};

const mapDispatchToProps = {
  change: change,
};

const CodesListsInputCodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorValidation(CodesListsInputCode, validateCode, validationSchema));

CodesListsInputCodeContainer.propTypes = propTypes;

export default CodesListsInputCodeContainer;
