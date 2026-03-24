import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { DEFAULT_FORM_NAME } from '../../../constants/pogues-constants';
import { getCurrentSelectorPath } from '../../../utils/widget-utils';
import SelectorView from '../components/selector-view';

// PropTypes and defaultProps

const propTypes = {
  label: PropTypes.string.isRequired,
  radio: PropTypes.bool,
  children: PropTypes.array,
  emptyOption: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  fieldName: PropTypes.string,
};

export const defaultProps = {
  formName: DEFAULT_FORM_NAME,
  radio: false,
  children: [],
  emptyOption: undefined,
  readOnly: false,
  required: true,
  fieldName: 'type',
};

// Container

const mapStateToProps = (state, { selectorPath, formName, fieldName }) => {
  const selector = formValueSelector(formName);
  const path = `${getCurrentSelectorPath(selectorPath)}${fieldName}`;
  return {
    activeViewValue: selector(state, path),
  };
};

const SelectorViewContainer = connect(mapStateToProps)(SelectorView);

SelectorViewContainer.propTypes = propTypes;
SelectorViewContainer.defaultProps = defaultProps;

export default SelectorViewContainer;
