import {
  getQuestionnaire,
  postQuestionnaire,
  deleteQuestionnaire,
} from 'utils/remote-api';
import { uuid } from 'utils/utils';
import Dictionary from 'utils/dictionary/dictionary';
import { questionnaireRemoteToStores } from 'model/remote-to-stores';
import * as Questionnaire from 'model/transformations/questionnaire';
import { Component } from 'widgets/component-new-edit';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

export const LOAD_QUESTIONNAIRE = 'LOAD_QUESTIONNAIRE';
export const LOAD_QUESTIONNAIRE_SUCCESS = 'LOAD_QUESTIONNAIRE_SUCCESS';
export const LOAD_QUESTIONNAIRE_FAILURE = 'LOAD_QUESTIONNAIRE_FAILURE';
export const CREATE_QUESTIONNAIRE = 'CREATE_QUESTIONNAIRE';
export const CREATE_QUESTIONNAIRE_SUCCESS = 'CREATE_QUESTIONNAIRE_SUCCESS';
export const CREATE_QUESTIONNAIRE_FAILURE = 'CREATE_QUESTIONNAIRE_FAILURE';
export const DELETE_QUESTIONNAIRE = 'DELETE_QUESTIONNAIRE';
export const DELETE_QUESTIONNAIRE_SUCCESS = 'DELETE_QUESTIONNAIRE_SUCCESS';
export const DELETE_QUESTIONNAIRE_FAILURE = 'DELETE_QUESTIONNAIRE_FAILURE';
export const DUPLICATE_QUESTIONNAIRE = 'DUPLICATE_QUESTIONNAIRE';

/**
 * Load questionnaire success
 *
 * It's executed after the remote fetch of a questionnaire.
 *
 * The parameter "update" is a complex object. Entries correspond to reducers, they contain
 * an update to apply to the piece of state handled by the reducer to represent locally the questionnaire.
 *
 * It will update the stores:
 * - questionnaireById
 * - componentById
 * - componentByQuestionnaire
 * - conditionById
 *
 * @param   {string} id     The questionnaire id.
 * @param   {object} update The new values to update in the different stores affected.
 * @return  {object}        LOAD_QUESTIONNAIRE_SUCCESS action.
 */
export const loadQuestionnaireSuccess = (id, update) => ({
  type: LOAD_QUESTIONNAIRE_SUCCESS,
  payload: {
    id,
    update,
  },
});

/**
 * Load questionnaire failure
 *
 * It's executed after the fail of a remote questionnaire's fetch.
 *
 * @param   {string} id    The questionnaire id
 * @param   {string} err   The error returned for the fetch process.
 * @return  {object}       LOAD_QUESTIONNAIRE_FAILURE action
 */
export const loadQuestionnaireFailure = (id, err) => ({
  type: LOAD_QUESTIONNAIRE_FAILURE,
  payload: { id, err },
});

/**
 * Load questionnaire
 *
 * Asyc action that fetch a questionnaire.
 *
 * @param   {string}    id  The questionnaire id.
 * @return  {function}      Thunk which may dispatch LOAD_QUESTIONNAIRE_SUCCESS or LOAD_QUESTIONNAIRE_FAILURE
 */
export const loadQuestionnaire = id => dispatch => {
  dispatch({
    type: LOAD_QUESTIONNAIRE,
    payload: id,
  });
  return getQuestionnaire(id)
    .then(qr => {
      dispatch(loadQuestionnaireSuccess(id, questionnaireRemoteToStores(qr)));
    })
    .catch(err => {
      dispatch(loadQuestionnaireFailure(id, err));
    });
};
/**
 * Load questionnaire if needed
 *
 * Load the questionnaire if it's not present in the store "questionnaireById"
 *
 * @param   {string}              id  The questionnaire id.
 * @return  {function|undefined}      Thunk which may dispatch LOAD_QUESTIONNAIRE
 */
export const loadQuestionnaireIfNeeded = id => (dispatch, getState) => {
  const state = getState();
  const questionnaire = state.questionnaireById[id];
  if (!questionnaire) dispatch(loadQuestionnaire(id));
};

/**
 * Create Questionnaire success
 *
 * It's executed after the remote creation of a questionnaire.
 *
 *  * It will update the stores:
 * - questionnaireById
 * - componentByQuestionnaire
 *
 * @param   {id}      id      The questionnaire id.
 * @param   {object}  update  The new values to update in the different stores affected.
 * @return  {object}          CREATE_QUESTIONNAIRE_SUCCESS action
 */
export const createQuestionnaireSuccess = (id, update) => ({
  type: CREATE_QUESTIONNAIRE_SUCCESS,
  payload: {
    id,
    update,
  },
});

/**
 * Create questionnaire failure
 *
 * @param   {string}  err The error returned for the creation process.
 * @return  {object}      CREATE_QUESTIONNAIRE_FAILURE action
 */
