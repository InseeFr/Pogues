import {
  sortByYAndX,
  getCollecteVariable,
  getCollectedVariablesMultiple,
  getCollectedVariablesTable,
  generateCollectedVariables
} from './collected-variables-utils';

import {
  DIMENSION_TYPE,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DATATYPE_NAME,
  QUESTION_TYPE_ENUM
} from 'constants/pogues-constants';
const { TEXT, BOOLEAN, DATE, NUMERIC } = DATATYPE_NAME;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
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
      codesListStore
    );

    expect(output[0].id).toBeDefined();
    expect(output[0].label).toEqual(`${questionName} label`);
    expect(output[0].name).toEqual(questionName);
  });
  it('SINGLE_CHOICE response format', () => {
    const responseFormat = SINGLE_CHOICE;
    const questionName = 'Question';
    const form = { CodesList: { id: 'id', label: 'label' } };
    const codesListStore = {};
    const output = generateCollectedVariables(
      responseFormat,
      questionName,
      form,
      codesListStore
    );

    expect(output[0].id).toBeDefined();
    const id = output[0].id;
    expect(output[0]).toEqual({
      codeListReference: 'id',
      codeListReferenceLabel: 'label',
      type: 'TEXT',
      TEXT: { maxLength: 1, pattern: '' },
      id,
      name: 'Question',
      label: 'Question label'
    });
  });
});

