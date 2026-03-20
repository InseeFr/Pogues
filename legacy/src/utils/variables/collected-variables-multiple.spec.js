import { describe, expect, test } from 'vitest';

import { getCollectedVariablesMultiple } from './collected-variables-multiple';

describe('getCollectedVariablesMultiple', () => {
  test('computes multiple variables for QCM without precision', () => {
    const questionName = 'questionName';
    const form = {
      PRIMARY: {
        CodesList: {
          id: 'id',
          label: 'label',
          codes: [
            {
              value: 'value1',
              label: 'label1',
              weight: 1,
            },
            {
              value: 'value2',
              label: 'label2',
              weight: 2,
            },
          ],
        },
      },
      MEASURE: { type: 'BOOL' },
    };
    const codesListStore = {
      id: {
        id: 'id',
        label: 'label',
        codes: [
          {
            value: 'value1',
            label: 'label1',
            weight: 1,
          },
          {
            value: 'value2',
            label: 'label2',
            weight: 2,
          },
        ],
      },
    };
    const result = getCollectedVariablesMultiple(
      questionName,
      form,
      codesListStore,
    );

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        type: 'BOOLEAN',
        BOOLEAN: {},
        id: result[0].id,
        name: 'questionName1',
        label: 'value1 - label1',
        x: 1,
        isCollected: '1',
        alternativeLabel: '',
      },
      {
        type: 'BOOLEAN',
        BOOLEAN: {},
        id: result[1].id,
        name: 'questionName2',
        label: 'value2 - label2',
        x: 2,
        isCollected: '1',
        alternativeLabel: '',
      },
    ]);
  });

  test('computes clarification variable for QCM with precision', () => {
    const questionName = 'questionName';
    const form = {
      PRIMARY: {
        CodesList: {
          id: 'id',
          label: 'label',
          codes: [
            {
              value: 'value1',
              label: 'label1',
              weight: 1,
              precisionid: 'precision',
              precisionlabel: 'precisionlabel',
              precisionsize: 249,
            },
            {
              value: 'value2',
              label: 'label2',
              weight: 2,
            },
          ],
        },
      },
      MEASURE: { type: 'BOOL' },
    };
    const codesListStore = {
      id: {
        id: 'id',
        label: 'label',
        codes: [
          {
            value: 'value1',
            label: 'label1',
            weight: 1,
          },
          {
            value: 'value2',
            label: 'label2',
            weight: 2,
          },
        ],
      },
    };
    const result = getCollectedVariablesMultiple(
      questionName,
      form,
      codesListStore,
    );

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      {
        type: 'BOOLEAN',
        BOOLEAN: {},
        id: result[0].id,
        name: 'questionName1',
        label: 'value1 - label1',
        x: 1,
        isCollected: '1',
        alternativeLabel: '',
      },
      {
        type: 'BOOLEAN',
        BOOLEAN: {},
        id: result[1].id,
        name: 'questionName2',
        label: 'value2 - label2',
        x: 2,
        isCollected: '1',
        alternativeLabel: '',
      },
      {
        type: 'TEXT',
        TEXT: { maxLength: 249 },
        id: result[2].id,
        name: 'precision',
        label: 'precision label',
        isCollected: '1',
        z: 1,
      },
    ]);
  });

  test('computes existing precision variable when there is an existing precision in codesList', () => {
    const questionName = 'questionName';
    const form = {
      PRIMARY: {
        CodesList: {
          id: 'id',
          label: 'label',
          codes: [
            {
              value: 'value1',
              label: 'label1',
              weight: 1,
              precisionByCollectedVariableId: {
                var3: {
                  precisionid: 'precision',
                  precisionlabel: 'precisionlabel',
                  precisionsize: 249,
                },
              },
            },
            {
              value: 'value2',
              label: 'label2',
              weight: 2,
            },
          ],
        },
      },
      MEASURE: { type: 'BOOL' },
    };
    const codesListStore = {
      id: {
        id: 'id',
        label: 'label',
        codes: [
          {
            value: 'value1',
            label: 'label1',
            weight: 1,
          },
          {
            value: 'value2',
            label: 'label2',
            weight: 2,
          },
        ],
      },
    };
    const existingVariableIds = new Set(['var1', 'var2', 'var3']);
    const result = getCollectedVariablesMultiple(
      questionName,
      form,
      codesListStore,
      existingVariableIds,
    );

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      {
        type: 'BOOLEAN',
        BOOLEAN: {},
        id: result[0].id,
        name: 'questionName1',
        label: 'value1 - label1',
        x: 1,
        isCollected: '1',
        alternativeLabel: '',
      },
      {
        type: 'BOOLEAN',
        BOOLEAN: {},
        id: result[1].id,
        name: 'questionName2',
        label: 'value2 - label2',
        x: 2,
        isCollected: '1',
        alternativeLabel: '',
      },
      {
        type: 'TEXT',
        TEXT: { maxLength: 249 },
        id: 'var3',
        name: 'precision',
        label: 'precision label',
        isCollected: '1',
        z: 1,
      },
    ]);
  });
});
