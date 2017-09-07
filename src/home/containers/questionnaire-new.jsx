import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'redux-form';

import { createQuestionnaire, loadOperations, loadCampaigns } from 'actions/questionnaire';
import QuestionnaireNewEdit from 'home/components/questionnaire-new-edit';
import QuestionnaireTransformerFactory from 'utils/transformation-entities/questionnaire';

const mapStateToProps = state => ({
  user: state.appState.user,
  collections: state.appState.collections,
  operations: state.appState.operations,
  campaigns: state.appState.campaigns,
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
  collections,
  operations,
  campaigns,
  loadOperations,
  loadCampaigns,
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
      collections={collections}
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
  loadOperations: PropTypes.func.isRequired,
  loadCampaigns: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  collections: PropTypes.arrayOf(PropTypes.object),
  operations: PropTypes.arrayOf(PropTypes.object),
  campaigns: PropTypes.arrayOf(PropTypes.object),
  change: PropTypes.func.isRequired,
};

QuestionnaireNewContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
  collections: [],
  operations: [],
  campaigns: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireNewContainer);
