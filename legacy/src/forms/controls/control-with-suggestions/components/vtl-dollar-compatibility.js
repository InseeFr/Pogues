/**
 * Temporary Pogues exception: `$VAR$` is still required by DDI/XSLT generation
 * but is not valid VTL. Ignore lexer/parser errors that only come from `$`
 * so they do not block form validation until the generation chain can drop
 * the dollars.
 */

const DOLLAR_ERROR_MESSAGE =
  /(?:token recognition error at|extraneous input|mismatched input):\s*'\$'/i;

function getCharAtError(script, line, column) {
  if (typeof line !== 'number' || typeof column !== 'number' || !script) {
    return undefined;
  }
  const lineText = String(script).split('\n')[line - 1] ?? '';
  return lineText[column - 1];
}

export function isPoguesDollarCompatibilityError(error, script = '') {
  const message = error?.message ?? '';
  if (DOLLAR_ERROR_MESSAGE.test(message)) {
    return true;
  }
  return getCharAtError(script, error?.line, error?.column) === '$';
}

export function filterPoguesDollarCompatibilityErrors(errors = [], script = '') {
  return errors.filter(
    (error) => !isPoguesDollarCompatibilityError(error, script),
  );
}
