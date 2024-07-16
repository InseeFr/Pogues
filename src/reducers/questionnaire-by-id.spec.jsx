import { describe, expect, test } from 'vitest';
import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from '../actions/app-state';
import {
  CREATE_QUESTIONNAIRE_SUCCESS,
  LOAD_QUESTIONNAIRE_FAILURE,
  LOAD_QUESTIONNAIRE_START,
  LOAD_QUESTIONNAIRE_SUCCESS,
} from '../actions/questionnaire';
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
      reducer({
        type: LOAD_QUESTIONNAIRE_FAILURE,
      }),
    ).toEqual({
      type: LOAD_QUESTIONNAIRE_FAILURE,
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
