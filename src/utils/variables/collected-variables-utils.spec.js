import {
  sortByYAndX,
  getCollecteVariable,
  getCollectedVariablesMultiple
} from './collected-variables-utils';

import {
  DIMENSION_TYPE,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DATATYPE_NAME
} from 'constants/pogues-constants';
const { TEXT, BOOLEAN, DATE, NUMERIC } = DATATYPE_NAME;

const { PRIMARY, MEASURE } = DIMENSION_TYPE;

describe('collected variables utils: ', () => {
  describe('sortByYAndX', () => {
    const targets = [
      { id: '1', x: 1, y: 1 },
      { id: '2', x: 2, y: 4 },
      { id: '3', x: 3, y: 5 },
      { id: '4', x: 1, y: 5 },
      { id: '5', x: 3, y: 4 },
      { id: '6', x: 3, y: 3 },
      { id: '7', x: 1, y: 2 },
      { id: '8', x: 2, y: 2 }
    ];

    const store = {
      '1': { id: '1', x: 1, y: 1 },
      '2': { id: '2', x: 2, y: 4 },
      '3': { id: '3', x: 3, y: 5 },
      '4': { id: '4', x: 1, y: 5 },
      '5': { id: '5', x: 3, y: 4 },
      '6': { id: '6', x: 3, y: 3 },
      '7': { id: '7', x: 1, y: 2 },
      '8': { id: '8', x: 2, y: 2 }
    };
    test('should sort the targetMapping, without the store', () => {
      expect(targets.sort(sortByYAndX())).toEqual([
        { id: '1', x: 1, y: 1 },
        { id: '7', x: 1, y: 2 },
        { id: '8', x: 2, y: 2 },
        { id: '6', x: 3, y: 3 },
        { id: '2', x: 2, y: 4 },
        { id: '5', x: 3, y: 4 },
        { id: '4', x: 1, y: 5 },
        { id: '3', x: 3, y: 5 }
      ]);
    });
    test('should sort the targetMapping, with the store', () => {
      expect(targets.map(t => t.id).sort(sortByYAndX(store))).toEqual([
        '1',
        '7',
        '8',
        '6',
        '2',
        '5',
        '4',
        '3'
      ]);
    });
  });

  describe('getCollecteVariable', () => {
    test('should return the collected variablem with coordinates', () => {
      const result = getCollecteVariable('name', 'label', { x: 1, y: 2 });
      expect(result).toEqual({
        id: result.id,
        name: 'name',
        label: 'label',
        x: 1,
        y: 2
      });
    });

    test('should return the collected variablem without coordinates', () => {
      const result = getCollecteVariable('name', 'label');
      expect(result).toEqual({
        id: result.id,
        name: 'name',
        label: 'label'
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
              { value: 'value1', label: 'label1' },
              { value: 'value2', label: 'label2' }
            ],
            id: '1'
          }
        },
        [MEASURE]: { type: 'type' }
      };
      const codesListStore = {};
      const result = getCollectedVariablesMultiple(
        questionName,
        form,
        codesListStore
      );
      expect(result).toEqual([
        {
          id: result[0].id,
          label: 'value1 - label1',
          name: 'questionName1',
          x: 1,
          type: BOOLEAN,
          [TEXT]: undefined,
          [NUMERIC]: undefined,
          [DATE]: undefined,
          [BOOLEAN]: {}
        },
        {
          id: result[1].id,
          label: 'value2 - label2',
          name: 'questionName2',
          x: 2,
          type: BOOLEAN,
          [TEXT]: undefined,
          [NUMERIC]: undefined,
          [DATE]: undefined,
          [BOOLEAN]: {}
        }
      ]);
    });

    test('should return collected variables for QCM with codesList', () => {
      const questionName = 'questionName';
      const form = {
        [PRIMARY]: {
          [DEFAULT_CODES_LIST_SELECTOR_PATH]: {
            codes: [
              { value: 'value1', label: 'label1' },
              { value: 'value2', label: 'label2' }
            ],
            id: '1'
          }
        },
        [MEASURE]: { type: 'type' }
      };
      const codesListStore = {
        '1': { codes: { '1': { value: 'code1', label: 'label1' } } }
      };
      const result = getCollectedVariablesMultiple(
        questionName,
        form,
        codesListStore
      );
      expect(result).toEqual([
        {
          id: result[0].id,
          label: 'code1 - label1',
          name: 'questionName1',
          x: 1,
          type: BOOLEAN,
          [TEXT]: undefined,
          [NUMERIC]: undefined,
          [DATE]: undefined,
          [BOOLEAN]: {}
        }
      ]);
    });
  });
});
