import { describe, expect, it } from 'vitest';

import { CHOICE_TYPE, DATATYPE_VIS_HINT } from '@/constants/pogues-constants';

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
            choiceType: CHOICE_TYPE.CODE_LIST,
          },
        ],
      };
      const output = remoteToState(remote);
      const expected = {
        CodesList: { id: 'my-cl-id' },
        id: 'my-response-id',
        mandatory: true,
        visHint: 'CHECKBOX',
        choiceType: 'CODE_LIST',
        allowArbitraryResponse: undefined,
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
            choiceType: CHOICE_TYPE.SUGGESTER,
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
        choiceType: 'SUGGESTER',
      };
      expect(output).toEqual(expected);
    });

    it('handles variable', () => {
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
            VariableReference: 'my-variable-id',
            mandatory: true,
            choiceType: CHOICE_TYPE.VARIABLE,
          },
        ],
      };
      const output = remoteToState(remote);
      const expected = {
        Variable: { id: 'my-variable-id' },
        id: 'my-response-id',
        mandatory: true,
        choiceType: 'VARIABLE',
        visHint: 'CHECKBOX',
      };
      expect(output).toEqual(expected);
    });
  });
});

describe('stateToRemote', () => {
  it('handles radio', () => {
    const state: StateResponseFormatSingle = {
      id: 'my-response-id',
      mandatory: true,
      visHint: DATATYPE_VIS_HINT.RADIO,
      choiceType: CHOICE_TYPE.CODE_LIST,
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
          choiceType: 'CODE_LIST',
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
      choiceType: CHOICE_TYPE.SUGGESTER,
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
          choiceType: 'SUGGESTER',
          id: 'my-response-id',
          mandatory: true,
        },
      ],
    };
    expect(output).toEqual(expected);
  });

  it('handles variable', () => {
    const state: StateResponseFormatSingle = {
      id: 'my-response-id',
      mandatory: true,
      visHint: DATATYPE_VIS_HINT.RADIO,
      choiceType: CHOICE_TYPE.VARIABLE,
      Variable: { id: 'my-variable-id' },
    };
    const collectedVariables = ['my-var-id'];
    const output = stateToRemote(state, collectedVariables);
    const expected = {
      Response: [
        {
          VariableReference: 'my-variable-id',
          CollectedVariableReference: 'my-var-id',
          Datatype: {
            MaxLength: 1,
            type: 'TextDatatypeType',
            typeName: 'TEXT',
            visualizationHint: 'RADIO',
          },
          choiceType: 'VARIABLE',
          id: 'my-response-id',
          mandatory: true,
        },
      ],
    };
    expect(output).toEqual(expected);
  });
});
