import {
  putQuestionnaire,
  getContextFromCampaign,
  visualizeSpec,
  visualizePdf,
  visualizeHtml,
  visualizeDDI
} from 'utils/remote-api';
import { questionnaireRemoteToStores } from 'model/remote-to-stores';
import * as Questionnaire from 'model/transformations/questionnaire';

export const SET_ACTIVE_QUESTIONNAIRE = 'SET_ACTIVE_QUESTIONNAIRE';
export const SET_ACTIVE_COMPONENTS = 'SET_ACTIVE_COMPONENTS';
export const SET_ACTIVE_CODE_LISTS = 'SET_ACTIVE_CODE_LISTS';
export const SET_SELECTED_COMPONENT = 'SET_SELECTED_COMPONENT';
export const SET_EDITING_COMPONENT = 'SET_EDITING_COMPONENT';
export const SAVE_ACTIVE_QUESTIONNAIRE = 'SAVE_ACTIVE_QUESTIONNAIRE';
export const SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS =
  'SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS';
export const SAVE_ACTIVE_QUESTIONNAIRE_FAILURE =
  'SAVE_ACTIVE_QUESTIONNAIRE_FAILURE';
export const UPDATE_ACTIVE_QUESTIONNAIRE = 'UPDATE_ACTIVE_QUESTIONNAIRE';
export const SET_ACTIVE_DECLARATIONS = 'SET_ACTIVE_DECLARATIONS';
export const SET_INVALID_ITEMS = 'SET_INVALID_ITEMS';
export const REMOVE_INVALID_ITEM = 'REMOVE_INVALID_ITEM';
export const SET_TAB_ERRORS = 'SET_TAB_ERRORS';
export const CLEAR_TAB_ERRORS = 'CLEAR_TAB_ERRORS';
export const SET_ACTIVE_VARIABLES = 'SET_ACTIVE_VARIABLES';
export const LOAD_STATISTICAL_CONTEXT = 'LOAD_STATISTICAL_CONTEXT';
export const LOAD_STATISTICAL_CONTEXT_SUCCESS =
  'LOAD_STATISTICAL_CONTEXT_SUCCESS';
export const LOAD_STATISTICAL_CONTEXT_FAILURE =
  'LOAD_STATISTICAL_CONTEXT_FAILURE';

export const CREATE_PAGE_BREAK = 'CREATE_PAGE_BREAK';
export const REMOVE_PAGE_BREAK = 'REMOVE_PAGE_BREAK';

/**
 * Add a pagebreak to a component
 *
 * @param {*} id The component
 */
export const handleNewPageBreak = id => ({
  type: CREATE_PAGE_BREAK,
  payload: {
    id
  }
});

/**
 * Remove a pagebreak to a component
 *
 * @param {*} id The component
 */
export const handleRemovePageBreak = id => ({
  type: REMOVE_PAGE_BREAK,
  payload: {
    id
  }
});

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
  payload: questionnaire
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
  payload: activeComponents
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
    activeCodeLists
  }
});

/**
 * Set active variables
 *
 * It changes the stores "appState.activeCalculatedVariablesById", "appState.activeExternalVariablesById" and
 * "appState.collectedVariableByQuestion" with the corresponding variables passed.
 *
 * @param  {object} variables The variables stores
 *
 * @return {object} SET_ACTIVE_VARIABLES action
 */
export const setActiveVariables = variables => {
  const {
    activeCalculatedVariablesById,
    activeExternalVariablesById,
    collectedVariableByQuestion
  } = variables;
  return {
    type: SET_ACTIVE_VARIABLES,
    payload: {
      activeCalculatedVariablesById,
      activeExternalVariablesById,
      collectedVariableByQuestion
    }
  };
};

/**
 * Set active components
 *
 * It changes the store "appState.activeComponents" with the list (as object) of components passed.
 *
 * @param  {object} activeComponents  The components to set as actives
 * @return {object}                   SET_ACTIVE_COMPONENTS action
 */
