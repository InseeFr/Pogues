import { connect } from 'react-redux';

import QuestionnaireList from '../components/questionnaire-list';

import {
  loadQuestionnaireList,
  deleteQuestionnaireList,
} from 'actions/questionnaire-list';
import { duplicateQuestionnaire, mergeQuestions } from 'actions/questionnaire';
import { setSelectedStamp } from 'actions/general';
import { getToken, getUser } from 'reducers/selectors';

// Contanier

const mapStateToProps = state => {
  const questionnaires = Object.keys(state.questionnaireById).map(
    key => state.questionnaireById[key],
  );
  return {
    questionnaires,
    stamp: getUser(state).stamp,
    token: getToken(state),
    selectedStamp: state.general.selectedStamp,
  };
};

const mapDispatchToProps = {
  loadQuestionnaireList,
  deleteQuestionnaireList,
  duplicateQuestionnaire,
  mergeQuestions,
  setSelectedStamp,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireList);
