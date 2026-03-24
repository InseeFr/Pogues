import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';

import withErrorValidation from '../../../hoc/with-error-validation';
import FilterInput from '../components/FilterInput';
import { validateCode, validationSchema } from '../utils/validation';

export const mapStateToProps = (state) => {
  const selector = formValueSelector('component');

  return {
    codeFilters: selector(state, `codeFilters`),
  };
};

const mapDispatchToProps = {
  change: change,
};

const PrecisionInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorValidation(FilterInput, validateCode, validationSchema));

export default PrecisionInputContainer;
