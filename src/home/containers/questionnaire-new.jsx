import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError, actions, formValueSelector } from 'redux-form';

import { createQuestionnaire } from 'actions/questionnaire';
import QuestionnaireNewEdit from 'home/components/questionnaire-new-edit';
import QuestionnaireTransformerFactory from 'utils/transformation-entities/questionnaire';
import { getQuestionnaireValidationErrors, getErrorsObject } from 'utils/validation/validation-utils';

const mapStateToProps = state => {
  const selector = formValueSelector('questionnaire-new');
  return {
    user: state.appState.user,
    currentLabel: selector(state, 'label'),
    currentName: selector(state, 'name'),
  };
};

const mapDispatchToProps = {
  createQuestionnaire,
  change: actions.change,
};

class QuestionnaireNewContainer extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    createQuestionnaire: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
    change: PropTypes.func.isRequired,
    currentLabel: PropTypes.string,
    currentName: PropTypes.string,
  };

  static defaultProps = {
    onSuccess: undefined,
    onCancel: undefined,
    currentLabel: '',
    currentName: '',
  };

  constructor(props) {
    super(props);
    this.updateName = this.updateName.bind(this);
  }

  updateName() {
    const { currentName, currentLabel } = this.props;

    if (currentName === '') {
      const name = currentLabel
        .replace(/[^a-z0-9_]/gi, '')
        .toUpperCase()
        .slice(0, 10);
      this.props.change('questionnaire-new', 'name', name);
    }
  }

  render() {
    const { user, onSuccess, onCancel } = this.props;
    const questionnaireTransformer = QuestionnaireTransformerFactory({ owner: user.permission });
    const initialValues = questionnaireTransformer.stateToForm();

    const submit = values => {
      const validationErrors = getQuestionnaireValidationErrors(values);

      if (validationErrors.length > 0) throw new SubmissionError(getErrorsObject(validationErrors));

      return this.props.createQuestionnaire(questionnaireTransformer.formToState(values)).then(result => {
        const { payload: { id } } = result;
        if (onSuccess) onSuccess(id);
      });
    };

    return (
      <QuestionnaireNewEdit
        initialValues={initialValues}
        onSubmit={submit}
        onCancel={onCancel}
        updateName={this.updateName}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireNewContainer);
