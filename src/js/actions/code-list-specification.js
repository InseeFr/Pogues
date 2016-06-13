export const LOAD_CLIST_SPECS = 'LOAD_CLIST_SPECS'
export const LOAD_CLIST_SPECS_SUCCESS = 'LOAD_CLIST_SPECS_SUCCESS'
export const LOAD_CLIST_SPECS_FAILURE = 'LOAD_CLIST_SPECS_FAILURE'
import { getCodeListSpecs } from '../utils/remote-api'
import { codeListSpecsToState } from '../utils/model-to-state-code-list-specs'
import { loadCodeListIfNeeded } from './code-list'

export const loadCodeListSpecs = () =>
  dispatch => {
    dispatch({
      type: LOAD_CLIST_SPECS
    })
    return getCodeListSpecs()
      .then(rawCListSpecs => codeListSpecsToState(rawCListSpecs))
      .then(specs => {
        dispatch(loadCodeListSpecsSuccess(specs))
        return specs
      })
      //HACK for now code list specifications need to be serialized with the
      //questionnaire, so we fetch codes for all of them (we might better load
      //only the codes needed before save or publish, but easier this way, and
      //anyway, it should not be needed)
      .then(specs => Object.keys(specs).forEach(clId =>
          dispatch(loadCodeListIfNeeded(clId))))
      .catch(err => dispatch(loadCodeListSpecsFailure(err)))
  } 

// rawCodeLists has not yet been processed
export const loadCodeListSpecsSuccess = rawCListSpecs => ({
  type: LOAD_CLIST_SPECS_SUCCESS,
  payload: rawCListSpecs
})

export const loadCodeListSpecsFailure = err => ({
  type: LOAD_CLIST_SPECS_FAILURE,
  payload: {
    err
  }
})