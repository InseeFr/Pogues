import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';

/**
 * A checker analyzes the state and returns a list of error descriptions
 */

/**
 * Builds a reducers by combining multiple checkers
 *
 * It will process each reducers individually and build an unique `errors` array
 * by concatenating errors returned by each reducers.
 *
 * @param  {...function} ...checkers individual checkers
 * @return {function}                global reducers
 */
export default function combineCheckers(...checkers) {
  return function (state) {
    return checkers.reduce((errorsByComponent, checker) => {
      return merge(cloneDeep(errorsByComponent), checker(state) || {});
    }, {});
  };
}
