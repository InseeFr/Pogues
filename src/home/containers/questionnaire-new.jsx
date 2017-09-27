import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'redux-form';

import { createQuestionnaire, loadOperations, loadCampaigns } from 'actions/questionnaire';
import QuestionnaireNewEdit from 'home/components/questionnaire-new-edit';
import QuestionnaireTransformerFactory from 'utils/transformation-entities/questionnaire';

const mapStateToProps = state => ({
  user: state.appState.user,
});

const mapDispatchToProps = {
  change: actions.change,
  createQuestionnaire,
  loadOperations,
  loadCampaigns,
};

function QuestionnaireNewContainer({
  user,
  createQuestionnaire,
  onSuccess,
  onCancel,
  operations,
  campaigns,
  change,
}) {
  const questionnaireTransformer = QuestionnaireTransformerFactory({ owner: user.permission });
  const initialValues = questionnaireTransformer.stateToForm();

  const submit = values => {
    return createQuestionnaire(questionnaireTransformer.formToState(values)).then(result => {
      const { payload: { id } } = result;
      if (onSuccess) onSuccess(id);
    });
  };

  return (
    <QuestionnaireNewEdit
      initialValues={initialValues}
      operations={operations}
      campaigns={campaigns}
      onSubmit={submit}
      onCancel={onCancel}
      loadOperations={loadOperations}
      loadCampaigns={loadCampaigns}
      resetField={change}
    />
  );
}

QuestionnaireNewContainer.propTypes = {
  user: PropTypes.object.isRequired,
  createQuestionnaire: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  change: PropTypes.func.isRequired,
};

QuestionnaireNewContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireNewContainer);
