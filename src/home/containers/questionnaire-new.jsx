import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createQuestionnaire } from 'actions/questionnaire';
import QuestionnaireNewEdit from 'home/components/questionnaire-new-edit';

const mapDispatchToProps = {
  createQuestionnaire,
};

function QuestionnaireNewContainer({ createQuestionnaire, onSuccess, onCancel }) {
  const submit = values => {
    return createQuestionnaire(values.name, values.label).then(result => {
      const { payload: { id } } = result;
      if (onSuccess) onSuccess(id);
    });
  };

  return <QuestionnaireNewEdit onSubmit={submit} onCancel={onCancel} />;
}

QuestionnaireNewContainer.propTypes = {
  createQuestionnaire: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

QuestionnaireNewContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(undefined, mapDispatchToProps)(QuestionnaireNewContainer);
