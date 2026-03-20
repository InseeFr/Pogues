import { describe, expect, test } from 'vitest';

import { REMOVE_INTEGRITY_ERROR } from '../../actions/errors';
import actionsHandlers, { removeError } from './errors-integrity';

describe('removeError', () => {
  test('when called directly', () => {
    const result = removeError(
      {
        1: {
          typeError: [{ itemListId: '2' }],
          typeError2: [{ itemListId: '3' }],
        },
        2: { typeError2: [{ itemListId: '1' }] },
      },
      { componentId: '1', typeError: 'typeError', itemListId: '2' },
    );
    expect(result).toEqual({
      1: { typeError: [], typeError2: [{ itemListId: '3' }] },
      2: { typeError2: [{ itemListId: '1' }] },
    });
  });
  [REMOVE_INTEGRITY_ERROR].forEach((action) => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        {
          1: {
            typeError: [{ itemListId: '2' }],
            typeError2: [{ itemListId: '3' }],
          },
          2: { typeError2: [{ itemListId: '1' }] },
        },
        {
          type: action,
          payload: {
            componentId: '1',
            typeError: 'typeError',
            itemListId: '2',
          },
        },
      );
      expect(result).toEqual({
        1: { typeError: [], typeError2: [{ itemListId: '3' }] },
        2: { typeError2: [{ itemListId: '1' }] },
      });
    });
  });
});
