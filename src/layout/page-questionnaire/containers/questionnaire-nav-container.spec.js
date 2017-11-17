import React from 'react';

import { QuestionnaireNavContainer } from './questionnaire-nav-container';
import { shallow } from 'enzyme';

describe('<QuestionnaireNavContainer />', () => {
  const props = {
    questionnaire: {},
    components: {},
    setSelectedComponentId: jest.fn(),
  };

  const wrapper = shallow(<QuestionnaireNavContainer {...props} />);

  test('should render without throwing an error', () => {
    expect(wrapper.is('#questionnaire-nav')).toBe(true);
  });

  test('should call loadQuestionnaireIfNeeded in render', () => {
    expect(wrapper.find('.glyphicon-home').length).toBe(1);
  });
});
