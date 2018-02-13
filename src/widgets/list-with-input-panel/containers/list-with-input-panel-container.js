import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions, formValueSelector, getFormValues } from 'redux-form';

import {
  clearSubformValidationErrors,
  removeIntegrityError
} from 'actions/errors';
import ListWithInputPanel from '../components/list-with-input-panel';

// Proptypes and defaultProps

const propTypes = {
  formName: PropTypes.string.isRequired,
  selectorPath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,

  errors: PropTypes.array,

  canAddNew: PropTypes.bool,
  canRemove: PropTypes.bool,
  canDuplicate: PropTypes.bool,

  validateForm: PropTypes.func.isRequired,

  resetObject: PropTypes.object.isRequired
};

const defaultProps = {
  errors: [],
  canAddNew: true,
  canRemove: true,
  canDuplicate: true
};

// Container

const mapStateToProps = (state, { formName, selectorPath }) => {
  const selector = formValueSelector(formName);

  return {
    componentId: state.appState.editingComponentId,
    formValues: getFormValues(formName)(state),
    currentValues: selector(state, selectorPath)
  };
};

const mapDispatchToProps = {
  change: actions.change,
  arrayRemove: actions.arrayRemove,
  arrayPush: actions.arrayPush,
  arrayInsert: actions.arrayInsert,
  clearSubformValidationErrors,
  removeIntegrityError
};

const ListWithInputPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListWithInputPanel);

ListWithInputPanelContainer.propTypes = propTypes;
ListWithInputPanelContainer.defaultProps = defaultProps;

export default ListWithInputPanelContainer;
