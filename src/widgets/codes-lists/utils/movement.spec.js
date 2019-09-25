import { moveUp, moveDown } from './movement';
import {
  code01,
  code02,
  code03,
  code04,
  code05,
  codes,
} from './__mocks__/codes';

describe('Codes lists utils - Movement', () => {
  describe('Move up', () => {
    test(
      'Should decrease the weight of the moved code in the list of codes if exists and increase the weight of the ' +
        'sibling with the same weight',
      () => {
        const expectedValues = [
          code01,
          {
            ...code02,
            weight: code02.weight + 1,
          },
          {
            ...code03,
            weight: code03.weight - 1,
          },
          code04,
          code05,
        ];

        expect(moveUp(code03.value, codes)).toEqual(expectedValues);
        expect(moveUp('NOT_EXISTING_VALUE', codes)).toEqual(codes);
      },
    );
  });

  describe('Move down', () => {
    test(
      'Should increase the weight of the moved code in the list of codes if exists and decrease the weight of the ' +
        'sibling with the same weight',
      () => {
        const expectedValues = [
          code01,
          code02,
          {
            ...code03,
            weight: code03.weight + 1,
          },
          {
            ...code04,
            weight: code04.weight - 1,
          },
          code05,
        ];

        expect(moveDown(code03.value, codes)).toEqual(expectedValues);
        expect(moveDown('NOT_EXISTING_VALUE', codes)).toEqual(codes);
      },
    );
  });
});
