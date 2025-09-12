import { AxiosError, isAxiosError } from 'axios';

export enum ErrorCodes {
  /**
   * The questionnaire does not have a roundabout.
   *
   * The feature might only be available to questionnaires with a roundabout.
   */
  QuestionnaireRoundaboutNotFound = 'questionnaire:roundaboutnotfound',
  /**
   * The questionnaire is not in VTL.
   *
   * The feature might only be available to questionnaires in VTL.
   */
  QuestionnaireFormulaLanguageNotVTL = 'questionnaire:formulalanguage:notvtl',
}

export type PoguesAPIError = {
  errorCode: ErrorCodes;
};

/**
 * Whether the error is a known case from the API (e.g. questionnaire not found)
 * and has an associated error code that can be handled in a specific way in the
 * IHM (e.g. with a custom message, an arbitrary value...).
 */
export function isPoguesAPIError(
  error: Error,
): error is AxiosError<PoguesAPIError> {
  if (!isAxiosError(error)) {
    return false;
  }

  const errorCode = error.response?.data.errorCode;
  return Object.values(ErrorCodes).includes(errorCode);
}
