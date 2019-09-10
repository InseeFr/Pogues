import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, actions } from 'redux-form';

import CodesListsCodes from '../components/codes-lists-codes';

// PropTypes and defaultProps

const propTypes = {
  formName: PropTypes.string.isRequired,
  inputCodePath: PropTypes.string.isRequired,
};

// Container

export const mapStateToProps = (state, { inputCodePath, formName }) => {
  const selector = formValueSelector(formName);

  return {
    currentValue: selector(state, `${inputCodePath}value`),
    currentLabel: selector(state, `${inputCodePath}label`),
  };
};

const mapDispatchToProps = {
  change: actions.change,
};

const CodesListsCodesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodesListsCodes);

CodesListsCodesContainer.propTypes = propTypes;

export default CodesListsCodesContainer;
