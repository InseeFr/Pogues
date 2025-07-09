import { describe, expect, it } from 'vitest';

import { remoteToState, stateToRemote } from './response-format-single';

describe('response format single', () => {
  describe('remoteToState', () => {
    it('handles radio', () => {
      const remote = {
        responses: [
          {
            id: 'jf0w19iw',
            Datatype: {
              typeName: 'TEXT',
              type: 'TextDatatypeType',
              visualizationHint: 'CHECKBOX',
              MaxLength: 1,
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

    it('handles suggester', () => {
      const remote = {
        responses: [
          {
            id: 'jf0w19iw',
            Datatype: {
              typeName: 'TEXT',
              type: 'TextDatatypeType',
              visualizationHint: 'SUGGESTER',
              MaxLength: 1,
            },
            CollectedVariableReference: 'jf0vqq4j',
            CodeListReference: 'jf0w3fab',
            mandatory: true,
          },
        ],
      };
      const output = remoteToState(remote);
      const expected = {
        Nomenclature: { id: 'jf0w3fab' },
        id: 'jf0w19iw',
        mandatory: true,
        visHint: 'SUGGESTER',
      };
      expect(output).toEqual(expected);
    });
  });
  describe('stateToRemote', () => {
    it('handles radio', () => {
      const state = {
        id: 'jf0w19iw',
        mandatory: true,
        visHint: 'RADIO',
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
              type: 'TextDatatypeType',
              typeName: 'TEXT',
              visualizationHint: 'RADIO',
            },
            id: 'jf0w19iw',
            mandatory: true,
          },
        ],
      };
      expect(output).toEqual(expected);
    });

    it('handles suggester', () => {
      const state = {
        id: 'jf0w19iw',
        mandatory: true,
        visHint: 'SUGGESTER',
        Nomenclature: { id: 'jf0w3fab' },
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
              type: 'TextDatatypeType',
              typeName: 'TEXT',
              visualizationHint: 'SUGGESTER',
            },
            id: 'jf0w19iw',
            mandatory: true,
          },
        ],
      };
      expect(output).toEqual(expected);
    });
  });
});
