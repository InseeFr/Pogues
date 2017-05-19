/**
 * Build a function to sort an array of objects by the given key
 *
 * @param   {string}   key the key to sort by
 * @returns {function}     sort an array by the given key
 */
export const buildSortByKey = key =>
  /**
   * Sort an array by a given key
   * 
   * If `desc` is set to true, descending order will be used
   * 
   * @param   {array}      arr  array of objects with the key given key
   * @param   {boolean}    desc true if descending order required
   * @returns {array}           the array sorted by the given key
   */

  (arr, desc = false) => {
    const order = desc ? 1 : -1;
    return arr.sort(
      (a, b) => b[key] > a[key] ? order : b[key] === a[key] ? 0 : -order
    );
  };

/**
 * 
 * Convert an object to an array
 * 
 * @param   {object} obj     an object 
 * @param   {string} idName  if given, a `idName` key will be added to each
 *                           object to keep track of the intial key
 * @returns {array}          an array with each entry from the intial object
 */
export const toArray = (obj, idName) => {
  if (idName)
    return Object.keys(obj).reduce(
      (_, k) => {
        _.push({
          ...obj[k],
          [idName]: k
        });
        return _;
      },
      []
    );
  else
    return Object.keys(obj).reduce(
      (_, k) => {
        _.push(obj[k]);
        return _;
      },
      []
    );
};
