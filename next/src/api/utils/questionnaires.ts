import { type Questionnaire } from '@/models/questionnaires';
import { nameFromLabel } from '@/utils/utils';

import {
  GenericNameEnum,
  type Questionnaire as PoguesQuestionnaire,
  SurveyModeEnum,
} from '../models/pogues';
import { computeCodesLists } from './codesLists';
import { computePoguesFlowLogic } from './flowLogic';
import {
  computeFormulasLanguage,
  computePoguesFormulasLanguage,
} from './formulasLanguage';
import { computePoguesTargetModes, computeTargetModes } from './targetModes';

/** Compute a questionnaire that can be used in our app from API data. */
export function computeQuestionnaire(
  datum: PoguesQuestionnaire,
): Questionnaire {
  return {
    id: datum.id,
    title: datum.Label[0],
    targetModes: computeTargetModes(datum.TargetMode),
    lastUpdatedDate: datum.lastUpdatedDate
      ? new Date(datum.lastUpdatedDate)
      : undefined,
    codesLists: computeCodesLists(datum.CodeLists?.CodeList),
    formulasLanguage: computeFormulasLanguage(datum.formulasLanguage),
  };
}

/** Create a new questionnaire that can be sent to the API from our app data. */
export function computeNewPoguesQuestionnaire(
  datum: Questionnaire,
  stamp: string,
) {
  const targetModes = computePoguesTargetModes(datum.targetModes);
  return {
    Name: nameFromLabel(datum.title),
    Label: [datum.title],
    TargetMode: targetModes,
    id: datum.id,
    owner: stamp,
    flowLogic: computePoguesFlowLogic(datum.flowLogic),
    formulasLanguage: computePoguesFormulasLanguage(datum.formulasLanguage),
    lastUpdatedDate: new Date().toISOString(),
    CodeLists: { CodeList: [] },
    ...computeLegacyPoguesParameters(targetModes),
  };
}

/** Add legacy parameters for questionnaire. */
function computeLegacyPoguesParameters(targetModes: SurveyModeEnum[]) {
  return {
    agency: 'fr.insee',
    genericName: GenericNameEnum.Questionnaire,
    DataCollection: [],
    Child: [
      {
        Name: 'QUESTIONNAIRE_END',
        Label: ['QUESTIONNAIRE_END'],
        id: 'idendquest',
        type: 'SequenceType',
        depth: 1,
        TargetMode: targetModes,
        genericName: GenericNameEnum.Module,
      },
    ],
    childQuestionnaireRef: [],
    FlowControl: [],
    ComponentGroup: [],
    Variables: { Variable: [] },
  };
}
