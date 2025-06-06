import { describe, expect, it } from 'vitest';

import {
  remoteToState,
  remoteToState1,
  remoteToStore,
  remoteToStore1,
  stateToRemote,
} from './questionnaire';

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
      dynamiqueSpecified: 'Redirections',
      formulaSpecified: 'XPATH',
    };
    expect(output).toEqual(expected);
  });

  it('remoteToState1', () => {
    const remote = {
      final: false,
      id: 'jf0s8i94',
      Label: ['questionnaire'],
      lastUpdatedDate: 'Wed Mar 21 2018 10:23:37 GMT+0100 (CET)',
      DataCollection: [
        {
          id: 'campaign01',
          uri: 'http://ddi:fr.insee:DataCollection.campaign01',
          Name: 'Campaign 01',
        },
      ],
      TargetMode: [''],
      Name: 'QUESTIONNA',
      flowLogic: 'REDIRECTION',
    };
    const output = remoteToState1(remote);
    const expected = {
      TargetMode: [''],
      campaigns: ['campaign01'],
      dynamiqueSpecified: 'Redirections',
      formulaSpecified: 'XPATH',
      final: false,
      id: 'jf0s8i94',
      label: 'questionnaire',
      lastUpdatedDate: 'Wed Mar 21 2018 10:23:37 GMT+0100 (CET)',
      name: 'QUESTIONNA',
    };
    expect(output).toEqual(expected);
  });
  describe('stateToRemote', () => {
    it('json decription if dynamiqueSpecified is Redirection', () => {
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
        ComponentGroup: [],
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
                CodesList: { id: 'jf0w3fab' },
              },
            },
            TargetMode: [''],
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
              TEXT: { maxLength: 1 },
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
            id: 'idendquest',
            depth: 1,
            Name: 'QUESTIONNAIRE_END',
            Label: ['QUESTIONNAIRE_END'],
            Declaration: [],
            genericName: 'MODULE',
            Control: [],
            FlowControl: [],
            TargetMode: [''],
            type: 'SequenceType',
            Child: [],
          },
        ],
        CodeLists: {
          CodeList: [
            {
              Code: [{ Label: 'c1', Parent: '', Value: 'c1' }],
              Label: 'code list 1',
              id: 'jf0w3fab',
            },
          ],
        },
        ComponentGroup: [
          {
            Label: ['Components for page 1'],
            MemberReference: ['jf0s3au7', 'jf0vtaeb', 'idendquest'],
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
        agency: 'fr.insee',
        flowLogic: 'FILTER',
        formulasLanguage: 'XPATH',
        final: false,
        genericName: 'QUESTIONNAIRE',
        id: 'jf0s8i94',
        lastUpdatedDate: output.lastUpdatedDate,
        owner: 'FAKEPERMISSION',
        childQuestionnaireRef: [],
      };
      expect(output).toEqual(expected);
    });
    it('json decription if dynamiqueSpecified is Filtre', () => {
      const state = {
        ComponentGroup: [],
        TargetMode: [''],
        agency: 'fr.insee',
        campaigns: ['campaign02'],
        dynamiqueSpecified: 'Filtres',
        final: false,
        id: 'kgs4uwzd',
        label: 'questionnaire',
        lastUpdatedDate:
          'Tue Oct 27 2020 16:36:25 GMT+0100 (heure normale d’Europe centrale)',
        name: 'QUESTIONNA',
        operation: 'operation01',
        owner: 'FAKEPERMISSION',
        serie: 'serie01',
      };
      const store = {
        componentsStore: {
          kgs4v6eo: {
            TargetMode: [''],
            addButtonLibel: '',
            basedOn: '',
            children: [],
            collectedVariables: ['kgs50nt9'],
            controls: {},
            declarations: {},
            description: '',
            filter: '',
            filterImbriquer: [],
            finalMember: '',
            id: 'kgs4v6eo',
            initialMember: '',
            label: 'question1',
            maximum: '',
            name: 'QUESTION1',
            nameLoop: '',
            parent: 'kgs4yv5b',
            redirections: {},
            responseFormat: {
              type: 'SIMPLE',
              SIMPLE: {
                TEXT: { maxLength: 249 },
                id: 'kgs4v6eo',
                mandatory: false,
                type: 'TEXT',
              },
            },
            type: 'QUESTION',
            weight: 0,
          },
          kgs4uwzd: {
            TargetMode: [''],
            children: ['kgs4yv5b'],
            controls: {},
            declarations: {},
            id: 'kgs4uwzd',
            label: 'questionnaire',
            name: 'QUESTIONNA',
            parent: '',
            redirections: {},
            responsesClarification: undefined,
            type: 'QUESTIONNAIRE',
            weight: 0,
          },
          kgs4yv5b: {
            TargetMode: [''],
            addButtonLibel: '',
            basedOn: '',
            children: ['kgs4v6eo'],
            collectedVariables: [],
            controls: {},
            declarations: {},
            description: '',
            filter: '',
            filterImbriquer: [],
            finalMember: '',
            id: 'kgs4yv5b',
            initialMember: '',
            label: 'sequence1',
            maximum: '',
            name: 'SEQUENCE1',
            nameLoop: '',
            parent: 'kgs4uwzd',
            redirections: {},
            responseFormat: {},
            type: 'SEQUENCE',
            weight: 0,
          },
          kgs5dobf: {
            TargetMode: [''],
            addButtonLibel: '',
            basedOn: '',
            children: [],
            collectedVariables: [],
            controls: {},
            declarations: {},
            description: '',
            filter: '$QUESTION1$  > 1',
            filterImbriquer: [],
            finalMember: 'kgs4yv5b',
            id: 'kgs5dobf',
            initialMember: 'kgs4yv5b',
            label: '',
            maximum: '',
            name: 'FILTRE1',
            nameLoop: 'filtre1',
            parent: undefined,
            redirections: {},
            responseFormat: {},
            type: 'FILTER',
            weight: undefined,
          },
        },
        conditionsStore: {},
        codesListsStore: {},
        calculatedVariablesStore: {},
        externalVariablesStore: {},
        collectedVariableByQuestionStore: {
          kgs4v6eo: {
            kgs50nt9: {
              id: 'kgs50nt9',
              label: 'QUESTION1 label',
              name: 'QUESTION1',
              type: 'TEXT',
              TEXT: { maxLength: 249 },
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
                Label: ['question1'],
                Name: 'QUESTION1',
                Response: [
                  {
                    CollectedVariableReference: 'kgs50nt9',
                    Datatype: {
                      typeName: 'TEXT',
                      type: 'TextDatatypeType',
                      MaxLength: 249,
                    },
                    id: 'kgs4v6eo',
                    mandatory: false,
                  },
                ],
                TargetMode: [''],
                depth: 2,
                id: 'kgs4v6eo',
                questionType: 'SIMPLE',
                type: 'QuestionType',
              },
            ],
            Control: [],
            Declaration: [],
            FlowControl: [],
            Label: ['sequence1'],
            Name: 'SEQUENCE1',
            TargetMode: [''],
            depth: 1,
            genericName: 'MODULE',
            id: 'kgs4yv5b',
            type: 'SequenceType',
          },
          {
            id: 'idendquest',
            depth: 1,
            Name: 'QUESTIONNAIRE_END',
            Label: ['QUESTIONNAIRE_END'],
            Declaration: [],
            genericName: 'MODULE',
            Control: [],
            FlowControl: [],
            TargetMode: [''],
            type: 'SequenceType',
            Child: [],
          },
        ],
        CodeLists: {
          CodeList: [],
        },
        ComponentGroup: [
          {
            Label: ['Components for page 1'],
            MemberReference: ['kgs4yv5b', 'kgs4v6eo', 'idendquest'],
            Name: 'PAGE_1',
            id: output.ComponentGroup[0].id,
          },
        ],
        DataCollection: [
          {
            Name: 'Campaign 02',
            id: 'campaign02',
            uri: 'http://ddi:fr.insee:DataCollection.campaign02',
          },
        ],
        FlowControl: [
          {
            Description: '',
            Expression: '$QUESTION1$  > 1',
            IfTrue: 'kgs4yv5b-kgs4yv5b',
            id: 'kgs5dobf',
          },
        ],
        Label: ['questionnaire'],
        Name: 'QUESTIONNA',
        TargetMode: [''],
        Variables: {
          Variable: [
            {
              CodeListReference: undefined,
              Datatype: {
                typeName: 'TEXT',
                type: 'TextDatatypeType',
                MaxLength: 249,
              },
              Label: 'QUESTION1 label',
              Name: 'QUESTION1',
              id: 'kgs50nt9',
              type: 'CollectedVariableType',
            },
          ],
        },
        agency: 'fr.insee',
        flowLogic: 'FILTER',
        formulasLanguage: 'XPATH',
        final: false,
        genericName: 'QUESTIONNAIRE',
        id: 'kgs4uwzd',
        lastUpdatedDate: output.lastUpdatedDate,
        owner: 'FAKEPERMISSION',
        childQuestionnaireRef: [],
      };
      expect(output).toEqual(expected);
    });
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
        dynamiqueSpecified: 'Redirections',
        formulaSpecified: 'XPATH',
      },
    };
    expect(output).toEqual(expected);
  });

  it('remoteToStore1', () => {
    const remote = {
      final: false,
      id: 'jf0s8i94',
      Label: ['questionnaire'],
      lastUpdatedDate: 'Wed Mar 21 2018 10:23:37 GMT+0100 (CET)',
      DataCollection: [
        {
          id: 'campaign01',
          uri: 'http://ddi:fr.insee:DataCollection.campaign01',
          Name: 'Campaign 01',
        },
      ],
      TargetMode: [''],
      Name: 'QUESTIONNA',
      flowLogic: 'REDIRECTION',
      formulasLanguage: 'VTL',
    };
    const currentStores = {};
    const output = remoteToStore1(remote, currentStores);
    const expected = {
      jf0s8i94: {
        TargetMode: [''],
        campaigns: ['campaign01'],
        dynamiqueSpecified: 'Redirections',
        formulaSpecified: 'VTL',
        final: false,
        id: 'jf0s8i94',
        label: 'questionnaire',
        lastUpdatedDate: 'Wed Mar 21 2018 10:23:37 GMT+0100 (CET)',
        name: 'QUESTIONNA',
      },
    };
    expect(output).toEqual(expected);
  });
});
