/**
 * A checker analyzes the state and returns a list of error descriptions
 */

/**
 * Builds a checker by combining multiple checkers
 *
 * It will process each checker individually and build an unique `errors` array
 * by concatenating errors returned by each checker.
 *
 * @param  {...function} ...checkers individual checkers
 * @return {function}                global checker
 */
export default function combineCheckers(...checkers) {
  return function (state) {
    return checkers.reduce((errors, checker) => {
      const check = checker(state)
      return errors.concat(check)
    }, [])
  }
}


