/**
 *  Mapping between constants and dictionary entries
 *
 * It is risky to use constants (ie constants defined in `pogues-constants`) to
 * refer to entries in dictionary ; this intermediate mapping adds some
 * boilerplate, but it shows more clearly what objects are : a constant or an
 * entry in the dictionary. Plus, constants are not guaranteed unique, they
 * have a meaning in a dedicated scope (for example, as a result structure
 * type), but we could have the same value used elsewhere in `pogues-constants`
 * to represent another kind of concept.
**/

export const RESPONSE_FORMAT = {
  SIMPLE: 'responseFormatSimple',
  SINGLE: 'responseFormatSingle',
  MULTIPLE: 'responseFormatMultiple',
  TABLE: 'responseFormatTable'
}