export const setActiveDeclarations = activeDeclarations => ({
  type: SET_ACTIVE_DECLARATIONS,
  payload: activeDeclarations
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
  payload: id
});

/**
 * Set editing component id
 *
 * It updates the store "appState.editingComponentId"
 *
 * @param  {string} id  The component id
 * @return {object}     SET_EDITING_COMPONENT action
 */
export const setEditingComponentId = (id = '') => ({
  type: SET_EDITING_COMPONENT,
  payload: id
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
  const { name, label, serie, operation, campaigns, TargetMode } = updatedState;
  return {
    type: UPDATE_ACTIVE_QUESTIONNAIRE,
    payload: {
      name,
      label,
      serie,
      operation,
      campaigns,
      TargetMode
    }
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
 * - questionnaireById(
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
    update: {
      ...update,
      isQuestionnaireModified: false
    }
  }
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
    err
  }
});

function getQuestionnaireModel(state, customComponentsStore) {
  const stores = {
    componentsStore:
      customComponentsStore || state.appState.activeComponentsById,
    conditionsStore: {},
    codesListsStore: state.appState.activeCodeListsById,
    calculatedVariablesStore: state.appState.activeCalculatedVariablesById,
    externalVariablesStore: state.appState.activeExternalVariablesById,
    collectedVariableByQuestionStore:
      state.appState.collectedVariableByQuestion,
    campaignsStore: state.metadataByType.campaigns
  };
  const questionnaireState = {
    ...state.appState.activeQuestionnaire,
    lastUpdatedDate: new Date().toString(),
    owner: state.appState.user.permission
  };

  return Questionnaire.stateToRemote(questionnaireState, stores);
}

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
      payload: null
    });

    const state = getState();
    const questionnaireModel = getQuestionnaireModel(state);

    return putQuestionnaire(questionnaireModel.id, questionnaireModel)
      .then(() => {
        return dispatch(
          saveActiveQuestionnaireSuccess(
            questionnaireModel.id,
            questionnaireRemoteToStores(questionnaireModel, state)
          )
        );
      })
      .catch(err => {
        return dispatch(
          saveActiveQuestionnaireFailure(questionnaireModel.id, err)
        );
      });
  };
};

/**
 * This method will generate select all components from the root (the questionnaire) until the
 * selected component. To this path, we will add also all the children of the selected component.
 *
 * When selecting parent component, we will also update it children property, in order to remove
 * everything except the selected component.
 *
 * @param {*} componentId The ID of the selected component
 * @param {*} componentsById An object representing the list of active components
 */
function getPathFromComponent(componentId, componentsById) {
  function addChild(id) {
    const children = componentsById[id].children;
    if (children.length === 0) {
      return [];
    }
    return [
      ...children.map(i => componentsById[i]),
      ...children.reduce((acc, c) => {
        return [...acc, ...addChild(c)];
      }, [])
    ];
  }
  function addParent(id) {
    const parentId = componentsById[id].parent;
    if (parentId === '') {
      return [];
    }
    return [
      {
        ...componentsById[parentId],
        children: componentsById[parentId].children.filter(i => i === id)
      },
      ...addParent(parentId)
    ];
  }
  const path = [
    componentsById[componentId],
    ...addChild(componentId),
    ...addParent(componentId)
  ];

  return path.reduce((acc, c) => {
    return {
      ...acc,
      [c.id]: c
    };
  }, {});
}

/**
 * This method will reset Controls and redirections when we want to visualize a part of the questionnaire.
 * @param {*} activeComponentsById the components list on which we need to reset all controls and redirections
 */
export const removeControlsAndRedirections = activeComponentsById => {
  return Object.keys(activeComponentsById).reduce((acc, componentId) => {
    return {
      ...acc,
      [componentId]: {
        ...activeComponentsById[componentId],
        redirections: {},
        controls: {}
      }
    };
  }, {});
};

