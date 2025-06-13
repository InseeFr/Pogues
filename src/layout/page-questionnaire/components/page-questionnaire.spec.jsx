import React from 'react';

import { shallow } from 'enzyme';
import { beforeEach, describe, expect, it, test, vi } from 'vitest';

import { noop } from '../../../utils/test/test-utils';

describe.skip('<PageQuestionnaire />', () => {
  let wrapper;
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementation((f) => f());
  };

  const spySetActiveQuestionnaire = vi.fn();
  const spySetActiveComponents = vi.fn();
  const spySetActiveCodeLists = vi.fn();
  const spySetActiveVariables = vi.fn();

  const props = {
    id: 'FAKE_ID',
    params: { id: 1 },
    setActiveQuestionnaire: spySetActiveQuestionnaire,
    setActiveComponents: spySetActiveComponents,
    setActiveCodeLists: spySetActiveCodeLists,
    setActiveVariables: spySetActiveVariables,
    loadStatisticalContext: noop,
    loadCampaignsIfNeeded: noop,
    loadExternalQuestionnairesIfNeeded: noop,
    history: { push: noop },
    store: {},
    appState: {
      activeQuestionnaire: {
        id: 'FAKE_QUESTIONNAIRE_ID',
        campaigns: ['FAKE_CAMPAIGN_ID'],
      },
    },
  };

  beforeEach(() => {
    useEffect = vi.spyOn(React, 'useEffect');
    mockUseEffect();
    mockUseEffect();
    wrapper = shallow(<PageQuestionnaire {...props} />);
  });

  test('should render without throwing an error', () => {
    expect(wrapper.is('#page-questionnaire')).toBe(true);
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
