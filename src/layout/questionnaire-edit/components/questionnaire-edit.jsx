import React from 'react';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';

import { QuestionnaireNewEdit, Questionnaire } from 'widgets/questionnaire-new-edit';
import { getQuestionnaireValidationErrors, getErrorsObject } from 'utils/validation/validation-utils';
import { Component as ComponentFactory } from 'layout/page-questionnaire/components/component/model/component';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

// PropTypes and defaultProps

export const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  updateActiveQuestionnaire: PropTypes.func.isRequired,
  updateComponent: PropTypes.func.isRequired,
  questionnaire: PropTypes.object.isRequired,
  componentsStore: PropTypes.object,
};

const defaultProps = {
  componentsStore: {},
};

// Utils

function validateAndSubmit(updateQuestionnaire, updateComponent, componentsStore, transformer, onSuccess) {
  return function(values) {
    const validationErrors = getQuestionnaireValidationErrors(values);

    if (validationErrors.length > 0) throw new SubmissionError(getErrorsObject(validationErrors));

    const updatedQuestionnaire = transformer.formToState(values);
    const updatedComponentsStore = ComponentFactory(
      { id: values.id, type: QUESTIONNAIRE },
      { componentsStore }
    ).formToStore(values, values.id);

    // Updating the questionnaire store.
    updateQuestionnaire(updatedQuestionnaire);

    // Updating the questionnaire component.
    updateComponent(values.id, updatedComponentsStore);

    if (onSuccess) onSuccess(values.id);
  };
}

// Component

function QuestionnaireNew({
  updateActiveQuestionnaire,
  updateComponent,
  questionnaire,
  componentsStore,
  onSuccess,
  onCancel,
}) {
  // Initial values

  const questionnaireTransformer = Questionnaire(questionnaire);
  const initialValues = questionnaireTransformer.stateToForm();

  // Validation and submit

  return (
    <QuestionnaireNewEdit
      onCancel={onCancel}
      initialValue={initialValues}
      onSubmit={validateAndSubmit(
        updateActiveQuestionnaire,
        updateComponent,
        componentsStore,
        questionnaireTransformer,
        onSuccess
      )}
    />
  );
}

QuestionnaireNew.propTypes = propTypes;
QuestionnaireNew.defaultProps = defaultProps;

export default QuestionnaireNew;
