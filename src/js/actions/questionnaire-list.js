
export const LOAD_QLIST = 'LOAD_QLIST'
export const LOAD_QLIST_SUCCESS = 'LOAD_QLIST_SUCCESS'
export const LOAD_QLIST_FAILURE = 'LOAD_QLIST_FAILURE'
import { getQuestionnaireList } from '../utils/remote-api'
import { qListToState } from '../utils/model-to-state-qlist'

//TODO think about naming conventions
export const loadQuestionnaireList = () =>
  (dispatch, getState) => {
    dispatch({
      type: LOAD_QLIST,
      payload: null
    })
    return getQuestionnaireList()
      .then(qListToState)
      .then(qrList => dispatch(loadQuestionnaireListSuccess(qrList)))
      .catch(err => dispatch(loadQuestionnaireListFailure(err.toString())))
  }


export function loadQuestionnaireListSuccess(qrList) {
  return {
    type: LOAD_QLIST_SUCCESS,
    payload: qrList
  }
}

export function loadQuestionnaireListFailure(err) {
  return {
    type: LOAD_QLIST_FAILURE,
    payload: err
  }
}
