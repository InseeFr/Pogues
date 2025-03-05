import { describe, expect, test } from 'vitest';

import { listCodes } from './__mocks__/codes-lists-utils';
import { hasChild } from './codes-lists-utils';

describe('Codes lists utils', () => {
  test('hasChild should return false', () => {
    expect(hasChild({ value: '2' }, listCodes)).toBeFalsy();
  });
  test('hasChild should return true', () => {
    expect(hasChild({ value: '1' }, listCodes)).toBeTruthy();
  });
});
