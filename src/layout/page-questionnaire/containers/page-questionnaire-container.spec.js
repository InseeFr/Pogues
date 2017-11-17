import React from 'react';
import { shallow } from 'enzyme';

// Not connected to store
import { PageQuestionnaireContainer } from './page-questionnaire-container';

describe('<PageQuestionnaireContainer />', () => {
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

  const wrapper = shallow(<PageQuestionnaireContainer {...props} />);

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

  test('should call setActiveVariables in render', () => {
    expect(spySetActiveVariables).toBeCalled();
  });
});
