import { codesListsModel } from './codes-list';
import { calculatedVariablesModel } from './calculated-variable';
import { externalVariablesModel } from './external-variable';
import { collectedVariablesModel } from './collected-variable';
import { componentsModel } from './component';

export const fakeOwnerId = 'THIS_IS_OWNER';
export const fakeQuestionnaireId = 'ID_QUESTIONNAIRE_FAKE';

export const questionnaireForm = {
  label: 'This is a questionnaire',
  name: 'THISISAQUE',
  serie: 'serie01',
  operation: 'operation01',
  campaigns: ['campaign01'],
};

export const questionnaireStore = {
  [fakeQuestionnaireId]: {
    owner: fakeOwnerId,
    id: fakeQuestionnaireId,
    name: 'THISISAQUE',
    label: 'This is a questionnaire',
    agency: 'fr.insee',
    final: false,
    serie: 'serie01',
    operation: 'operation01',
    campaigns: ['campaign01'],
    lastUpdatedDate: 'fakeLastUpdatedDate',
  },
};

export const questionnaireModel = {
  id: fakeQuestionnaireId,
  owner: fakeOwnerId,
  depth: 0,
  genericName: 'QUESTIONNAIRE',
  agency: 'fr.insee',
  Name: 'THISISAQUE',
  Label: ['This is a questionnaire'],
  final: false,
  DataCollection: [
    {
      id: 'campaign01',
      uri: 'http://ddi:fr.insee:DataCollection.campaign01',
      Name: 'Campaign 01',
    },
  ],
  ComponentGroup: [
    {
      id: 'j3tu30jo',
      Name: 'PAGE_1',
      Label: ['Components for page 1'],
      MemberReference: [],
    },
  ],
  Child: componentsModel,
  CodeLists: {
    CodeList: codesListsModel,
  },
  Variables: {
    Variable: [...calculatedVariablesModel, ...externalVariablesModel, ...collectedVariablesModel],
  },
};
