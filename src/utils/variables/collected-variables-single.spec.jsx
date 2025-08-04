import { describe, expect, test } from 'vitest';

import { getCollectedVariablesSingle } from './collected-variables-single';

describe('getCollectedVariablesSingle', () => {
  test('computes a single variable for QCU without precision', () => {
    const form = {
      visHint: 'RADIO',
      CodesList: {
        id: 'my-cl-id',
        label: 'my-cl',
        codes: [
          { value: 'value1', label: 'label1' },
          { value: 'value2', label: 'label2' },
        ],
      },
    };
    const result = getCollectedVariablesSingle('MY_Q', form);

    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        id: expect.any(String),
        name: 'MY_Q',
        label: 'MY_Q label',
        codeListReference: 'my-cl-id',
        codeListReferenceLabel: 'my-cl',
        type: 'TEXT',
        TEXT: { maxLength: 1 },
      },
    ]);
  });

  test('computes clarification variable for QCU with precision', () => {
    const form = {
      visHint: 'RADIO',
      CodesList: {
        id: 'my-cl-id',
        label: 'my-cl',
        codes: [
          {
            value: 'value1',
            label: 'label1',
            precisionid: 'precision',
            precisionlabel: 'precisionlabel',
            precisionsize: 249,
            weight: 1,
          },
          { value: 'value2', label: 'label2' },
        ],
      },
    };
    const result = getCollectedVariablesSingle('MY_Q', form);

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        id: expect.any(String),
        name: 'MY_Q',
        label: 'MY_Q label',
        codeListReference: 'my-cl-id',
        codeListReferenceLabel: 'my-cl',
        type: 'TEXT',
        TEXT: { maxLength: 1 },
      },
      {
        id: expect.any(String),
        name: 'precision',
        label: 'precision label',
        type: 'TEXT',
        TEXT: { maxLength: 249 },
        isCollected: '1',
        z: 1,
      },
    ]);
  });

  test('computes existing precision variable when there is an existing precision in codesList', () => {
    const form = {
      visHint: 'RADIO',
      CodesList: {
        id: 'my-cl-id',
        label: 'my-cl',
        codes: [
          {
            value: 'value1',
            label: 'label1',
            weight: 1,
            precisionByCollectedVariableId: {
              var2: {
                precisionid: 'precision',
                precisionlabel: 'precisionlabel',
                precisionsize: 249,
              },
            },
          },
          {
            value: 'value2',
            label: 'label2',
          },
        ],
      },
    };
    const existingVariableIds = new Set(['var1', 'var2']);
    const result = getCollectedVariablesSingle(
      'MY_Q',
      form,
      existingVariableIds,
    );

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        id: expect.any(String),
        name: 'MY_Q',
        label: 'MY_Q label',
        codeListReference: 'my-cl-id',
        codeListReferenceLabel: 'my-cl',
        type: 'TEXT',
        TEXT: { maxLength: 1 },
      },
      {
        id: 'var2',
        name: 'precision',
        label: 'precision label',
        type: 'TEXT',
        TEXT: { maxLength: 249 },
        isCollected: '1',
        z: 1,
      },
    ]);
  });

  test.skip('does not compute a new precision variable when the precision size change', () => {
    const form = {
      visHint: 'RADIO',
      CodesList: {
        id: 'my-cl-id',
        label: 'my-cl',
        codes: [
          {
            value: 'value1',
            label: 'label1',
            weight: 1,
            precisionByCollectedVariableId: {
              var2: {
                precisionid: 'precision',
                precisionlabel: 'precisionlabel',
                precisionsize: 249,
              },
            },
            precisionid: 'precision',
            precisionlabel: 'precisionlabel',
            precisionsize: 42,
          },
          {
            value: 'value2',
            label: 'label2',
            weight: 2,
          },
        ],
      },
    };
    const existingVariableIds = new Set(['var1', 'var2']);
    const result = getCollectedVariablesSingle(
      'MY_Q',
      form,
      existingVariableIds,
    );

    expect(result).toEqual([
      {
        id: expect.any(String),
        name: 'MY_Q',
        label: 'MY_Q label',
        codeListReference: 'my-cl-id',
        codeListReferenceLabel: 'my-cl',
        type: 'TEXT',
        TEXT: { maxLength: 1 },
      },
      {
        id: 'var2',
        name: 'precision',
        label: 'precision label',
        type: 'TEXT',
        TEXT: { maxLength: 42 },
        isCollected: '1',
        z: 1,
      },
    ]);
  });

  test('does not compute a clarification variable for dropdown', () => {
    const form = {
      visHint: 'DROPDOWN',
      CodesList: {
        id: 'my-cl-id',
        label: 'my-cl',
        codes: [
          {
            value: 'value1',
            label: 'label1',
            weight: 1,
            precisionByCollectedVariableId: {
              var2: {
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
    };
    const existingVariableIds = new Set(['var1', 'var2']);
    const result = getCollectedVariablesSingle(
      'MY_Q',
      form,
      existingVariableIds,
    );

    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        id: expect.any(String),
        name: 'MY_Q',
        label: 'MY_Q label',
        codeListReference: 'my-cl-id',
        codeListReferenceLabel: 'my-cl',
        type: 'TEXT',
        TEXT: { maxLength: 1 },
      },
    ]);
  });

  test('computes suggester arbitrary variable', () => {
    const form = {
      allowArbitraryResponse: true,
      Nomenclature: { id: 'my-nomenclature-id', label: 'my-nomenclature' },
      visHint: 'SUGGESTER',
    };
    const result = getCollectedVariablesSingle('MY_Q', form);

    expect(result).toEqual([
      {
        id: expect.any(String),
        name: 'MY_Q',
        label: 'MY_Q label',
        codeListReference: 'my-nomenclature-id',
        codeListReferenceLabel: 'my-nomenclature',
        type: 'TEXT',
        TEXT: { maxLength: 1 },
      },
      {
        id: expect.any(String),
        name: 'MY_Q_ARBITRARY',
        label: 'MY_Q_ARBITRARY label',
        type: 'TEXT',
        TEXT: { maxLength: 249 },
        arbitraryVariableOfVariableId: expect.any(String),
      },
    ]);
    expect(result[1].arbitraryVariableOfVariableId === result[0].id);
  });

  test('does not compute suggester arbitrary variable if allowArbitraryResponse is false', () => {
    const form = {
      allowArbitraryResponse: false,
      Nomenclature: { id: 'my-nomenclature-id', label: 'my-nomenclature' },
      visHint: 'SUGGESTER',
    };
    const result = getCollectedVariablesSingle('MY_Q', form);

    expect(result).toEqual([
      {
        id: expect.any(String),
        name: 'MY_Q',
        label: 'MY_Q label',
        codeListReference: 'my-nomenclature-id',
        codeListReferenceLabel: 'my-nomenclature',
        type: 'TEXT',
        TEXT: { maxLength: 1 },
      },
    ]);
  });
});
