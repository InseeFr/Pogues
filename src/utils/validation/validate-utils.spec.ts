import { describe, expect, test } from 'vitest';

import { getErrorsObject, validate } from './validate-utils';

describe('validate', () => {
  test('should validate the form', () => {
    const result = validate(
      {
        'path1.subpath1': 'value1',
        'path1.subpath2': 'value12',
        path2: 'value2',
      },
      {
        'path1.subpath1': [() => 'error1', () => ['error2', 'error3']],
        'path1.subpath2': [() => 'error2'],
        path2: [() => 'error4'],
      },
    );
    expect(result).toEqual([
      { errors: ['error1'], path: 'path1.subpath1' },
      { errors: ['error2', 'error3'], path: 'path1.subpath1' },
      { errors: ['error2'], path: 'path1.subpath2' },
      { errors: ['error4'], path: 'path2' },
    ]);
  });
});

describe('getErrorsObject', () => {
  test('should fill the Errors object', () => {
    expect(
      getErrorsObject([
        { errors: ['error1'], path: 'path1.subpath1' },
        { errors: ['error2', 'error3'], path: 'path1.subpath1' },
        { errors: ['error2'], path: 'path1.subpath2' },
        { errors: ['error4'], path: 'path2' },
      ]),
    ).toEqual({
      path1: { subpath1: 'error2', subpath2: 'error2' },
      path2: 'error4',
    });
  });
});
