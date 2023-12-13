import activeComponentsById from './active-components-by-id';
import activeCodeListsById from './active-code-lists-by-id';
import activeCalculatedVariablesById from './active-calculated-variables-by-id';
import collectedVariableByQuestion from './collected-variable-by-question';
import activeExternalVariablesById from './active-external-variables-by-id';
import invalidItemsByActiveQuestion from './invalid-items-by-active-question';
import errorsByQuestionTab from './errors-by-question-tab';
import formUtilsReducers from './form-utils';

import {
  SET_ACTIVE_QUESTIONNAIRE,
  SET_SELECTED_COMPONENT,
  SET_EDITING_COMPONENT,
  UPDATE_ACTIVE_QUESTIONNAIRE,
  LOAD_STATISTICAL_CONTEXT_SUCCESS,
  SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS,
  SAVE_ACTIVE_QUESTIONNAIRE_FAILURE,
  START_LOADING_VISUALIZATION,
  END_LOADING_VISUALIZATION,
  DELETE_APPSTATE,
} from '../../actions/app-state';
import {
  CREATE_COMPONENT,
  DUPLICATE_COMPONENT,
  UPDATE_COMPONENT,
  REMOVE_COMPONENT,
  UPDATE_COMPONENT_PARENT,
  UPDATE_COMPONENT_ORDER,
  MOVE_COMPONENT,
} from '../../actions/component';
import {
  CREATE_QUESTIONNAIRE_REF,
  REMOVE_QUESTIONNAIRE_REF,
} from '../../actions/external-questionnaire';

const actionHandlers = {
  ...formUtilsReducers,
};

const defaultState = {
  activeQuestionnaire: {},
  activeComponentsById: {},
  activeCodeListsById: {},
  activeCodesById: {},
  activeCalculatedVariablesById: {},
  activeExternalVariablesById: {},
  collectedVariableByQuestion: {},
  errorsByCode: {},
  selectedComponentId: '',
  editingComponentId: '',
  errorsByQuestionTab: {},
  isQuestionnaireHaveError: false,
  isQuestionnaireModified: false,
  isVisualizationLoading: false,
  isVisualizationHaveError: false,
  focusedInput: '',
};

export function setActiveQuestionnaire(state, questionnaire) {
  const { components, codeLists, ...activeQuestionnaire } = questionnaire;

  return {
    ...state,
    activeQuestionnaire,
  };
}

export function updateActiveQuestionnaire(state, updatedQuestionnaire) {
  return {
    ...state,
    isQuestionnaireModified: true,
    activeQuestionnaire: {
      ...state.activeQuestionnaire,
      ...updatedQuestionnaire,
    },
  };
}

export function setSelectedComponentId(state, id) {
  return {
    ...state,
    selectedComponentId: id,
  };
}

export function setEditingComponentId(state, id) {
  return {
    ...state,
    editingComponentId: id,
  };
}

export function loadStatisticalContext(state, { serie, operation }) {
  return {
    ...state,
    activeQuestionnaire: {
      ...state.activeQuestionnaire,
      serie,
      operation,
    },
  };
}

export function setActiveExternalQuestionnaires(state, { id }) {
  const newChildQuestionnaireRef = [
    ...Object.values(state.activeQuestionnaire.childQuestionnaireRef).filter(
      extQR => extQR !== id,
    ),
    id,
  ];
  return {
    ...state,
    activeQuestionnaire: {
      ...state.activeQuestionnaire,
      childQuestionnaireRef: newChildQuestionnaireRef,
    },
  };
}

export function setRemoveExternalQuestionnaires(state, { id }) {
  const newChildQuestionnaireRef = [
    ...Object.values(state.activeQuestionnaire.childQuestionnaireRef).filter(
      extQR => extQR !== id,
    ),
  ];
  return {
    ...setSelectedComponentId(
      {
        ...state,
        activeQuestionnaire: {
          ...state.activeQuestionnaire,
          childQuestionnaireRef: newChildQuestionnaireRef,
        },
      },
      '',
    ),
  };
}