describe('getCollectedVariablesTable', () => {
  it('should return the collected variable when the type of the primary state is a code list', () => {
    const questionName = 'QUESTION';
    const form = {
      PRIMARY: {
        showTotalLabel: '0',
        totalLabel: '',
        type: 'CODES_LIST',
        LIST: {
          numLinesMin: '0',
          numLinesMax: 0
        },
        CODES_LIST: {
          CodesList: {
            id: 'jkwbrb7u',
            label: 'liste code',
            codes: [
              {
                value: 'a',
                label: 'a',
                parent: '',
                weight: 1,
                depth: 1
              }
            ],
            panel: 'NEW'
          }
        }
      },
      SECONDARY: {
        CodesList: {
          id: 'jkwc2eah',
          label: '',
          codes: []
        },
        showSecondaryAxis: false,
        showTotalLabel: '0',
        totalLabel: ''
      },
      LIST_MEASURE: {
        label: '',
        type: 'SIMPLE',
        SIMPLE: {
          type: 'TEXT',
          TEXT: {
            maxLength: 255,
            pattern: ''
          },
          NUMERIC: {
            maximum: '',
            minimum: '',
            decimals: ''
          },
          DATE: {},
          BOOLEAN: {}
        },
        SINGLE_CHOICE: {
          CodesList: {
            id: 'jkwc3neg',
            label: '',
            codes: []
          },
          visHint: 'CHECKBOX'
        },
        measures: [
          {
            label: 'm1',
            type: 'SIMPLE',
            SIMPLE: {
              type: 'TEXT',
              TEXT: {
                maxLength: 255,
                pattern: ''
              },
              NUMERIC: {
                maximum: '',
                minimum: '',
                decimals: ''
              },
              DATE: {},
              BOOLEAN: {}
            },
            SINGLE_CHOICE: {
              CodesList: {
                id: 'jkwc3neg',
                label: '',
                codes: []
              },
              visHint: 'CHECKBOX'
            }
          },
          {
            label: 'm2',
            type: 'SIMPLE',
            SIMPLE: {
              type: 'TEXT',
              TEXT: {
                maxLength: 255,
                pattern: ''
              },
              NUMERIC: {
                maximum: '',
                minimum: '',
                decimals: ''
              },
              DATE: {},
              BOOLEAN: {}
            },
            SINGLE_CHOICE: {
              CodesList: {
                id: 'jkwc3neg',
                label: '',
                codes: []
              },
              visHint: 'CHECKBOX'
            }
          }
        ]
      },
      MEASURE: {
        label: '',
        type: 'SIMPLE',
        SIMPLE: {
          type: 'TEXT',
          TEXT: {
            maxLength: 255,
            pattern: ''
          },
          NUMERIC: {
            maximum: '',
            minimum: '',
            decimals: ''
          },
          DATE: {},
          BOOLEAN: {}
        },
        SINGLE_CHOICE: {
          CodesList: {
            id: 'jkwc3neg',
            label: '',
            codes: []
          },
          visHint: 'CHECKBOX'
        }
      }
    };
    const codesListStore = {};
    const output = getCollectedVariablesTable(
      questionName,
      form,
      codesListStore
    ).map(variable => variable.label);
    expect(output).toEqual(['a-m1', 'a-m2']);
  });
  it('should return the collected variable when the type of the primary state is a list', () => {
    const questionName = 'QUESTION';
    const form = {
      PRIMARY: {
        showTotalLabel: '0',
        totalLabel: '',
        type: 'LIST',
        LIST: {
          numLinesMin: '1',
          numLinesMax: '4'
        },
        CODES_LIST: {
          CodesList: {
            id: 'jkwbsva2',
            label: '',
            codes: []
          }
        }
      },
      SECONDARY: {
        CodesList: {
          id: 'jkwbklyv',
          label: '',
          codes: []
        },
        showSecondaryAxis: false,
        showTotalLabel: '0',
        totalLabel: ''
      },
      LIST_MEASURE: {
        label: '',
        type: 'SIMPLE',
        SIMPLE: {
          type: 'TEXT',
          TEXT: {
            maxLength: 255,
            pattern: ''
          },
          NUMERIC: {
            maximum: '',
            minimum: '',
            decimals: ''
          },
          DATE: {},
          BOOLEAN: {}
        },
        SINGLE_CHOICE: {
          CodesList: {
            id: 'jkwbf9ub',
            label: '',
            codes: []
          },
          visHint: 'CHECKBOX'
        },
        measures: [
          {
            label: 'measure 1',
            type: 'SIMPLE',
            SIMPLE: {
              type: 'TEXT',
              TEXT: {
                maxLength: 255,
                pattern: ''
              },
              NUMERIC: {
                maximum: '',
                minimum: '',
                decimals: ''
              },
              DATE: {},
              BOOLEAN: {}
            },
            SINGLE_CHOICE: {
              CodesList: {
                id: 'jkwbf9ub',
                label: '',
                codes: []
              },
              visHint: 'CHECKBOX'
            }
          },
          {
            label: 'measure 2',
            type: 'SIMPLE',
            SIMPLE: {
              type: 'TEXT',
              TEXT: {
                maxLength: 255,
                pattern: ''
              },
              NUMERIC: {
                maximum: '',
                minimum: '',
                decimals: ''
              },
              DATE: {},
              BOOLEAN: {}
            },
            SINGLE_CHOICE: {
              CodesList: {
                id: 'jkwbf9ub',
                label: '',
                codes: []
              },
              visHint: 'CHECKBOX'
            }
          }
        ]
      },
      MEASURE: {
        label: '',
        type: 'SIMPLE',
        SIMPLE: {
          type: 'TEXT',
          TEXT: {
            maxLength: 255,
            pattern: ''
          },
          NUMERIC: {
            maximum: '',
            minimum: '',
            decimals: ''
          },
          DATE: {},
          BOOLEAN: {}
        },
        SINGLE_CHOICE: {
          CodesList: {
            id: 'jkwbf9ub',
            label: '',
            codes: []
          },
          visHint: 'CHECKBOX'
        }
      }
    };
    const codesListStore = {};
    const output = getCollectedVariablesTable(
      questionName,
      form,
      codesListStore
    );

    const outputLabels = output.map(variable => variable.label);
    expect(outputLabels).toEqual(['measure 1', 'measure 2']);

    const outputCoordinates = output.map(({ x, y }) => {
      return { x, y };
    });
    expect(outputCoordinates).toEqual([{ x: 1, y: 1 }, { x: 1, y: 2 }]);
  });
});

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

    test('should return a new id', () => {
      const result = getCollecteVariable(
        'name',
        'label',
        { x: 1, y: 2 },
        { id: 1 }
      );
      expect(result.id).not.toEqual(1);
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
              {
                value: 'value1',
                label: 'label1',
                depth: 1,
                weight: 1,
                parent: ''
              },
              {
                value: 'value2',
                label: 'label2',
                depth: 1,
                weight: 2,
                parent: ''
              }
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
