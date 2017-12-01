import React from 'react';
import PropTypes from 'prop-types';

import { ComponentNewEdit, Component } from 'widgets/component-new-edit';
import { validateQuestionForm, validateSequenceForm } from 'utils/validation/validate';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

// PropTypes and defaultProps

export const propTypes = {
  parentId: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  createComponent: PropTypes.func.isRequired,
  updateParentChildren: PropTypes.func.isRequired,
  orderComponents: PropTypes.func.isRequired,
  setSelectedComponentId: PropTypes.func.isRequired,
  codesListsStore: PropTypes.object,
  calculatedVariablesStore: PropTypes.object,
  externalVariablesStore: PropTypes.object,
};

export const defaultProps = {
  codesListsStore: {},
  calculatedVariablesStore: {},
  externalVariablesStore: {},
};

// Utils

function validateAndSubmit(actions, type, validateQuestion, validateSequence, transformer, onSuccess) {
  return function(values) {
    if (type === QUESTION) {
      validateQuestion(transformer.getNormalizedValues(values));
    } else {
      validateSequence(values);
    }

    const componentState = transformer.formToState(values);
    const updatedCodesListsStore = transformer.getCodesListStore();
    const updatedCalculatedVariablesStore = transformer.getCalculatedVariablesStore();
    const updatedExternalVariablesStore = transformer.getExternalVariablesStore();
    const updatedCollectedlVariablesStore = transformer.getCollectedVariablesStore();

    actions
      .createComponent(
        componentState,
        updatedCodesListsStore,
        updatedCalculatedVariablesStore,
        updatedExternalVariablesStore,
        updatedCollectedlVariablesStore
      )
      .then(actions.updateParentChildren)
      .then(actions.orderComponents)
      .then(result => {
        const { payload: { id } } = result;
        actions.setSelectedComponentId(id);
        if (onSuccess) onSuccess(id);
      });
  };
}

// Component

function ComponentNew({
  codesListsStore,
  calculatedVariablesStore,
  externalVariablesStore,
  onCancel,
  onSuccess,
  setErrors,
  createComponent,
  updateParentChildren,
  orderComponents,
  setSelectedComponentId,
  parentId,
  weight,
  type,
}) {
  const validateQuestion = (setErrorsAction, codesLists) => values =>
    validateQuestionForm(values, setErrorsAction, codesLists);
  const validateSequence = setErrorsAction => values => validateSequenceForm(values, setErrorsAction);
  const actions = {
    createComponent,
    updateParentChildren,
    orderComponents,
    setSelectedComponentId,
  };

  // Initial values

  const initialState = { type, parent: parentId, weight };
  const componentTransformer = Component(initialState, {
    calculatedVariablesStore,
    externalVariablesStore,
    codesListsStore,
  });
  const initialValues = componentTransformer.stateToForm();

  // Validation and submit

  return (
    <ComponentNewEdit
      componentType={type}
      onCancel={onCancel}
      initialValues={initialValues}
      onSubmit={validateAndSubmit(
        actions,
        type,
        validateQuestion(setErrors, codesListsStore),
        validateSequence(setErrors),
        componentTransformer,
        onSuccess
      )}
    />
  );
}

ComponentNew.propTypes = propTypes;
ComponentNew.defaultProps = defaultProps;

export default ComponentNew;
