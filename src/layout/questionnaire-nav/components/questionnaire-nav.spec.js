import React from 'react';
import { shallow } from 'enzyme';

import QuestionnaireNav from './questionnaire-nav';

import { QUESTIONNAIRE_NAV } from 'constants/dom-constants';
import { noop } from 'utils/test/test-utils';

const { COMPONENT_CLASS } = QUESTIONNAIRE_NAV;

describe('<QuestionnaireNav />', () => {
  const props = {
    questionnaire: {},
    componentsStore: {},
    setSelectedComponentId: noop
  };

  const wrapper = shallow(<QuestionnaireNav {...props} />);

  test('should render without throwing an error', () => {
    expect(wrapper.is(`.${COMPONENT_CLASS}`)).toBe(true);
  });

  test('should call loadQuestionnaireIfNeeded in render', () => {
    expect(wrapper.find('.glyphicon-home').length).toBe(1);
  });
});
