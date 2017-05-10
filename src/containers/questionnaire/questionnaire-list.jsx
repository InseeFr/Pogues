import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadQuestionnaireList } from 'actions/questionnaire-list';
import { loadCodeListSpecs } from 'actions/code-list-specification';
import { removeQuestionnaire } from 'actions/questionnaire';
import { toArray, buildSortByKey } from 'utils/array-utils';
import QuestionnaireList from 'components/questionnaire/questionnaire-list';

function filterQuestionnaires(questionnaires, filter) {
  return questionnaires.filter(qr => qr.label.toLowerCase().includes(filter));
}

const sortByLabel = buildSortByKey('label');

const mapStateToProps = state => ({
  questionnaires: sortByLabel(
    filterQuestionnaires(toArray(state.questionnaireList), state.appState.questionnaireListFilter.toLowerCase())
  ),
  allowRemoval: state.config.allowRemovalOfQuestionnaire,
});

const mapDispatchToProps = {
  loadQuestionnaireList,
  loadCodeListSpecs,
  removeQuestionnaire,
};

export class QuestionnaireListContainer extends Component {
  static propTypes = {
    loadQuestionnaireList: PropTypes.func.isRequired,
    loadCodeListSpecs: PropTypes.func.isRequired,
    questionnaires: PropTypes.array,
  };

  static defaultProps = {
    questionnaires: [],
  };

  componentWillMount() {
    this.props.loadQuestionnaireList();
    this.props.loadCodeListSpecs();
  }

  render() {
    const { questionnaires } = this.props;
    return <QuestionnaireList questionnaires={questionnaires} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireListContainer);
