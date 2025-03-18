import { describe, expect, it } from 'vitest';

import Factory from './component';

describe('Component', () => {
  it('edits codes list with clarification', () => {
    const initialState = {
      id: 'Q1',
      collectedVariables: ['VAR1'],
      responseFormat: {
        type: 'SINGLE_CHOICE',
        SINGLE_CHOICE: {
          CodesList: {
            id: 'CL1',
            label: 'my cl',
            codes: [
              {
                label: '1',
                value: 'CL1_1',
              },
            ],
          },
        },
      },
    };
    const initialStore = {
      calculatedVariablesStore: {},
      codesListsStore: {
        CL1: {
          id: 'CL1',
          label: 'my cl',
          codes: {
            CL1_1: { label: '1', value: 'CL1_1' },
          },
        },
      },
      collectedVariablesStore: {
        VAR1: {
          id: 'VAR1',
          codeListReference: 'CL1',
          codeListReferenceLabel: 'my cl',
          name: 'Q1',
        },
      },
      externalVariablesStore: {},
    };
    const initialQuestionnaire = {};
    const form = {
      name: 'Q1',
      label: 'label',
      TargetMode: 'CAWI',
      collectedVariables: {
        collectedVariables: [
          {
            id: 'VAR1',
            codeListReference: 'CL1',
            codeListReferenceLabel: 'my cl',
            name: 'Q1',
          },
          {
            id: 'VAR2',
            name: 'Q1_CL1_1_CL',
          },
        ],
      },
      responseFormat: {
        type: 'SINGLE_CHOICE',
        SINGLE_CHOICE: {
          CodesList: {
            id: 'CL1',
            label: 'my cl',
            codes: [
              {
                label: '1',
                value: 'CL1_1',
                precisionByCollectedVariableId: {
                  VAR2: {
                    precisionid: 'Q1_CL1_1_CL',
                    precisionlabel: 'Préciser :',
                    precisionSize: 249,
                  },
                },
              },
            ],
          },
          id: 'Q1',
        },
      },
    };
    const Component = Factory(initialState, initialStore, initialQuestionnaire);

    Component.formToStore(form, 'Q1');
    const updatedCodesListsStore = Component.getCodesListStore();
    const updatedCollectedVariables = Component.getCollectedVariablesStore();

    expect(updatedCodesListsStore).toEqual({
      CL1: {
        id: 'CL1',
        label: 'my cl',
        codes: {
          CL1_1: {
            label: '1',
            value: 'CL1_1',
            precisionByCollectedVariableId: {
              VAR2: {
                precisionid: 'Q1_CL1_1_CL',
                precisionlabel: 'Préciser :',
                precisionSize: 249,
              },
            },
          },
        },
      },
    });
    expect(updatedCollectedVariables).toEqual({
      VAR1: {
        id: 'VAR1',
        codeListReference: 'CL1',
        codeListReferenceLabel: 'my cl',
        name: 'Q1',
      },
      VAR2: { id: 'VAR2', name: 'Q1_CL1_1_CL' },
    });
  });
});
