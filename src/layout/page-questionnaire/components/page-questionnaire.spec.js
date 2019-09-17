import React from 'react';
import { shallow } from 'enzyme';

// Not connected to store
import PageQuestionnaire from './page-questionnaire';

import { PAGE_QUESTIONNAIRE } from 'constants/dom-constants';
import { noop } from 'utils/test/test-utils';

const { COMPONENT_ID } = PAGE_QUESTIONNAIRE;

describe('<PageQuestionnaire />', () => {
  const spyLoad = jest.fn();
  const spySetActiveQuestionnaire = jest.fn();
  const spySetActiveComponents = jest.fn();
  const spySetActiveCodeLists = jest.fn();
  const spySetActiveVariables = jest.fn();
  const props = {
    id: 'FAKE_ID',
    params: { id: 1 },
    loadQuestionnaireIfNeeded: spyLoad,
    setActiveQuestionnaire: spySetActiveQuestionnaire,
    setActiveComponents: spySetActiveComponents,
    setActiveCodeLists: spySetActiveCodeLists,
    setActiveVariables: spySetActiveVariables,
    loadStatisticalContext: noop,
    loadCampaignsIfNeeded: noop,
    history: { push: noop },
    store: {},
    questionnaire: {
      id: 'FAKE_QUESTIONNAIRE_ID',
      campaigns: ['FAKE_CAMPAIGN_ID'],
    },
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
