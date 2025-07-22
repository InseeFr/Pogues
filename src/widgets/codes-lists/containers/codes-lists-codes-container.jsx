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

export const mapStateToProps = (state, { selectorPath, formName }) => {
  const selector = formValueSelector(formName);

  return {
    isPrecision: selector(state, `${selectorPath}isPrecision`),
    precisionCodeValue: selector(state, `${selectorPath}precisionCodeValue`),
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
