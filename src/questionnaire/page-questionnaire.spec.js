jest.dontMock('./page-questionnaire.jsx');

import React from 'react';
import { shallow } from 'enzyme';

// Not connected to store
import { PageQuestionnaire } from './page-questionnaire';

describe('<PageQuestionnaire />', () => {
  const spyLoad = jest.fn();
  const spySetActiveQuestionnaire = jest.fn();
  const spySetActiveComponents = jest.fn();
  const spySetActiveCodeLists = jest.fn();
  const spySetActiveCalculatedVariables = jest.fn();
  const props = {
    params: { id: 1 },
    loadQuestionnaireIfNeeded: spyLoad,
    setActiveQuestionnaire: spySetActiveQuestionnaire,
    setActiveComponents: spySetActiveComponents,
    setActiveCodeLists: spySetActiveCodeLists,
    setActiveCalculatedVariables: spySetActiveCalculatedVariables,
    store: {},
  };

  const wrapper = shallow(<PageQuestionnaire {...props} />);

  test('should render without throwing an error', () => {
    expect(wrapper.is('#page-questionnaire')).toBe(true);
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

  test('should call setActiveCalculatedVariables in render', () => {
    expect(spySetActiveCalculatedVariables).toBeCalled();
  });
});
