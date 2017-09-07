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
  final: false,
};

export const questionnaireStore = {
  [fakeQuestionnaireId]: {
    owner: fakeOwnerId,
    id: fakeQuestionnaireId,
    name: 'THISISAQUE',
    label: 'This is a questionnaire',
    agency: 'fr.insee',
    final: false,
    dataCollection: [
      {
        id: 'dataCollection1',
        uri: 'http://ddi:fr.insee:DataCollection.INSEE-POPO-DC-1.1',
        Name: 'POPO-2017-A00',
      },
    ],
    componentGroups: [
      {
        id: 'j3tu30jo',
        Name: 'PAGE_1',
        Label: ['Components for page 1'],
        MemberReference: [],
      },
    ],
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
      id: 'dataCollection1',
      uri: 'http://ddi:fr.insee:DataCollection.INSEE-POPO-DC-1.1',
      Name: 'POPO-2017-A00',
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
