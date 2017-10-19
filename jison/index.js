/**
 * Define new grammars in grammars/ if needed.
 *
 * Generate grammar parsers through `npm run jison`
 * After the generation, you MUST delete `_token_stack:` line (pending PR #352 of jison project)
 * and the export.main function definition. Sorry.
 *
 * Committing built generated parsers for now,
 * since they are supposed to be quite static and avoids aforementioned work
 * Wrap generated parsers and export functions here to be used in Pogues.
 *
 * Based on dimagi/js-xpath project on github, in a nicer package and with less functionalities to fit our needs.
 */
import xpathParser from './generated-parsers/xpath-parser';

/**
 * Return null if given a valid expression, text otherwise
 * @param xpath expression
 * @returns error message if anything went wrong during the parsing of the expression
 */
const validateXpath = (xpath) => {
  if(xpath) {
    try {
      // Throws an error if the syntax isn't valid
      xpathParser.parse(xpath);
    } catch (e) {
      return e.message;
    }
  }
};

export { validateXpath };



