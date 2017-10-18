/**
 * Define new grammars in /grammars if needed.
 * Generate grammar parsers through `npm run jison`
 * Committing built generated parsers for now, since they are supposed to be quite static
 * Wrap generated parsers and export functions here to be used in Pogues.
 *
 * Based on dimagi/js-xpath project on github, in a nicer package and with less functionalities to fit our needs.
 */
import xpathParser from 'jison/generated-parsers/xpath-parser';

/**
 * Return null if given a valid expression, text otherwise
 * @param xpath
 * @returns {*}
 */
const validateXpath = (xpath) => {
  try {
    // Throws an error if the syntax isn't valid
    xpathParser.parse(xpath);
  } catch (e) {
    return e.message;
  }
  return null;
};

export { validateXpath };



