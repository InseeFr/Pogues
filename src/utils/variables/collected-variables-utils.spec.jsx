import { describe, expect, it, test } from 'vitest';

import {
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DIMENSION_TYPE,
  QUESTION_TYPE_ENUM,
} from '../../constants/pogues-constants';
import { getCollectedVariablesMultiple } from './collected-variables-multiple';
import {
  generateCollectedVariables,
  getCollectedVariable,
  sortByYXAndZ,
} from './collected-variables-utils';

const { BOOLEAN } = DATATYPE_NAME;
const { SIMPLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, MEASURE } = DIMENSION_TYPE;

describe('generateCollectedVariables', () => {
  it('SIMPLE response format', () => {
    const responseFormat = SIMPLE;
    const questionName = 'Question';
    const form = {};
    const codesListStore = {};
    const output = generateCollectedVariables(
      responseFormat,
      questionName,
      form,
      codesListStore,
    );

    expect(output[0].id).toBeDefined();
    expect(output[0].label).toEqual(`${questionName} label`);
    expect(output[0].name).toEqual(questionName);
  });
});

describe('collected variables utils: ', () => {
  describe('sortByYXAndZ', () => {
    const targets = [
      { id: '1', x: 1, y: 1 },
      { id: '2', x: 2, y: 4 },
      { id: '3', x: 3, y: 5 },
      { id: '4', x: 1, y: 5 },
      { id: '5', x: 3, y: 4 },
      { id: '6', x: 3, y: 3 },
      { id: '7', x: 1, y: 2 },
      { id: '8', x: 2, y: 2 },
    ];

    const store = {
      1: { id: '1', x: 1, y: 1 },
      2: { id: '2', x: 2, y: 4 },
      3: { id: '3', x: 3, y: 5 },
      4: { id: '4', x: 1, y: 5 },
      5: { id: '5', x: 3, y: 4 },
      6: { id: '6', x: 3, y: 3 },
      7: { id: '7', x: 1, y: 2 },
      8: { id: '8', x: 2, y: 2 },
    };
    test('should sort the targetMapping, without the store', () => {
      expect(targets.sort(sortByYXAndZ())).toEqual([
        { id: '1', x: 1, y: 1 },
        { id: '7', x: 1, y: 2 },
        { id: '8', x: 2, y: 2 },
        { id: '6', x: 3, y: 3 },
        { id: '2', x: 2, y: 4 },
        { id: '5', x: 3, y: 4 },
        { id: '4', x: 1, y: 5 },
        { id: '3', x: 3, y: 5 },
      ]);
    });
    test('should sort the targetMapping, with the store', () => {
      expect(targets.map((t) => t.id).sort(sortByYXAndZ(store))).toEqual([
        '1',
        '7',
        '8',
        '6',
        '2',
        '5',
        '4',
        '3',
      ]);
    });
  });

  describe('getCollectedVariable', () => {
    test('should return the collected variable with coordinates', () => {
      const result = getCollectedVariable('name', 'label', {
        x: 1,
        y: 2,
        isCollected: '0',
      });
      expect(result).toEqual({
        id: result.id,
        name: 'name',
        label: 'label',
        x: 1,
        y: 2,
        isCollected: '0',
      });
    });

    test('should return a new id', () => {
      const result = getCollectedVariable(
        'name',
        'label',
        { x: 1, y: 2, isCollected: '1' },
        { id: 1 },
      );
      expect(result.id).not.toEqual(1);
    });

    test('should return the collected variable without coordinates', () => {
      const result = getCollectedVariable('name', 'label');
      expect(result).toEqual({
        id: result.id,
        name: 'name',
        label: 'label',
      });
    });
  });

  describe('getCollectedVariablesMultiple', () => {
    test('should return collected variables for QCM without codesList', () => {
      const questionName = 'questionName';
      const form = {
        [PRIMARY]: {
          [DEFAULT_CODES_LIST_SELECTOR_PATH]: {
            codes: [
              {
                value: 'value1',
                label: 'label1',
                depth: 1,
                weight: 1,
                parent: '',
              },
              {
                value: 'value2',
                label: 'label2',
                depth: 1,
                weight: 2,
                parent: '',
              },
            ],
            id: '1',
          },
        },
        [MEASURE]: { type: 'type' },
      };
      const codesListStore = {};
      const result = getCollectedVariablesMultiple(
        questionName,
        form,
        codesListStore,
      );
      expect(result).toEqual([
        {
          id: result[0].id,
          label: 'value1 - label1',
          name: 'questionName1',
          x: 1,
          type: BOOLEAN,
          [BOOLEAN]: {},
          isCollected: '1',
          alternativeLabel: '',
        },
        {
          id: result[1].id,
          label: 'value2 - label2',
          name: 'questionName2',
          x: 2,
          type: BOOLEAN,
          [BOOLEAN]: {},
          isCollected: '1',
          alternativeLabel: '',
        },
      ]);
    });

    test('should return collected variables for QCM with codesList', () => {
      const questionName = 'questionName';
      const form = {
        [PRIMARY]: {
          [DEFAULT_CODES_LIST_SELECTOR_PATH]: {
            codes: [
              { value: 'value1', label: 'label1' },
              { value: 'value2', label: 'label2' },
            ],
            id: '1',
          },
        },
        [MEASURE]: { type: 'type' },
      };
      const codesListStore = {
        1: { codes: { 1: { value: 'code1', label: 'label1' } } },
      };
      const result = getCollectedVariablesMultiple(
        questionName,
        form,
        codesListStore,
      );
      expect(result).toEqual([
        {
          id: result[0].id,
          label: 'code1 - label1',
          name: 'questionName1',
          x: 1,
          isCollected: '1',
          alternativeLabel: '',
          type: BOOLEAN,
          [BOOLEAN]: {},
        },
      ]);
    });
  });
});
