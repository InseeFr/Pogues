export const ADD_PAGE_BREAK = 'ADD_PAGE_BREAK'
export const REMOVE_PAGE_BREAK = 'REMOVE_PAGE_BREAK'

/**
 * Add a page break after a component
 * 
 * @param   {string} id id of the component after which the page break will be
 *                      added
 * @returns {object}    ADD_PAGE_BREAK action
 */
export const addPageBreak = id => ({
  type: ADD_PAGE_BREAK,
  payload: id
})

/**
 * Remove a page page after a component
 * 
 * @param   {string} id id of the component before the page break
 * @returns {object}    REMOVE_PAGE_BREAK action
 */
export const removePageBreak = id => ({
  type: REMOVE_PAGE_BREAK,
  payload: id
})