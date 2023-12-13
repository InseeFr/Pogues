import React from 'react';
import PropTypes from 'prop-types';

import {
  QuestionnaireNewEdit,
  Questionnaire,
} from '../../../widgets/questionnaire-new-edit';
import { validateQuestionnaireForm } from '../../../utils/validation/validate';
import { Component as ComponentFactory } from '../../../model';
import { COMPONENT_TYPE } from '../../../constants/pogues-constants';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

// PropTypes and defaultProps

export const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  updateActiveQuestionnaire: PropTypes.func.isRequired,
  updateComponent: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  questionnaire: PropTypes.object.isRequired,
  componentsStore: PropTypes.object,
};

const defaultProps = {
  componentsStore: {},
  setErrors: () => {},
};

// Utils

function validateAndSubmit(
  updateQuestionnaire,
  updateComponent,
  validate,
  componentsStore,
  transformer,
  onSuccess,
  activeCalculatedVariablesById,
  activeExternalVariablesById,
  activeCollectedVariablesById,
  activeCodeListsById,
) {
  return function (values) {
    validate(values);

    const updatedQuestionnaire = transformer.formToState(values);
    const updatedComponentsStore = ComponentFactory(
      {
        id: updatedQuestionnaire.id,
        name: updatedQuestionnaire.name,
        label: updatedQuestionnaire.label,
        children: componentsStore[updatedQuestionnaire.id].children,
        type: QUESTIONNAIRE,
      },
      { componentsStore },
    ).getStore();

    // Updating the questionnaire store.
    updateQuestionnaire(updatedQuestionnaire);

    // Updating the questionnaire component.
    updateComponent(
      values.id,
      updatedComponentsStore,
      activeCalculatedVariablesById,
      activeExternalVariablesById,
      activeCollectedVariablesById,
      activeCodeListsById,
    );

    if (onSuccess) onSuccess(values.id);
  };
}

// Component

function QuestionnaireNew({
  updateActiveQuestionnaire,
  updateComponent,
  setErrors,
  questionnaire,
  componentsStore,
  onSuccess,
  onCancel,
  activeCalculatedVariablesById,
  activeExternalVariablesById,
  activeCollectedVariablesById,
  activeCodeListsById,
}) {
  const validate = setErrorsAction => values =>
    validateQuestionnaireForm(values, setErrorsAction);
  // Initial values

  const questionnaireTransformer = Questionnaire(questionnaire);
  const initialValues = questionnaireTransformer.stateToForm();

  // Validation and submit

  return (
    <QuestionnaireNewEdit
      onCancel={onCancel}
      initialValues={initialValues}
      onSubmit={validateAndSubmit(
        updateActiveQuestionnaire,
        updateComponent,
        validate(setErrors),
        componentsStore,
        questionnaireTransformer,
        onSuccess,
        activeCalculatedVariablesById,
        activeExternalVariablesById,
        activeCollectedVariablesById,
        activeCodeListsById,
      )}
    />
  );
}

QuestionnaireNew.propTypes = propTypes;
QuestionnaireNew.defaultProps = defaultProps;

export default QuestionnaireNew;
