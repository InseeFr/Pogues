/**
 * Regular expression to check for SCREAMING_CAMEL_CASE.
 *
 * Variables' names must be in this format to be used in VTL formula.
 */
export const screamingCamelCaseRegex = /^[A-Z]+(_[A-Z0-9]+)*$/;

/** Automatically convert a string into SCREAMING_CAMEL_CASE. */
export function convertToScreamingCamelCase(text: string): string {
  return text.toUpperCase().replaceAll(/[\s-]/g, '_');
}
