import { describe, expect, test } from 'vitest';

import { DELETE_QLIST_SUCCESS } from '../actions/questionnaire';
import { LOAD_QLIST_SUCCESS } from '../actions/questionnaire-list';
import reducer from './questionnaire-list-by-id';

describe('questionnaire-list-by-id reducer', () => {
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
