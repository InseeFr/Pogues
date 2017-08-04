import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionnaireNewEdit from 'home/components/questionnaire-new-edit';
import { updateActiveQuestionnaire } from 'actions/app-state';
import { updateComponent } from 'actions/component';

const mapStateToProps = state => ({
  questionnaire: state.appState.activeQuestionnaire,
  activesComponents: state.appState.activeComponentsById,
});

const mapDispatchToProps = {
  updateActiveQuestionnaire,
  updateComponent,
};

function QuestionnaireEditContainer({
  updateActiveQuestionnaire,
  updateComponent,
  questionnaire,
  activesComponents,
  onSuccess,
  onCancel,
}) {
  const submit = values => {
    updateActiveQuestionnaire(questionnaire.id, values.name, values.label);

    const activeQuestionnaire = activesComponents[questionnaire.id];
    updateComponent(
      {
        ...activeQuestionnaire,
        name: values.name,
        label: values.label,
      },
      activeQuestionnaire.id,
      activeQuestionnaire.parent,
      activeQuestionnaire.weight,
      activeQuestionnaire.type,
      activeQuestionnaire.children
    );
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
