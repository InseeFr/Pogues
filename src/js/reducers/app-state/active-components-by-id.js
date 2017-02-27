import { TOGGLE_ACTIVE_COMPONENT } from '../../actions/app-state'

export default function (state={}, action) {
  if (action.type !== TOGGLE_ACTIVE_COMPONENT) return state
  return toggleActiveCmpnt(state, action.payload)
}

function toggleActiveCmpnt(state, id) {
  // If the `id` is set, the component is active (no matter the value)
  if (!state.hasOwnProperty(id)) {
    return {
      ...state,
      [id]: true
    }
  }
  else {
    // Remove the entry for `id`
    const { [id]: toRemove, ...toKeep } = state
    return toKeep
  }
}