import activeComponentsById from 'reducers/app-state/active-components-by-id';
import activeCodeListsById from 'reducers/app-state/active-code-lists-by-id';
import activeCalculatedVariablesById from 'reducers/app-state/active-calculated-variables-by-id';
import collectedVariableByQuestion from 'reducers/app-state/collected-variable-by-question';
import activeExternalVariablesById from 'reducers/app-state/active-external-variables-by-id';
import invalidItemsByActiveQuestion from 'reducers/app-state/invalid-items-by-active-question';
import errorsByQuestionTab from 'reducers/app-state/errors-by-question-tab';
import formUtilsReducers from 'reducers/app-state/form-utils';

import {
  SET_ACTIVE_QUESTIONNAIRE,
  SET_SELECTED_COMPONENT,
  SET_EDITING_COMPONENT,
  UPDATE_ACTIVE_QUESTIONNAIRE,
  LOAD_STATISTICAL_CONTEXT_SUCCESS,
  SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS,
  SAVE_ACTIVE_QUESTIONNAIRE_FAILURE,
  CREATE_PAGE_BREAK,
  REMOVE_PAGE_BREAK,
  CLEAR_MODIFICATION,
} from 'actions/app-state';
import {
  CREATE_COMPONENT,
  DUPLICATE_COMPONENT,
  UPDATE_COMPONENT,
  REMOVE_COMPONENT,
  UPDATE_COMPONENT_PARENT,
  UPDATE_COMPONENT_ORDER,
  MOVE_COMPONENT,
} from 'actions/component';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

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
  componentIdForPageBreak: '',
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

export function getComponentIdForPageBreak(id, componentsStore, state) {
  const defaultReturn = {
    ...state,
  };

  if (id && componentsStore[id]) {
    return {
      ...state,
      componentIdForPageBreak: componentsStore[id].pageBreak ? '' : id,
    };
  }

  const questionnaire = Object.keys(componentsStore).find(
    key => componentsStore[key].type === QUESTIONNAIRE,
  );

  if (
    !questionnaire ||
    !componentsStore[questionnaire].children ||
    componentsStore[questionnaire].children.length === 0
  )
    return defaultReturn;

  const lastChildId = componentsStore[questionnaire].children
    .map(key => componentsStore[key])
    .sort((c1, c2) => c1.weight < c2.weight)[0].id;

  return lastChildId
    ? getComponentIdForPageBreak(lastChildId, componentsStore, state)
    : defaultReturn;
}

export function setSelectedComponentId(state, id) {
  return {
    ...state,
    ...getComponentIdForPageBreak(id, state.activeComponentsById, {
      ...state,
      componentIdForPageBreak: '',
    }),
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

actionHandlers[CREATE_PAGE_BREAK] = setQuestionModified;
actionHandlers[REMOVE_PAGE_BREAK] = setQuestionModified;
actionHandlers[CLEAR_MODIFICATION] = setQuestionModifiedFalse;

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
