import fetch from 'isomorphic-fetch'
import Config from '../config/config'
import { extractId, uuid } from '../utils/data-utils'
//TODO use named exports in data utils
import serializeQuestionnaire from '../utils/data-json-utils'
import questionnaireToModel from '../utils/state-to-model-questionnaire'
import questionnaireToState from '../utils/model-to-state-questionnaire'

import Logger from '../logger/logger';
var logger = new Logger('Questionnaire', 'Reducer');

import {
  getQuestionnaire, postQuestionnaire, putQuestionnaire,
  stromaePostQuestionnaire, deleteQuestionnaire
} from '../utils/remote-api'

export const EDIT_QUESTIONNAIRE = 'EDIT_QUESTIONNAIRE'

export const CREATE_QUESTIONNAIRE = 'CREATE_QUESTIONNAIRE'
export const CREATE_QUESTIONNAIRE_SUCCESS = 'CREATE_QUESTIONNAIRE_SUCCESS'
export const CREATE_QUESTIONNAIRE_FAILURE = 'CREATE_QUESTIONNAIRE_FAILURE'

export const REMOVE_QUESTIONNAIRE = 'REMOVE_QUESTIONNAIRE'
export const REMOVE_QUESTIONNAIRE_SUCCESS = 'REMOVE_QUESTIONNAIRE_SUCCESS'
export const REMOVE_QUESTIONNAIRE_FAILURE = 'REMOVE_QUESTIONNAIRE_FAILURE'
export const LOAD_QUESTIONNAIRE = 'LOAD_QUESTIONNAIRE'
export const LOAD_QUESTIONNAIRE_SUCCESS = 'LOAD_QUESTIONNAIRE_SUCCESS'
export const LOAD_QUESTIONNAIRE_FAILURE = 'LOAD_QUESTIONNAIRE_FAILURE'

export const SAVE_QUESTIONNAIRE = 'SAVE_QUESTIONNAIRE'
export const SAVE_QUESTIONNAIRE_SUCCESS = 'SAVE_QUESTIONNAIRE_SUCCESS'
export const SAVE_QUESTIONNAIRE_FAILURE = 'SAVE_QUESTIONNAIRE_FAILURE'

export const PUBLISH_QUESTIONNAIRE = 'PUBLISH_QUESTIONNAIRE'
export const PUBLISH_QUESTIONNAIRE_SUCCESS = 'PUBLISH_QUESTIONNAIRE_SUCCESS'
export const PUBLISH_QUESTIONNAIRE_FAILURE = 'PUBLISH_QUESTIONNAIRE_FAILURE'

export const editQuestionnaire = (id, label) => ({
  type: EDIT_QUESTIONNAIRE,
  payload: {
    id,
    label
  }
})

/**
 * Create a new questionnaire
 * 
 * Asynchronous, relies on Redux Thunk to be processed.
 * 
 * Create the new questionnaire locally AND remotely.
 * 
 * @param   {string}   name  questionnaire name
 * @param   {string}   label questionnaire label
 * @returns {function}       CREATE_QUESTIONNAIRE action
 */
export const createQuestionnaire = (name, label) =>
  (dispatch, getState) => {
    // We need to create an empty questionnaire in order to call the remote api,
    // but there is no information except for the id, the name and the label.
    // In order to keep the action signature simple and not pass the empty
    // questionnaire as a payload, the empty questionnaire will be created by
    // the questionnaire reducer and then retrieved via getState (every
    // dispatch is syncrhonous).
    const id = uuid()
    // Syncrhonous: will create a questionnaire in the reducer
    dispatch({
      type: CREATE_QUESTIONNAIRE,
      payload: {
        id,
        name,
        label
      }
    })
    // We can now retrieve the empty questionnaire from the reducer thanks to
    // getState, and build an object representation of the questionnaire
    // consistent with the remote API.
    const qr = questionnaireToModel(getState(), id)
    // Send it to the server, and dispatch asynchronously the relevant actions
    return postQuestionnaire(qr)
      .then(newId => dispatch(createQuestionnaireSuccess(id, newId)))
      .catch(err => dispatch(createQuestionnaireFailure(id, err.toString())))
  }

/**
 * Value success when the questionnaire has been created remotely
 * 
 * @param   {id}       id       local id for the new questionnaire
 * @param   {location} location questionnaire URI
 * @returns {object}            CREATE_QUESTIONNAIRE_SUCCESS action
 */    
