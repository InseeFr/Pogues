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
  type: PropTypes.string.isRequired,

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
  activeQuestionnaire: PropTypes.object.isRequired,
  selectedComponent: PropTypes.string,
};

export const defaultProps = {
  codesListsStore: {},
  calculatedVariablesStore: {},
  externalVariablesStore: {},
  activeQuestionnaire: {},
  selectedComponent: undefined,
};

// Utils

function validateAndSubmit(
  actions,
  type,
  validateQuestion,
  validateSequence,
  validateLoop,
  validateFilter,
  validateRoundabout,
  transformer,
  onSuccess,
) {
  return function (values) {
    switch (type) {
      case QUESTION:
        validateQuestion(transformer.getNormalizedValues(values));
        break;
      case LOOP:
        validateLoop(values);
        break;
      case FILTER:
        validateFilter(values);
        break;
      case ROUNDABOUT:
        validateRoundabout(values);
        break;
      default:
        validateSequence(values);
        break;
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
      .then((result) => {
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
  selectedComponent,
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
    createComponent,
    updateParentChildren,
    orderComponents,
    setSelectedComponentId,
  };

  // Initial values

  const initialState = { type, parent: parentId, weight, selectedComponent };
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
      activeQuestionnaire={activeQuestionnaire}
      onSubmit={validateAndSubmit(
        actions,
        type,
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

ComponentNew.propTypes = propTypes;
ComponentNew.defaultProps = defaultProps;

export default ComponentNew;
