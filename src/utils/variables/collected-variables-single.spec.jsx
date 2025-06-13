import { describe, expect, test } from 'vitest';

import { getCollectedVariablesSingle } from './collected-variables-single';

describe('getCollectedVariablesSingle', () => {
  test('works for QCU without precision in codesList', () => {
    const questionName = 'questionName';
    const form = {
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
    };
    const result = getCollectedVariablesSingle(questionName, form);

    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        codeListReference: form.CodesList.id,
        codeListReferenceLabel: form.CodesList.label,
        type: 'TEXT',
        TEXT: { maxLength: 1 },
        id: result[0].id,
        name: 'questionName',
        label: 'questionName label',
      },
    ]);
  });

  test('computes needed new variable when there is a new precision in codesList', () => {
    const questionName = 'questionName';
    const form = {
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
    };
    const result = getCollectedVariablesSingle(questionName, form);

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        codeListReference: form.CodesList.id,
        codeListReferenceLabel: form.CodesList.label,
        type: 'TEXT',
        TEXT: { maxLength: 1 },
        id: result[0].id,
        name: 'questionName',
        label: 'questionName label',
      },
      {
        type: 'TEXT',
        TEXT: {
          maxLength: 249,
        },
        id: result[1].id,
        isCollected: '1',
        name: 'precision',
        label: 'precision label',
        z: 1,
      },
    ]);
  });

  test('computes existing precision variable when there is an existing precision in codesList', () => {
    const questionName = 'questionName';
    const form = {
      CodesList: {
        id: 'id',
        label: 'label',
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
      questionName,
      form,
      existingVariableIds,
    );

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        codeListReference: form.CodesList.id,
        codeListReferenceLabel: form.CodesList.label,
        type: 'TEXT',
        TEXT: { maxLength: 1 },
        id: result[0].id,
        name: 'questionName',
        label: 'questionName label',
      },
      {
        type: 'TEXT',
        TEXT: {
          maxLength: 249,
        },
        id: 'var2',
        isCollected: '1',
        name: 'precision',
        label: 'precision label',
        z: 1,
      },
    ]);
  });

  test('do not compute precision variable when it is a dropdown', () => {
    const questionName = 'questionName';
    const form = {
      visHint: 'DROPDOWN',
      CodesList: {
        id: 'id',
        label: 'label',
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
      questionName,
      form,
      existingVariableIds,
    );

    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        codeListReference: form.CodesList.id,
        codeListReferenceLabel: form.CodesList.label,
        type: 'TEXT',
        TEXT: { maxLength: 1 },
        id: result[0].id,
        name: 'questionName',
        label: 'questionName label',
      },
    ]);
  });

  test('should return suggester arbitrary variable if allowArbitraryResponse', () => {
    const questionName = 'questionName';
    const form = {
      allowArbitraryResponse: true,
      visHint: 'SUGGESTER',
      CodesList: { id: 'id', label: 'label', codes: [] },
    };

    const result = getCollectedVariablesSingle(questionName, form);

    expect(result).toEqual([
      {
        id: result[0].id,
        name: 'questionName',
        label: 'questionName label',
        codeListReference: form.CodesList.id,
        codeListReferenceLabel: form.CodesList.label,
        type: 'TEXT',
        TEXT: { maxLength: 1 },
      },
      {
        id: result[1].id,
        name: 'questionName_ARBITRARY',
        label: 'questionName_ARBITRARY label',
        type: 'TEXT',
        TEXT: { maxLength: 249 },
        arbitraryVariableOfVariableId: result[0].id,
      },
    ]);
  });
});
