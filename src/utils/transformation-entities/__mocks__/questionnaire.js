import { SEQUENCE_TYPE_NAME } from 'constants/pogues-constants';
import { codesListsModel } from './codes-list';
import { calculatedVariablesModel } from './calculated-variable';
import { componentsModel } from './component';

export const fakeOwnerId = 'THIS_IS_OWNER';
export const fakeQuestionnaireId = 'ID_QUESTIONNAIRE_FAKE';

export const questionnaireForm = {
  label: 'This is a questionnaire',
  name: 'THISISAQUE',
};

export const questionnaireStore = {
  [fakeQuestionnaireId]: {
    owner: fakeOwnerId,
    id: fakeQuestionnaireId,
    name: 'THISISAQUE',
    label: 'This is a questionnaire',
    agency: 'fr.insee',
    survey: {
      agency: 'fr.insee',
      name: 'POPO',
      id: '',
    },
    componentGroups: [
      {
        name: 'PAGE_1',
        label: 'Components for page 1',
        Member: [],
        id: '',
      },
    ],
  },
};

export const questionnaireModel = {
  id: fakeQuestionnaireId,
  owner: fakeOwnerId,
  type: SEQUENCE_TYPE_NAME,
  name: 'THISISAQUE',
  label: ['This is a questionnaire'],
  genericName: 'QUESTIONNAIRE',
  depth: 0,
  agency: 'fr.insee',
  survey: {
    agency: 'fr.insee',
    name: 'POPO',
    id: '',
  },
  componentGroups: [
    {
      name: 'PAGE_1',
      label: 'Components for page 1',
      Member: [],
      id: '',
    },
  ],
  children: componentsModel,
  codeLists: {
    codeList: codesListsModel,
    codeListSpecification: [],
  },
  calculatedVariables: calculatedVariablesModel,
};
