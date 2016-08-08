import component from './component'
import { COMPONENT_TYPE } from '../constants/pogues-constants'
import { CREATE_COMPONENT } from '../actions/component'
import { CREATE_QUESTIONNAIRE } from '../actions/questionnaire'

const { QUESTION, SEQUENCE } = COMPONENT_TYPE

const emptySequence = {
  depth: 0,
  childCmpnts: [],
  type: SEQUENCE
}

export default (state, action) => {
  const { type, paylaod } = action
  switch (type) {
    case CREATE_COMPONENT:
    case CREATE_QUESTIONNAIRE:
      //TODO think again: we need to handle CREATE_QUESTIONNAIRE
      //to create the main sequence of the questionnaire
      //enhance the component state to make it a sequence
      return {
        ...state,
        ...emptySequence
      }
    default:
      return state
  }
}