import { remoteToState, stateToRemote } from './response-format-table';

describe('remoteToState', () => {
  it('should use an offset equal to 1', () => {
    const remote = {
      responses: [
        {
          id: 'joy1vnzz',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 255,
            Pattern: '',
            Format: '',
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
            Format: '',
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

      ],
    };

    const codesListsStore = {};

    const output = {
      PRIMARY: {
        type: 'LIST',
        LIST: {
          numLinesMin: 1,
          numLinesMax: 10,
        },
      },
      LIST_MEASURE: [
        {
          label: 'mes1',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'TEXT',
            TEXT: {
              maxLength: 255,
              pattern: '',
              format: "",
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
              format: "",
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
              format: "dd-mm-yyyy",
            },
          },
        },

        
      ],
    };
    expect(remoteToState(remote, codesListsStore)).toEqual(output);
  });
  it('with hierarchical codes', () => {
    const remote = {
      responses: [
        {
          id: 'jjjyttfv',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 255,
            Pattern: '',
          },
          CollectedVariableReference: 'jjjyjq15',
        },

        {
          id: 'jjjz2i63',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 255,
            Pattern: '',
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
              maxLength: 255,
              pattern: '',
            },
          },
        },
        {
          label: 'measure2',
          type: 'SIMPLE',
          SIMPLE: {
            type: 'TEXT',
            TEXT: {
              maxLength: 255,
              pattern: '',
            },
          },
        },
      ],
    };
    expect(remoteToState(remote, codesListsStore)).toEqual(output);
  });
  it('without secondary axes', () => {
    const remote = {
      responses: [
        {
          id: 'jf0vzwbp',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 255,
            Pattern: '',
          },
          CollectedVariableReference: 'jf0vzlbq',
        },
        {
          id: 'jf0vunia',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 255,
            Pattern: '',
          },
          CollectedVariableReference: 'jf0vjphy',
        },
        {
          id: 'jf0vqmpo',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 255,
            Pattern: '',
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
            TEXT: { maxLength: 255, pattern: '' },
            id: undefined,
            mandatory: undefined,
            type: 'TEXT',
          },
          label: 'mneasure1',
          type: 'SIMPLE',
        },
      ],
      PRIMARY: { LIST: { numLinesMax: 3, numLinesMin: 1 }, type: 'LIST' },
    };
    expect(remoteToState(remote, codesListsStore)).toEqual(output);
  });
  it('with secondary axes', () => {
    const remote = {
      responses: [
        {
          id: 'jf0vblxi',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 255,
            Pattern: '',
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
            maxLength: 255,
            pattern: '',
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
  it('without secondary axes', () => {
    const state = {
      PRIMARY: {
        showTotalLabel: '0',
        totalLabel: '',
        type: 'LIST',
        LIST: { numLinesMin: '2', numLinesMax: '3' },
      },
      LIST_MEASURE: [
        {
          label: 'measure 1',
          type: 'SIMPLE',
          SIMPLE: { type: 'TEXT', TEXT: { maxLength: 255, pattern: '' } },
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
        TEXT: { maxLength: 255, pattern: '' },
        NUMERIC: { maximum: '', minimum: '', decimals: '' },
        NUMERIC: { maximum: '', minimum: '', format: '' },
        DATE: {},
        BOOLEAN: {},
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
        TEXT: { maxLength: 255, pattern: '' },
        NUMERIC: { maximum: '', minimum: '', decimals: '' },
        NUMERIC: { maximum: '', minimum: '', format: '' },
        DATE: {},
        BOOLEAN: {},
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
        dynamic: '2-3',
      },
      {
        Label: 'measure 1',
        dimensionType: 'MEASURE',
        dynamic: '0',
      },
    ]);

    const outputMapping = result.Mapping;
    const outputResponse = result.Response;

    expect(outputMapping.length).toEqual(outputResponse.length);
    expect(outputResponse[0].Datatype).toEqual({
      MaxLength: 255,
      Pattern: '',
      type: 'TextDatatypeType',
      typeName: 'TEXT',
    });
    expect(outputResponse[1].Datatype).toEqual({
      MaxLength: 255,
      Pattern: '',
      type: 'TextDatatypeType',
      typeName: 'TEXT',
    });
    expect(outputMapping[0].MappingTarget).toEqual('1 1');
    expect(outputMapping[1].MappingTarget).toEqual('2 1');
  });

  it('with secondary axes', () => {
    const state = {
      PRIMARY: {
        showTotalLabel: '0',
        totalLabel: '',
        type: 'CODES_LIST',
        CODES_LIST: { CodesList: { id: 'jf0vbzj9' } },
      },
      SECONDARY: {
        showSecondaryAxis: true,
        showTotalLabel: '0',
        totalLabel: '',
        CodesList: { id: 'jf0vj3il' },
      },
      MEASURE: {
        label: 'fsdfsdfsdf',
        type: 'SIMPLE',
        SIMPLE: { type: 'TEXT', TEXT: { maxLength: 255, pattern: '' } },
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
        TEXT: { maxLength: 255, pattern: '' },
        NUMERIC: { maximum: '', minimum: '', decimals: '' },
        NUMERIC: { maximum: '', minimum: '', format: '' },
        DATE: {},
        BOOLEAN: {},
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
      { CodeListReference: 'jf0vbzj9', dimensionType: 'PRIMARY', dynamic: '0' },
      {
        CodeListReference: 'jf0vj3il',
        dimensionType: 'SECONDARY',
        dynamic: '0',
      },
      { Label: 'fsdfsdfsdf', dimensionType: 'MEASURE', dynamic: '0' },
    ]);

    const outputMapping = result.Mapping;
    const outputResponse = result.Response;

    expect(outputMapping.length).toEqual(outputResponse.length);
    expect(outputResponse[0].Datatype).toEqual({
      MaxLength: 255,
      Pattern: '',
      type: 'TextDatatypeType',
      typeName: 'TEXT',
    });
    expect(outputMapping[0].MappingTarget).toEqual('1 1');
  });
});
