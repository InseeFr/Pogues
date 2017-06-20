const actionsHndlrs = {
  ADD_PAGE_BREAK: createPageBreak,
  REMOVE_PAGE_BREAK: removePageBreak,
  MOVE_COMPONENT: changePageBreakAfterMove,
  REMOVE_COMPONENT: changePageBreakAfterRemove,
  LOAD_QUESTIONNAIRE_SUCCESS: loadQuestionnaireSuccess
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
  // eslint-disable-next-line
  const { [id]: toRemove, ...toKeep } = pageBreaks
  return toKeep
}

function changePageBreakAfterMove(pageBreaks, { origin, previous }) {
  return changePageBreakAnchor(pageBreaks, origin, previous)
}

function changePageBreakAfterRemove(pageBreaks, { id, previous}) {
  return changePageBreakAnchor(pageBreaks, id, previous)
}

function changePageBreakAnchor(pageBreaks, id, previous) {
  const { [id]: toRemove, ...toKeep } = pageBreaks
  //if there was a page break, we put it after the previous component
  if (toRemove) toKeep[previous] = true
  return toKeep
}

function loadQuestionnaireSuccess(pageBreaks, { update: { pageBreakById } }) {
  return pageBreakById
}