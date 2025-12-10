/**
 * Regular expression to check for SCREAMING_SNAKE_CASE.
 *
 * Variables' names must be in this format to be used in VTL formula.
 */
export const screamingSnakeCaseRegex = /^[A-Z]+(_[A-Z0-9]+)*$/;

/** Automatically convert a string into SCREAMING_SNAKE_CASE. */
export function convertToScreamingSnakeCase(text: string): string {
  return text.toUpperCase().replaceAll(/[\s-]/g, '_');
}
