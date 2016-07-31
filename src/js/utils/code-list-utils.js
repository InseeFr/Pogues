/**
 * Returns the number of code in a code list from its `id`
 *
 * For a code list specification, it returns `1`.
 * If the `id` is not provided, it returns `1`.
 *
 * Explanations :
 *
 * For a code list specification which has not been loaded yet, we do not know
 * the number of codes in the code list. We need this number in order to
 * serialize the questionnaire (how many `Response` do we need to create ?) and
 * for parsing the questionnaire (if we have a TABLE response format with two
 * information axes and multiple measures, how do we know which response goes
 * with which measure ? => We need this informtion to extract the dataytype from
 * thoses responses). If a code list specification has been loaded (ie
 * `isLoaded` set to `true`), we could know the number of codes, but since we
 * cannot ensure that the specification will be loaded when the questionnaire
 * will be parsed, we cannot rely on this number and use 1 as a convention,
 * whether it has been loaded or not.
 *
 * If the `id` is not provided, the user might not have selected the code list
 * yet, so we do not know the number of codes. But since this number will be
 * used to generate responses and responses hold the information about the
 * datatype, we choose to return `1` by default to have at least one response
 * to infer datatype when retrieving a questionnaire.
 *
 * @param  {Object} codeListById collection of code lists (comes from the
 *                               reducer)
 * @param  {String} id           code list id
 * @return {Number}              number of codes in the code list
 */
export function nbCodesFromId(codeListById, id) {
  return id  ? nbCodes(codeListById[id]) : 1
}
/**
 * Returns the number of code in a code list
 *
 * For a code list specification which has not been loaded yet, it returns `1`.
 *
 * @param  {Boolean} isSpec    does this code list comes from a specification
 * @param  {Boolean} isLoaded  if it's a code list specification, has it been
 *                             loaded ?
 * @param  {Array}  codes     codes of the code list
 * @return {Number}           number of codes in the code list
 */
function nbCodes({ isSpec, isLoaded, codes }) {
  return isSpec ? 1 : codes.length
}