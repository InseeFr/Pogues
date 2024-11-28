import { describe, expect, test } from 'vitest';

import { checkVariableNumberStart } from './component-new-edit-utils';

describe('checkVariableNumberStart', () => {
  test('should validate the form', () => {
    const variables = [
      {
        BOOLEAN: {},
        DATE: { minimum: '', maximum: '', format: '' },
        DURATION: {
          minimum: '',
          maximum: '',
          mihours: '',
          miminutes: '',
        },
        NUMERIC: { minimum: '', maximum: '', decimals: '', unit: '' },
        TEXT: { maxLength: 249, pattern: '' },
        id: 'khq9vamv',
        label: '1QUESTION label',
        mandatory: false,
        name: '1QUESTION',
        type: 'TEXT',
      },
    ];
    const result = checkVariableNumberStart(variables);
    expect(result).toEqual(true);
  });
});
