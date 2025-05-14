import { describe, expect, it } from 'vitest';

import { remoteToState, stateToRemote } from './response-format-table';

describe('remoteToState', () => {
  it('should use an offset equal to 1, with old modelization of dimension', () => {
    const remote = {
      responses: [
        {
          id: 'joy1vnzz',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          CollectedVariableReference: 'joxzq5qe',
        },
        {
          id: 'joy1ujjc',
          Datatype: {
            typeName: 'NUMERIC',
            type: 'NumericDatatypeType',
            Minimum: '0',
            Maximum: '10',
            Decimals: '',
          },
          CollectedVariableReference: 'joxzsdwi',
        },

        {
          id: 'k1ai8yzv',
          Datatype: {
            typeName: 'DATE',
            type: 'DateDatatypeType',
            Format: 'dd-mm-yyyy',
            Minimum: '',
            Maximum: '',
          },
          CollectedVariableReference: 'k1ail7ly',
        },

        {
          id: 'k1tcqelo',
          Datatype: {
            Format: 'PTnHnM',
            Mahours: '2',
            Maminutes: '1',
            Mamonths: '',
            Maximum: 'PT2H1M',
            Mayears: '',
            Mihours: '1',
            Miminutes: '1',
            Mimonths: '',
            Minimum: 'PT1H1M',
            Miyears: '',
            type: 'DurationDatatypeType',
            typeName: 'DURATION',
          },
          CollectedVariableReference: 'k1tcqec4',
        },
      ],
      dimensions: [
        {
          dimensionType: 'PRIMARY',
          dynamic: '1-10',
        },
        {
          dimensionType: 'MEASURE',
          dynamic: '0',
          Label: 'mes1',
        },
        {
          dimensionType: 'MEASURE',
          dynamic: '0',
          Label: 'mes2',
        },
        {
          dimensionType: 'MEASURE',
          dynamic: '0',
          Label: 'mes3',
        },
        {
          dimensionType: 'MEASURE',
          dynamic: '0',
          Label: 'mes4',
        },
      ],
    };

    const codesListsStore = {};

    const output = {
      PRIMARY: {
        type: 'LIST',
        LIST: {
          type: 'DYNAMIC_LENGTH',
          DYNAMIC_LENGTH: {
            minLines: 1,
            maxLines: 10,
          },
          FIXED_LENGTH: {
            fixedLength: undefined,
          },
        },
      },
      LIST_MEASURE: [
        {
          label: 'mes1',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'TEXT',
            TEXT: {
              maxLength: 249,
            },
          },
        },

        {
          label: 'mes2',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'NUMERIC',
            NUMERIC: {
              minimum: '0',
              maximum: '10',
              decimals: '',
            },
          },
        },

        {
          label: 'mes3',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'DATE',
            DATE: {
              minimum: '',
              maximum: '',
              format: 'dd-mm-yyyy',
            },
          },
        },

        {
          label: 'mes4',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'DURATION',
            DURATION: {
              maximum: 'PT2H1M',
              minimum: 'PT1H1M',
              format: 'PTnHnM',
              mihours: '1',
              miminutes: '1',
              mahours: '2',
              maminutes: '1',
            },
          },
        },
      ],
    };
    expect(remoteToState(remote, codesListsStore)).toEqual(output);
  });
  it('should use an offset equal to 1, with new modelization of dimension', () => {
    const remote = {
      responses: [
        {
          id: 'joy1vnzz',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          conditionFilter: 'my condition',
          conditionReadOnly: 'readonly condition',
          CollectedVariableReference: 'joxzq5qe',
        },
        {
          id: 'joy1ujjc',
          Datatype: {
            typeName: 'NUMERIC',
            type: 'NumericDatatypeType',
            Minimum: '0',
            Maximum: '10',
            Decimals: '',
          },
          CollectedVariableReference: 'joxzsdwi',
        },

        {
          id: 'k1ai8yzv',
          Datatype: {
            typeName: 'DATE',
            type: 'DateDatatypeType',
            Format: 'dd-mm-yyyy',
            Minimum: '',
            Maximum: '',
          },
          CollectedVariableReference: 'k1ail7ly',
        },

        {
          id: 'k1tcqelo',
          Datatype: {
            Format: 'PTnHnM',
            Mahours: '2',
            Maminutes: '1',
            Mamonths: '',
            Maximum: 'PT2H1M',
            Mayears: '',
            Mihours: '1',
            Miminutes: '1',
            Mimonths: '',
            Minimum: 'PT1H1M',
            Miyears: '',
            type: 'DurationDatatypeType',
            typeName: 'DURATION',
          },
          CollectedVariableReference: 'k1tcqec4',
        },
      ],
      dimensions: [
        {
          dimensionType: 'PRIMARY',
          dynamic: 'DYNAMIC_LENGTH',
          MinLines: 1,
          MaxLines: 10,
        },
        {
          dimensionType: 'MEASURE',
          Label: 'mes1',
        },
        {
          dimensionType: 'MEASURE',
          Label: 'mes2',
        },
        {
          dimensionType: 'MEASURE',
          Label: 'mes3',
        },
        {
          dimensionType: 'MEASURE',
          Label: 'mes4',
        },
      ],
    };

    const codesListsStore = {};

    const output = {
      PRIMARY: {
        type: 'LIST',
        LIST: {
          type: 'DYNAMIC_LENGTH',
          DYNAMIC_LENGTH: {
            minLines: 1,
            maxLines: 10,
          },
          FIXED_LENGTH: {
            fixedLength: undefined,
          },
        },
      },
      LIST_MEASURE: [
        {
          label: 'mes1',
          conditionFilter: 'my condition',
          conditionReadOnly: 'readonly condition',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'TEXT',
            TEXT: {
              maxLength: 249,
            },
          },
        },

        {
          label: 'mes2',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'NUMERIC',
            NUMERIC: {
              minimum: '0',
              maximum: '10',
              decimals: '',
            },
          },
        },

        {
          label: 'mes3',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'DATE',
            DATE: {
              minimum: '',
              maximum: '',
              format: 'dd-mm-yyyy',
            },
          },
        },

        {
          label: 'mes4',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'DURATION',
            DURATION: {
              maximum: 'PT2H1M',
              minimum: 'PT1H1M',
              format: 'PTnHnM',
              mihours: '1',
              miminutes: '1',
              mahours: '2',
              maminutes: '1',
            },
          },
        },
      ],
    };
    expect(remoteToState(remote, codesListsStore)).toEqual(output);
  });
  it('with hierarchical codes, with old modelization of dimension', () => {
    const remote = {
      responses: [
        {
          id: 'jjjyttfv',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          CollectedVariableReference: 'jjjyjq15',
        },

        {
          id: 'jjjz2i63',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          CollectedVariableReference: 'jjjyymbc',
        },
      ],
      dimensions: [
        {
          dimensionType: 'PRIMARY',
          dynamic: '0',
          CodeListReference: 'jjjyt2ta',
        },
        {
          dimensionType: 'MEASURE',
          dynamic: '0',
          Label: 'measure1',
        },
        {
          dimensionType: 'MEASURE',
          dynamic: '0',
          Label: 'measure2',
        },
      ],
    };
    const codesListsStore = {
      jjjyt2ta: {
        id: 'jjjyt2ta',
        label: 'new',
        codes: {
          a1: {
            value: 'a1',
            label: 'a1',
            parent: '',
            depth: 1,
            weight: 1,
          },
          a2: {
            value: 'a2',
            label: 'a2',
            parent: 'a1',
            depth: 2,
            weight: 1,
          },
        },
        name: '',
      },
    };
    const output = {
      PRIMARY: {
        type: 'CODES_LIST',
        CODES_LIST: {
          CodesList: {
            id: 'jjjyt2ta',
          },
        },
      },
      LIST_MEASURE: [
        {
          label: 'measure1',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'TEXT',
            TEXT: {
              maxLength: 249,
            },
          },
        },
        {
          label: 'measure2',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'TEXT',
            TEXT: {
              maxLength: 249,
            },
          },
        },
      ],
    };
    expect(remoteToState(remote, codesListsStore)).toEqual(output);
  });
  it('with hierarchical codes, with new modelization of dimension', () => {
    const remote = {
      responses: [
        {
          id: 'jjjyttfv',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          CollectedVariableReference: 'jjjyjq15',
        },

        {
          id: 'jjjz2i63',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          CollectedVariableReference: 'jjjyymbc',
        },
      ],
      dimensions: [
        {
          dimensionType: 'PRIMARY',
          dynamic: 'NON_DYNAMIC',
          CodeListReference: 'jjjyt2ta',
        },
        {
          dimensionType: 'MEASURE',
          Label: 'measure1',
        },
        {
          dimensionType: 'MEASURE',
          Label: 'measure2',
        },
      ],
    };
    const codesListsStore = {
      jjjyt2ta: {
        id: 'jjjyt2ta',
        label: 'new',
        codes: {
          a1: {
            value: 'a1',
            label: 'a1',
            parent: '',
            depth: 1,
            weight: 1,
          },
          a2: {
            value: 'a2',
            label: 'a2',
            parent: 'a1',
            depth: 2,
            weight: 1,
          },
        },
        name: '',
      },
    };
    const output = {
      PRIMARY: {
        type: 'CODES_LIST',
        CODES_LIST: {
          CodesList: {
            id: 'jjjyt2ta',
          },
        },
      },
      LIST_MEASURE: [
        {
          label: 'measure1',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'TEXT',
            TEXT: {
              maxLength: 249,
            },
          },
        },
        {
          label: 'measure2',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'TEXT',
            TEXT: {
              maxLength: 249,
            },
          },
        },
      ],
    };
    expect(remoteToState(remote, codesListsStore)).toEqual(output);
  });
  it('without secondary axes, with old modelization of dimension', () => {
    const remote = {
      responses: [
        {
          id: 'jf0vzwbp',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          CollectedVariableReference: 'jf0vzlbq',
        },
        {
          id: 'jf0vunia',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          CollectedVariableReference: 'jf0vjphy',
        },
        {
          id: 'jf0vqmpo',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          CollectedVariableReference: 'jf0vyha5',
        },
      ],
      dimensions: [
        { dimensionType: 'PRIMARY', dynamic: '1-3' },
        { dimensionType: 'MEASURE', dynamic: '0', Label: 'mneasure1' },
      ],
    };
    const codesListsStore = {};
    const output = {
      LIST_MEASURE: [
        {
          SIMPLE: {
            TEXT: { maxLength: 249 },
            id: undefined,
            mandatory: undefined,
            type: 'TEXT',
          },
          label: 'mneasure1',
          type: 'SIMPLE',
        },
      ],
      PRIMARY: {
        LIST: {
          type: 'DYNAMIC_LENGTH',
          DYNAMIC_LENGTH: {
            minLines: 1,
            maxLines: 3,
          },
          FIXED_LENGTH: {
            fixedLength: undefined,
          },
        },
        type: 'LIST',
      },
    };
    expect(remoteToState(remote, codesListsStore)).toEqual(output);
  });
  it('without secondary axes, with new modelization of dimension', () => {
    const remote = {
      responses: [
        {
          id: 'jf0vzwbp',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          CollectedVariableReference: 'jf0vzlbq',
        },
        {
          id: 'jf0vunia',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          CollectedVariableReference: 'jf0vjphy',
        },
        {
          id: 'jf0vqmpo',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          CollectedVariableReference: 'jf0vyha5',
        },
      ],
      dimensions: [
        {
          dimensionType: 'PRIMARY',
          dynamic: 'DYNAMIC_LENGTH',
          MinLines: 1,
          MaxLines: 3,
        },
        { dimensionType: 'MEASURE', Label: 'mneasure1' },
      ],
    };
    const codesListsStore = {};
    const output = {
      LIST_MEASURE: [
        {
          SIMPLE: {
            TEXT: { maxLength: 249 },
            id: undefined,
            mandatory: undefined,
            type: 'TEXT',
          },
          label: 'mneasure1',
          type: 'SIMPLE',
        },
      ],
      PRIMARY: {
        LIST: {
          type: 'DYNAMIC_LENGTH',
          DYNAMIC_LENGTH: {
            minLines: 1,
            maxLines: 3,
          },
          FIXED_LENGTH: {
            fixedLength: undefined,
          },
        },
        type: 'LIST',
      },
    };
    expect(remoteToState(remote, codesListsStore)).toEqual(output);
  });
  it('with secondary axes, with old modelization of dimension', () => {
    const remote = {
      responses: [
        {
          id: 'jf0vblxi',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          CollectedVariableReference: 'jf0vahmg',
        },
      ],
      dimensions: [
        {
          dimensionType: 'PRIMARY',
          dynamic: '0',
          CodeListReference: 'jf0vbzj9',
        },
        {
          dimensionType: 'SECONDARY',
          dynamic: '0',
          CodeListReference: 'jf0vj3il',
        },
        { dimensionType: 'MEASURE', dynamic: '0', Label: 'fsdfsdfsdf' },
      ],
    };
    const codesListsStore = {
      jf0vbzj9: {
        id: 'jf0vbzj9',
        label: 'code list',
        codes: {
          c1: { value: 'c1', label: 'asd', parent: '', depth: 1, weight: 1 },
        },
        name: '',
      },
      jf0vj3il: {
        id: 'jf0vj3il',
        label: 'code lisg 23',
        codes: {
          df: { value: 'df', label: 'sdfs', parent: '', depth: 1, weight: 1 },
        },
        name: '',
      },
    };
    const output = {
      MEASURE: {
        SIMPLE: {
          TEXT: {
            maxLength: 249,
          },
          id: undefined,
          mandatory: undefined,
          type: 'TEXT',
        },
        label: 'fsdfsdfsdf',
        type: 'SIMPLE',
      },
      PRIMARY: {
        CODES_LIST: {
          CodesList: {
            id: 'jf0vbzj9',
          },
        },
        type: 'CODES_LIST',
      },
      SECONDARY: {
        CodesList: {
          id: 'jf0vj3il',
        },
        showSecondaryAxis: true,
      },
    };
    expect(remoteToState(remote, codesListsStore)).toEqual(output);
  });
  it('with secondary axes, with new modelization of dimension', () => {
    const remote = {
      responses: [
        {
          id: 'jf0vblxi',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 249,
          },
          CollectedVariableReference: 'jf0vahmg',
        },
      ],
      dimensions: [
        {
          dimensionType: 'PRIMARY',
          dynamic: 'NON_DYNAMIC',
          CodeListReference: 'jf0vbzj9',
        },
        {
          dimensionType: 'SECONDARY',
          CodeListReference: 'jf0vj3il',
        },
        { dimensionType: 'MEASURE', Label: 'fsdfsdfsdf' },
      ],
    };
    const codesListsStore = {
      jf0vbzj9: {
        id: 'jf0vbzj9',
        label: 'code list',
        codes: {
          c1: { value: 'c1', label: 'asd', parent: '', depth: 1, weight: 1 },
        },
        name: '',
      },
      jf0vj3il: {
        id: 'jf0vj3il',
        label: 'code lisg 23',
        codes: {
          df: { value: 'df', label: 'sdfs', parent: '', depth: 1, weight: 1 },
        },
        name: '',
      },
    };
    const output = {
      MEASURE: {
        SIMPLE: {
          TEXT: {
            maxLength: 249,
          },
          id: undefined,
          mandatory: undefined,
          type: 'TEXT',
        },
        label: 'fsdfsdfsdf',
        type: 'SIMPLE',
      },
      PRIMARY: {
        CODES_LIST: {
          CodesList: {
            id: 'jf0vbzj9',
          },
        },
        type: 'CODES_LIST',
      },
      SECONDARY: {
        CodesList: {
          id: 'jf0vj3il',
        },
        showSecondaryAxis: true,
      },
    };
    expect(remoteToState(remote, codesListsStore)).toEqual(output);
  });
});