/**
 * This method will call the corresponding REST endpoint based on the type of visualization we want.
 * Also, thanks to the componentId parameter, we can generate a part of the questionnaire
 * @param {*} type the type of visualization we want
 * @param {*} componentId The ID of the selected component (optional)
 */
export const visualizeActiveQuestionnaire = (type, componentId) => {
  return (dispatch, getState) => {
    const state = getState();
    const componentsById = componentId
      ? removeControlsAndRedirections(
          getPathFromComponent(componentId, state.appState.activeComponentsById)
        )
      : state.appState.activeComponentsById;

    const questionnaireModel = getQuestionnaireModel(state, componentsById);
    if (type === 'pdf') {
      visualizePdf(questionnaireModel);
    } else if (type === 'spec') {
      visualizeSpec(questionnaireModel);
    } else if (type === 'html') {
      visualizeHtml(questionnaireModel);
    } else if (type === 'ddi') {
      visualizeDDI(questionnaireModel);
    }
  };
};

/**
 * Set the invalid items in a question using the errorsByCode store
 *
 * @param  {string} questionId  The question id.
 *
 * Example of errorsByCode
 *
 * {
 *   TARGET_NOT_FOUND: {
 *     type: 'redirections',
 *     code: 'TARGET_NOT_FOUND',
 *     dictionary: 'errorGoToNonExistingTgt',
 *     errors: [
 *     {
 *         id: key,
 *         params: {
 *           itemId: 'jqdfqdfj',
 *           targetId: 'jdf756r',
 *           message:
 *         },
 *       }
 *     ],
 *   },
 * }
 *
 * @return {function} Thunk which may dispatch SET_INVALID_ITEMS
 */
export const setInvalidItemsFromErrors = questionId => {
  return (dispatch, getState) => {
    const state = getState();
    const errorsByCode = state.appState.errorsByCode;

    const invalidItems = Object.keys(errorsByCode)
      .filter(code => errorsByCode[code].errors.length > 0)
      .reduce((acc, code) => {
        const errors = errorsByCode[code].errors;
        return {
          ...acc,
          ...errors
            .filter(e => e.id === questionId)
            .reduce((accInner, eInner) => {
              const { itemId, ...params } = eInner.params;
              return {
                ...accInner,
                [itemId]: {
                  id: itemId,
                  type: errorsByCode[code].type,
                  code,
                  ...params
                }
              };
            }, {})
        };
      }, {});

    return dispatch({
      type: SET_INVALID_ITEMS,
      payload: {
        invalidItems
      }
    });
  };
};

/**
 * Remove an invalid item from the list of invalid items
 *
 * @param  {string} invalidItemIdToRemove  The item id.
 *
 * @return {object}         REMOVE_INVALID_ITEM action
 */
export const removeInvalidItem = invalidItemIdToRemove => ({
  type: REMOVE_INVALID_ITEM,
  payload: {
    invalidItemIdToRemove
  }
});

export const setTabErrors = (errorsValidation, errorsIntegrity = {}) => ({
  type: SET_TAB_ERRORS,
  payload: {
    errorsValidation,
    errorsIntegrity
  }
});

export const clearTabErrors = () => ({
  type: CLEAR_TAB_ERRORS
});

export const loadStatisticalContextSuccess = ({ serie, operation }) => ({
  type: LOAD_STATISTICAL_CONTEXT_SUCCESS,
  payload: { serie, operation }
});

export const loadStatisticalContextFailure = err => ({
  type: LOAD_STATISTICAL_CONTEXT_FAILURE,
  payload: err
});

export const loadStatisticalContext = idCampaign => dispatch => {
  dispatch({
    type: LOAD_STATISTICAL_CONTEXT,
    payload: null
  });

  return getContextFromCampaign(idCampaign)
    .then(({ serieId: serie, operationId: operation }) => {
      return dispatch(loadStatisticalContextSuccess({ serie, operation }));
    })
    .catch(err => dispatch(loadStatisticalContextFailure(err)));
};
