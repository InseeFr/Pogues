import {
  FlowLogics,
  FormulasLanguages,
  Questionnaire,
  TargetModes,
} from '@/models/questionnaires';

import {
  FlowLogicEnum,
  FormulasLanguageEnum,
  GenericNameEnum,
  Questionnaire as PoguesQuestionnaire,
  SurveyModeEnum,
} from '../models/pogues';
import {
  computeNewPoguesQuestionnaire,
  computePoguesQuestionnaire,
  computeQuestionnaire,
} from './questionnaires';

it('computeQuestionnaire works', () => {
  const poguesQuestionnaire: PoguesQuestionnaire = {
    id: 'id',
    Name: 'TITLE',
    Label: ['title'],
    TargetMode: [SurveyModeEnum.CAPI, SurveyModeEnum.PAPI],
    DataCollection: [],
    lastUpdatedDate:
      "Tue Nov 19 2024 11:36:56 GMT+0100 (heure normale d'Europe centrale)",
    Variables: { Variable: [] },
    agency: 'fr.insee',
    childQuestionnaireRef: [],
    flowLogic: FlowLogicEnum.Redirection,
    formulasLanguage: FormulasLanguageEnum.XPath,
    genericName: GenericNameEnum.Questionnaire,
    owner: 'my-stamp',
    FlowControl: [],
    ComponentGroup: [],
    CodeLists: {
      CodeList: [{ id: 'idcl', Name: 'cl', Label: 'cl', Code: [] }],
    },
    Child: [
      {
        Name: 'QUESTIONNAIRE_END',
        Label: ['QUESTIONNAIRE_END'],
        id: 'idendquest',
        type: 'SequenceType',
        depth: 1,
        TargetMode: [SurveyModeEnum.CAPI, SurveyModeEnum.PAPI],
        genericName: GenericNameEnum.Module,
      },
    ],
  };

  const questionnaire: Questionnaire = {
    id: 'id',
    title: 'title',
    targetModes: new Set([TargetModes.CAPI, TargetModes.PAPI]),
    codesLists: [{ id: 'idcl', label: 'cl', codes: [] }],
    lastUpdatedDate: new Date('2024-11-19T10:36:56Z'),
    formulasLanguage: FormulasLanguages.XPath,
  };

  expect(computeQuestionnaire(poguesQuestionnaire)).toEqual(questionnaire);
});

describe('computeNewPoguesQuestionnaire', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const date = new Date(2000, 1, 1, 13);
    vi.setSystemTime(date);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const poguesQuestionnaire: PoguesQuestionnaire = {
    id: 'id',
    Name: 'TITLE',
    Label: ['title'],
    TargetMode: [SurveyModeEnum.CAPI, SurveyModeEnum.PAPI],
    DataCollection: [],
    Variables: { Variable: [] },
    agency: 'fr.insee',
    childQuestionnaireRef: [],
    genericName: GenericNameEnum.Questionnaire,
    owner: 'my-stamp',
    FlowControl: [],
    ComponentGroup: [],
    Child: [
      {
        Name: 'QUESTIONNAIRE_END',
        Label: ['QUESTIONNAIRE_END'],
        id: 'idendquest',
        type: 'SequenceType',
        depth: 1,
        TargetMode: [SurveyModeEnum.CAPI, SurveyModeEnum.PAPI],
        genericName: GenericNameEnum.Module,
      },
    ],
    CodeLists: { CodeList: [] },
    lastUpdatedDate:
      'Tue Feb 01 2000 13:00:00 GMT+0100 (heure normale d’Europe centrale)',
  };

  it('works', () => {
    expect(
      computeNewPoguesQuestionnaire(
        {
          id: 'id',
          title: 'title',
          targetModes: new Set([TargetModes.CAPI, TargetModes.PAPI]),
          flowLogic: FlowLogics.Redirection,
          formulasLanguage: FormulasLanguages.XPath,
        },
        'my-stamp',
      ),
    ).toEqual({
      ...poguesQuestionnaire,
      flowLogic: FlowLogicEnum.Redirection,
      formulasLanguage: FormulasLanguageEnum.XPath,
    });
  });

  it('sets default values', () => {
    expect(
      computeNewPoguesQuestionnaire(
        {
          id: 'id',
          title: 'title',
          targetModes: new Set([TargetModes.CAPI, TargetModes.PAPI]),
        },
        'my-stamp',
      ),
    ).toEqual({
      ...poguesQuestionnaire,
      flowLogic: FlowLogicEnum.Filter,
      formulasLanguage: FormulasLanguageEnum.VTL,
    });
  });
});

it('computePoguesQuestionnaire works', () => {
  const questionnaire: Questionnaire = {
    id: 'id',
    title: 'title',
    targetModes: new Set([TargetModes.CAPI, TargetModes.PAPI]),
    codesLists: [{ id: 'idcl', label: 'cl', codes: [] }],
    lastUpdatedDate: new Date('2024-11-19T10:36:56Z'),
    flowLogic: FlowLogics.Filter,
    formulasLanguage: FormulasLanguages.VTL,
  };

  const poguesQuestionnaire: PoguesQuestionnaire = {
    id: 'id',
    Name: 'TITLE',
    Label: ['title'],
    TargetMode: [SurveyModeEnum.CAPI, SurveyModeEnum.PAPI],
    DataCollection: [],
    lastUpdatedDate:
      'Tue Nov 19 2024 11:36:56 GMT+0100 (heure normale d’Europe centrale)',
    Variables: { Variable: [] },
    agency: 'fr.insee',
    childQuestionnaireRef: [],
    flowLogic: FlowLogicEnum.Filter,
    formulasLanguage: FormulasLanguageEnum.VTL,
    genericName: GenericNameEnum.Questionnaire,
    FlowControl: [],
    ComponentGroup: [],
    CodeLists: {
      CodeList: [{ id: 'idcl', Name: 'cl', Label: 'cl', Code: [] }],
    },
    Child: [
      {
        Name: 'QUESTIONNAIRE_END',
        Label: ['QUESTIONNAIRE_END'],
        id: 'idendquest',
        type: 'SequenceType',
        depth: 1,
        TargetMode: [SurveyModeEnum.CAPI, SurveyModeEnum.PAPI],
        genericName: GenericNameEnum.Module,
      },
    ],
  };

  expect(computePoguesQuestionnaire(questionnaire)).toEqual(
    poguesQuestionnaire,
  );
});
