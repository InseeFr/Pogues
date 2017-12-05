import React from 'react';
import PropTypes from 'prop-types';

import { ComponentNewEdit, Component } from 'widgets/component-new-edit';
import { validateQuestionForm, validateSequenceForm } from 'utils/validation/validate';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

// PropTypes and defaultProps

export const propTypes = {
  parentId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

  weight: PropTypes.number.isRequired,

  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  setValidationErrors: PropTypes.func.isRequired,
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
  setValidationErrors,
  createComponent,
  updateParentChildren,
  orderComponents,
  setSelectedComponentId,
  parentId,
  weight,
  type,
}) {
  const validateQuestion = (setValidationErrorsAction, codesLists) => values =>
    validateQuestionForm(values, setValidationErrorsAction, codesLists);
  const validateSequence = setValidationErrorsAction => values =>
    validateSequenceForm(values, setValidationErrorsAction);
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
        validateQuestion(setValidationErrors, codesListsStore),
        validateSequence(setValidationErrors),
        componentTransformer,
        onSuccess
      )}
    />
  );
}

ComponentNew.propTypes = propTypes;
ComponentNew.defaultProps = defaultProps;

export default ComponentNew;
