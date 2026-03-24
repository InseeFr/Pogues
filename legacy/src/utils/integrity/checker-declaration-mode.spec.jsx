import { describe, expect, it } from 'vitest';

import { INTEGRITY_TYPES } from '../../constants/pogues-constants';
import checkerTargetMode from './checker-declaration-mode';

describe('checkerDeclarationMode', () => {
  it('should return an empty array if there is not error', () => {
    const input = {
      appState: {
        activeComponentsById: {},
        activeQuestionnaire: {
          id: 1,
        },
      },
    };
    const output = {
      1: {
        [INTEGRITY_TYPES.DECLARATION_MODE]: [],
      },
    };
    expect(checkerTargetMode(input)).toEqual(output);
  });
  it('should return an error', () => {
    const input = {
      appState: {
        activeComponentsById: {
          1: {
            TargetMode: ['test'],
          },
        },
        activeQuestionnaire: {
          id: 1,
          TargetMode: 'insee',
        },
      },
    };
    const output = {
      1: {
        [INTEGRITY_TYPES.DECLARATION_MODE]: [
          {
            message:
              'The component collection mode (sequence, subsequence or question) must be included in the questionnaire collection mode: ',
          },
        ],
      },
    };
    expect(checkerTargetMode(input)).toEqual(output);
  });
});
