import {
  getCampaigns,
  getOperations,
  getCollections,
  getQuestionnaire,
  postQuestionnaire,
  deleteQuestionnaire,
} from 'utils/remote-api';
import { questionnaireModelToStores } from 'utils/model/model-to-state-utils';
import QuestionnaireTransformerFactory from 'utils/transformation-entities/questionnaire';
import ComponentTransformerFactory from 'utils/transformation-entities/component';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

export const LOAD_QUESTIONNAIRE = 'LOAD_QUESTIONNAIRE';
export const LOAD_QUESTIONNAIRE_SUCCESS = 'LOAD_QUESTIONNAIRE_SUCCESS';
export const LOAD_QUESTIONNAIRE_FAILURE = 'LOAD_QUESTIONNAIRE_FAILURE';
export const CREATE_QUESTIONNAIRE = 'CREATE_QUESTIONNAIRE';
export const CREATE_QUESTIONNAIRE_SUCCESS = 'CREATE_QUESTIONNAIRE_SUCCESS';
export const CREATE_QUESTIONNAIRE_FAILURE = 'CREATE_QUESTIONNAIRE_FAILURE';
export const DELETE_QUESTIONNAIRE = 'DELETE_QUESTIONNAIRE';
export const DELETE_QUESTIONNAIRE_SUCCESS = 'DELETE_QUESTIONNAIRE_SUCCESS';
export const DELETE_QUESTIONNAIRE_FAILURE = 'DELETE_QUESTIONNAIRE_FAILURE';

export const LOAD_COLLECTIONS = 'LOAD_COLLECTIONS';
export const LOAD_COLLECTIONS_SUCCESS = 'LOAD_COLLECTIONS_SUCCESS';
export const LOAD_COLLECTIONS_FAILURE = 'LOAD_COLLECTIONS_FAILURE';

export const LOAD_OPERATIONS = 'LOAD_OPERATIONS';
export const LOAD_OPERATIONS_SUCCESS = 'LOAD_OPERATIONS_SUCCESS';
export const LOAD_OPERATIONS_FAILURE = 'LOAD_OPERATIONS_FAILURE';

export const LOAD_CAMPAIGNS = 'LOAD_CAMPAIGNS';
export const LOAD_CAMPAIGNS_SUCCESS = 'LOAD_CAMPAIGNS_SUCCESS';
export const LOAD_CAMPAIGNS_FAILURE = 'LOAD_CAMPAIGNS_FAILURE';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

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
      dispatch(loadQuestionnaireSuccess(id, questionnaireModelToStores(qr)));
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
export const createQuestionnaire = questionnaireState => dispatch => {
  dispatch({
    type: CREATE_QUESTIONNAIRE,
    payload: null,
  });
  // We need a component representing the questionnaire.
  const componentQuestionnaire = ComponentTransformerFactory().formToState(
    {
      label: questionnaireState.label,
      name: questionnaireState.name,
    },
    {
      id: questionnaireState.id,
      type: QUESTIONNAIRE,
    }
  );

  const questionnaireModel = QuestionnaireTransformerFactory({
    initialState: questionnaireState,
    componentsStore: {
      [questionnaireState.id]: componentQuestionnaire,
    },
  }).stateToModel();

  return postQuestionnaire(questionnaireModel)
    .then(() => {
      return dispatch(
        createQuestionnaireSuccess(questionnaireState.id, questionnaireModelToStores(questionnaireModel))
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

export const loadCollectionsSuccess = update => ({
  type: LOAD_COLLECTIONS_SUCCESS,
  payload: {
    update,
  },
});

export const loadCollectionsFailure = err => ({
  type: LOAD_COLLECTIONS_FAILURE,
  payload: { err },
});

export const loadCollections = () => dispatch => {
  dispatch({
    type: LOAD_COLLECTIONS,
  });
  return getCollections()
    .then(qr => {
      dispatch(loadCollectionsSuccess(qr));
    })
    .catch(err => {
      dispatch(loadCollectionsFailure(err));
    });
};

export const loadOperationsSuccess = (id, update) => ({
  type: LOAD_OPERATIONS_SUCCESS,
  payload: {
    id,
    update,
  },
});

export const loadOperationsFailure = (id, err) => ({
  type: LOAD_COLLECTIONS_FAILURE,
  payload: { id, err },
});

export const loadOperations = id => dispatch => {
  dispatch({
    type: LOAD_OPERATIONS,
    payload: id,
  });
  return getOperations(id)
    .then(qr => {
      dispatch(loadOperationsSuccess(id, qr));
    })
    .catch(err => {
      dispatch(loadOperationsFailure(id, err));
    });
};

export const loadCampaignsSuccess = (id, update) => ({
  type: LOAD_CAMPAIGNS_SUCCESS,
  payload: {
    id,
    update,
  },
});

export const loadCampaignsFailure = (id, err) => ({
  type: LOAD_CAMPAIGNS_FAILURE,
  payload: { id, err },
});

export const loadCampaigns = id => dispatch => {
  dispatch({
    type: LOAD_CAMPAIGNS,
    payload: id,
  });
  return getCampaigns(id)
    .then(qr => {
      dispatch(loadCampaignsSuccess(id, qr));
    })
    .catch(err => {
      dispatch(loadCampaignsFailure(id, err));
    });
};
