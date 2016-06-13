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
  stromaePostQuestionnaire
} from '../utils/remote-api'

export const EDIT_QUESTIONNAIRE = 'EDIT_QUESTIONNAIRE'

export const CREATE_QUESTIONNAIRE = 'CREATE_QUESTIONNAIRE'
export const CREATE_QUESTIONNAIRE_SUCCESS = 'CREATE_QUESTIONNAIRE_SUCCESS'
export const CREATE_QUESTIONNAIRE_FAILURE = 'CREATE_QUESTIONNAIRE_FAILURE'

export const LOAD_QUESTIONNAIRE = 'LOAD_QUESTIONNAIRE'
export const LOAD_QUESTIONNAIRE_SUCCESS = 'LOAD_QUESTIONNAIRE_SUCCESS'
export const LOAD_QUESTIONNAIRE_FAILURE = 'LOAD_QUESTIONNAIRE_FAILURE'

export const SAVE_QUESTIONNAIRE = 'SAVE_QUESTIONNAIRE'
export const SAVE_QUESTIONNAIRE_SUCCESS = 'SAVE_QUESTIONNAIRE_SUCCESS'
export const SAVE_QUESTIONNAIRE_FAILURE = 'SAVE_QUESTIONNAIRE_FAILURE'

export const PUBLISH_QUESTIONNAIRE = 'PUBLISH_QUESTIONNAIRE'
export const PUBLISH_QUESTIONNAIRE_SUCCESS = 'PUBLISH_QUESTIONNAIRE_SUCCESS'
export const PUBLISH_QUESTIONNAIRE_FAILURE = 'PUBLISH_QUESTIONNAIRE_FAILURE'

export const SET_QUESTIONNAIRE_FILTER = 'SET_QUESTIONNAIRE_FILTER'

export const editQuestionnaire = (id, label) => ({
  type: EDIT_QUESTIONNAIRE,
  payload: {
    id,
    label
  }
})
//TODO see how to test private functions which should not be exported

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
    // getState, and build an object representation of thequestionnaire
    // consistent with the remote API.
    const qr = questionnaireToModel(getState(), id)
    // Send it to the server, and dispatch asynchronously the relevant
    // actions
    return postQuestionnaire(qr)
      .then(newId => dispatch(createQuestionnaireSuccess(id, newId)))
      .catch(err => dispatch(createQuestionnaireFailure(id, err.toString())))
  }

    
export const createQuestionnaireSuccess = (id, location) => (
  {
    type: CREATE_QUESTIONNAIRE_SUCCESS,
    payload: {
      id,
      newId: extractId(location)
    }
  })

export const createQuestionnaireFailure = (id, err) => (
  {
    type: CREATE_QUESTIONNAIRE_FAILURE,
    payload: { id, err }
  })

export const loadQuestionnaireIfNeeded = id =>
  (dispatch, getState) => {
    const state = getState()
    const qr = state.questionnaireById[id]
    if (!qr) dispatch(loadQuestionnaire(id))
  }

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


// update will be apply to the reducer to add the questionnaire
export const loadQuestionnaireSuccess = (id, update) => (
  {
    type: LOAD_QUESTIONNAIRE_SUCCESS,
    payload: { id, update }
  })

export const loadQuestionnaireFailure = (id, err) => (
  {
    type: LOAD_QUESTIONNAIRE_FAILURE,
    payload: { id, err }
  })

// save the questionnaire
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

export const saveQuestionnaireSuccess = (id, data) => (
  {
    type: SAVE_QUESTIONNAIRE_SUCCESS,
    payload: {
      id,
      data // debugging purpose
    }
  })

export const saveQuestionnaireFailure = (id, data, err) => (
  {
    type: SAVE_QUESTIONNAIRE_FAILURE,
    payload: { id, data, err }
  })

export const publishQuestionnaire = id =>
  (dispatch, getState) => {
    dispatch({
      type: PUBLISH_QUESTIONNAIRE,
      payload: id
    })
    // We retrieve the questionnaire from the reducer
    // thanks to getState, available as a second argument when 
    // creating a middleware with redux-thunk
    const qr = questionnaireToModel(getState(), id)
    // Send it to the server, and dispatch asynchronously the relevant
    // actions
    return stromaePostQuestionnaire(serializeQuestionnaire(qr))
      .then(url => {
        logger.debug('Location header is : ', url)
        logger.info('Publish OK', ' - URL is :', url)
        return dispatch(publishQuestionnaireSuccess(id, url, qr))
      })
      .catch(err => dispatch(
          publishQuestionnaireFailure(id, qr, err.toString())))
  }

export const publishQuestionnaireSuccess = (id, url, data) => (
  {
    type: PUBLISH_QUESTIONNAIRE_SUCCESS,
    payload: {
      id,
      url,
      data
    }
  })

export const publishQuestionnaireFailure = (id, data, err) => (
  {
    type: PUBLISH_QUESTIONNAIRE_FAILURE,
    payload: { id, data, err }
  })

export function setQuestionnaireFilter(id, filter) {
  return {
    type: SET_QUESTIONNAIRE_FILTER,
    payload: {
      id,
      filter
    }
  }
}