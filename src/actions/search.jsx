export const LOAD_SEARCH_RESULT = 'LOAD_SEARCH_RESULT';
export const LOAD_SEARCH_RESULT_SUCCESS = 'LOAD_SEARCH_RESULT_SUCCESS';
export const LOAD_SEARCH_RESULT_FAILURE = 'LOAD_SEARCH_RESULT_FAILURE';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';

import { getSearchResults } from '../utils/remote-api';

/**
 * Clear search result list
 *
 * It empty the search results store
 *
 * @return  {object}  CLEAR_SEARCH_RESULTS action
 */
export const clearSearchResult = () => ({
  type: CLEAR_SEARCH_RESULTS,
  payload: null,
});

/**
 * Load search result list success
 *
 * It's executed after the fail of a remote search results list fetch.
 *
 * @param   {string} resultsList The list of results found.
 * @return  {object}  LOAD_SEARCH_RESULT_SUCCESS action
 */
export const loadSearchResultSuccess = resultsList => ({
  type: LOAD_SEARCH_RESULT_SUCCESS,
  payload: resultsList,
});

/**
 * Load search result list failure
 *
 * It's executed after the fail of a remote search results list fetch.
 *
 * @param   {string} err   The error returned for the fetch process.
 * @return  {object}       LOAD_SEARCH_RESULT_FAILURE action
 */
export const loadSearchResultFailure = err => ({
  type: LOAD_SEARCH_RESULT_FAILURE,
  payload: err,
});

/**
 * Load search results list
 * @param   {string} token   The user token.
 * @param   {string} typeItem   The type of item to search.
 * @param   {object} criterias  The list of criterias.
 * @param   {string} filter     The text to filter.
 * @return  {object}  LOAD_SEARCH_RESULT action
 */
export const loadSearchResult =
  (token, typeItem, criterias, filter) => dispatch => {
    dispatch({
      type: LOAD_SEARCH_RESULT,
      payload: null,
    });
    return getSearchResults(token, typeItem, criterias, filter)
      .then(resultsList => dispatch(loadSearchResultSuccess(resultsList)))
      .catch(err => dispatch(loadSearchResultFailure(err)));
  };
