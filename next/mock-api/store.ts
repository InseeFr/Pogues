/** In-memory fake Pogues Back-Office data for standalone frontend work. */

export const FAKE_STAMP = 'FAKEPERMISSION'

export type MockQuestionnaire = {
  id: string
  Name: string
  Label: string[]
  TargetMode: string[]
  DataCollection: unknown[]
  lastUpdatedDate: string
  owner: string
  agency: string
  formulasLanguage?: string
  flowLogic?: string
  CodeLists?: { CodeList: unknown[] }
  Variables?: { Variable: unknown[] }
  Child?: unknown[]
  [key: string]: unknown
}

const now = () => new Date().toISOString()

function seedQuestionnaire(
  id: string,
  title: string,
  name: string,
): MockQuestionnaire {
  const modes = ['CAPI', 'CAWI']
  const sequenceId = `${id}-seq-1`
  const questionId = `${id}-q-1`
  const responseId = `${id}-resp-1`
  const variableId = `${id}-var-1`
  const codesListId = `${id}-cl-1`

  return {
    id,
    Name: name,
    Label: [title],
    TargetMode: modes,
    DataCollection: [],
    lastUpdatedDate: now(),
    owner: FAKE_STAMP,
    agency: 'fr.insee',
    formulasLanguage: 'VTL',
    flowLogic: 'FILTER',
    CodeLists: {
      CodeList: [
        {
          id: codesListId,
          Label: 'Liste démo',
          Code: [
            { Label: 'Oui', Value: '1', Parent: '' },
            { Label: 'Non', Value: '2', Parent: '' },
          ],
        },
      ],
    },
    Variables: {
      Variable: [
        {
          id: variableId,
          Name: 'DEMO_VAR',
          Label: 'Variable démo',
          type: 'CollectedVariableType',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            MaxLength: 50,
          },
        },
      ],
    },
    Child: [
      {
        id: sequenceId,
        Name: 'SEQDEMO',
        Label: ['Séquence démo'],
        type: 'SequenceType',
        depth: 1,
        TargetMode: modes,
        genericName: 'MODULE',
        Declaration: [],
        Control: [],
        FlowControl: [],
        Child: [
          {
            id: questionId,
            Name: 'DEMO_VAR',
            Label: ['Quelle est votre réponse démo ?'],
            type: 'QuestionType',
            questionType: 'SIMPLE',
            depth: 2,
            TargetMode: modes,
            Declaration: [],
            Control: [],
            FlowControl: [],
            ClarificationQuestion: [],
            Response: [
              {
                id: responseId,
                mandatory: false,
                CollectedVariableReference: variableId,
                Datatype: {
                  typeName: 'TEXT',
                  type: 'TextDatatypeType',
                  MaxLength: 50,
                },
              },
            ],
          },
        ],
      },
      {
        Name: 'QUESTIONNAIRE_END',
        Label: ['QUESTIONNAIRE_END'],
        id: 'idendquest',
        type: 'SequenceType',
        depth: 1,
        TargetMode: modes,
        genericName: 'MODULE',
        Declaration: [],
        Control: [],
        FlowControl: [],
        Child: [],
      },
    ],
    childQuestionnaireRef: [],
    FlowControl: [],
    ComponentGroup: [],
    genericName: 'QUESTIONNAIRE',
  }
}

export const store = {
  stamps: [{ id: FAKE_STAMP, label: 'Fake permission (standalone)' }],
  agencies: [
    { id: 'fr.insee', label: 'fr.insee' },
    { id: 'fr.agency2', label: 'fr.agency2' },
  ],
  series: [
    {
      id: 'serie-demo',
      uri: 'urn:serie:demo',
      label: 'Série démo standalone',
    },
  ],
  serieDetails: {
    'serie-demo': {
      id: 'serie-demo',
      uri: 'http://example.fr/demo',
      label: 'Série démo standalone',
      altLabel: 'DEMO',
    },
  } as Record<string, unknown>,
  questionnaires: [
    seedQuestionnaire('q-demo-1', 'Questionnaire démo (standalone)', 'QDEMO1'),
    seedQuestionnaire('q-demo-2', 'Autre questionnaire démo', 'QDEMO2'),
  ] as MockQuestionnaire[],
  details: {} as Record<string, unknown>,
  variables: {} as Record<string, unknown[]>,
  codesLists: {} as Record<string, unknown[]>,
  scopes: {} as Record<string, { id: string; label: string }[]>,
  versions: {} as Record<string, unknown[]>,
  nomenclatures: {} as Record<string, unknown[]>,
  multimode: {} as Record<string, unknown>,
  articulation: {} as Record<string, unknown>,
}

for (const q of store.questionnaires) {
  store.details[q.id] = {
    id: q.id,
    name: q.Name,
    label: q.Label[0],
    flowLogic: 'FILTER',
    formulasLanguage: 'VTL',
    targetMode: q.TargetMode,
    agency: q.agency,
    owner: q.owner,
    dataCollection: {
      serie: store.serieDetails['serie-demo'],
    },
  }
  store.variables[q.id] = [
    {
      id: `${q.id}-var-1`,
      datatype: { typeName: 'TEXT', maxLength: 50 },
      description: 'Variable démo',
      name: 'DEMO_VAR',
      type: 'COLLECTED',
      scope: undefined,
    },
  ]
  store.codesLists[q.id] = [
    {
      id: `${q.id}-cl-1`,
      label: 'Liste démo',
      codes: [
        { label: 'Oui', value: '1' },
        { label: 'Non', value: '2' },
      ],
      relatedQuestionNames: [],
    },
  ]
  store.scopes[q.id] = []
  store.versions[q.id] = []
  store.nomenclatures[q.id] = []
}

export function findQuestionnaire(id: string) {
  return store.questionnaires.find((q) => q.id === id)
}
