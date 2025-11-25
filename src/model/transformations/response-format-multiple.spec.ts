import { describe, expect, it } from 'vitest';

import { remoteToState, stateToRemote } from './response-format-multiple';

describe('response format multiple', () => {
  describe('remoteToState', () => {
    it('Correctly compute state data', () => {
      // Given non-dynamic modelization
      const remote = {
        responses: [
          {
            id: 'my-response-id',
            Datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' },
            CollectedVariableReference: 'jf0wtl3p',
          },
        ],
        dimensions: [
          {
            dimensionType: 'PRIMARY',
            dynamic: 'NON_DYNAMIC',
            CodeListReference: 'my-cl-id',
          },
          { dimensionType: 'MEASURE' },
        ],
      };

      // The remote data is correctly computed in the state model
      expect(remoteToState(remote)).toEqual({
        MEASURE: { BOOL: {}, type: 'BOOL' },
        PRIMARY: { CodesList: { id: 'my-cl-id' } },
      });
    });

    it('Correctly compute mandatory value', () => {
      // Given mandatory QCM
      const remote = {
        mandatory: true,
        responses: [
          {
            id: 'my-response-id',
            Datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' },
            CollectedVariableReference: 'jf0wtl3p',
          },
        ],
        dimensions: [
          {
            dimensionType: 'PRIMARY',
            dynamic: 'NON_DYNAMIC',
            CodeListReference: 'my-cl-id',
          },
          { dimensionType: 'MEASURE' },
        ],
      };

      // The remote data is correctly computed in the state model
      expect(remoteToState(remote)).toEqual({
        mandatory: true,
        MEASURE: { BOOL: {}, type: 'BOOL' },
        PRIMARY: { CodesList: { id: 'my-cl-id' } },
      });
    });

    it('Correctly compute state data w old modelization of dynamic', () => {
      // Given legacy dynamic modelization
      const remote = {
        responses: [
          {
            id: 'my-response-id',
            Datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' },
            CollectedVariableReference: 'my-var-id',
          },
        ],
        dimensions: [
          {
            dimensionType: 'PRIMARY',
            dynamic: '0',
            CodeListReference: 'my-cl-id',
          },
          { dimensionType: 'MEASURE', dynamic: '0' },
        ],
      };

      // The remote data is correctly computed in the state model
      expect(remoteToState(remote)).toEqual({
        MEASURE: { BOOL: {}, type: 'BOOL' },
        PRIMARY: { CodesList: { id: 'my-cl-id' } },
      });
    });
  });

  describe('stateToRemote', () => {
    it('Correctly compute remote data of a table for a new question', () => {
      const state = {
        mandatory: true,
        PRIMARY: { CodesList: { id: 'my-cl-id' } },
        MEASURE: { type: 'BOOL', BOOL: {} },
      };
      const collectedVariables = ['my-var-id'];
      const collectedVariablesStore = {
        'my-var-id': {
          id: 'my-var-id',
          name: 'QUESTION1',
          label: 'c1 - c1',
          x: 1,
          y: null,
          type: 'BOOLEAN',
          BOOLEAN: {},
          codeListReferenceLabel: '',
          isCollected: '0',
        },
      };
      const response = undefined;

      const output = stateToRemote(
        state,
        collectedVariables,
        collectedVariablesStore,
        response,
      );

      expect(output).toEqual({
        Attribute: [
          {
            AttributeTarget: '1',
            AttributeValue: 'NoDataByDefinition',
          },
        ],
        Dimension: [
          {
            CodeListReference: 'my-cl-id',
            dimensionType: 'PRIMARY',
            dynamic: 'NON_DYNAMIC',
          },
          { dimensionType: 'MEASURE' },
        ],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        Mapping: [{ MappingSource: output.Response[0].id, MappingTarget: '1' }],
        Response: [
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            id: output.Response[0].id,
            CollectedVariableReference: 'my-var-id',
            Datatype: { type: 'BooleanDatatypeType', typeName: 'BOOLEAN' },
          },
        ],
      });
    });

    it('Correctly compute remote data of a table for an ewisting question', () => {
      const state = {
        mandatory: true,
        PRIMARY: { CodesList: { id: 'my-cl-id' } },
        MEASURE: { type: 'BOOL', BOOL: {} },
      };
      const collectedVariables = ['my-var-id-1', 'my-var-id-2'];
      const collectedVariablesStore = {
        'my-var-id-2': {
          BOOLEAN: {},
          DATE: undefined,
          DURATION: undefined,
          NUMERIC: undefined,
          TEXT: undefined,
          codeListReference: undefined,
          codeListReferenceLabel: '',
          id: 'my-var-id-2',
          isCollected: '1',
          label: '2 - lib2',
          mesureLevel: undefined,
          name: 'QUESTIONTA2',
          type: 'BOOLEAN',
          x: 2,
          y: Number.NaN,
          z: undefined,
        },
        'my-var-id-1': {
          BOOLEAN: {},
          DATE: undefined,
          DURATION: undefined,
          NUMERIC: undefined,
          TEXT: undefined,
          codeListReference: undefined,
          codeListReferenceLabel: '',
          id: 'my-var-id-1',
          isCollected: '1',
          label: '1 - lib1',
          mesureLevel: undefined,
          name: 'QUESTIONTA1',
          type: 'BOOLEAN',
          x: 1,
          y: Number.NaN,
          z: undefined,
        },
      };
      const response = [
        {
          CollectedVariableReference: 'my-var-id-1',
          Datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' },
          id: 'my-response-id-1',
        },
        {
          CollectedVariableReference: 'my-var-id-2',
          Datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' },
          id: 'my-response-id-2',
        },
      ];

      const output = stateToRemote(
        state,
        collectedVariables,
        collectedVariablesStore,
        response,
      );

      expect(output).toEqual({
        Attribute: [],
        Dimension: [
          {
            CodeListReference: 'my-cl-id',
            dimensionType: 'PRIMARY',
            dynamic: 'NON_DYNAMIC',
          },
          { dimensionType: 'MEASURE' },
        ],
        Mapping: [
          { MappingSource: 'my-response-id-1', MappingTarget: '1' },
          { MappingSource: 'my-response-id-2', MappingTarget: '2' },
        ],
        Response: [
          {
            id: 'my-response-id-1',
            CollectedVariableReference: 'my-var-id-1',
            Datatype: { type: 'BooleanDatatypeType', typeName: 'BOOLEAN' },
          },
          {
            id: 'my-response-id-2',
            CollectedVariableReference: 'my-var-id-2',
            Datatype: { type: 'BooleanDatatypeType', typeName: 'BOOLEAN' },
          },
        ],
      });
    });
  });
});
