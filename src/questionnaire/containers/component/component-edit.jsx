import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateComponent } from 'actions/component';
import ComponentNewEdit from 'questionnaire/components/component/component-new-edit';
import ComponentTransformerFactory from 'utils/transformation-entities/component';
import CalculatedVariableTransformerFactory from 'utils/transformation-entities/calculated-variable';
import CodesListTransformerFactory from 'utils/transformation-entities/codes-list';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

const mapStateToProps = (state, { componentId }) => {
  const componentErrors = state.appState.errorsByComponent[componentId];
  return {
    activeComponentsStore: state.appState.activeComponentsById,
    activeCodesListsStore: state.appState.activeCodeListsById,
    activeCalculatedVariablesStore: state.appState.activeCalculatedVariablesById,
    errors: componentErrors ? componentErrors.errors : [],
  };
};

const mapDispatchToProps = {
  updateComponent,
};

function ComponentEditContainer({
  updateComponent,
  componentId,
  activeComponentsStore,
  activeCodesListsStore,
  activeCalculatedVariablesStore,
  onSuccess,
  onCancel,
  errors,
}) {
  const componentType = activeComponentsStore[componentId].type;
  const componentTransformer = ComponentTransformerFactory({
    initialStore: activeComponentsStore,
    codesListsStore: activeCodesListsStore,
    calculatedVariablesStore: activeCalculatedVariablesStore,
  });
  const initialValues = componentTransformer.stateToForm({ id: componentId });
  const submit = values => {
    let updatedCalculatedVariablesStore = {};
    let updatedCodesListsStore = {};
    const updatedComponentsStore = componentTransformer.formToStore(values, componentId);

    if (componentType === QUESTION) {
      updatedCodesListsStore = componentTransformer.stateToCodesLists();
      updatedCalculatedVariablesStore = CalculatedVariableTransformerFactory().formToStore(values.calculatedVariables);
    }

    updateComponent(componentId, updatedComponentsStore, updatedCalculatedVariablesStore, updatedCodesListsStore);
    if (onSuccess) onSuccess();
  };

  const props = {
    edit: true,
    onSubmit: submit,
    onCancel: onCancel,
    errors,
  };

  return <ComponentNewEdit type={componentType} initialValues={initialValues} {...props} />;
}

ComponentEditContainer.propTypes = {
  updateComponent: PropTypes.func.isRequired,
  componentId: PropTypes.string.isRequired,
  activeComponentsStore: PropTypes.object.isRequired,
  activeCodesListsStore: PropTypes.object.isRequired,
  activeCalculatedVariablesStore: PropTypes.object.isRequired,
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
