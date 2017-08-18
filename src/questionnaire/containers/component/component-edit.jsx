import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateComponent } from 'actions/component';
import ComponentNewEdit from 'questionnaire/components/component/component-new-edit';
import Component from 'utils/transformation-entities/component';

const mapStateToProps = (state, { componentId }) => {
  const componentErrors = state.appState.errorsByComponent[componentId];
  return {
    component: state.appState.activeComponentsById[componentId],
    activeCodeLists: state.appState.activeCodeListsById,
    activeCodes: state.appState.activeCodesById,
    errors: componentErrors ? componentErrors.errors : [],
  };
};

const mapDispatchToProps = {
  updateComponent,
};

function ComponentEditContainer({
  updateComponent,
  component,
  activeCodeLists,
  activeCodes,
  onSuccess,
  onCancel,
  errors,
}) {
  const { id, parent, weight, type, children } = component;
  const submit = values => {
    updateComponent(values, id, parent, weight, type, children);
    if (onSuccess) onSuccess();
  };

  const initialValues = {
    initialValues: Component.stateToForm(component, activeCodeLists, activeCodes),
  };

  const props = {
    edit: true,
    onSubmit: submit,
    onCancel: onCancel,
    errors,
  };

  return <ComponentNewEdit type={component.type} {...initialValues} {...props} />;
}

ComponentEditContainer.propTypes = {
  updateComponent: PropTypes.func.isRequired,
  component: PropTypes.object.isRequired,
  activeCodeLists: PropTypes.object.isRequired,
  activeCodes: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  errors: PropTypes.array,
};

ComponentEditContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
  errors: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentEditContainer);
