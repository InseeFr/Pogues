import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';

import CodesListsCodes from '../components/codes-lists-codes';

// PropTypes and defaultProps

const propTypes = {
  formName: PropTypes.string.isRequired,
  inputCodePath: PropTypes.string.isRequired,
};

// Container

export const mapStateToProps = (state, { inputCodePath, formName }) => {
  const selector = formValueSelector(formName);

  const collectedVariables =
    selector(state, `collectedVariables.collectedVariables`) || [];
  const collectedVariablesIds = new Set();
  for (const collectedVariable of collectedVariables) {
    collectedVariablesIds.add(collectedVariable.id);
  }

  return {
    collectedVariablesIds,
    currentValue: selector(state, `${inputCodePath}value`),
    currentLabel: selector(state, `${inputCodePath}label`),
    currentPrecisionid: selector(state, `${inputCodePath}precisionid`),
    currentPrecisionlabel: selector(state, `${inputCodePath}precisionlabel`),
    currentPrecisionsize: selector(state, `${inputCodePath}precisionsize`),
  };
};

const mapDispatchToProps = {
  change: change,
};

const CodesListsCodesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodesListsCodes);

CodesListsCodesContainer.propTypes = propTypes;

export default CodesListsCodesContainer;