export const createQuestionnaireSuccess = (id, location) => (
  {
    type: CREATE_QUESTIONNAIRE_SUCCESS,
    payload: {
      id,
      newId: extractId(location)
    }
  })

/**
 * Track when remote creation of a questionnaire failed
 * 
 * @param   {id}     id  local id for the new questionnaire
 * @param   {string} err error message 
 * @returns {object}     CREATE_QUESTIONNAIRE_FAILURE action
 */
export const createQuestionnaireFailure = (id, err) => (
  {
    type: CREATE_QUESTIONNAIRE_FAILURE,
    payload: { id, err }
  })

/**
 * Load the questionnaire if not present in the state
 * 
 * Relies on Redux Thunk
 * 
 * @param {id} id questionnaire id
 * @returns {function} thunk which may dispatch LOAD_QUESTIONNAIRE
 */
export const loadQuestionnaireIfNeeded = id =>
  (dispatch, getState) => {
    const state = getState()
    const qr = state.questionnaireById[id]
    if (!qr) dispatch(loadQuestionnaire(id))
  }

/**
 * Load the questionnaire
 * 
 * Asynchronous, relies on Redux Thunk.
 * 
 * The questionnaire returned by the server will be processed to comply with
 * the reducers requirements.
 * 
 * @param   {string} id questionnaire id
 * @returns {function}  thunk which may dispatch LOAD_QUESTIONNAIRE_SUCCESS or
 *                      LOAD_QUESTIONNAIRE_FAILURE 
 */
export const loadQuestionnaire = id =>
  dispatch => {
    dispatch({
      type: LOAD_QUESTIONNAIRE,
      payload: id
    })
    return getQuestionnaire(id)
      .then(qr => {
        dispatch(loadQuestionnaireSuccess(id, questionnaireToState(qr)))
      })
      .catch(err => {
        dispatch(loadQuestionnaireFailure(id, err.toString()))
      })
  }


/**
 * Value the questionnaire returned to update the state
 *      
 * `update` is a complex object. Entries correspond to reducers, they contain
 * an update to apply to the piece of state handled by the reducer to
 * represent locally the questionnaire.
 * 
 * @param   {string} id     questionnaire id
 * @param   {object} update update to apply to the state in order to store the
 *                          questionnaire
 * @returns {object}        LOAD_QUESTIONNAIRE_SUCCESS action
 */
export const loadQuestionnaireSuccess = (id, update) => (
  {
    type: LOAD_QUESTIONNAIRE_SUCCESS,
    payload: { id, update }
  })

/**
 * Track error when loading questionnaire failed 
 * 
 * @param   {string} id    questionnaire id
 * @param   {string} err   error message
 * @returns {object}       LOAD_QUESTIONNAIRE_FAILURE action
 */
export const loadQuestionnaireFailure = (id, err) => (
  {
    type: LOAD_QUESTIONNAIRE_FAILURE,
    payload: { id, err }
  })

/**
 * Save a questionnaire
 * 
 * Asynchronous, relies on Redux Thunk.
 * 
 * A representation of the questionnaire as a nested object will be first
 * produced base on the information contained in the store.
 * 
 * @param   {id} id questionnaire id
 * @returns {function} thunk which may dispatch SAVE_QUESTIONNAIRE_SUCCESS or
 *                     SAVE_QUESTIONNAIRE_FAILURE
 */
export const saveQuestionnaire = id =>
  (dispatch, getState) => {
    dispatch({
      type: SAVE_QUESTIONNAIRE,
      payload: id
    })
    // The questionnaire will be retrieved from the reducer thanks to
    // getState and the converter available as a second argument when creating
    // a middleware with redux-thunk. We need to build an object representation
    // of the questionnaire consistent with the remote API.
    // Before that, we need to take care of loading the codes for all the code
    // list specification used in this questionnaire and not loaded yet.
        

    const qr = questionnaireToModel(getState(), id)
    //TODO We need to retrieve the codes for all the code list specifications
    // used in this questionnaire 
    
    // We send it to the server, and dispatch asynchronously the relevant
    // actions.
    // qr.id might be different from id if it's a newly created questionnaire
    // that still has a `remoteId` property
    return  putQuestionnaire(qr._id, qr)
      .then(res => dispatch(saveQuestionnaireSuccess(id, qr)))
      .catch(err => dispatch(saveQuestionnaireFailure(id, qr, err.toString())))
  }

