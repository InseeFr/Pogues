import { describe, expect, test } from 'vitest';

import { changeSetValue } from './set';

describe('changeSetValue', () => {
  test('should add value to set', () => {
    const input = new Set();
    const res = changeSetValue(input, 'yes', true);
    expect(res.has('yes')).toBeTruthy();
  });
  test('should do nothing when we add a value that already exist', () => {
    const input = new Set(['yes']);
    const res = changeSetValue(input, 'yes', true);
    expect(res.has('yes')).toBeTruthy();
  });
  test('should remove value from set', () => {
    const input = new Set(['yes']);
    const res = changeSetValue(input, 'yes', false);
    expect(res.has('yes')).toBeFalsy();
  });
  test('should do nothing when we remove a value that does not exist', () => {
    const input = new Set();
    const res = changeSetValue(input, 'yes', false);
    expect(res.has('yes')).toBeFalsy();
  });
});