describe('stateToRemote', () => {
  it('with list as primary type', () => {
    const state = {
      PRIMARY: {
        type: 'LIST',
        LIST: {
          type: 'DYNAMIC_LENGTH',
          DYNAMIC_LENGTH: {
            minLines: 2,
            maxLines: 3,
          },
        },
      },
      LIST_MEASURE: [
        {
          label: 'measure 1',
          conditionFilter: 'my condition',
          type: 'SIMPLE',
          SIMPLE: { type: 'TEXT', TEXT: { maxLength: 249 } },
        },
        {
          label: 'measure 2',
          type: 'SIMPLE',
          SIMPLE: { type: 'TEXT', TEXT: { maxLength: 249 } },
        },
      ],
    };
    const collectedVariables = ['jf0v461m', 'jf0v6ywk'];
    const collectedVariablesStore = {
      jf0v461m: {
        id: 'jf0v461m',
        name: 'QUESTION11',
        label: 'Line1-measure 1',
        x: 1,
        y: 1,
        type: 'TEXT',
        TEXT: { maxLength: 249 },
        NUMERIC: { maximum: '', minimum: '', decimals: '' },
        DURATION: { maximum: '', minimum: '', format: '' },
        DATE: { maximum: '', minimum: '', format: '' },
        BOOLEAN: {},
        isCollected: '1',
        codeListReference: '',
        codeListReferenceLabel: '',
      },
      jf0v6ywk: {
        id: 'jf0v6ywk',
        name: 'QUESTION21',
        label: 'Line2-measure 1',
        x: 1,
        y: 2,
        type: 'TEXT',
        TEXT: { maxLength: 249 },
        NUMERIC: { maximum: '', minimum: '', decimals: '' },
        DURATION: { maximum: '', minimum: '', format: '' },
        DATE: { maximum: '', minimum: '', format: '' },
        BOOLEAN: {},
        isCollected: '1',
        codeListReference: '',
        codeListReferenceLabel: '',
      },
    };
    const result = stateToRemote(
      state,
      collectedVariables,
      collectedVariablesStore,
    );

    expect(result.Dimension).toEqual([
      {
        dimensionType: 'PRIMARY',
        dynamic: 'DYNAMIC_LENGTH',
        MinLines: 2,
        MaxLines: 3,
      },
      {
        Label: 'measure 1',
        dimensionType: 'MEASURE',
      },
      {
        Label: 'measure 2',
        dimensionType: 'MEASURE',
      },
    ]);

    expect(result.Attribute).toEqual([]);

    const outputMapping = result.Mapping;
    const outputResponse = result.Response;

    expect(outputMapping.length).toEqual(outputResponse.length);
    expect(outputResponse[0].conditionFilter).toEqual('my condition');
    expect(outputResponse[1].conditionFilter).toBeUndefined();
    expect(outputResponse[0].Datatype).toEqual({
      MaxLength: 249,

      type: 'TextDatatypeType',
      typeName: 'TEXT',
    });
    expect(outputResponse[1].Datatype).toEqual({
      MaxLength: 249,

      type: 'TextDatatypeType',
      typeName: 'TEXT',
    });
    expect(outputMapping[0].MappingTarget).toEqual('1 1');
    expect(outputMapping[1].MappingTarget).toEqual('1 2');
  });

  it('with code list as primary type, without secondary axes', () => {
    const state = {
      PRIMARY: {
        type: 'CODES_LIST',
        CODES_LIST: { CodesList: { id: 'jf0vbzj9' } },
      },
      LIST_MEASURE: [
        {
          label: 'measure 1',
          conditionFilter: 'my condition',
          type: 'SIMPLE',
          SIMPLE: { type: 'TEXT', TEXT: { maxLength: 249 } },
        },
        {
          label: 'measure 2',
          type: 'SIMPLE',
          SIMPLE: { type: 'TEXT', TEXT: { maxLength: 249 } },
        },
      ],
    };
    const collectedVariables = ['jf0v461m', 'jf0v6ywk', 'jg4v561m', 'jk8h32gm'];
    const collectedVariablesStore = {
      jf0v461m: {
        id: 'jf0v461m',
        name: 'QUESTION11',
        label: 'Line1-measure 1',
        x: 1,
        y: 1,
        type: 'TEXT',
        TEXT: { maxLength: 249 },
        NUMERIC: { maximum: '', minimum: '', decimals: '' },
        DURATION: { maximum: '', minimum: '', format: '' },
        DATE: { maximum: '', minimum: '', format: '' },
        BOOLEAN: {},
        isCollected: '0',
        codeListReference: '',
        codeListReferenceLabel: '',
      },
      jf0v6ywk: {
        id: 'jf0v6ywk',
        name: 'QUESTION21',
        label: 'Line2-measure 1',
        x: 2,
        y: 1,
        type: 'TEXT',
        TEXT: { maxLength: 249 },
        NUMERIC: { maximum: '', minimum: '', decimals: '' },
        DURATION: { maximum: '', minimum: '', format: '' },
        DATE: { maximum: '', minimum: '', format: '' },
        BOOLEAN: {},
        isCollected: '0',
        codeListReference: '',
        codeListReferenceLabel: '',
      },
      jg4v561m: {
        id: 'jg4v561m',
        name: 'QUESTION12',
        label: 'Line1-measure 2',
        x: 1,
        y: 2,
        type: 'TEXT',
        TEXT: { maxLength: 249 },
        NUMERIC: { maximum: '', minimum: '', decimals: '' },
        DURATION: { maximum: '', minimum: '', format: '' },
        DATE: { maximum: '', minimum: '', format: '' },
        BOOLEAN: {},
        isCollected: '0',
        codeListReference: '',
        codeListReferenceLabel: '',
      },
      jk8h32gm: {
        id: 'jk8h32gm',
        name: 'QUESTION22',
        label: 'Line2-measure 2',
        x: 2,
        y: 2,
        type: 'TEXT',
        TEXT: { maxLength: 249 },
        NUMERIC: { maximum: '', minimum: '', decimals: '' },
        DURATION: { maximum: '', minimum: '', format: '' },
        DATE: { maximum: '', minimum: '', format: '' },
        BOOLEAN: {},
        isCollected: '0',
        codeListReference: '',
        codeListReferenceLabel: '',
      },
    };
    const result = stateToRemote(
      state,
      collectedVariables,
      collectedVariablesStore,
    );

    expect(result.Dimension).toEqual([
      {
        CodeListReference: 'jf0vbzj9',
        dimensionType: 'PRIMARY',
        dynamic: 'NON_DYNAMIC',
      },
      {
        Label: 'measure 1',
        dimensionType: 'MEASURE',
      },
      {
        Label: 'measure 2',
        dimensionType: 'MEASURE',
      },
    ]);

    expect(result.Attribute).toEqual([
      {
        AttributeValue: 'NoDataByDefinition',
        AttributeTarget: '1 1',
      },
      {
        AttributeValue: 'NoDataByDefinition',
        AttributeTarget: '2 1',
      },
      {
        AttributeTarget: '1 2',
        AttributeValue: 'NoDataByDefinition',
      },
      {
        AttributeTarget: '2 2',
        AttributeValue: 'NoDataByDefinition',
      },
    ]);

    const outputMapping = result.Mapping;
    const outputResponse = result.Response;

    expect(outputMapping.length).toEqual(outputResponse.length);

    // conditionFilter is saved only for table with list as primary type
    outputResponse.forEach((item) => {
      expect(item.conditionFilter).toBeUndefined();
    });

    expect(outputResponse[0].Datatype).toEqual({
      MaxLength: 249,
      type: 'TextDatatypeType',
      typeName: 'TEXT',
    });
    expect(outputResponse[1].Datatype).toEqual({
      MaxLength: 249,

      type: 'TextDatatypeType',
      typeName: 'TEXT',
    });
    expect(outputMapping[0].MappingTarget).toEqual('1 1');
    expect(outputMapping[1].MappingTarget).toEqual('2 1');
  });

  it('with code list as primary type, with secondary axes', () => {
    const state = {
      PRIMARY: {
        type: 'CODES_LIST',
        CODES_LIST: { CodesList: { id: 'jf0vbzj9' } },
      },
      SECONDARY: {
        showSecondaryAxis: true,
        CodesList: { id: 'jf0vj3il' },
      },
      MEASURE: {
        label: 'fsdfsdfsdf',
        type: 'SIMPLE',
        SIMPLE: { type: 'TEXT', TEXT: { maxLength: 249 } },
      },
    };
    const collectedVariables = ['jf0vahmg'];
    const collectedVariablesStore = {
      jf0vahmg: {
        id: 'jf0vahmg',
        name: 'QUESTION11',
        label: 'asd-sdfs-fsdfsdfsdf',
        x: 1,
        y: 1,
        type: 'TEXT',
        TEXT: { maxLength: 249 },
        NUMERIC: { maximum: '', minimum: '', decimals: '' },
        DURATION: { maximum: '', minimum: '', format: '' },
        DATE: {},
        BOOLEAN: {},
        isCollected: '0',
        codeListReference: '',
        codeListReferenceLabel: '',
      },
    };
    const result = stateToRemote(
      state,
      collectedVariables,
      collectedVariablesStore,
    );

    expect(result.Dimension).toEqual([
      {
        CodeListReference: 'jf0vbzj9',
        dimensionType: 'PRIMARY',
        dynamic: 'NON_DYNAMIC',
      },
      {
        CodeListReference: 'jf0vj3il',
        dimensionType: 'SECONDARY',
      },
      { Label: 'fsdfsdfsdf', dimensionType: 'MEASURE' },
    ]);

    expect(result.Attribute).toEqual([
      {
        AttributeValue: 'NoDataByDefinition',
        AttributeTarget: '1 1',
      },
    ]);

    const outputMapping = result.Mapping;
    const outputResponse = result.Response;

    expect(outputMapping.length).toEqual(outputResponse.length);
    expect(outputResponse[0].Datatype).toEqual({
      MaxLength: 249,

      type: 'TextDatatypeType',
      typeName: 'TEXT',
    });
    expect(outputMapping[0].MappingTarget).toEqual('1 1');
  });

  it('get responses id when editing question', () => {
    const state = {
      LIST_MEASURE: [
        {
          SIMPLE: {
            TEXT: { maxLength: 249 },
            type: 'TEXT',
          },
          label: 'testlibe',
          type: 'SIMPLE',
        },
      ],
      PRIMARY: {
        LIST: {
          type: 'DYNAMIC_LENGTH',
          DYNAMIC_LENGTH: {
            minLines: 1,
            maxLines: 2,
          },
        },
        type: 'LIST',
      },
    };
    const collectedVariables = ['kgs2nhvj'];
    const collectedVariablesStore = {
      kgs2nhvj: {
        BOOLEAN: undefined,
        DATE: undefined,
        DURATION: undefined,
        NUMERIC: undefined,
        TEXT: { maxLength: 249 },
        codeListReference: undefined,
        codeListReferenceLabel: '',
        id: 'kgs2nhvj',
        isCollected: '1',
        label: 'testlibe',
        mesureLevel: undefined,
        name: 'QUESTIONTA1',
        type: 'TEXT',
        x: 1,
        y: 1,
        z: undefined,
      },
    };
    const response = [
      {
        CollectedVariableReference: 'kgs2nhvj',
        Datatype: {
          typeName: 'TEXT',
          type: 'TextDatatypeType',
          MaxLength: 249,
        },
        id: 'kgs2rz8e',
      },
    ];
    const result = stateToRemote(
      state,
      collectedVariables,
      collectedVariablesStore,
      response,
    );

    expect(result.Dimension).toEqual([
      {
        dimensionType: 'PRIMARY',
        dynamic: 'DYNAMIC_LENGTH',
        MinLines: 1,
        MaxLines: 2,
      },
      {
        Label: 'testlibe',
        dimensionType: 'MEASURE',
      },
    ]);

    expect(result.Attribute).toEqual([]);

    const outputMapping = result.Mapping;
    const outputResponse = result.Response;

    expect(outputMapping.length).toEqual(outputResponse.length);
    expect(outputResponse[0]).toEqual({
      CollectedVariableReference: 'kgs2nhvj',
      Datatype: {
        typeName: 'TEXT',
        type: 'TextDatatypeType',
        MaxLength: 249,
      },
      id: 'kgs2rz8e',
    });
    expect(outputMapping[0].MappingTarget).toEqual('1 1');
  });
});
