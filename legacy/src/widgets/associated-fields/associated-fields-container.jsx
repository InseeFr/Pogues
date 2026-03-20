import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';

import { DEFAULT_FORM_NAME } from '../../constants/pogues-constants';
import { getCurrentSelectorPath } from '../../utils/widget-utils';
import AssociatedFields from './associated-fields';

// PropTypes and defaultProps

const propTypes = {
  action: PropTypes.func.isRequired,
  formName: PropTypes.string,
  selectorPathParent: PropTypes.string,
  fieldOrigin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  fieldTarget: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  targetIsRichTextarea: PropTypes.bool,
  onEnter: PropTypes.func,
};

export const defaultProps = {
  formName: DEFAULT_FORM_NAME,
  selectorPathParent: '',
  targetIsRichTextarea: false,
  onEnter: undefined,
};

// Container

const mapStateToProps = (
  state,
  { formName, selectorPathParent, fieldOrigin, fieldTarget },
) => {
  const selector = formValueSelector(formName);
  const path = getCurrentSelectorPath(selectorPathParent);
  return {
    currentValueOrigin: selector(state, `${path}${fieldOrigin.name}`),
    currentValueTarget: selector(state, `${path}${fieldTarget.name}`),
  };
};

const mapDispatchToProps = {
  change: change,
};

const AssociatedFieldsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssociatedFields);

AssociatedFieldsContainer.propTypes = propTypes;
AssociatedFieldsContainer.defaultProps = defaultProps;

export default AssociatedFieldsContainer;
