import { ADD_PAGE_BREAK, REMOVE_PAGE_BREAK } from '../actions/page-break'
import { MOVE_COMPONENT } from '../actions/component'

const actionsHndlrs = {
  ADD_PAGE_BREAK: createPageBreak,
  REMOVE_PAGE_BREAK: removePageBreak,
  MOVE_COMPONENT: changePageBreakAnchor
}

export default function (state={}, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHndlrs[type]
  return hndlr ? hndlr(state, payload, action) : state
}

function createPageBreak(pageBreaks, id) {
  return {
    ...pageBreaks,
    [id]: true
  }
}

function removePageBreak(pageBreaks, id) {
  const { [id]: toRemove, ...toKeep } = pageBreaks
  return toKeep
}

function changePageBreakAnchor(pageBreaks, { origin, previous }) {
  const { [origin]: toRemove, ...toKeep } = pageBreaks
  toKeep[previous] = true
  return toKeep
}