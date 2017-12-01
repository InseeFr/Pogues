import React from 'react';
import { shallow } from 'enzyme';

import PageQuestionnaire from './page-questionnaire';

import { PAGE_QUESTIONNAIRE } from 'constants/dom-constants';

const { COMPONENT_ID } = PAGE_QUESTIONNAIRE;

describe.skip('<PageQuestionnaire />', () => {
  const spyLoad = jest.fn();
  const spySetActiveQuestionnaire = jest.fn();
  const spySetActiveComponents = jest.fn();
  const spySetActiveCodeLists = jest.fn();
  const spySetActiveVariables = jest.fn();
  const props = {
    params: { id: 1 },
    loadQuestionnaireIfNeeded: spyLoad,
    setActiveQuestionnaire: spySetActiveQuestionnaire,
    setActiveComponents: spySetActiveComponents,
    setActiveCodeLists: spySetActiveCodeLists,
    setActiveVariables: spySetActiveVariables,
    store: {},
  };

  const wrapper = shallow(<PageQuestionnaire {...props} />);

  test('should render without throwing an error', () => {
    expect(wrapper.is(`#${COMPONENT_ID}`)).toBe(true);
  });

  test('should call loadQuestionnaireIfNeeded in render', () => {
    expect(spyLoad).toBeCalled();
  });

  test('should call setActiveQuestionnaire in render', () => {
    expect(spySetActiveQuestionnaire).toBeCalled();
  });

  test('should call setActiveComponents in render', () => {
    expect(spySetActiveComponents).toBeCalled();
  });

  test('should call setActiveCodeLists in render', () => {
    expect(spySetActiveCodeLists).toBeCalled();
  });

  test('should call setActiveVariables in render', () => {
    expect(spySetActiveVariables).toBeCalled();
  });
});
