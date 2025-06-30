import { describe, expect, it } from 'vitest';

import { getCollectedVariablesTable } from './collected-variables-table';

describe('getCollectedVariablesTable', () => {
  it('should return the collected variable when the type of the primary state is a code list', () => {
    const questionName = 'QUESTION';
    const form = {
      PRIMARY: {
        type: 'CODES_LIST',
        LIST: {
          DYNAMIC_LENGTH: { minimum: '', maximum: '' },
          FIXED_LENGTH: { size: '' },
          type: 'DYNAMIC_LENGTH',
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
                depth: 1,
              },
            ],
            panel: 'NEW',
          },
        },
      },
      SECONDARY: {
        CodesList: {
          id: 'jkwc2eah',
          label: '',
          codes: [],
        },
        showSecondaryAxis: false,
      },
      LIST_MEASURE: {
        label: '',
        type: 'SIMPLE',
        SIMPLE: {
          type: 'TEXT',
          TEXT: {
            maxLength: 249,
          },
          NUMERIC: {
            maximum: '',
            minimum: '',
            decimals: '',
          },
          DATE: {
            maximum: '',
            minimum: '',
            format: '',
          },
          BOOLEAN: {},
          DURATION: {
            maximum: '',
            minimum: '',
            format: '',
          },
        },
        SINGLE_CHOICE: {
          CodesList: {
            id: 'jkwc3neg',
            label: '',
            codes: [],
          },
          visHint: 'CHECKBOX',
        },
        measures: [
          {
            label: 'm1',
            type: 'SIMPLE',
            SIMPLE: {
              type: 'TEXT',
              TEXT: {
                maxLength: 249,
              },
              NUMERIC: {
                maximum: '',
                minimum: '',
                decimals: '',
              },
              DATE: {
                maximum: '',
                minimum: '',
                format: '',
              },
              BOOLEAN: {},
            },
            SINGLE_CHOICE: {
              CodesList: {
                id: 'jkwc3neg',
                label: '',
                codes: [],
              },
              visHint: 'CHECKBOX',
            },
          },
          {
            label: 'm2',
            type: 'SIMPLE',
            SIMPLE: {
              type: 'TEXT',
              TEXT: {
                maxLength: 249,
              },
              NUMERIC: {
                maximum: '',
                minimum: '',
                decimals: '',
              },
              DATE: {
                maximum: '',
                minimum: '',
                format: '',
              },
              BOOLEAN: {},
            },
            SINGLE_CHOICE: {
              CodesList: {
                id: 'jkwc3neg',
                label: '',
                codes: [],
              },
              visHint: 'CHECKBOX',
            },
          },
        ],
      },
      MEASURE: {
        label: '',
        type: 'SIMPLE',
        SIMPLE: {
          type: 'TEXT',
          TEXT: {
            maxLength: 249,
          },
          NUMERIC: {
            maximum: '',
            minimum: '',
            decimals: '',
          },
          DATE: {
            maximum: '',
            minimum: '',
            format: '',
          },
          BOOLEAN: {},
        },
        SINGLE_CHOICE: {
          CodesList: {
            id: 'jkwc3neg',
            label: '',
            codes: [],
          },
          visHint: 'CHECKBOX',
        },
      },
    };
    const codesListStore = {};
    const output = getCollectedVariablesTable(
      questionName,
      form,
      codesListStore,
    ).map((variable) => variable.label);
    expect(output).toEqual(['a-m1', 'a-m2']);
  });
  it('should return the collected variable when the type of the primary state is a list', () => {
    const questionName = 'QUESTION';
    const form = {
      PRIMARY: {
        type: 'LIST',
        LIST: {
          DYNAMIC_LENGTH: { minimum: '1', maximum: '3' },
          FIXED_LENGTH: { size: '' },
          type: 'DYNAMIC_LENGTH',
        },
        CODES_LIST: {
          CodesList: {
            id: 'jkwbsva2',
            label: '',
            codes: [],
          },
        },
      },
      SECONDARY: {
        CodesList: {
          id: 'jkwbklyv',
          label: '',
          codes: [],
        },
        showSecondaryAxis: false,
      },
      LIST_MEASURE: {
        label: '',
        type: 'SIMPLE',
        SIMPLE: {
          type: 'TEXT',
          TEXT: {
            maxLength: 249,
          },
          NUMERIC: {
            maximum: '',
            minimum: '',
            decimals: '',
          },
          DATE: {
            maximum: '',
            minimum: '',
            format: '',
          },
          BOOLEAN: {},
        },
        SINGLE_CHOICE: {
          CodesList: {
            id: 'jkwbf9ub',
            label: '',
            codes: [],
          },
          visHint: 'CHECKBOX',
        },
        measures: [
          {
            label: 'measure 1',
            type: 'SIMPLE',
            SIMPLE: {
              type: 'TEXT',
              TEXT: {
                maxLength: 249,
              },
              NUMERIC: {
                maximum: '',
                minimum: '',
                decimals: '',
              },
              DATE: {
                maximum: '',
                minimum: '',
                format: '',
              },
              BOOLEAN: {},
            },
            SINGLE_CHOICE: {
              CodesList: {
                id: 'jkwbf9ub',
                label: '',
                codes: [],
              },
              visHint: 'CHECKBOX',
            },
          },
          {
            label: 'measure 2',
            type: 'SIMPLE',
            SIMPLE: {
              type: 'TEXT',
              TEXT: {
                maxLength: 249,
              },
              NUMERIC: {
                maximum: '',
                minimum: '',
                decimals: '',
              },
              DATE: {
                maximum: '',
                minimum: '',
                format: '',
              },
              BOOLEAN: {},
            },
            SINGLE_CHOICE: {
              CodesList: {
                id: 'jkwbf9ub',
                label: '',
                codes: [],
              },
              visHint: 'CHECKBOX',
            },
          },
        ],
      },
      MEASURE: {
        label: '',
        type: 'SIMPLE',
        SIMPLE: {
          type: 'TEXT',
          TEXT: {
            maxLength: 249,
          },
          NUMERIC: {
            maximum: '',
            minimum: '',
            decimals: '',
          },
          DATE: {
            maximum: '',
            minimum: '',
            format: '',
          },
          BOOLEAN: {},
        },
        SINGLE_CHOICE: {
          CodesList: {
            id: 'jkwbf9ub',
            label: '',
            codes: [],
          },
          visHint: 'CHECKBOX',
        },
      },
    };
    const codesListStore = {};
    const output = getCollectedVariablesTable(
      questionName,
      form,
      codesListStore,
    );

    const outputLabels = output.map((variable) => variable.label);
    expect(outputLabels).toEqual(['measure 1', 'measure 2']);

    const outputCoordinates = output.map(({ x, y }) => {
      return { x, y };
    });
    expect(outputCoordinates).toEqual([
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ]);
  });
});
