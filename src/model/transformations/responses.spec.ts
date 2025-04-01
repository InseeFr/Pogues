import { describe, expect, test } from 'vitest';

import { QUESTION_TYPE_ENUM } from '@/constants/pogues-constants';

import { stateToModel } from './responses';

const collectedVariablesStore = {
  jbdxtl1d: {
    id: 'jbdxtl1d',
    x: 1,
    y: 1,
  },
  jbdxvai9: {
    id: 'jbdxvai9',
    x: 2,
    y: 1,
  },
  jbdxpltw: {
    id: 'jbdxpltw',
    x: 3,
    y: 1,
  },
  jbdxzx2x: {
    id: 'jbdxzx2x',
    x: 4,
    y: 1,
  },
};

describe('responses tranformations', () => {
  test('should return only x coordinate if y is not defined', () => {
    const results = stateToModel(
      {
        codesListId: 'jbdxh138',
        typeName: 'TEXT',
        visHint: 'RADIO',
        maxLength: 1,
      },
      ['jbdxtl1d', 'jbdxvai9', 'jbdxpltw', 'jbdxzx2x'],
      collectedVariablesStore,
      QUESTION_TYPE_ENUM.MULTIPLE_CHOICE as keyof typeof QUESTION_TYPE_ENUM,
    );

    results.Mapping.forEach((result, index) => {
      expect(result.MappingTarget).toEqual(`${index + 1}`);
    });
  });

  test('should return only `x y` coordinate if y is defined', () => {
    const results = stateToModel(
      {
        codesListId: 'jbdxh138',
        typeName: 'TEXT',
        visHint: 'RADIO',
        maxLength: 1,
      },
      ['jbdxtl1d', 'jbdxvai9', 'jbdxpltw', 'jbdxzx2x'],
      collectedVariablesStore,
      QUESTION_TYPE_ENUM.SIMPLE as keyof typeof QUESTION_TYPE_ENUM,
    );

    results.Mapping.forEach((result, index) => {
      expect(result.MappingTarget).toEqual(`${index + 1} 1`);
    });
  });
});
