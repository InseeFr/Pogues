import { connect } from 'react-redux';

import QuestionnaireList from '../components/questionnaire-list';

import { loadQuestionnaireList } from 'actions/questionnaire-list';
import { duplicateQuestionnaire, mergeQuestions } from 'actions/questionnaire';
import { setModifiedFalse } from 'actions/app-state';

// Contanier

const mapStateToProps = state => {
  const questionnaires = Object.keys(state.questionnaireById).map(
    key => state.questionnaireById[key],
  );
  return {
    questionnaires,
    user: state.appState.user,
  };
};

const mapDispatchToProps = {
  loadQuestionnaireList,
  setModifiedFalse,
  duplicateQuestionnaire,
  mergeQuestions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionnaireList);
