import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { createQuestionnaire, CREATE_QUESTIONNAIRE_FAILURE } from 'actions/questionnaire';
import QuestionnaireNew from 'components/questionnaire/questionnaire-new';

const mapDispatchToProps = {
  createQuestionnaire,
};

// eslint-disable-next-line no-shadow
function QuestionnaireNewContainer({ createQuestionnaire }) {
  const submit = values => {
    return createQuestionnaire(values.name, values.label).then(result => {
      const { type, payload: { validation } } = result;

      if (type === CREATE_QUESTIONNAIRE_FAILURE) throw new SubmissionError(validation);
    });
  };

  return <QuestionnaireNew onSubmit={submit} />;
}

QuestionnaireNewContainer.propTypes = {
  createQuestionnaire: PropTypes.func.isRequired,
};

export default connect(undefined, mapDispatchToProps)(QuestionnaireNewContainer);
