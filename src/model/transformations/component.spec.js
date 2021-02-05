import { remoteToStore, storeToRemote } from './component';

describe('component tranformations', () => {
  describe('remoteToStore', () => {
    test('should return the store representation of a component', () => {
      const input = {
        Child: [
          {
            Child: [
              {
                Control: [],
                Declaration: [],
                FlowControl: [],
                Label: ['question'],
                Name: 'QUESTION',
                Response: [
                  {
                    CollectedVariableReference: 'khj4uvok',
                    Datatype: {
                      typeName: 'TEXT',
                      type: 'TextDatatypeType',
                      MaxLength: 255,
                      Pattern: '',
                    },
                    id: 'khj4qhmd',
                    mandatory: false,
                  },
                ],
                TargetMode: ['CAWI'],
                depth: 2,
                id: 'khj4le7i',
                questionType: 'SIMPLE',
                type: 'QuestionType',
              },
            ],
            Control: [],
            Declaration: [],
            FlowControl: [],
            Label: ['sequence'],
            Name: 'SEQUENCE',
            TargetMode: ['CAWI'],
            depth: 1,
            genericName: 'MODULE',
            id: 'khj54mjm',
            type: 'SequenceType',
          },
          {
            Child: [],
            Control: [],
            Declaration: [],
            FlowControl: [],
            Label: ['QUESTIONNAIRE_END'],
            Name: 'QUESTIONNAIRE_END',
            TargetMode: ['CAWI'],
            depth: 1,
            genericName: 'MODULE',
            id: 'idendquest',
            type: 'SequenceType',
          },
        ],
        CodeLists: { CodeList: [] },
        ComponentGroup: [
          {
            Label: ['Components for page 1'],
            MemberReference: (3)[('khj54mjm', 'khj4le7i', 'idendquest')],
            Name: 'PAGE_1',
            id: 'khj4luq3',
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
        TargetMode: ['CAWI'],
        Variables: {
          Variable: [
            {
              CodeListReference: undefined,
              Datatype: {
                typeName: 'TEXT',
                type: 'TextDatatypeType',
                MaxLength: 255,
                Pattern: '',
              },
              Label: 'QUESTION label',
              Name: 'QUESTION',
              id: 'khj4uvok',
              type: 'CollectedVariableType',
            },
          ],
        },
        agency: 'fr.insee',
        final: false,
        genericName: 'QUESTIONNAIRE',
        id: 'khj4mf0r',
        lastUpdatedDate:
          'Sun Nov 15 2020 14:00:52 GMT+0100 (heure normale d’Europe centrale)',
        owner: 'FAKEPERMISSION',
      };
      const questionnaireId = 'khj4mf0r';
      const codesListsStore = {};
      const iterations = [];
      const filters = [];

      const output = {
        idendquest: {
          TargetMode: ['CAWI'],
          children: [],
          controls: {},
          declarations: {},
          id: 'idendquest',
          label: 'QUESTIONNAIRE_END',
          name: 'QUESTIONNAIRE_END',
          pageBreak: undefined,
          parent: 'khj4mf0r',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 1,
        },
        khj4le7i: {
          TargetMode: ['CAWI'],
          children: [],
          collectedVariables: ['khj4uvok'],
          controls: {},
          declarations: {},
          id: 'khj4le7i',
          label: 'question',
          name: 'QUESTION',
          pageBreak: undefined,
          parent: 'khj54mjm',
          redirections: {},
          responseFormat: {
            type: 'SIMPLE',
            SIMPLE: {
              TEXT: { maxLength: 255, pattern: '' },
              id: 'khj4qhmd',
              mandatory: false,
              type: 'TEXT',
            },
          },
          responsesClarification: undefined,
          type: 'QUESTION',
          weight: 0,
        },
        khj4mf0r: {
          TargetMode: ['CAWI'],
          children: ['khj54mjm'],
          controls: {},
          declarations: {},
          id: 'khj4mf0r',
          label: 'questionnaire',
          name: 'QUESTIONNA',
          pageBreak: undefined,
          parent: '',
          redirections: {},
          responsesClarification: undefined,
          type: 'QUESTIONNAIRE',
          weight: 0,
        },
        khj54mjm: {
          TargetMode: ['CAWI'],
          children: ['khj4le7i'],
          controls: {},
          declarations: {},
          id: 'khj54mjm',
          label: 'sequence',
          name: 'SEQUENCE',
          pageBreak: undefined,
          parent: 'khj4mf0r',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 0,
        },
      };
      expect(
        remoteToStore(
          input,
          questionnaireId,
          codesListsStore,
          iterations,
          filters,
        ),
      ).toEqual(output);
    });
  });

  describe('storeToRemote', () => {
    test('should return the remote representation of a collected variable', () => {
      const input = {
        idendquest: {
          TargetMode: ['CAWI'],
          children: [],
          controls: {},
          declarations: {},
          id: 'idendquest',
          label: 'QUESTIONNAIRE_END',
          name: 'QUESTIONNAIRE_END',
          pageBreak: false,
          parent: 'khj4mf0r',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 1,
        },
        khj4le7i: {
          BasedOn: '',
          TargetMode: ['CAWI'],
          addButtonLibel: '',
          basedOn: '',
          children: [],
          collectedVariables: ['khj4uvok'],
          controls: {},
          declarations: {},
          description: '',
          filter: '',
          filterImbriquer: [],
          finalMember: '',
          id: 'khj4le7i',
          initialMember: '',
          label: 'question',
          maximum: '',
          name: 'QUESTION',
          pageBreak: false,
          parent: 'khj54mjm',
          redirections: {},
          responseFormat: {
            type: 'SIMPLE',
            SIMPLE: {
              id: 'khj4qhmd',
              type: 'TEXT',
              mandatory: false,
              TEXT: {
                maxLength: 255,
                pattern: '',
              },
            },
          },
          responsesClarification: undefined,
          type: 'QUESTION',
          weight: 0,
        },
        khj4mf0r: {
          TargetMode: ['CAWI'],
          children: ['khj54mjm'],
          controls: {},
          declarations: {},
          id: 'khj4mf0r',
          label: 'questionnaire',
          name: 'QUESTIONNA',
          pageBreak: undefined,
          parent: '',
          redirections: {},
          responsesClarification: undefined,
          type: 'QUESTIONNAIRE',
          weight: 0,
        },
        khj54mjm: {
          TargetMode: ['CAWI'],
          children: ['khj4le7i'],
          controls: {},
          declarations: {},
          id: 'khj54mjm',
          label: 'sequence',
          name: 'SEQUENCE',
          pageBreak: false,
          parent: 'khj4mf0r',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 0,
        },
      };
      const questionnaireId = 'khj4mf0r';
      const collectedVariablesStore = {
        khj4uvok: {
          BOOLEAN: undefined,
          DATE: undefined,
          DURATION: undefined,
          NUMERIC: undefined,
          TEXT: { maxLength: 255, pattern: '' },
          codeListReference: undefined,
          codeListReferenceLabel: '',
          id: 'khj4uvok',
          isCollected: undefined,
          label: 'QUESTION label',
          mesureLevel: undefined,
          name: 'QUESTION',
          type: 'TEXT',
          x: undefined,
          y: undefined,
          z: undefined,
        },
      };
      const codesListsStore = {};
      const dynamiqueSpecified = 'Redirections';
      const output = [
        {
          Child: [
            {
              Control: [],
              Declaration: [],
              FlowControl: [],
              Label: ['question'],
              Name: 'QUESTION',
              Response: [
                {
                  CollectedVariableReference: 'khj4uvok',
                  Datatype: {
                    typeName: 'TEXT',
                    type: 'TextDatatypeType',
                    MaxLength: 255,
                    Pattern: '',
                  },
                  id: 'khj4qhmd',
                  mandatory: false,
                },
              ],
              TargetMode: ['CAWI'],
              depth: 2,
              id: 'khj4le7i',
              questionType: 'SIMPLE',
              type: 'QuestionType',
            },
          ],
          Control: [],
          Declaration: [],
          FlowControl: [],
          Label: ['sequence'],
          Name: 'SEQUENCE',
          TargetMode: ['CAWI'],
          depth: 1,
          genericName: 'MODULE',
          id: 'khj54mjm',
          type: 'SequenceType',
        },
      ];
      expect(
        storeToRemote(
          input,
          questionnaireId,
          collectedVariablesStore,
          codesListsStore,
          dynamiqueSpecified,
        ),
      ).toEqual(output);
    });
  });
});
