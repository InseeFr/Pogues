import { describe, expect, it } from 'vitest';

import { getIntegrityErrors } from './utils';

describe('Utils', () => {
  it('getIntegrityErrors', () => {
    const input = {
      TYPE: [{ message: 'MESSAGE' }],
    };
    const output = ['MESSAGE'];
    expect(getIntegrityErrors(input)).toEqual(output);
  });
});