export function setQuestionNotModified(state) {
  return {
    ...state,
    isQuestionnaireModified: false,
    isQuestionnaireHaveError: false,
  };
}

export function setQuestionNotSaved(state) {
  return {
    ...state,
    isQuestionnaireHaveError: true,
  };
}

export function setQuestionModified(state) {
  return {
    ...state,
    isQuestionnaireModified: true,
  };
}

export function setQuestionModifiedFalse(state) {
  return {
    ...state,
    isQuestionnaireModified: false,
  };
}

export function startLoadingVisualization(state) {
  return {
    ...state,
    isLoadingVisualization: true,
  };
}

export function endLoadingVisualization(state) {
  return {
    ...state,
    isLoadingVisualization: false,
  };
}

export function setQuestionModifiedAndResetSelectedComponent(state) {
  return {
    ...setSelectedComponentId(
      {
        ...state,
        ...setQuestionModified(state),
      },
      '',
    ),
  };
}

export function deleteAppState() {
  return defaultState;
}

actionHandlers[SET_ACTIVE_QUESTIONNAIRE] = setActiveQuestionnaire;
actionHandlers[UPDATE_ACTIVE_QUESTIONNAIRE] = updateActiveQuestionnaire;
actionHandlers[SET_SELECTED_COMPONENT] = setSelectedComponentId;
actionHandlers[SET_EDITING_COMPONENT] = setEditingComponentId;
actionHandlers[LOAD_STATISTICAL_CONTEXT_SUCCESS] = loadStatisticalContext;
actionHandlers[SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS] = setQuestionNotModified;
actionHandlers[SAVE_ACTIVE_QUESTIONNAIRE_FAILURE] = setQuestionNotSaved;
actionHandlers[CREATE_COMPONENT] = setQuestionModified;
actionHandlers[DUPLICATE_COMPONENT] = setQuestionModified;
actionHandlers[UPDATE_COMPONENT] = setQuestionModified;
actionHandlers[REMOVE_COMPONENT] = setQuestionModifiedAndResetSelectedComponent;
actionHandlers[UPDATE_COMPONENT_PARENT] = setQuestionModified;
actionHandlers[UPDATE_COMPONENT_ORDER] = setQuestionModified;
actionHandlers[MOVE_COMPONENT] = setQuestionModified;
actionHandlers[START_LOADING_VISUALIZATION] = startLoadingVisualization;
actionHandlers[END_LOADING_VISUALIZATION] = endLoadingVisualization;
actionHandlers[DELETE_APPSTATE] = deleteAppState;
actionHandlers[CREATE_QUESTIONNAIRE_REF] = setActiveExternalQuestionnaires;
actionHandlers[REMOVE_QUESTIONNAIRE_REF] = setRemoveExternalQuestionnaires;

// @TODO: Add the combine functionality to the generic createActionHandler method
export default function (state = defaultState, action) {
  if (!action) return state;
  const { type, payload, meta } = action;
  const hndlr = actionHandlers[type];
  return {
    ...(hndlr ? hndlr(state, payload, meta) : state),
    activeComponentsById: activeComponentsById(
      state.activeComponentsById,
      action,
    ),
    activeCodeListsById: activeCodeListsById(state.activeCodeListsById, action),
    activeCalculatedVariablesById: activeCalculatedVariablesById(
      state.activeCalculatedVariablesById,
      action,
    ),
    collectedVariableByQuestion: collectedVariableByQuestion(
      state.collectedVariableByQuestion,
      action,
    ),
    activeExternalVariablesById: activeExternalVariablesById(
      state.activeExternalVariablesById,
      action,
    ),
    invalidItemsByActiveQuestion: invalidItemsByActiveQuestion(
      state.invalidItemsByActiveQuestion,
      action,
    ),
    errorsByQuestionTab: errorsByQuestionTab(state.errorsByQuestionTab, action),
  };
}
