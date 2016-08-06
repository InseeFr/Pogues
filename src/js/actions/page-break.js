export const ADD_PAGE_BREAK = 'ADD_PAGE_BREAK'
export const REMOVE_PAGE_BREAK = 'REMOVE_PAGE_BREAK'

export const addPageBreak = id => ({
  type: ADD_PAGE_BREAK,
  payload: id
})

export const removePageBreak = id => ({
  type: REMOVE_PAGE_BREAK,
  payload: id
})