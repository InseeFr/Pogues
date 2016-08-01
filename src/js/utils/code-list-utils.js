//HACK we avoid return 0 as a length since we will lose information during
//serialization of a questionnaire (it can lead to generate zero response but
//responses hold important information such as `codeListReference` or
//`datatype`).

/**
 * Returns the number of code in a code list from its `id`
 *
 * For a code list specification, it returns `1`.
 * If the `id` is not provided, it returns `1`.
 * If there is no code in the code list, it returns `1`.
 *
 * Explanations :
 *
 * For a code list specification which has not been loaded yet, we do not know
 * the number of codes in the code list. We need this number in order to
 * serialize the questionnaire (how many `Response` do we need to create ?).
 *
 * If a code list specification has been loaded (ie `isLoaded` is `true`), we
 * could know the number of codes, but since we cannot ensure that the
 * specification will be loaded when the questionnaire will be parsed and
 * further updated, we use `1` as a safe convention, whether it has been loaded
 * or not.
 *
 * If the `id` is not provided, the user might not have selected the code list
 * yet, so we do not know the number of codes. But since this number will be
 * used to generate responses and responses hold the information about the
 * datatype, we choose to return `1` by default to have at least one response
 * to infer datatype when retrieving a questionnaire.
 *
 * Same reason to return 1 instead of 0 when there is no code in the code list.
 *
 * @param  {Object} codeListById collection of code lists (comes from the
 *                               reducer)
 * @param  {String} id           code list id
 * @return {Number}              number of codes in the code list
 */
export function nbCodesFromId(codeListById, id) {
  const nb = id  ? nbCodes(codeListById[id]) : 1
  return (nb > 0 ? nb : 1)
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