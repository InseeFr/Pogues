import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionnaireNewEdit from 'components/questionnaire/questionnaire-new-edit';
import { updateQuestionnaire } from 'actions/questionnaire';

const mapStateToProps = state => ({
  questionnaire: state.appState.activeQuestionnaire,
});

// @TODO: We need the service
const mapDispatchToProps = {
  updateQuestionnaire,
};

// eslint-disable-next-line no-shadow
function QuestionnaireEditContainer({ updateQuestionnaire, questionnaire, onSuccess, onCancel }) {
  const submit = values => {
    return updateQuestionnaire(questionnaire.id, values.name, values.label).then(result => {
      const { payload: { id } } = result;

      if (onSuccess) onSuccess(id);
    });
  };

  const initialValues = {
    initialValues: questionnaire,
  };

  return <QuestionnaireNewEdit {...initialValues} onSubmit={submit} onCancel={onCancel} />;
}

QuestionnaireEditContainer.propTypes = {
  updateQuestionnaire: PropTypes.func.isRequired,
  questionnaire: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

QuestionnaireEditContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireEditContainer);
