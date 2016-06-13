export const CREATE_CODE_LIST = 'CREATE_CODE_LIST'
export const REMOVE_CODE_LIST = 'REMOVE_CODE_LIST'
export const EDIT_CODE_LIST = 'EDIT_CODE_LIST'
export const LOAD_CODE_LIST = 'LOAD_CODE_LIST'
export const LOAD_CODE_LIST_SUCCESS = 'LOAD_CODE_LIST_SUCCESS'
export const LOAD_CODE_LIST_FAILURE = 'LOAD_CODE_LIST_FAILURE'
import { getCodeList } from '../utils/remote-api'
import { codeListToState } from '../utils/model-to-state-code-list.js'

import { uuid } from '../utils/data-utils'

export const createCodeList = (name, responseId) => ({
  type: CREATE_CODE_LIST,
  payload: {
    id: uuid(),
    responseId,
    name: name
  }
})

export const editCodeList =  (id, update) => ({
  type: EDIT_CODE_LIST,
  payload: {
    id,
    update
  }
})

export const removeCodeList = (id, cmpntId) => ({
  type: REMOVE_CODE_LIST,
  payload: {
    id,
    cmpntId
  }
})

export const loadCodeListIfNeeded = id =>
  (dispatch, getState) => {
    const state = getState()
    const cl = state.codeListById[id]
    if (!cl.loaded) dispatch(loadCodeList(id, cl.retrievalQuery))
  }

export const loadCodeList = (id, retrievalQuery) =>
  dispatch => {
    dispatch({
      type: LOAD_CODE_LIST,
      payload: id
    })
    return getCodeList(retrievalQuery)
      .then(cl => {
        dispatch(loadCodeListSuccess(id, codeListToState(cl)))
      })
      .catch(err => {
        dispatch(loadCodeListFailure(id, err.toString()))
      })
  }


export const loadCodeListSuccess = (id, codes) => (
  {
    type: LOAD_CODE_LIST_SUCCESS,
    payload: { id, codes }
  })

export const loadCodeListFailure = (id, err) => (
  {
    type: LOAD_CODE_LIST_FAILURE,
    payload: { id, err }
  })