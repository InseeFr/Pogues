import { describe, expect, it } from 'vitest';

import { remoteToState, stateToRemote } from './response-format-single';

describe('response format single', () => {
  it('remoteToState', () => {
    const remote = {
      responses: [
        {
          id: 'jf0w19iw',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            visualizationHint: 'CHECKBOX',
            MaxLength: 1,
            Pattern: '',
          },
          CollectedVariableReference: 'jf0vqq4j',
          CodeListReference: 'jf0w3fab',
          mandatory: true,
        },
      ],
    };
    const output = remoteToState(remote);
    const expected = {
      CodesList: { id: 'jf0w3fab' },
      id: 'jf0w19iw',
      mandatory: true,
      visHint: 'CHECKBOX',
    };
    expect(output).toEqual(expected);
  });
  it('stateToRemote', () => {
    const state = {
      id: 'jf0w19iw',
      mandatory: true,
      visHint: 'CHECKBOX',
      CodesList: { id: 'jf0w3fab' },
    };
    const collectedVariables = ['jf0vqq4j'];
    const output = stateToRemote(state, collectedVariables);
    const expected = {
      Response: [
        {
          CodeListReference: 'jf0w3fab',
          CollectedVariableReference: 'jf0vqq4j',
          Datatype: {
            MaxLength: 1,
            Pattern: '',
            type: 'TextDatatypeType',
            typeName: 'TEXT',
            visualizationHint: 'CHECKBOX',
          },
          id: 'jf0w19iw',
          mandatory: true,
        },
      ],
    };
    expect(output).toEqual(expected);
  });
});
