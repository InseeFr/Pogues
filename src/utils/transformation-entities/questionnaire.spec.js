jest.dontMock('./questionnaire.js');

import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME } from 'constants/pogues-constants';
import Questionnaire, {
  defaultQuestionnaireForm,
  defaultQuestionnaireState,
  defaultQuestionnaireModel,
} from './questionnaire';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

describe('Transformation entities - Questionnaire', () => {
  // Form

  // @TODO
  // const questionnaireForm = {
  //   label: 'This is a questionnaire',
  // };

  // State

  const questionnaireState = {
    id: 'jx564532',
    owner: 'THISISOWNER',
    name: 'THISISAQUE',
    label: 'This is a questionnaire',
    components: [],
    codeLists: [],
    conditions: [],
    declarations: [],
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
  };

  const questionnaireComponentState = {
    id: 'jx564532',
    type: QUESTIONNAIRE,
    parent: '',
    weight: 0,
    name: 'THISISAQUE',
    label: 'This is a questionnaire',
    rawLabel: undefined,
    responseFormat: undefined,
    children: [],
    declarations: undefined,
  };

  const components = {
    jx564532: questionnaireComponentState,
  };

  // Model

  const questionnaireModel = {
    id: 'jx564532',
    owner: 'THISISOWNER',
    type: SEQUENCE_TYPE_NAME,
    name: 'THISISAQUE',
    label: ['This is a questionnaire'],
    genericName: 'QUESTIONNAIRE',
    depth: 0,
    questionType: '',
    children: [],
    responses: [],
    responseStructure: {
      dimensions: {},
    },
    declarations: [],
    goTos: [],
    controls: [],
    codeLists: {
      codeList: [],
      codeListSpecification: [],
    },
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
  };

  test('Default form shape should be the expected', () => {
    const expectedForm = {
      label: '',
      name: '',
    };
    expect(defaultQuestionnaireForm).toEqual(expectedForm);
  });

  test('Default state shape should be the expected', () => {
    const expectedState = {
      id: undefined,
      name: undefined,
      label: undefined,
      agency: undefined,
      survey: undefined,
      components: [],
      codeLists: [],
      conditions: [],
      declarations: [],
      owner: undefined,
    };
    expect(defaultQuestionnaireState).toEqual(expectedState);
  });

  test('Default model shape should be the expected', () => {
    const expectedModel = {
      id: '',
      name: '',
      label: [],
      declarations: [],
      goTos: [],
      controls: [],
      genericName: QUESTIONNAIRE,
      children: [],
      depth: 0,
      owner: '',
      type: SEQUENCE_TYPE_NAME,
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
      codeLists: {
        codeList: [],
        codeListSpecification: [],
      },
    };
    expect(defaultQuestionnaireModel).toEqual(expectedModel);
  });

  test('State to Model', () => {
    expect(Questionnaire.stateToModel(questionnaireState, components, {}, [])).toEqual(questionnaireModel);
  });
});
