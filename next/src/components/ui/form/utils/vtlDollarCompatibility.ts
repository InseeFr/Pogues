/**
 * Temporary Pogues exception: `$VAR$` is still required by DDI/XSLT generation
 * but is not valid VTL. Ignore lexer/parser errors that only come from `$`
 * so they do not block form validation until the generation chain can drop
 * the dollars.
 */

type VtlErrorLike = {
  line?: number
  column?: number
  message?: string
}

const DOLLAR_ERROR_MESSAGE =
  /(?:token recognition error at|extraneous input|mismatched input):\s*'\$'/i

function getCharAtError(
  script: string,
  line?: number,
  column?: number,
): string | undefined {
  if (typeof line !== 'number' || typeof column !== 'number' || !script) {
    return undefined
  }
  const lineText = script.split('\n')[line - 1] ?? ''
  return lineText[column - 1]
}

export function isPoguesDollarCompatibilityError(
  error: VtlErrorLike,
  script = '',
): boolean {
  const message = error.message ?? ''
  if (DOLLAR_ERROR_MESSAGE.test(message)) {
    return true
  }
  return getCharAtError(script, error.line, error.column) === '$'
}

export function filterPoguesDollarCompatibilityErrors<T extends VtlErrorLike>(
  errors: T[] = [],
  script = '',
): T[] {
  return errors.filter(
    (error) => !isPoguesDollarCompatibilityError(error, script),
  )
}
