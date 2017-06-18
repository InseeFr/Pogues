import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadQuestionnaireList } from 'home/actions/questionnaire-list';
import QuestionnaireList from 'home/components/questionnaire-list';

const mapStateToProps = state => {
  const questionnaires = Object.keys(state.questionnaireById).map(key => state.questionnaireById[key]);
  return {
    questionnaires,
  };
};

const mapDispatchToProps = {
  loadQuestionnaireList,
};

export class QuestionnaireListContainer extends Component {
  static propTypes = {
    questionnaires: PropTypes.array.isRequired,
    loadQuestionnaireList: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadQuestionnaireList();
  }

  render() {
    const { questionnaires } = this.props;
    return <QuestionnaireList questionnaires={questionnaires} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireListContainer);
