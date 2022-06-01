import { connect } from 'react-redux';

import QuestionnaireList from '../components/questionnaire-list';

import {
  loadQuestionnaireList,
  deleteQuestionnaireList,
} from 'actions/questionnaire-list';
import { duplicateQuestionnaire, mergeQuestions } from 'actions/questionnaire';
import {
  createComponent,
  updateParentChildren,
  orderComponents,
} from 'actions/components';
import { setSelectedStamp } from 'actions/general';
import { getToken, getUser } from 'reducers/selectors';

// Contanier

const mapStateToProps = state => {
  const questionnaires = Object.keys(state.questionnaireListById).map(
    key => state.questionnaireListById[key],
  );
  return {
    activeQuestionnaire: state.appState.activeQuestionnaire,
    questionnaires,
    stamp: getUser(state).stamp,
    token: getToken(state),
    selectedStamp: state.general.selectedStamp,
    componentsStore: state.appState.activeComponentsById,
    codesListsStore: state.appState.activeCodeListsById,
    calculatedVariablesStore: state.appState.activeCalculatedVariablesById,
    externalVariablesStore: state.appState.activeExternalVariablesById,
    collectedVariablesStore: state.appState.collectedVaraiblesByQuestion,
  };
};

const mapDispatchToProps = {
  loadQuestionnaireList,
  deleteQuestionnaireList,
  duplicateQuestionnaire,
  mergeQuestions,
  setSelectedStamp,
  createComponent,
  updateParentChildren,
  orderComponents,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireList);
