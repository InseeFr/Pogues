import { connect } from 'react-redux';

import QuestionnaireList from '../components/questionnaire-list';

import {
  createComponent,
  orderComponents,
  updateParentChildren,
} from '../../../actions/component';
import { handleNewChildQuestionnaireRef } from '../../../actions/external-questionnaire';
import { setSelectedStamp } from '../../../actions/general';
import {
  duplicateQuestionnaire,
  mergeQuestionnaires,
} from '../../../actions/questionnaire';
import {
  deleteQuestionnaireList,
  loadQuestionnaireList,
} from '../../../actions/questionnaire-list';

// Contanier

const mapStateToProps = state => {
  const questionnaires = Object.keys(state.questionnaireListById).map(
    key => state.questionnaireListById[key],
  );
  return {
    authType: state.authType,
    activeQuestionnaire: state.appState.activeQuestionnaire,
    questionnaires,
    selectedComponentId: state.appState.selectedComponentId,
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
  mergeQuestionnaires,
  setSelectedStamp,
  createComponent,
  updateParentChildren,
  orderComponents,
  handleNewChildQuestionnaireRef,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireList);
