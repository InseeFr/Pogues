import { describe, expect, it } from 'vitest';

import { DATATYPE_VIS_HINT } from '@/constants/pogues-constants';

import {
  StateResponseFormatSingle,
  remoteToState,
  stateToRemote,
} from './response-format-single';

describe('response format single', () => {
  describe('remoteToState', () => {
    it('handles radio', () => {
      const remote = {
        responses: [
          {
            id: 'my-response-id',
            Datatype: {
              typeName: 'TEXT',
              type: 'TextDatatypeType',
              visualizationHint: DATATYPE_VIS_HINT.CHECKBOX,
              MaxLength: 1,
            },
            CollectedVariableReference: 'my-var-id',
            CodeListReference: 'my-cl-id',
            mandatory: true,
          },
        ],
      };
      const output = remoteToState(remote);
      const expected = {
        CodesList: { id: 'my-cl-id' },
        id: 'my-response-id',
        mandatory: true,
        visHint: 'CHECKBOX',
      };
      expect(output).toEqual(expected);
    });

    it('handles suggester', () => {
      const remote = {
        responses: [
          {
            id: 'my-response-id',
            Datatype: {
              typeName: 'TEXT',
              type: 'TextDatatypeType',
              visualizationHint: DATATYPE_VIS_HINT.SUGGESTER,
              MaxLength: 1,
            },
            CollectedVariableReference: 'my-var-id',
            CodeListReference: 'my-cl-id',
            mandatory: true,
          },
        ],
      };
      const output = remoteToState(remote);
      const expected = {
        Nomenclature: { id: 'my-cl-id' },
        id: 'my-response-id',
        mandatory: true,
        visHint: 'SUGGESTER',
      };
      expect(output).toEqual(expected);
    });
  });

  describe('stateToRemote', () => {
    it('handles radio', () => {
      const state: StateResponseFormatSingle = {
        id: 'my-response-id',
        mandatory: true,
        visHint: DATATYPE_VIS_HINT.RADIO,
        CodesList: { id: 'my-cl-id' },
      };
      const collectedVariables = ['my-var-id'];
      const output = stateToRemote(state, collectedVariables);
      const expected = {
        Response: [
          {
            CodeListReference: 'my-cl-id',
            CollectedVariableReference: 'my-var-id',
            Datatype: {
              MaxLength: 1,
              type: 'TextDatatypeType',
              typeName: 'TEXT',
              visualizationHint: 'RADIO',
            },
            id: 'my-response-id',
            mandatory: true,
          },
        ],
      };
      expect(output).toEqual(expected);
    });

    it('handles suggester', () => {
      const state: StateResponseFormatSingle = {
        id: 'my-response-id',
        mandatory: true,
        visHint: DATATYPE_VIS_HINT.SUGGESTER,
        Nomenclature: { id: 'my-cl-id' },
      };
      const collectedVariables = ['my-var-id'];
      const output = stateToRemote(state, collectedVariables);
      const expected = {
        Response: [
          {
            CodeListReference: 'my-cl-id',
            CollectedVariableReference: 'my-var-id',
            Datatype: {
              MaxLength: 1,
              type: 'TextDatatypeType',
              typeName: 'TEXT',
              visualizationHint: 'SUGGESTER',
            },
            id: 'my-response-id',
            mandatory: true,
          },
        ],
      };
      expect(output).toEqual(expected);
    });
  });
});
