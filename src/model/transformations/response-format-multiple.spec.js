import { remoteToState, stateToRemote } from './response-format-multiple';

describe('response format multiple', () => {
  describe('remoteToState', () => {
    const remote = {
      responses: [
        {
          id: 'jf0wxgwc',
          Datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' },
          CollectedVariableReference: 'jf0wtl3p',
        },
      ],
      dimensions: [
        {
          dimensionType: 'PRIMARY',
          dynamic: '0',
          CodeListReference: 'jf0w3fab',
        },
        { dimensionType: 'MEASURE', dynamic: '0' },
      ],
    };
    const output = remoteToState(remote);
    const expected = {
      MEASURE: { BOOL: {}, type: 'BOOL' },
      PRIMARY: { CodesList: { id: 'jf0w3fab' } },
    };
    expect(output).toEqual(expected);
  });

  describe('stateToRemote', () => {
    it('should return the state representation of a table if question is new', () => {
      const state = {
        PRIMARY: { CodesList: { id: 'jf0w3fab' } },
        MEASURE: { type: 'BOOL', BOOL: {} },
      };
      const collectedVariables = ['jf0wtl3p'];
      const collectedVariablesStore = {
        jf0wtl3p: {
          id: 'jf0wtl3p',
          name: 'QUESTION1',
          label: 'c1 - c1',
          x: 1,
          y: null,
          type: 'BOOLEAN',
          BOOLEAN: {},
          codeListReferenceLabel: '',
        },
      };
      const response = undefined;
      const output = stateToRemote(
        state,
        collectedVariables,
        collectedVariablesStore,
        response,
      );
      const expected = {
        Dimension: [
          {
            CodeListReference: 'jf0w3fab',
            dimensionType: 'PRIMARY',
            dynamic: '0',
          },
          { dimensionType: 'MEASURE', dynamic: '0' },
        ],
        Mapping: [{ MappingSource: output.Response[0].id, MappingTarget: '1' }],
        Response: [
          {
            CollectedVariableReference: 'jf0wtl3p',
            Datatype: { type: 'BooleanDatatypeType', typeName: 'BOOLEAN' },
            id: output.Response[0].id,
          },
        ],
      };
      expect(output).toEqual(expected);
    });

    it('should return the state representation of a table if editing question', () => {
      const state = {
        PRIMARY: { CodesList: { id: 'kgs19ihv' } },
        MEASURE: { type: 'BOOL', BOOL: {} },
      };
      const collectedVariables = ['kgs1g55j', 'kgs1cxfn'];
      const collectedVariablesStore = {
        kgs1cxfn: {
          BOOLEAN: {},
          DATE: undefined,
          DURATION: undefined,
          NUMERIC: undefined,
          TEXT: undefined,
          codeListReference: undefined,
          codeListReferenceLabel: '',
          id: 'kgs1cxfn',
          isCollected: true,
          label: '2 - lib2',
          mesureLevel: undefined,
          name: 'QUESTIONTA2',
          type: 'BOOLEAN',
          x: 2,
          y: NaN,
          z: undefined,
        },
        kgs1g55j: {
          BOOLEAN: {},
          DATE: undefined,
          DURATION: undefined,
          NUMERIC: undefined,
          TEXT: undefined,
          codeListReference: undefined,
          codeListReferenceLabel: '',
          id: 'kgs1g55j',
          isCollected: true,
          label: '1 - lib1',
          mesureLevel: undefined,
          name: 'QUESTIONTA1',
          type: 'BOOLEAN',
          x: 1,
          y: NaN,
          z: undefined,
        },
      };
      const response = [
        {
          CollectedVariableReference: 'kgs1g55j',
          Datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' },
          id: 'kgs1hrro',
        },
        {
          CollectedVariableReference: 'kgs1cxfn',
          Datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' },
          id: 'kgs1rliw',
        },
      ];
      const output = stateToRemote(
        state,
        collectedVariables,
        collectedVariablesStore,
        response,
      );
      const expected = {
        Dimension: [
          {
            CodeListReference: 'kgs19ihv',
            dimensionType: 'PRIMARY',
            dynamic: '0',
          },
          { dimensionType: 'MEASURE', dynamic: '0' },
        ],
        Mapping: [
          { MappingSource: 'kgs1hrro', MappingTarget: '1' },
          { MappingSource: 'kgs1rliw', MappingTarget: '2' },
        ],
        Response: [
          {
            CollectedVariableReference: 'kgs1g55j',
            Datatype: { type: 'BooleanDatatypeType', typeName: 'BOOLEAN' },
            id: 'kgs1hrro',
          },
          {
            CollectedVariableReference: 'kgs1cxfn',
            Datatype: { type: 'BooleanDatatypeType', typeName: 'BOOLEAN' },
            id: 'kgs1rliw',
          },
        ],
      };
      expect(output).toEqual(expected);
    });
  });
});
