import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { EDIT_QUESTIONNAIRE_FAILURE } from 'actions/questionnaire';
import QuestionnaireNewEdit from 'components/questionnaire/questionnaire-new-edit';

const mapStateToProps = (state, { id }) => ({
  locale: state.locale,
  questionnaire: state.questionnaireById[id],
});

// @TODO: We need the service
const mapDispatchToProps = {
  editQuestionnaire() {},
};

// eslint-disable-next-line no-shadow
function QuestionnaireEditContainer({ editQuestionnaire, locale, questionnaire, onSuccess, onCancel }) {
  const submit = values => {
    return editQuestionnaire(values.name, values.label).then(result => {
      const { type, payload: { id, validation } } = result;

      if (type === EDIT_QUESTIONNAIRE_FAILURE) throw new SubmissionError(validation);
      else if (onSuccess) onSuccess(id);
    });
  };

  const initialValues = {
    initialValues: questionnaire,
  };

  return <QuestionnaireNewEdit {...initialValues} locale={locale} onSubmit={submit} onCancel={onCancel} />;
}

QuestionnaireEditContainer.propTypes = {
  editQuestionnaire: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  questionnaire: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

QuestionnaireEditContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireEditContainer);
