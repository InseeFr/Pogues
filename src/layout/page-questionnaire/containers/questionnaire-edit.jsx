import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { updateActiveQuestionnaire } from 'actions/app-state';
import { updateComponent } from 'actions/component';
import { getQuestionnaireValidationErrors, getErrorsObject } from 'utils/validation/validation-utils';
import { QuestionnaireNewEdit, Questionnaire } from 'widgets/questionnaire-new-edit';
import ComponentFactory from '../components/component/model/component';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

const mapStateToProps = state => ({
  questionnaire: state.appState.activeQuestionnaire,
  componentsStore: state.appState.activeComponentsById,
});

const mapDispatchToProps = {
  updateActiveQuestionnaire,
  updateComponent,
};

function QuestionnaireEditContainer({
  updateActiveQuestionnaire,
  updateComponent,
  questionnaire,
  componentsStore,
  onSuccess,
  onCancel,
}) {
  const questionnaireTransformer = Questionnaire(questionnaire);
  const initialValues = questionnaireTransformer.stateToForm();

  const submit = values => {
    const validationErrors = getQuestionnaireValidationErrors(values);

    if (validationErrors.length > 0) throw new SubmissionError(getErrorsObject(validationErrors));

    const updatedQuestionnaire = questionnaireTransformer.formToState(values);
    const updatedComponentsStore = ComponentFactory(
      { id: questionnaire.id, type: QUESTIONNAIRE },
      { componentsStore }
    ).formToStore(values, questionnaire.id);

    // Updating the questionnaire store.
    updateActiveQuestionnaire(updatedQuestionnaire);
    // Updating the questionnaire component.
    updateComponent(questionnaire.id, updatedComponentsStore);
    if (onSuccess) onSuccess(questionnaire.id);
  };

  return <QuestionnaireNewEdit initialValues={initialValues} onSubmit={submit} onCancel={onCancel} />;
}

QuestionnaireEditContainer.propTypes = {
  componentsStore: PropTypes.object,
  updateActiveQuestionnaire: PropTypes.func.isRequired,
  questionnaire: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

QuestionnaireEditContainer.defaultProps = {
  componentsStore: {},
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireEditContainer);
