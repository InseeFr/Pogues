import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionnaireNewEdit from 'components/questionnaire/questionnaire-new-edit';
import { updateActiveQuestionnaire } from 'actions/app-state';

const mapStateToProps = state => ({
  questionnaire: state.appState.activeQuestionnaire,
});

const mapDispatchToProps = {
  updateActiveQuestionnaire,
};

function QuestionnaireEditContainer({ updateActiveQuestionnaire, questionnaire, onSuccess, onCancel }) {
  const submit = values => {
    updateActiveQuestionnaire(questionnaire.id, values.name, values.label);
    if (onSuccess) onSuccess(questionnaire.id);
  };

  const initialValues = {
    initialValues: questionnaire,
  };

  return <QuestionnaireNewEdit {...initialValues} onSubmit={submit} onCancel={onCancel} />;
}

QuestionnaireEditContainer.propTypes = {
  updateActiveQuestionnaire: PropTypes.func.isRequired,
  questionnaire: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

QuestionnaireEditContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireEditContainer);
