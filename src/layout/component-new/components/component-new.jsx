import React from 'react';
import PropTypes from 'prop-types';

import { ComponentNewEdit } from '../../../widgets/component-new-edit';
import { Component } from '../../../model';
import {
  validateQuestionForm,
  validateSequenceForm,
  validateLoopForm,
  validateFilterForm,
} from '../../../utils/validation/validate';
import { COMPONENT_TYPE } from '../../../constants/pogues-constants';

const { QUESTION, LOOP, FILTER } = COMPONENT_TYPE;

// PropTypes and defaultProps

export const propTypes = {
  type: PropTypes.string.isRequired,

  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  setValidationErrors: PropTypes.func.isRequired,
  createComponent: PropTypes.func.isRequired,
  updateParentChildren: PropTypes.func.isRequired,
  orderComponents: PropTypes.func.isRequired,
  setSelectedComponentId: PropTypes.func.isRequired,
  updateComponent: PropTypes.func.isRequired,

  codesListsStore: PropTypes.object,
  calculatedVariablesStore: PropTypes.object,
  externalVariablesStore: PropTypes.object,
  activeQuestionnaire: PropTypes.object.isRequired,
};

export const defaultProps = {
  codesListsStore: {},
  calculatedVariablesStore: {},
  externalVariablesStore: {},
  activeQuestionnaire: {},
};

// Utils

function validateAndSubmit(
  actions,
  type,
  validateQuestion,
  validateSequence,
  validateLoop,
  validateFilter,
  transformer,
  onSuccess,
) {
  return function (values) {
    if (type === QUESTION) {
      validateQuestion(transformer.getNormalizedValues(values));
    } else if (type === LOOP) {
      validateLoop(values);
    } else if (type === FILTER) {
      validateFilter(values);
    } else {
      validateSequence(values);
    }
    const componentState = transformer.formToState(values);
    const updatedCodesListsStore = transformer.getCodesListStore();
    const updatedCalculatedVariablesStore =
      transformer.getCalculatedVariablesStore();
    const updatedExternalVariablesStore =
      transformer.getExternalVariablesStore();
    const updatedCollectedlVariablesStore =
      transformer.getCollectedVariablesStore();
    actions
      .createComponent(
        componentState,
        updatedCalculatedVariablesStore,
        updatedExternalVariablesStore,
        updatedCollectedlVariablesStore,
        updatedCodesListsStore,
      )
      .then(actions.updateParentChildren)
      .then(actions.orderComponents)
      .then(result => {
        const {
          payload: { id },
        } = result;
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
  activeQuestionnaire,
  removeComponent,
  updateComponent,
}) {
  const validateQuestion = (setValidationErrorsAction, codesLists) => values =>
    validateQuestionForm(values, setValidationErrorsAction, codesLists);
  const validateSequence = setValidationErrorsAction => values =>
    validateSequenceForm(values, setValidationErrorsAction);
  const validateLoop = setValidationErrorsAction => values =>
    validateLoopForm(values, setValidationErrorsAction);
  const validateFilter = setValidationErrorsAction => values =>
    validateFilterForm(values, setValidationErrorsAction);
  const actions = {
    createComponent,
    updateParentChildren,
    orderComponents,
    setSelectedComponentId,
  };

  // Initial values

  const initialState = { type, parent: parentId, weight };
  const componentTransformer = Component(
    initialState,
    {
      calculatedVariablesStore,
      externalVariablesStore,
      codesListsStore,
    },
    activeQuestionnaire,
  );
  const initialValues = componentTransformer.stateToForm(activeQuestionnaire);

  // Validation and submit
  return (
    <ComponentNewEdit
      componentType={type}
      onCancel={onCancel}
      initialValues={initialValues}
      removeComponent={removeComponent}
      updateComponent={updateComponent}
      activeQuestionnaire={activeQuestionnaire}
      onSubmit={validateAndSubmit(
        actions,
        type,
        validateQuestion(setValidationErrors, codesListsStore),
        validateSequence(setValidationErrors),
        validateLoop(setValidationErrors),
        validateFilter(setValidationErrors),
        componentTransformer,
        onSuccess,
      )}
    />
  );
}

ComponentNew.propTypes = propTypes;
ComponentNew.defaultProps = defaultProps;

export default ComponentNew;
