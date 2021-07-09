import reducer from './questionnaire-by-id';
import {
  LOAD_QUESTIONNAIRE_SUCCESS,
  CREATE_QUESTIONNAIRE_SUCCESS,
  DELETE_QLIST_SUCCESS,
  LOAD_QUESTIONNAIRE_START,
  LOAD_QUESTIONNAIRE_FAILURE,
} from 'actions/questionnaire';
import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from 'actions/app-state';
import { LOAD_QLIST_SUCCESS } from 'actions/questionnaire-list';

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

  test('should handle LOAD_QLIST_SUCCESS', () => {
    expect(
      reducer(
        { 2: { id: '2' } },
        {
          type: LOAD_QLIST_SUCCESS,
          payload: [
            {
              1: { id: '1' },
            },
          ],
        },
      ),
    ).toEqual({
      1: { id: '1' },
    });
  });
  test('should handle DELETE_QLIST_SUCCESS', () => {
    expect(
      reducer({
        type: DELETE_QLIST_SUCCESS,
      }),
    ).toEqual({});
  });
});
