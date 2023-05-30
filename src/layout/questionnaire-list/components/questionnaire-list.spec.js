jest.dontMock('./questionnaire-list');

import React from 'react';
import { shallow } from 'enzyme';

import { noop } from 'utils/test/test-utils';

import QuestionnaireList from './questionnaire-list';

describe('<QuestionnaireList />', () => {
  // @TODO: Remove mock
  /* const mockQuestionnaires = [
    {
      id: '1',
      label:
        "Enquête sur les investissements pour protéger l'environnement 2016",
      type: 'Face à face',
      updatedAt: '03/01/2017',
    },
    {
      id: '2',
      label:
        "Enquête sur les investissements pour protéger l'environnement 2015",
      type: 'Téléphone',
      updatedAt: '03/01/2017',
    },
    {
      id: '3',
      label:
        "Enquête sur les investissements pour protéger l'environnement 2014",
      type: 'Face à face',
      updatedAt: '03/01/2017',
    },
    {
      id: '4',
      label:
        "Enquête sur les investissements pour protéger l'environnement 2013",
      type: 'Téléphone',
      updatedAt: '03/01/2017',
    },
  ]; */
  /* const propsWithQuestionnaires = {
    questionnaires: mockQuestionnaires,
    duplicateQuestionnaire: () => {},
  }; */
  const wrapperWithoutQuestionnaires = shallow(
    <QuestionnaireList
      loadQuestionnaireList={noop}
      duplicateQuestionnaire={() => {}}
      handleNewChildQuestionnaireRef={() => {}}
      activeQuestionnaire={{}}
    />,
  );
  /* const wrapperWithQuestionnaires = shallow(
    <QuestionnaireList
      loadQuestionnaireList={noop}
      {...propsWithQuestionnaires}
    />,
  ); */

  test('should render without throwing an error', () => {
    expect(wrapperWithoutQuestionnaires.is('.home-questionnaires')).toBe(false);
  });

  // Don't understand : wouldn't this overwrite Questionnaires list with empty list ?
  /* test('should render as many <QuestionnaireListItem /> as questionnaires passed', () => {
    expect(wrapperWithQuestionnaires.find('QuestionnaireListItem').length).toBe(
      mockQuestionnaires.length,
    );
  }); */

  // to be added when loading ticket finish
});
