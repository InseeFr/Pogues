jest.dontMock('./questionnaire-list');
jest.dontMock('./questionnaire-new-edit');
jest.dontMock('./questionnaire-generic-input');

import React from 'react';
import { shallow } from 'enzyme';

import QuestionnaireList from './questionnaire-list';
import QuestionnaireGenericInput from './questionnaire-generic-input';
import { QuestionnaireNewEdit as QuestionnaireNew } from './questionnaire-new-edit';
import { getLocale } from 'utils/test/test-utils';

const locale = getLocale();

describe('<QuestionnaireList />', () => {
  // @TODO: Remove mock
  const mockQuestionnaires = [
    {
      id: '1',
      label: "Enquête sur les investissements pour protéger l'environnement 2016",
      type: 'Face à face',
      updatedAt: '03/01/2017',
    },
    {
      id: '2',
      label: "Enquête sur les investissements pour protéger l'environnement 2015",
      type: 'Téléphone',
      updatedAt: '03/01/2017',
    },
    {
      id: '3',
      label: "Enquête sur les investissements pour protéger l'environnement 2014",
      type: 'Face à face',
      updatedAt: '03/01/2017',
    },
    {
      id: '4',
      label: "Enquête sur les investissements pour protéger l'environnement 2013",
      type: 'Téléphone',
      updatedAt: '03/01/2017',
    },
  ];
  const propsWithoutQuestionnaires = {
    locale: locale,
  };
  const propsWithQuestionnaires = {
    locale: locale,
    questionnaires: mockQuestionnaires,
  };
  const wrapperWithoutQuestionnaires = shallow(<QuestionnaireList {...propsWithoutQuestionnaires} />);
  const wrapperWithQuestionnaires = shallow(<QuestionnaireList {...propsWithQuestionnaires} />);

  test('should render without throwing an error', () => {
    expect(wrapperWithoutQuestionnaires.is('#questionnaire-list')).toBe(true);
  });

  test('should render as many <QuestionnaireListItem /> as questionnaires passed', () => {
    expect(wrapperWithQuestionnaires.find('QuestionnaireListItem').length).toBe(mockQuestionnaires.length);
  });

  test('should render "No results" message only if no questionnaries are passed', () => {
    expect(wrapperWithoutQuestionnaires.find('.questionnaire-list_noresults').length).toBe(1);
    expect(wrapperWithQuestionnaires.find('.questionnaire-list_noresults').length).toBe(0);
  });
});

describe('<QuestionnarieNew />', () => {
  const props = {
    locale: locale,
  };
  test('should render without throw an error', () => {
    const wrapperQuestionnarieNew = shallow(<QuestionnaireNew {...props} />);
    expect(wrapperQuestionnarieNew.is('#questionnaire-new')).toBe(true);
  });
});

describe('<GenericInput />', () => {
  test('should render without throw an error', () => {
    const wrapper = shallow(<QuestionnaireGenericInput />);
    expect(wrapper.is('#questionnaire-generic-input')).toBe(true);
  });
  test('should render disabled the "Question" button if there ')
});
