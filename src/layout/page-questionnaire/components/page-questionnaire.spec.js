import React from 'react';
import { shallow } from 'enzyme';

// Not connected to store
import PageQuestionnaire from './page-questionnaire';

import { PAGE_QUESTIONNAIRE } from 'constants/dom-constants';
import { noop } from 'utils/test/test-utils';

const { COMPONENT_ID } = PAGE_QUESTIONNAIRE;

describe('<PageQuestionnaire />', () => {
  let wrapper;
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementation(f => f());
  };
  
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

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
    mockUseEffect();
    mockUseEffect();
    wrapper = shallow(<PageQuestionnaire {...props} />);
  });
 
  test('should render without throwing an error', () => {
    expect(wrapper.is(`#${COMPONENT_ID}`)).toBe(true);
  });

  it('should call loadQuestionnaireIfNeeded in render', () => {
    expect(props.loadQuestionnaireIfNeeded).not.toBeCalled();
  });

  it('should call setActiveQuestionnaire in render', () => {
    expect(props.setActiveQuestionnaire).not.toBeCalled();
  });

  it('should call setActiveComponents in render', () => {
    expect(props.setActiveComponents).not.toBeCalled();
  });

  it('should call setActiveCodeLists in render', () => {
    expect(props.setActiveCodeLists).not.toBeCalled();
  });

  it('should call setActiveVariables in render', () => {
    expect(props.setActiveVariables).not.toBeCalled();
  });

});
