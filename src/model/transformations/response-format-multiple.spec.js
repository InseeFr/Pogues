import { remoteToState, stateToRemote } from './response-format-multiple';
describe('response format multiple', () => {
  it('remoteToState', () => {
    const remote = {
      responses: [
        {
          id: 'jf0wxgwc',
          Datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' },
          CollectedVariableReference: 'jf0wtl3p'
        }
      ],
      dimensions: [
        {
          dimensionType: 'PRIMARY',
          dynamic: '0',
          CodeListReference: 'jf0w3fab'
        },
        { dimensionType: 'MEASURE', dynamic: '0' }
      ]
    };
    const output = remoteToState(remote);
    const expected = {
      MEASURE: { BOOL: {}, type: 'BOOL' },
      PRIMARY: { CodesList: { id: 'jf0w3fab' } }
    };
    expect(output).toEqual(expected);
  });

  it('stateToRemote', () => {
    const state = {
      PRIMARY: { CodesList: { id: 'jf0w3fab' } },
      MEASURE: { type: 'BOOL', BOOL: {} }
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
        codeListReferenceLabel: ''
      }
    };
    const output = stateToRemote(
      state,
      collectedVariables,
      collectedVariablesStore
    );
    const expected = {
      Dimension: [
        {
          CodeListReference: 'jf0w3fab',
          dimensionType: 'PRIMARY',
          dynamic: '0'
        },
        { dimensionType: 'MEASURE', dynamic: '0' }
      ],
      Mapping: [{ MappingSource: output.Response[0].id, MappingTarget: '1' }],
      Response: [
        {
          CollectedVariableReference: 'jf0wtl3p',
          Datatype: { type: 'BooleanDatatypeType', typeName: 'BOOLEAN' },
          id: output.Response[0].id
        }
      ]
    };
    expect(output).toEqual(expected);
  });
});
