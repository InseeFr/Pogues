import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import SelectorView from '../components/selector-view';

import { getCurrentSelectorPath } from '../../../utils/widget-utils';
import { DEFAULT_FORM_NAME } from '../../../constants/pogues-constants';

// PropTypes and defaultProps

const propTypes = {
  label: PropTypes.string.isRequired,
  radio: PropTypes.bool,
  children: PropTypes.array,
  emptyOption: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
};

export const defaultProps = {
  formName: DEFAULT_FORM_NAME,
  radio: false,
  children: [],
  emptyOption: undefined,
  readOnly: false,
  required: true,
};

// Container

const mapStateToProps = (state, { selectorPath, formName }) => {
  const selector = formValueSelector(formName);
  const path = `${getCurrentSelectorPath(selectorPath)}type`;
  return {
    activeViewValue: selector(state, path),
  };
};

const SelectorViewContainer = connect(mapStateToProps)(SelectorView);

SelectorViewContainer.propTypes = propTypes;
SelectorViewContainer.defaultProps = defaultProps;

export default SelectorViewContainer;
