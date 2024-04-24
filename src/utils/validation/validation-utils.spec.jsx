import { describe, expect, test } from 'vitest';
import { getErrorsObject, validate } from './validation-utils';

const form = {
  'path1.subpath1': 'value1',
  'path1.subpath2': 'value12',
  path2: 'value2',
};
const items = {
  'path1.subpath1': [() => 'error1', () => ['error2', 'error3']],
  'path1.subpath2': [() => 'error2'],
  path2: [() => 'error4'],
};
const output = [
  { errors: ['error1'], path: 'path1.subpath1' },
  { errors: ['error2', 'error3'], path: 'path1.subpath1' },
  { errors: ['error2'], path: 'path1.subpath2' },
  { errors: ['error4'], path: 'path2' },
];

describe('validate', () => {
  test('should validate the form', () => {
    const result = validate(form, items);
    expect(result).toEqual(output);
  });
});
describe('getErrorsObject', () => {
  test('should fill the Errors object', () => {
    expect(getErrorsObject(output)).toEqual({
      path1: { subpath1: 'error2', subpath2: 'error2' },
      path2: 'error4',
    });
  });
});
