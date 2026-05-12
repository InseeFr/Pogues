/**
 * Regular expression to check for SCREAMING_SNAKE_CASE.
 *
 * Variables' names must be in this format to be used in VTL formula.
 */
export const screamingSnakeCaseRegex = /^[A-Z]+(_[A-Z0-9]+)*$/

/** Convert a string into a valid name. */
export function convertToValidName(text: string): string {
  return convertToScreamingSnakeCase(convertToValidCharacters(text))
}

/** Convert a string into SCREAMING_SNAKE_CASE. */
export function convertToScreamingSnakeCase(text: string): string {
  return text.toUpperCase().replaceAll(/[\s-]/g, '_')
}

/**
 * Remove invalid caracters for the name (e.g. é, œ, ;$*%!) so that there are
 * only letters, numbers, underscore, dashes and spaces.
 */
export function convertToValidCharacters(text: string): string {
  return (
    text
      // convert common ligatures
      .replaceAll('œ', 'oe')
      .replaceAll('Œ', 'OE')
      // remove accents
      .normalize('NFD')
      .replaceAll(/[\u0300-\u036f]/g, '')
      // remove characters which are not letters, numbers, underscores, dashes or spaces
      .replaceAll(/[^\sa-zA-Z0-9_-]/g, '')
  )
}
