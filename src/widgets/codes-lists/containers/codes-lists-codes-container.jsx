import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, actions } from 'redux-form';

import CodesListsCodes from '../components/codes-lists-codes';
import { validateCode, validationSchema } from '../utils/validation';

import withErrorValidation from 'hoc/withErrorValidation';
import { getCurrentSelectorPath } from 'utils/widget-utils';

// PropTypes and defaultProps

const propTypes = {
  formName: PropTypes.string.isRequired,
  inputCodePath: PropTypes.string.isRequired,
};

// Container

export const mapStateToProps = (state, { inputCodePath, formName }) => {
  const selector = formValueSelector(formName);

  return {
    currentCode: selector(state, `${inputCodePath}code`),
    currentLabel: selector(state, `${inputCodePath}label`),
  };
};

const mapDispatchToProps = {
  change: actions.change,
};

const CodesListsCodesContainer = connect(mapStateToProps, mapDispatchToProps)(
  withErrorValidation(CodesListsCodes, validateCode, validationSchema)
);

CodesListsCodesContainer.propTypes = propTypes;

export default CodesListsCodesContainer;
