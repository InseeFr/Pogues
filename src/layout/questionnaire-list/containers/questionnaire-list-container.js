import { connect } from 'react-redux';

import QuestionnaireList from '../components/questionnaire-list';

import { loadQuestionnaireList } from 'actions/questionnaire-list';

// Contanier

const mapStateToProps = state => {
  const questionnaires = Object.keys(state.questionnaireById).map(key => state.questionnaireById[key]);
  return {
    questionnaires,
    user: state.appState.user,
  };
};

const mapDispatchToProps = {
  loadQuestionnaireList,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireList);
