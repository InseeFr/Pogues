import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createComponent, orderComponents, updateParentChildren } from 'actions/component';
import { setSelectedComponentId } from 'actions/app-state';
import ComponentNewEdit from 'questionnaire/components/component/component-new-edit';
import ComponentTransformerFactory from 'utils/transformation-entities/component';
import CalculatedVariableTransformerFactory from 'utils/transformation-entities/calculated-variable';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

const mapStateToProps = state => ({
  calculatedVariablesStore: state.appState.activeCalculatedVariablesById,
});

const mapDispatchToProps = {
  createComponent,
  orderComponents,
  updateParentChildren,
  setSelectedComponentId,
};

function ComponentNewContainer({
  createComponent,
  orderComponents,
  updateParentChildren,
  setSelectedComponentId,
  parentId,
  weight,
  type,
  onSuccess,
  onCancel,
  calculatedVariablesStore,
}) {
  const componentTransformer = ComponentTransformerFactory({ calculatedVariablesStore });
  const initialValues = componentTransformer.stateToForm({ type });

  const submit = values => {
    let updatedCalculatedVariablesStore = {};
    let updatedCodesListsStore = {};
    const componentState = componentTransformer.formToState(values, { parent: parentId, weight, type });

    if (type === QUESTION) {
      updatedCodesListsStore = componentTransformer.stateToCodesLists();
      updatedCalculatedVariablesStore = CalculatedVariableTransformerFactory().formToStore(values.calculatedVariables);
    }

    createComponent(componentState, updatedCalculatedVariablesStore, updatedCodesListsStore)
      .then(updateParentChildren)
      .then(orderComponents)
      .then(result => {
        const { payload: { id } } = result;
        setSelectedComponentId(id);
        if (onSuccess) onSuccess(id);
      });
  };

  const props = {
    onSubmit: submit,
    onCancel: onCancel,
  };

  return <ComponentNewEdit type={type} initialValues={initialValues} {...props} />;
}

ComponentNewContainer.propTypes = {
  createComponent: PropTypes.func.isRequired,
  setSelectedComponentId: PropTypes.func.isRequired,
  weight: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  calculatedVariablesStore: PropTypes.object,
};

ComponentNewContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
  calculatedVariablesStore: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentNewContainer);
