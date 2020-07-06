import { connect } from 'react-redux';

import GenericInput from '../components/generic-input';

import {
  saveActiveQuestionnaire,
  visualizeActiveQuestionnaire,
  handleNewPageBreak,
} from 'actions/app-state';
import {
  getNewSequencePlaceholder,
  getNewSubsequencePlaceholder,
  getNewQuestionPlaceholder,
  getNewLoopPlaceholder,
} from '../utils/generic-input-utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE, LOOP } = COMPONENT_TYPE;

// Utils

function getPlaceholders(
  componentsStore,
  selectedComponentId,
  questionnaireId,
) {
  const selectedComponent = componentsStore[selectedComponentId];

  return {
    [SEQUENCE]: getNewSequencePlaceholder(
      componentsStore,
      questionnaireId,
      selectedComponent,
    ),
    [SUBSEQUENCE]: getNewSubsequencePlaceholder(
      componentsStore,
      selectedComponent,
    ),
    [QUESTION]: getNewQuestionPlaceholder(componentsStore, selectedComponent),
    [LOOP]: getNewLoopPlaceholder(componentsStore),
  };
}

function isQuestionnaireValid(questionnaireErrors = {}) {
  return (
    Object.keys(questionnaireErrors).reduce(
      (acc, key) => acc + questionnaireErrors[key].length,
      0,
    ) === 0
  );
}

function isLoopsValid(componentsStore) {
  let loopsValid = true;
  const componentsLoop = Object.values(componentsStore).filter(
    component => component.type === LOOP,
  );
  if (componentsLoop.length > 0) {
    componentsLoop.forEach(component => {
      if (
        !componentsStore[component.initialMember] ||
        !componentsStore[component.finalMember] ||
        componentsStore[component.initialMember].weight >
          componentsStore[component.finalMember].weight ||
        (component.basedOn && !componentsStore[component.basedOn])
      ) {
        loopsValid = false;
      }
    });
  }
  return loopsValid;
}

// Container

const mapStateToProps = state => {
  const {
    activeComponentsById,
    selectedComponentId,
    activeQuestionnaire,
  } = state.appState;
  const errors = state.errors || { errorsIntegrity: {} };
  const questionnaireErrors =
    errors.errorsIntegrity[activeQuestionnaire.id] || {};

  return {
    placeholders: getPlaceholders(
      activeComponentsById,
      selectedComponentId,
      activeQuestionnaire.id,
    ),
    isQuestionnaireHaveError: state.appState.isQuestionnaireHaveError,
    isQuestionnaireModified: state.appState.isQuestionnaireModified,
    isQuestionnaireValid: isQuestionnaireValid(questionnaireErrors),
    componentIdForPageBreak: state.appState.componentIdForPageBreak,
    isLoopsValid: isLoopsValid(activeComponentsById),
  };
};

const mapDispatchToProps = {
  saveActiveQuestionnaire,
  visualizeActiveQuestionnaire,
  handleNewPageBreak,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GenericInput);
