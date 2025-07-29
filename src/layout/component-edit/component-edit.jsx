import PropTypes from 'prop-types';

import { COMPONENT_TYPE } from '../../constants/pogues-constants';
import { Component } from '../../model';
import {
  validateFilterForm,
  validateLoopForm,
  validateQuestionForm,
  validateRoundaboutForm,
  validateSequenceForm,
} from '../../utils/validation/validate';
import { ComponentNewEdit } from '../../widgets/component-new-edit';

const { QUESTION, LOOP, FILTER, ROUNDABOUT } = COMPONENT_TYPE;

// PropTypes and defaultProps

export const propTypes = {
  component: PropTypes.object.isRequired,
  calculatedVariablesStore: PropTypes.object,
  externalVariablesStore: PropTypes.object,
  collectedVariablesStore: PropTypes.object,
  codesListsStore: PropTypes.object,

  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  updateComponent: PropTypes.func.isRequired,
  setValidationErrors: PropTypes.func.isRequired,
};

export const defaultProps = {
  calculatedVariablesStore: {},
  externalVariablesStore: {},
  collectedVariablesStore: {},
  codesListsStore: {},
};

// Utils

function validateAndSubmit(
  actions,
  component,
  validateQuestion,
  validateSequence,
  validateLoop,
  validateFilter,
  validateRoundabout,
  transformer,
  onSuccess,
) {
  return function (values) {
    if (component.type === QUESTION) {
      validateQuestion(transformer.getNormalizedValues(values));
    } else if (component.type === LOOP) {
      validateLoop(values);
    } else if (component.type === FILTER) {
      validateFilter(values);
    } else if (component.type === ROUNDABOUT) {
      validateRoundabout(values);
    } else {
      validateSequence(values);
    }

    const updatedComponentsStore = transformer.formToStore(
      values,
      component.id,
    );
    const updatedCodesListsStore = transformer.getCodesListStore();
    const updatedCalculatedVariablesStore =
      transformer.getCalculatedVariablesStore();
    const updatedExternalVariablesStore =
      transformer.getExternalVariablesStore();
    const updatedCollectedlVariablesStore =
      transformer.getCollectedVariablesStore();

    actions.updateComponent(
      component.id,
      updatedComponentsStore,
      updatedCalculatedVariablesStore,
      updatedExternalVariablesStore,
      updatedCollectedlVariablesStore,
      updatedCodesListsStore,
    );
    if (onSuccess) onSuccess();
  };
}

// Component

function ComponentEdit({
  component,
  calculatedVariablesStore,
  externalVariablesStore,
  collectedVariablesStore,
  codesListsStore,
  updateComponent,
  deleteComponent,
  onCancel,
  onSuccess,
  setValidationErrors,
  activeQuestionnaire,
}) {
  const validateQuestion =
    (setValidationErrorsAction, codesLists) => (values) =>
      validateQuestionForm(values, setValidationErrorsAction, codesLists);
  const validateSequence = (setValidationErrorsAction) => (values) =>
    validateSequenceForm(values, setValidationErrorsAction);
  const validateLoop = (setValidationErrorsAction) => (values) =>
    validateLoopForm(values, setValidationErrorsAction);
  const validateFilter = (setValidationErrorsAction) => (values) =>
    validateFilterForm(values, setValidationErrorsAction);
  const validateRoundabout = (setValidationErrorsAction) => (values) =>
    validateRoundaboutForm(values, setValidationErrorsAction);

  const actions = {
    updateComponent,
  };

  // Initial values
  const initialState = component;
  const componentTransformer = Component(
    initialState,
    {
      calculatedVariablesStore,
      externalVariablesStore,
      collectedVariablesStore,
      codesListsStore,
    },
    activeQuestionnaire,
  );
  const initialValues = componentTransformer.stateToForm();

  // Validation and submit
  return (
    <ComponentNewEdit
      componentType={component.type}
      componentId={component.id}
      onCancel={onCancel}
      initialValues={initialValues}
      deleteComponent={deleteComponent}
      activeQuestionnaire={activeQuestionnaire}
      onSubmit={validateAndSubmit(
        actions,
        initialState,
        validateQuestion(setValidationErrors, codesListsStore),
        validateSequence(setValidationErrors),
        validateLoop(setValidationErrors),
        validateFilter(setValidationErrors),
        validateRoundabout(setValidationErrors),
        componentTransformer,
        onSuccess,
      )}
    />
  );
}

ComponentEdit.propTypes = propTypes;
ComponentEdit.defaultProps = defaultProps;

export default ComponentEdit;
