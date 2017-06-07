import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadQuestionnaireList } from 'actions/questionnaire-list';
// import { loadCodeListSpecs } from 'actions/code-list-specification';
// import { removeQuestionnaire } from 'actions/questionnaire';
import { toArray, buildSortByKey } from 'utils/array-utils';
import QuestionnaireList from 'components/questionnaire/questionnaire-list';

// @TODO: Extract from the container these methods
function filterQuestionnaires(questionnaires, filter) {
  return questionnaires.filter(qr => qr.label.toLowerCase().indexOf(filter) !== -1);
}

const sortByLabel = buildSortByKey('label');

const mapStateToProps = state => ({
  questionnaires: sortByLabel(
    filterQuestionnaires(toArray(state.questionnaireList), state.appState.questionnaireListFilter.toLowerCase())
  ),
  // allowRemoval: state.config.allowRemovalOfQuestionnaire,
});

const mapDispatchToProps = {
  loadQuestionnaireList,
  // loadCodeListSpecs,
  // removeQuestionnaire,
};

export class QuestionnaireListContainer extends Component {
  static propTypes = {
    // loadCodeListSpecs: PropTypes.func.isRequired,
    questionnaires: PropTypes.array,
    loadQuestionnaireList: PropTypes.func.isRequired,
  };

  static defaultProps = {
    questionnaires: [],
  };

  componentWillMount() {
    this.props.loadQuestionnaireList();
    // this.props.loadCodeListSpecs();
  }

  render() {
    const { questionnaires } = this.props;
    return <QuestionnaireList questionnaires={questionnaires} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireListContainer);
