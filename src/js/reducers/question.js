import { DATATYPE_TYPE, COMPONENT_TYPE } from '../constants/pogues-constants'
import { CREATE_COMPONENT } from '../actions/component'
const QUESTION = { COMPONENT_TYPE }
const TEXT = { DATATYPE_TYPE }

const emptyQuestion = {
  simple: true,
  responses: [{
    simple: true,
    mandatory: false,
    codeListReference: null,
    values: [],
      //TODO datatype should be externalized
    datatype: {
      type: 'TextDATATYPE_TYPE',
      typeName: TEXT,
      maxLength: 0,
      pattern: ''
    }
  }],
  type: QUESTION
}

export default (state, action) => {
  const { type } = action
  switch (type) {
    case CREATE_COMPONENT:
      //enhance the component state to make it a question
      return {
        ...state,
        ...emptyQuestion
      }
    // case ADD_RESPONSE:
    // case REMOVE_RESPONSE:
    // case EDIT_RESPONSE:
    default:
      return state
  }
}