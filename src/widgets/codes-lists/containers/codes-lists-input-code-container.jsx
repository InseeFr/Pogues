import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';

import withErrorValidation from '../../../hoc/with-error-validation';
import CodesListsInputCode from '../components/codes-lists-input-code';
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

const CodesListsInputCodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorValidation(CodesListsInputCode, validateCode, validationSchema));

CodesListsInputCodeContainer.propTypes = propTypes;

export default CodesListsInputCodeContainer;
