import {
  CREATE_CODE_LIST, REMOVE_CODE_LIST, LOAD_CODE_LIST_SUCCESS, EDIT_CODE_LIST
} from '../actions/code-list'

import { NEW_CODE_LIST_SINGLE } from '../actions/response-format'
import { CREATE_CODE, REMOVE_CODE } from '../actions/code'
import {
  LOAD_CLIST_SPECS_SUCCESS
} from '../actions/code-list-specification'

import {
  LOAD_QUESTIONNAIRE_SUCCESS
} from '../actions/questionnaire'

const emptyCodeList = {
  name: '',
  label: '',
  codes: [],
  isSpec: false,
  loaded: true // only spec can have loaded set to false
}

// We use only one reducer for code list specifications and code lists created
// within the questionnaire. The specifications will be tagged accordingly.
export default function (state={}, action) {
  const { type, payload } = action
  switch (type) {
    case NEW_CODE_LIST_SINGLE:
      return {
        ...state,
        [payload.createdClId]: {
          ...emptyCodeList,
          id: payload.createdClId
        }
      }
    case CREATE_CODE:
      const codeListId = payload.codeListId
      const codeList = state[codeListId]
      return {
        ...state,
        [codeListId]: {
          ...codeList,
          codes: [...codeList.codes, payload.id]
        }
      }
    case REMOVE_CODE:
      //TODO switch to object with aciton handler to avoid conflicts in
      //variables names when we use a `switch` statement
      const codeListIdForRemove = payload.codeListId
      const codeListForRemove = state[codeListIdForRemove]
      const codes = [...codeListForRemove.codes]
      const codeId = payload.id
      codes.splice(codes.indexOf(codeId), 1)
      return {
        ...state,
        [codeListIdForRemove]: {
          ...codeListForRemove,
          codes: codes
        }
      }
    case LOAD_CLIST_SPECS_SUCCESS:
      // `payload` is an object of code list specification
      //TODO needs extra information about the api (-> swagger)
      //Is it safe to user the id returned from the server ? (might be a better
      //option to create a local id
      return Object.keys(payload).reduce((specs, id) => {
        //Update only if the spec does not exist yet (if it exists, the code
        //list might has been loaded too, so it's better to keep it)
        if (!specs[id]) specs[id] = {
          ...payload[id],
          isSpec: true,
          loaded: false, //TODO should stay in app state
          codes: [] //HACK codes should be loaded only when needed, and this
                    //array of codes should not be initialized (but for now,
                    //it breaks state to model conversion since we need to
                    //serialize theses codes too)
        }
        return specs
      }, state)
    case LOAD_CODE_LIST_SUCCESS:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          codes: payload.codes.map(({ id }) => id),
          loaded: true
        }
      }
    case EDIT_CODE_LIST:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload.update
        }
      }
    case REMOVE_CODE_LIST:
      const { [payload.id]: toRemove, ...toKeep } = state
      return toKeep
    case LOAD_QUESTIONNAIRE_SUCCESS:
      return {
        ...state, // to keep code list specifiations
        ...payload.update.codeListById
      }
    default:
      return state
  }
}