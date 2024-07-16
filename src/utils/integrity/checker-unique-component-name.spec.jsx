import { describe, expect, it } from 'vitest';
import { INTEGRITY_TYPES } from '../../constants/pogues-constants';
import checkerUniqueComponentName from './checker-unique-component-name';

describe('checkerUniqueComponentName', () => {
  it('should return an empty array', () => {
    const input = {
      appState: {
        activeComponentsById: {},
        activeQuestionnaire: {
          id: '1',
        },
      },
    };
    const output = {
      1: {
        [INTEGRITY_TYPES.UNIQUE_COMPONENT_NAME]: [],
      },
    };
    expect(checkerUniqueComponentName(input)).toEqual(output);
  });
  it('should return an array with all errors', () => {
    const input = {
      appState: {
        activeComponentsById: {
          1: { name: 'name' },
          2: { name: 'name' },
        },
        activeQuestionnaire: {
          id: '1',
        },
      },
    };
    const output = {
      1: {
        [INTEGRITY_TYPES.UNIQUE_COMPONENT_NAME]: [
          {
            message: `Component names (sequence, subsequence, loop and question) should be unique: name`,
          },
        ],
      },
    };
    expect(checkerUniqueComponentName(input)).toEqual(output);
  });
});
