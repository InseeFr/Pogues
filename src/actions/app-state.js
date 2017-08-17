import { putQuestionnaire } from 'utils/remote-api';
import { questionnaireModelToStores } from 'utils/model/model-to-state-utils';
import QuestionnaireTransformerFactory from 'utils/transformation-entities/questionnaire';

export const SET_ACTIVE_QUESTIONNAIRE = 'SET_ACTIVE_QUESTIONNAIRE';
export const SET_ACTIVE_COMPONENTS = 'SET_ACTIVE_COMPONENTS';
export const SET_ACTIVE_CODE_LISTS = 'SET_ACTIVE_CODE_LISTS';
export const SET_ACTIVE_CALCULATED_VARIABLES = 'SET_ACTIVE_CALCULATED_VARIABLES';
export const SET_SELECTED_COMPONENT = 'SET_SELECTED_COMPONENT';
export const SAVE_ACTIVE_QUESTIONNAIRE = 'SAVE_ACTIVE_QUESTIONNAIRE';
export const SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS = 'SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS';
export const SAVE_ACTIVE_QUESTIONNAIRE_FAILURE = 'SAVE_ACTIVE_QUESTIONNAIRE_FAILURE';
export const UPDATE_ACTIVE_QUESTIONNAIRE = 'UPDATE_ACTIVE_QUESTIONNAIRE';
export const SET_ACTIVE_DECLARATIONS = 'SET_ACTIVE_DECLARATIONS';

/**
 * Set active questionnaire
 *
 * It changes the store "appState.activeQuestionnaire" with the questionnaire passed.
 *
 * @param  {object} questionnaire The questionnaire to set as active
 * @return {object}               SET_ACTIVE_QUESTIONNAIRE action
 */
export const setActiveQuestionnaire = questionnaire => ({
  type: SET_ACTIVE_QUESTIONNAIRE,
  payload: questionnaire,
});

/**
 * Set active components
 *
 * It changes the store "appState.activeComponentsById" with the list (as object) of components passed.
 *
 * @param  {object} activeComponents  The components to set as actives
 * @return {object}                   SET_ACTIVE_COMPONENTS action
 */
export const setActiveComponents = activeComponents => ({
  type: SET_ACTIVE_COMPONENTS,
  payload: activeComponents,
});

/**
 * Set active code lists
 *
 * It changes the store "appState.activeCodeListById" and "appState.activeCodesById" with the list (as object)
 * of code lists and codes passed
 *
 * @param  {object} activeCodeLists   The code lists to set as actives
 * @param  {object} activeCodes       The codes to set as actives
 * @return {object}                   SET_ACTIVE_CODE_LISTS action
 */
export const setActiveCodeLists = activeCodeLists => ({
  type: SET_ACTIVE_CODE_LISTS,
  payload: {
    activeCodeLists,
  },
});

/**
 * Set active calculated variables
 *
 * It changes the store "appState.activeCalculatedVariablesById" with the list (as object)
 * of code calculated variables
 *
 * @param  {object} calculatedVariables   The calculated variables to set as actives
 * @return {object}                       SET_ACTIVE_CALCULATED_VARIABLES action
 */
export const setActiveCalculatedVariables = calculatedVariables => ({
  type: SET_ACTIVE_CALCULATED_VARIABLES,
  payload: {
    calculatedVariables,
  },
});

/*
 * Set active components
 *
 * It changes the store "appState.activeComponents" with the list (as object) of components passed.
 *
 * @param  {object} activeComponents  The components to set as actives
 * @return {object}                   SET_ACTIVE_COMPONENTS action
 */
export const setActiveDeclarations = activeDeclarations => ({
  type: SET_ACTIVE_DECLARATIONS,
  payload: activeDeclarations,
});

/**
 * Set selected component id
 *
 * It updates the store "appState.selectedComponentId"
 *
 * @param  {string} id  The component id
 * @return {object}     SET_SELECTED_COMPONENT action
 */
export const setSelectedComponentId = id => ({
  type: SET_SELECTED_COMPONENT,
  payload: id,
});

/**
 * Update active questionnaire
 *
 * It updates the store "appState.activeQuestionnaire" with the data passed.
 *
 * @param  {string} id    The questionnaire id.
 * @param  {string} name  The new questionnaire name.
 * @param  {string} label The new questionnaire label.
 * @return {object}       UPDATE_ACTIVE_QUESTIONNAIRE action
 */
export const updateActiveQuestionnaire = updatedState => {
  const { id, name, label } = updatedState;
  return {
    type: UPDATE_ACTIVE_QUESTIONNAIRE,
    payload: {
      id,
      name,
      label,
    },
  };
};

/**
 * Save active questionnaire success
 *
 * It's executed after the remote persistence of the active questionnaire and their components.
 *
 * The parameter "update" is a complex object. Entries correspond to reducers, they contain
 * an update to apply to the piece of state handled by the reducer to
 * represent locally the questionnaire.
 *
 * It will update the stores:
 * - questionnaireById
 * - componentById
 * - componentByQuestionnaire
 *
 * @param  {string} id      The questionnaire id.
 * @param  {object} update  The new values to update in the different stores affected.
 * @return {object}         SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS action
 */
export const saveActiveQuestionnaireSuccess = (id, update) => ({
  type: SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS,
  payload: {
    id,
    update,
  },
});

/**
 * Save active questionnaire failure
 *
 * It's executed after the remote persistence failure in the active questionnaire and their questionnaires.
 *
 * @param  {string} id  The questionnaire.
 * @param  {object} err The error returned for the process.
 * @return {object} SAVE_ACTIVE_QUESTIONNAIRE_FAILURE action
 */
export const saveActiveQuestionnaireFailure = (id, err) => ({
  type: SAVE_ACTIVE_QUESTIONNAIRE_FAILURE,
  payload: {
    id,
    err,
  },
});

/**
 * Save active questionnaire
 *
 * Asyc action that saves remotely a questionnaire and their components.
 *
 * @return {function} Thunk which may dispatch SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS or SAVE_ACTIVE_QUESTIONNAIRE_FAILURE
 */
export const saveActiveQuestionnaire = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SAVE_ACTIVE_QUESTIONNAIRE,
      payload: null,
    });

    const state = getState();
    const questionnaireTransformer = QuestionnaireTransformerFactory({
      owner: state.appState.user.permission,
      initialState: state.appState.activeQuestionnaire,
      componentsStore: state.appState.activeComponentsById,
      codesListsStore: state.appState.activeCodeListsById,
      conditionsStore: {},
      calculatedVariablesStore: state.appState.activeCalculatedVariablesById,
    });
    const questionnaireModel = questionnaireTransformer.stateToModel();

    return putQuestionnaire(questionnaireModel.id, questionnaireModel)
      .then(() => {
        return dispatch(
          saveActiveQuestionnaireSuccess(questionnaireModel.id, questionnaireModelToStores(questionnaireModel))
        );
      })
      .catch(err => {
        return dispatch(saveActiveQuestionnaireFailure(questionnaireModel.id, err));
      });
  };
};