export const createQuestionnaireFailure = err => ({
  type: CREATE_QUESTIONNAIRE_FAILURE,
  payload: err,
});

/**
 * Create a questionnaire
 *
 * Asyc action that creates a questionnaire.
 *
 * @param   {string}   name  The questionnaire name.
 * @param   {string}   label The questionnaire label.
 * @return  {function}       Thunk which may dispatch CREATE_QUESTIONNAIRE_SUCCESS or CREATE_QUESTIONNAIRE_FAILURE
 */
export const createQuestionnaire = questionnaireNewState => (
  dispatch,
  getState,
) => {
  console.log('questionnaireNewState', questionnaireNewState)
  const state = getState();
  const stores = {
    componentsStore: Component({
      ...questionnaireNewState,
      type: QUESTIONNAIRE,
    }).getStore(),
    codesListsStore: {},
    calculatedVariablesStore: {},
    externalVariablesStore: {},
    collectedVariableByQuestionStore: {},
    campaignsStore: state.metadataByType.campaigns,
  };
  const questionnaireModel = Questionnaire.stateToRemote(
    questionnaireNewState,
    stores,
  );

  dispatch({
    type: CREATE_QUESTIONNAIRE,
    payload: null,
  });

  return postQuestionnaire(questionnaireModel)
    .then(() => {
      return dispatch(
        createQuestionnaireSuccess(
          questionnaireNewState.id,
          questionnaireRemoteToStores(questionnaireModel),
        ),
      );
    })
    .catch(err => {
      return dispatch(createQuestionnaireFailure(err, err.errors));
    });
};

export const removeQuestionnaireSuccess = payload => ({
  type: DELETE_QUESTIONNAIRE_SUCCESS,
  payload,
});

export const removeQuestionnaireFailure = (id, err) => ({
  type: DELETE_QUESTIONNAIRE_FAILURE,
  payload: { id, err },
});

export const removeQuestionnaire = idQuestionnaire => (dispatch, getState) => {
  dispatch({
    type: DELETE_QUESTIONNAIRE,
    payload: idQuestionnaire,
  });

  const state = getState().questionnaireById;
  console.log("state", state)
  console.log("Object.keys(state)", Object.keys(state))
  console.log("idQuestionnaire", idQuestionnaire)
  
  const testQuestionnaire = Object.keys(state).find( currentId => state[currentId].id == idQuestionnaire);

  console.log("testQuestionnaire", testQuestionnaire)

  const questionnairesList = Object.keys(state).reduce((acc, currentId) => {
    if (currentId !== idQuestionnaire) {
      return {
        ...acc,
        [currentId]: {
          ...state[currentId],
        },
      };
    }
    return acc;
  }, {});

  return deleteQuestionnaire(idQuestionnaire)
    .then(() => {
      return dispatch(removeQuestionnaireSuccess(questionnairesList));
    })
    .catch(err => {
      return dispatch(removeQuestionnaireFailure(idQuestionnaire, err));
    });
};

/**
 * Duplicate Questionnaire
 *
 */

export const duplicateQuestionnaire = idQuestionnaire => (dispatch, getState) => {

  const state = getState();
  const questionnaires = getState().questionnaireById;

  const model = {
    ...questionnaires[idQuestionnaire],
    id : uuid(),
  };
  model.name = `${model.name}-${Dictionary.copy}`;
  model.label = `${model.label} - ${Dictionary.copy}`;

  console.log("model", model)
  console.log("state", state)
  
  const codeListStore = {
    ...state.codeListByQuestionnaire[idQuestionnaire]
  };
  const calculatedVariablesStore = {
    ...state.calculatedVariableByQuestionnaire[idQuestionnaire]
  };
  const externalVariablesStore = {
    ...state.externalVariableByQuestionnaire[idQuestionnaire]
  };
  const collectedVariableByQuestionStore = {
    ...state.collectedVariableByQuestionnaire[idQuestionnaire]
  };

  const stores = {
    componentsStore: Component({
      ...model,
      type: QUESTIONNAIRE,
    }).getStore(),
    codesListsStore: codeListStore,
    calculatedVariablesStore: calculatedVariablesStore,
    externalVariablesStore: externalVariablesStore,
    collectedVariableByQuestionStore: collectedVariableByQuestionStore,
    campaignsStore: state.metadataByType.campaigns,
  };

  const questionnaireModel = Questionnaire.stateToRemote(
    model,
    stores,
  );

  dispatch({
    type: CREATE_QUESTIONNAIRE,
    payload: null,
  });

  return postQuestionnaire(questionnaireModel)
    .then(() => {
      return dispatch(
        createQuestionnaireSuccess(
          model.id,
          questionnaireRemoteToStores(questionnaireModel),
        ),
      );
    })
    .catch(err => {
      return dispatch(createQuestionnaireFailure(err, err.errors));
    });
};