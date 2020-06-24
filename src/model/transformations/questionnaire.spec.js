import { remoteToState, stateToRemote, remoteToStore } from './questionnaire';

describe('questionnaire', () => {
  it('remoteToState', () => {
    const remote = {
      owner: 'FAKEPERMISSION',
      final: false,
      id: 'jf0s8i94',
      Label: ['questionnaire'],
      Name: 'QUESTIONNA',
      lastUpdatedDate: 'Wed Mar 21 2018 10:23:37 GMT+0100 (CET)',
      DataCollection: [
        {
          id: 'campaign01',
          uri: 'http://ddi:fr.insee:DataCollection.campaign01',
          Name: 'Campaign 01',
        },
      ],
      genericName: 'QUESTIONNAIRE',

      agency: 'fr.insee',
      TargetMode: [''],
    };
    const currentStores = {};
    const output = remoteToState(remote, currentStores);
    const expected = {
      TargetMode: [''],
      agency: 'fr.insee',
      campaigns: ['campaign01'],
      final: false,
      id: 'jf0s8i94',
      label: 'questionnaire',
      lastUpdatedDate: 'Wed Mar 21 2018 10:23:37 GMT+0100 (CET)',
      name: 'QUESTIONNA',
      operation: '',
      owner: 'FAKEPERMISSION',
      serie: '',
    };
    expect(output).toEqual(expected);
  });
  it('stateToRemote', () => {
    const state = {
      owner: 'FAKEPERMISSION',
      final: false,
      id: 'jf0s8i94',
      name: 'QUESTIONNA',
      label: 'questionnaire',
      agency: 'fr.insee',
      lastUpdatedDate: 'Wed Mar 21 2018 10:37:56 GMT+0100 (CET)',
      serie: 'serie01',
      operation: 'operation01',
      campaigns: ['campaign01'],
      TargetMode: [''],
    };
    const store = {
      componentsStore: {
        jf0s3au7: {
          id: 'jf0s3au7',
          name: 'SEQUENCE',
          parent: 'jf0s8i94',
          weight: 0,
          children: ['jf0vtaeb'],
          declarations: {},
          controls: {},
          redirections: {},
          TargetMode: [''],
          label: 'sequence',
          type: 'SEQUENCE',
          pageBreak: false,
        },
        jf0vtaeb: {
          id: 'jf0vtaeb',
          type: 'QUESTION',
          parent: 'jf0s3au7',
          weight: 0,
          label: 'question2',
          name: 'QUESTION',
          controls: {},
          declarations: {},
          redirections: {},
          collectedVariables: ['jf0vqq4j'],
          children: [],
          responseFormat: {
            type: 'SINGLE_CHOICE',
            SINGLE_CHOICE: {
              id: 'jf0w19iw',
              mandatory: true,
              visHint: 'CHECKBOX',
              hasSpecialCode: false,
              specialLabel: '',
              specialCode: '',
              specialUiBehaviour: 'FIRST_INTENTION',
              specialFollowUpMessage: '',
              CodesList: { id: 'jf0w3fab' },
            },
          },
          TargetMode: [''],
          pageBreak: false,
        },
        jf0s8i94: {
          id: 'jf0s8i94',
          name: 'QUESTIONNA',
          parent: '',
          weight: 0,
          children: ['jf0s3au7'],
          declarations: {},
          controls: {},
          redirections: {},
          TargetMode: [''],
          label: 'questionnaire',
          type: 'QUESTIONNAIRE',
        },
      },
      conditionsStore: {},
      codesListsStore: {
        jf0w3fab: {
          id: 'jf0w3fab',
          label: 'code list 1',
          codes: {
            c1: { value: 'c1', label: 'c1', parent: '', depth: 1, weight: 1 },
          },
        },
      },
      calculatedVariablesStore: {},
      externalVariablesStore: {},
      collectedVariableByQuestionStore: {
        jf0vtaeb: {
          jf0vqq4j: {
            id: 'jf0vqq4j',
            name: 'QUESTION',
            label: 'QUESTION label',
            type: 'TEXT',
            TEXT: { maxLength: 1, pattern: '' },
            codeListReference: 'jf0w3fab',
            codeListReferenceLabel: 'code list 1',
          },
        },
      },
      campaignsStore: {
        campaign01: {
          id: 'campaign01',
          value: 'campaign01',
          label: 'Campaign 01',
          operation: 'operation01',
        },
        campaign02: {
          id: 'campaign02',
          value: 'campaign02',
          label: 'Campaign 02',
          operation: 'operation01',
        },
      },
    };
    const output = stateToRemote(state, store);
    const expected = {
      Child: [
        {
          Child: [
            {
              Control: [],
              Declaration: [],
              FlowControl: [],
              Label: ['question2'],
              Name: 'QUESTION',
              ClarificationQuestion: [],
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
              TargetMode: [''],
              depth: 2,
              id: 'jf0vtaeb',
              questionType: 'SINGLE_CHOICE',
              type: 'QuestionType',
            },
          ],
          Control: [],
          Declaration: [],
          FlowControl: [],
          Label: ['sequence'],
          Name: 'SEQUENCE',
          TargetMode: [''],
          depth: 1,
          genericName: 'MODULE',
          id: 'jf0s3au7',
          type: 'SequenceType',
        },
        {
          id: "idendquest",
          depth: 1,
          Name: "QUESTIONNAIRE_END",
          Label: [
            "QUESTIONNAIRE_END"
          ],
          Declaration: [],
          genericName: "MODULE",
          Control: [],
          FlowControl: [],
          TargetMode: [''],
          type: "SequenceType",
          Child: [],
        },
      ],
      CodeLists: {
        CodeList: [
          {
            Code: [{ Label: 'c1', Parent: '', Value: 'c1' }],
            Label: 'code list 1',
            Name: '',
            id: 'jf0w3fab',
          },
        ],
      },
      ComponentGroup: [
        {
          Label: ['Components for page 1'],
          MemberReference: ['jf0s3au7', 'jf0vtaeb', "idendquest"],
          Name: 'PAGE_1',
          id: output.ComponentGroup[0].id,
        },
      ],
      DataCollection: [
        {
          Name: 'Campaign 01',
          id: 'campaign01',
          uri: 'http://ddi:fr.insee:DataCollection.campaign01',
        },
      ],
      Label: ['questionnaire'],
      Name: 'QUESTIONNA',
      TargetMode: [''],
      Variables: {
        Variable: [
          {
            CodeListReference: 'jf0w3fab',
            Datatype: {
              MaxLength: 1,
              Pattern: '',
              type: 'TextDatatypeType',
              typeName: 'TEXT',
            },
            Label: 'QUESTION label',
            Name: 'QUESTION',
            id: 'jf0vqq4j',
            type: 'CollectedVariableType',
          },
        ],
      },
      Iterations: {
        Iteration: []
      },
      agency: 'fr.insee',
      final: false,
      genericName: 'QUESTIONNAIRE',
      id: 'jf0s8i94',
      lastUpdatedDate: output.lastUpdatedDate,
      owner: 'FAKEPERMISSION',
    };
    expect(output).toEqual(expected);
  });
  it('remoteToStore', () => {
    const remote = {
      owner: 'FAKEPERMISSION',
      final: false,
      id: 'jf0s8i94',
      Label: ['questionnaire'],
      Name: 'QUESTIONNA',
      lastUpdatedDate: 'Wed Mar 21 2018 10:23:37 GMT+0100 (CET)',
      DataCollection: [
        {
          id: 'campaign01',
          uri: 'http://ddi:fr.insee:DataCollection.campaign01',
          Name: 'Campaign 01',
        },
      ],
      genericName: 'QUESTIONNAIRE',

      agency: 'fr.insee',
      TargetMode: [''],
    };
    const currentStores = {};
    const output = remoteToStore(remote, currentStores);
    const expected = {
      jf0s8i94: {
        TargetMode: [''],
        agency: 'fr.insee',
        campaigns: ['campaign01'],
        final: false,
        id: 'jf0s8i94',
        label: 'questionnaire',
        lastUpdatedDate: 'Wed Mar 21 2018 10:23:37 GMT+0100 (CET)',
        name: 'QUESTIONNA',
        operation: '',
        owner: 'FAKEPERMISSION',
        serie: '',
      },
    };
    expect(output).toEqual(expected);
  });
});
