import { describe, expect, test } from 'vitest';

import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from '../actions/app-state';
import {
  CREATE_QUESTIONNAIRE_SUCCESS,
  LOAD_QUESTIONNAIRE_FAILURE,
  LOAD_QUESTIONNAIRE_START,
  LOAD_QUESTIONNAIRE_SUCCESS,
} from '../actions/questionnaire';
import { HttpResponseError } from '../api/errors/httpError';
import Dictionary from '../utils/dictionary/dictionary';
import reducer from './questionnaire-by-id';

describe('questionnaire-by-id reducer', () => {
  test('should handle LOAD_QUESTIONNAIRE_SUCCESS', () => {
    expect(
      reducer(
        { 2: { id: '2' } },
        {
          type: LOAD_QUESTIONNAIRE_SUCCESS,
          payload: {
            update: {
              questionnaireById: {
                1: {
                  id: '1',
                },
              },
            },
          },
        },
      ),
    ).toEqual({
      1: {
        id: '1',
      },
      loader: false,
    });
  });
  test('should handle LOAD_QUESTIONNAIRE_START', () => {
    expect(
      reducer({
        type: LOAD_QUESTIONNAIRE_START,
      }),
    ).toEqual({
      type: LOAD_QUESTIONNAIRE_START,
    });
  });

  test('should handle LOAD_QUESTIONNAIRE_FAILURE', () => {
    expect(
      reducer(
        {},
        {
          type: LOAD_QUESTIONNAIRE_FAILURE,
          payload: { err: new HttpResponseError(404, 'Not Found'), id: '1' },
        },
      ),
    ).toEqual({
      loader: false,
      loadingError: `${Dictionary.pageSearchNoResultsForId} 1.`,
    });
  });

  test('should handle LOAD_QUESTIONNAIRE_FAILURE', () => {
    expect(
      reducer(
        {},
        {
          type: LOAD_QUESTIONNAIRE_FAILURE,
          payload: {
            err: new HttpResponseError(500, 'Unknown error'),
            id: '1',
          },
        },
      ),
    ).toEqual({
      loader: false,
      loadingError: `${Dictionary.errorMessageQuest}.`,
    });
  });

  test('should handle CREATE_QUESTIONNAIRE_SUCCESS', () => {
    expect(
      reducer(
        { 2: { id: '2' } },
        {
          type: CREATE_QUESTIONNAIRE_SUCCESS,
          payload: {
            update: {
              questionnaireById: {
                1: {
                  id: '1',
                },
              },
            },
          },
        },
      ),
    ).toEqual({
      1: {
        id: '1',
      },
      loader: false,
    });
  });

  test('should handle SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS', () => {
    expect(
      reducer(
        { 2: { id: '2' } },
        {
          type: SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS,
          payload: {
            update: {
              questionnaireById: {
                1: {
                  id: '1',
                },
              },
            },
          },
        },
      ),
    ).toEqual({
      1: {
        id: '1',
      },
      loader: false,
    });
  });
});