/**
 * Process success when saving a questionnaire
 * 
 * @param   {string} id   questionnaire id
 * @param   {object} data questionnaire as a nested object
 * @returns {object}      SAVE_QUESTIONNAIRE_SUCCESS action
 */
export const saveQuestionnaireSuccess = (id, data) => (
  {
    type: SAVE_QUESTIONNAIRE_SUCCESS,
    payload: {
      id,
      data // debugging purpose
    }
  })

/**
 * Track error when saving a questionnaire
 * 
 * @param   {string} id   questionnaire id
 * @param   {object} data questionnaire as a nested object
 * @param   {string} err  error message
 * @returns {object}      SAVE_QUESTIONNAIRE_FAILURE action
 */
export const saveQuestionnaireFailure = (id, data, err) => (
  {
    type: SAVE_QUESTIONNAIRE_FAILURE,
    payload: { id, data, err }
  })

/**
 * Publish a questionnaire
 * 
 * Asynchronous, relies on Redux Thunk.
 * 
 * A representation of the questionnaire as a nested object will be first
 * produced base on the information contained in the store.
 * 
 * @param   {id} id    questionnaire id
 * @returns {function} thunk which may dispatch PUBLISH_QUESTIONNAIRE_SUCCESS or
 *                     PUBLISH_QUESTIONNAIRE_FAILURE
 */
export const publishQuestionnaire = id =>
  (dispatch, getState) => {
    dispatch({
      type: PUBLISH_QUESTIONNAIRE,
      payload: id
    })
    // We retrieve the questionnaire from the reducer thanks to getState
    // available as a second argument when creating a middleware with
    // Redux Thunk
    const qr = questionnaireToModel(getState(), id)
    // Send it to the server, and dispatch asynchronously the relevant actions
    return stromaePostQuestionnaire(serializeQuestionnaire(qr))
      .then(url => {
        return dispatch(publishQuestionnaireSuccess(id, url, qr))
      })
      .catch(err => dispatch(
          publishQuestionnaireFailure(id, qr, err.toString())))
  }

/**
 * Process a successful publishing of a questionnaire
 * 
 * @param   {string} id   questionnaire id
 * @param   {string} url  URL for questionnaire visualization
 * @param   {object} data questionnaire as a nested object
 * @returns {object}      PUBLISH_QUESTIONNAIRE_SUCCESS action
 */
export const publishQuestionnaireSuccess = (id, url, data) => (
  {
    type: PUBLISH_QUESTIONNAIRE_SUCCESS,
    payload: {
      id,
      url,
      data
    }
  })

/**
 * Track error when publishing a questionnaire
 * 
 * @param   {string} id   questionnaire id
 * @param   {object} data questionnaire as a nested object
 * @param   {string} err  error message
 * @returns {object}      PUBLISH_QUESTIONNAIRE_FAILURE action
 */
export const publishQuestionnaireFailure = (id, data, err) => (
  {
    type: PUBLISH_QUESTIONNAIRE_FAILURE,
    payload: { id, data, err }
  })



/**
 * Remove a questionnaire
 * 
 * Asynchronous, relies on Redux Thunk.
 * 
 * @param   {string}   id questionnaire id
 * @returns {function}    thunk which may dispatch REMOVE_QUESTIONNAIRE_SUCCESS
 *                        or REMOVE_QUESTIONNAIRE_FAILURE actions
 */
export const removeQuestionnaire = id =>
  dispatch => {
    dispatch({
      type: REMOVE_QUESTIONNAIRE,
      payload: {
        id  
      }
    })
    deleteQuestionnaire(id)
      .then(() => dispatch(removeQuestionnaireSuccess(id)))
      .catch(err => dispatch(removeQuestionnaireFailure(id, err)))
  }

/**
 * Process success when removing a questionnaire
 * 
 * @param   {string} id questionnaire id
 * @returns {object}    SAVE_QUESTIONNAIRE_SUCCESS action
 */
export const removeQuestionnaireSuccess = id => ({
  type: REMOVE_QUESTIONNAIRE_SUCCESS,
  payload: id
})

/**
 * Track error when removing a questionnaire
 * 
 * @param   {string} id  questionnaire id
 * @param   {string} err error message
 * @returns {object}     SAVE_QUESTIONNAIRE_FAILURE action
 */
export const removeQuestionnaireFailure = (id, err) => ({
  type: REMOVE_QUESTIONNAIRE_FAILURE,
  payload: {
    id, err
  }
})