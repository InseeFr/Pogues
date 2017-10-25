import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import QuestionnaireNewEdit from 'home/components/questionnaire-new-edit';
import { updateActiveQuestionnaire } from 'actions/app-state';
import { updateComponent } from 'actions/component';
import QuestionnaireTransformerFactory from 'utils/transformation-entities/questionnaire';
import ComponentTranformerFactory from 'utils/transformation-entities/component';
import { getQuestionnaireValidationErrors, getErrorsObject } from 'utils/validation/validation-utils';

const mapStateToProps = state => ({
  questionnaire: state.appState.activeQuestionnaire,
  activesComponents: state.appState.activeComponentsById,
  user: state.appState.user,
});

const mapDispatchToProps = {
  updateActiveQuestionnaire,
  updateComponent,
};

function QuestionnaireEditContainer({
  user,
  updateActiveQuestionnaire,
  updateComponent,
  questionnaire,
  activesComponents,
  onSuccess,
  onCancel,
}) {
  const questionnaireTransformer = QuestionnaireTransformerFactory({
    owner: user.permission,
    initialState: questionnaire,
  });
  const componentTransformer = ComponentTranformerFactory({ initialStore: activesComponents });
  const initialValues = questionnaireTransformer.stateToForm();

  const submit = values => {
    const validationErrors = getQuestionnaireValidationErrors(values);

    if (validationErrors.length > 0) throw new SubmissionError(getErrorsObject(validationErrors));

    const updatedQuestionnaire = questionnaireTransformer.formToState(values);
    const updatedComponentsStore = componentTransformer.formToStore(values, questionnaire.id);
    // Updating the questionnaire store.
    updateActiveQuestionnaire(updatedQuestionnaire);
    // Updating the questionnaire component.
    updateComponent(questionnaire.id, updatedComponentsStore);
    if (onSuccess) onSuccess(questionnaire.id);
  };

  return <QuestionnaireNewEdit initialValues={initialValues} onSubmit={submit} onCancel={onCancel} />;
}

QuestionnaireEditContainer.propTypes = {
  activesComponents: PropTypes.object,
  user: PropTypes.object.isRequired,
  updateActiveQuestionnaire: PropTypes.func.isRequired,
  questionnaire: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

QuestionnaireEditContainer.defaultProps = {
  activesComponents: {},
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireEditContainer);
